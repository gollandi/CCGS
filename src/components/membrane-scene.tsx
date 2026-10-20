'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, type RefObject } from 'react';
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
uniform vec2 uSize;
uniform float uScore;
uniform float uOpen;
uniform vec3 uTouch;
void main(){
  vec2 pixel=vUv*uSize;
  float intention=uTouch.z;
  float cut=(.40+clamp(uTouch.x-.40,-.3,.3)*intention*.16)*uSize.x;
  float reach=clamp(uSize.x*.10,34.,100.);
  float q=(pixel.x-cut)/reach;
  float influence=exp(-pow(abs(q)*1.3,4.));
  float displacement=(uScore*14.+intention*36.)*(1.-uOpen);
  // The two halves disagree about where the same ray continues.
  float side=mix(-1.,1.,step(0.,q));
  float ray=uSize.y*.55+side*displacement*influence;
  float distance=abs(pixel.y-ray);
  float hairline=1.-smoothstep(.35,1.05,distance);
  float seam=smoothstep(.7,1.8,abs(pixel.x-cut));
  float ends=smoothstep(.045,.065,vUv.x)*(1.-smoothstep(.92,.95,vUv.x));
  float ink=hairline*mix(1.,seam,min(1.,displacement/3.))*ends;
  // Refraction produces a short counter-image only while the visitor engages.
  float counter=1.-smoothstep(.25,.85,abs(pixel.y-(uSize.y*.55-side*displacement*influence*.65)));
  float echo=counter*influence*seam*intention*.24;
  gl_FragColor=vec4(vec3(.36,.30,.28),max(ink*.62,echo)*(1.-uOpen));
}`;

function OpticalField({ input, active, onReady }: Props) {
  const invalidate = useThree(state => state.invalidate);
  const elapsed = useRef(0);
  const material = useRef<THREE.ShaderMaterial>(null);
  const currentTouch = useRef(new THREE.Vector3(.4,.55,0));
  const targetTouch = useRef(new THREE.Vector3());
  const uniforms = useMemo(() => ({
    uSize: { value: new THREE.Vector2(1000,650) }, uScore: { value: 0 }, uOpen: { value: 0 },
    uTouch: { value: currentTouch.current },
  }), []);

  useEffect(() => { onReady(invalidate); invalidate(); },[onReady,invalidate]);
  useEffect(() => { if(active)invalidate(); },[active,invalidate]);

  useFrame((state,delta) => {
    if(!active||!material.current)return;
    const live=material.current.uniforms;
    const dt=Math.min(delta,.05);
    elapsed.current=Math.min(3,elapsed.current+dt);
    live.uScore.value=openingScore(elapsed.current);
    live.uSize.value.set(state.size.width,state.size.height);
    targetTouch.current.set(input.current.x,1-input.current.y,input.current.energy);
    currentTouch.current.lerp(targetTouch.current,1-Math.exp(-dt*8));
    const targetOpen=input.current.open??0;
    live.uTouch.value.copy(currentTouch.current);
    live.uOpen.value=THREE.MathUtils.damp(live.uOpen.value,targetOpen,5,dt);
    if(elapsed.current<3 || currentTouch.current.distanceTo(targetTouch.current)>.0001 || Math.abs(live.uOpen.value-targetOpen)>.0001)invalidate();
  });
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
