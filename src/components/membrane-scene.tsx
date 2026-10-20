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
void lay(inout vec4 surface,vec3 colour,float opacity){
  float a=clamp(opacity,0.,1.);
  float combined=a+surface.a*(1.-a);
  surface.rgb=(colour*a+surface.rgb*surface.a*(1.-a))/max(combined,.00001);
  surface.a=combined;
}
void main(){
  vec2 p=vec2(vUv.x,1.-vUv.y);
  float x=clamp((p.x-.035)/.94,0.,1.);
  float arch=sin(x*3.14159265);
  float local=exp(-pow((p.x-uTouch.x)*3.8,2.));
  float tension=(uScore-.35)*.075+uTouch.z*.10*local;
  float bend=arch*(tension+uTouch.z*(.5-uTouch.y)*.10*local);
  float spine=-.13+1.17*x;
  float upper=spine-.15*arch-bend*.30;
  float lower=spine+.40*arch+bend*.65;
  float fold=spine+.075*arch+bend;
  float px=1./uSize.y;
  float ends=smoothstep(0.,.025,x)*(1.-smoothstep(.975,1.,x));
  float inside=smoothstep(upper-px,upper+px,p.y)*(1.-smoothstep(lower-px,lower+px,p.y))*ends;
  float across=(p.y-upper)/max(lower-upper,.001);
  float crease=abs(p.y-fold);
  vec4 surface=vec4(0.);
  // One broad transparent face. Its fold and perimeter catch the light differently.
  lay(surface,vec3(.51,.46,.41),exp(-pow((p.y-lower-.045)/.045,2.))*arch*.045*ends);
  lay(surface,vec3(.99,.975,.94),inside*(.09+.10*pow(1.-clamp(across,0.,1.),3.)));
  lay(surface,vec3(.53,.49,.45),inside*exp(-pow((p.y-fold-.025)/.052,2.))*.16);
  lay(surface,vec3(1.,.985,.945),inside*exp(-pow((p.y-fold+.015)/.027,2.))*.48);
  lay(surface,vec3(1.,.99,.96),exp(-pow(crease/(px*1.25),2.))*ends*.86);
  lay(surface,vec3(.57,.40,.27),exp(-pow((p.y-upper)/(px*.85),2.))*ends*.43);
  lay(surface,vec3(1.,.99,.96),exp(-pow((p.y-upper-px*1.5)/(px*.8),2.))*ends*.85);
  lay(surface,vec3(.65,.52,.40),exp(-pow((p.y-lower)/(px*.7),2.))*ends*.25);
  lay(surface,vec3(1.,.99,.96),exp(-pow((p.y-lower+px*1.6)/(px*1.1),2.))*ends*.9);
  // Opening releases the material into the margin, keeping the reading ground clear.
  surface.a*=(1.-uOpen*.94)*smoothstep(-.02,.025,p.y)*(1.-smoothstep(.94,1.04,p.y));
  gl_FragColor=surface;
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
