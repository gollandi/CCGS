'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import * as THREE from 'three';
import { openingScore } from '@/lib/refraction';

export type FieldInput = { x: number; y: number; energy: number; colour: number; open?: number };
type Props = {
  input: RefObject<FieldInput>;
  active: boolean;
  onReady: (wake: () => void) => void;
  onFailure: () => void;
};

const vertex = `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`;
const fragment = /* glsl */`
precision highp float;
varying vec2 vUv;
uniform sampler2D uPrinted;
uniform sampler2D uHidden;
uniform float uAspect;
uniform float uScore;
uniform float uOpen;
uniform vec3 uTouch;

void main(){
  vec2 uv = vUv;
  vec2 centre = mix(vec2(.40,.55),vec2(.48,.50),uOpen);
  vec2 radius = mix(vec2(.21,.21*uAspect),vec2(.49,.46),uOpen);
  vec2 local = (uv-centre)/radius;
  float distance = length(local);
  float inside = 1.-smoothstep(.98,1.,distance);
  float lens = max(0.,1.-distance*distance);
  float intention = uTouch.z;
  float twist = (uScore*.95+intention*1.5)*(1.-uOpen);
  float angle = lens*twist;
  mat2 rotate = mat2(cos(angle),-sin(angle),sin(angle),cos(angle));
  vec2 optical = rotate*local;
  optical *= 1.-lens*(.36+intention*.18);
  optical.x += (uTouch.x-centre.x)*lens*.42*intention;
  optical.y += (uTouch.y-centre.y)*lens*.35*intention;
  vec2 refracted = centre+optical*radius;
  vec4 ordinary = texture2D(uPrinted,uv);
  vec4 through = texture2D(uHidden,refracted);
  float reveal = inside*(.88+intention*.12)*(1.-uOpen);
  vec4 result = mix(ordinary,through,reveal);
  result.a *= 1.-uOpen;
  // The circumference is an optical discontinuity, not a shaded solid object.
  float edge = exp(-pow((distance-1.)*220.,2.));
  float crescent = edge*(.20+.20*max(0.,local.x-local.y));
  vec3 ink = vec3(.31,.26,.25);
  float arc = crescent*(1.-uOpen*.68);
  result.rgb = mix(result.rgb,ink,arc);
  result.a = max(result.a,arc);
  // A second image exists only within the lens: the line has impossible continuity.
  float echo = texture2D(uPrinted,centre+(optical*vec2(-1.,.68))*radius).a;
  float echoAlpha = echo*inside*(.2+.4*intention)*(1.-uOpen);
  result.rgb = mix(result.rgb,vec3(.38,.18,.23),echoAlpha);
  result.a = max(result.a,echoAlpha);
  gl_FragColor=result;
}`;

function OpticalField({ input, active, onReady }: Props) {
  const invalidate = useThree(state => state.invalidate);
  const [textures, setTextures] = useState<THREE.CanvasTexture[] | null>(null);
  const elapsed = useRef(0);
  const material = useRef<THREE.ShaderMaterial>(null);
  const currentTouch = useRef(new THREE.Vector3(.4,.55,0));
  const targetTouch = useRef(new THREE.Vector3());
  const uniforms = useMemo(() => ({
    uPrinted: { value: textures?.[0] ?? null },
    uHidden: { value: textures?.[0] ?? null },
    uAspect: { value: 1.4 }, uScore: { value: 0 }, uOpen: { value: 0 },
    uTouch: { value: currentTouch.current },
  }), [textures]);

  useEffect(() => {
    let cancelled = false;
    let created: THREE.CanvasTexture[] = [];
    // A locally authored typographic plate. No screenshots or remote images.
    const draw = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1800; canvas.height = 1200;
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0,0,1800,1200);
      ctx.strokeStyle = '#74675e'; ctx.lineWidth = 1.25;
      ctx.beginPath(); ctx.moveTo(65,540); ctx.lineTo(1725,540); ctx.stroke();
      ctx.strokeStyle = '#c0b5aa'; ctx.lineWidth = .8;
      ctx.beginPath(); ctx.moveTo(65,548); ctx.lineTo(1725,548); ctx.stroke();
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      return texture;
    };
    document.fonts.load('450 148px Manrope').catch(() => []).then(() => {
      if(cancelled)return;
      created = [draw()]; setTextures(created); invalidate();
    });
    return () => { cancelled=true; created.forEach(texture=>texture.dispose()); };
  },[invalidate]);

  useEffect(() => {
    if (!textures) return;
    onReady(invalidate); invalidate();
  },[textures,uniforms,onReady,invalidate]);
  useEffect(() => { if(active)invalidate(); },[active,invalidate]);

  useFrame((state,delta) => {
    if(!active||!textures||!material.current)return;
    const live=material.current.uniforms;
    const dt=Math.min(delta,.05);
    elapsed.current=Math.min(3,elapsed.current+dt);
    live.uScore.value=openingScore(elapsed.current);
    live.uAspect.value=state.size.width/state.size.height;
    targetTouch.current.set(input.current.x,1-input.current.y,input.current.energy);
    currentTouch.current.lerp(targetTouch.current,1-Math.exp(-dt*8));
    const targetOpen=input.current.open??0;
    live.uTouch.value.copy(currentTouch.current);
    live.uOpen.value=THREE.MathUtils.damp(live.uOpen.value,targetOpen,5,dt);
    if(elapsed.current<3 || currentTouch.current.distanceTo(targetTouch.current)>.0001 || Math.abs(live.uOpen.value-targetOpen)>.0001)invalidate();
  });
  if(!textures)return null;
  return <mesh frustumCulled={false}><planeGeometry args={[2,2]}/><shaderMaterial ref={material} transparent depthWrite={false} uniforms={uniforms} vertexShader={vertex} fragmentShader={fragment}/></mesh>;
}

export default function MembraneScene(props:Props){
  const cleanup=useRef<(()=>void)|null>(null);
  useEffect(()=>()=>cleanup.current?.(),[]);
  return <Canvas aria-hidden="true" dpr={[1,1.5]} frameloop="demand" gl={{alpha:true,antialias:true,powerPreference:'low-power'}} onCreated={({gl})=>{
    gl.setClearColor(0,0);
    const canvas=gl.domElement;
    const lost=(event:Event)=>{event.preventDefault();props.onFailure();};
    canvas.addEventListener('webglcontextlost',lost);
    cleanup.current=()=>canvas.removeEventListener('webglcontextlost',lost);
  }} fallback={null}><OpticalField {...props}/></Canvas>;
}
