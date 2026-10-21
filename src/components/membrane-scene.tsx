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
uniform sampler2D uBehind;
vec3 ground(vec2 p){
  vec2 photo=vec2((p.x-.18)/.86,(p.y-.04)/.90);
  float window=smoothstep(.05,.32,p.x)*(1.-smoothstep(.86,1.08,p.x));
  window*=smoothstep(.04,.28,p.y)*(1.-smoothstep(.72,.96,p.y));
  vec3 colour=texture2D(uBehind,vec2(clamp(photo.x,0.,1.),1.-clamp(photo.y,0.,1.))).rgb;
  float luma=dot(colour,vec3(.299,.587,.114));
  colour=mix(vec3(luma),colour,.65);
  return mix(vec3(.93333,.92157,.89804),colour,window*.38);
}
void main(){
  vec2 p=vec2(vUv.x,1.-vUv.y);
  float aspect=uSize.x/uSize.y;
  vec2 d=(p-uTouch.xy)*vec2(aspect,1.);
  float radius=.23;
  float dent=exp(-dot(d,d)/(radius*radius));
  // The gradient of a local indentation bends the transmitted image.
  // Both open boundaries continue beyond the frame: no pointed closed silhouette.
  vec2 normal=d*dent*uTouch.z*1.15;
  normal.x/=aspect;
  float entrance=(uScore-.35)*.035;
  float localBend=dent*uTouch.z*.065;
  float upper=-.13+.65*p.x+.105*sin(p.x*3.4)+entrance+localBend;
  float lower=.23+.65*p.x+.065*sin(p.x*4.1)+entrance+localBend;
  float px=1./uSize.y;
  float inside=smoothstep(upper-px,upper+px,p.y)*(1.-smoothstep(lower-px,lower+px,p.y));
  float across=clamp((p.y-upper)/(lower-upper),0.,1.);
  vec2 curvature=vec2(-.009,.018)*sin(across*3.14159);
  vec2 offset=(curvature+normal*.34)*inside;
  vec3 colour=ground(p+offset);
  // Broad, continuous curvature, with specular light confined to the perimeter.
  float sheen=pow(abs(across-.52)*2.,7.)*inside;
  colour=mix(colour,vec3(1.,.987,.956),inside*.025+sheen*.16);
  colour+=dent*uTouch.z*inside*.035;
  float topEdge=exp(-pow((p.y-upper)/(px*.8),2.));
  float bottomEdge=exp(-pow((p.y-lower)/(px*.9),2.));
  colour=mix(colour,vec3(.65,.48,.32),topEdge*.36+bottomEdge*.18);
  float light=exp(-pow((p.y-upper-px*1.4)/(px*.9),2.))+exp(-pow((p.y-lower+px*1.8)/(px*1.2),2.));
  colour=mix(colour,vec3(1.,.995,.975),clamp(light*.85,0.,1.));
  float fade=smoothstep(0.,.10,p.x)*(1.-smoothstep(.94,1.,p.x));
  fade*=smoothstep(0.,.06,p.y)*(1.-smoothstep(.93,1.,p.y));
  gl_FragColor=vec4(colour,fade*(1.-uOpen));
}`;

function OpticalField({ input, active, onReady }: Props) {
  const invalidate = useThree(state => state.invalidate);
  const elapsed = useRef(0);
  const material = useRef<THREE.ShaderMaterial>(null);
  const currentTouch = useRef(new THREE.Vector3(.4,.55,0));
  const targetTouch = useRef(new THREE.Vector3());
  const texture=useMemo(()=>new THREE.Texture(),[]);
  useEffect(()=>{
    let alive=true;
    const loader=new THREE.TextureLoader();
    loader.load('/images/chelsea/restaurant.jpg',loaded=>{
      if(!alive){loaded.dispose();return;}
      texture.image=loaded.image;texture.needsUpdate=true;invalidate();loaded.dispose();
    },undefined,()=>{ /* The clear membrane remains usable if the photograph fails. */ });
    return()=>{alive=false;texture.dispose();};
  },[texture,invalidate]);
  const uniforms = useMemo(() => ({
    uSize: { value: new THREE.Vector2(1000,650) }, uScore: { value: 0 }, uOpen: { value: 0 },
    uTouch: { value: currentTouch.current }, uBehind: { value: texture },
  }), [texture]);

  useEffect(() => { onReady(invalidate); invalidate(); },[onReady,invalidate]);
  useEffect(() => { if(active)invalidate(); },[active,invalidate]);

  useFrame((state,delta) => {
    if(!active||!material.current)return;
    const live=material.current.uniforms;
    const dt=Math.min(delta,.05);
    elapsed.current=Math.min(3,elapsed.current+dt);
    live.uScore.value=openingScore(elapsed.current);
    live.uSize.value.set(state.size.width,state.size.height);
    targetTouch.current.set(input.current.x,input.current.y,input.current.energy);
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
