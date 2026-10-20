'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';
export type FieldInput = { x: number; y: number; energy: number; colour: number };
type Props = { input: RefObject<FieldInput>; active: boolean; onReady: () => void; onFailure: () => void };
const vertex = `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`;
const fragment = /* glsl */`
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uAspect;
uniform vec3 uTouch;
uniform float uColour;
float curve(float x, float layer, float t){
  return .50 + .19*sin(x*5.5 + layer*.38 + t*.13) + .17*cos(x*2.9 - layer*.2) - .18*x;
}
void main(){
  vec2 uv=vUv;
  float t=uTime;
  float unfurl=1.-exp(-max(0.,t-.25)*2.3);
  vec2 d=uv-uTouch.xy;
  d.x*=uAspect;
  float dist=length(d);
  float touch=exp(-dist*dist*7.)*uTouch.z;
  float wave=sin(dist*22.-t*3.0)*exp(-dist*4.)*uTouch.z*.018;
  vec3 colour=vec3(0.);
  float alpha=0.;
  for(int i=0;i<3;i++){
    float l=float(i);
    float x=uv.x + .012*sin(uv.y*6.+t*.19+l);
    float centre=curve(x,l,t)+wave+touch*d.y*.25+(1.-unfurl)*sin(x*6.28+l)*.23;
    float width=.065+.14*pow(sin(x*3.14159),2.);
    width*=(.3+.7*unfurl)*(1.+.2*sin(x*6.+t*.3+l));
    float y=(uv.y-centre)/width;
    float shape=1.-smoothstep(.97,1.01,abs(y));
    float fold=sin(y*2.6+x*7.-t*.18+l*.4);
    float rim=exp(-pow((abs(y)-.98)*70.,2.));
    float inner=pow(max(0.,cos(y*2.1+x*4.+l*.8)),16.);
    float reflection=pow(max(0.,sin(y*3.2-x*2.7+l*.8)),32.);
    float band=exp(-pow((y-.42*sin(x*4.+l))*25.,2.));
    vec3 shade=mix(vec3(.67,.59,.51),vec3(1.,.97,.89),.5+.5*fold);
    shade=mix(shade,vec3(.77,.47,.21),rim*.7);
    shade=mix(shade,vec3(1.,.99,.94),reflection*.9+inner*.4);
    shade=mix(shade,vec3(.56,.27,.27),uColour*.10*shape);
    float a=shape*(.045+inner*.12+reflection*.28+band*.055)+rim*.60;
    a*=smoothstep(.02,.17,x)*(1.-smoothstep(.93,1.,x));
    colour=colour*(1.-a)+shade*a;
    alpha=alpha+(1.-alpha)*a;
  }
  // Moving caustics are generated from the material, with local touch interference.
  float line=curve(uv.x,1.,t)-.23+wave*.6;
  float caustic=exp(-pow((uv.y-line)*130.,2.))*.17;
  caustic*=sin(uv.x*3.14159);
  colour+=vec3(.83,.66,.43)*caustic;
  alpha+=caustic*(1.-alpha);
  gl_FragColor=vec4(colour/max(alpha,.001),alpha);
}`;
function Material({ input, onReady }: Props) {
  const elapsed = useRef(0);
  const uniforms = useMemo(() => ({ uTime:{value:0},uAspect:{value:1},uTouch:{value:new THREE.Vector3(.5,.5,0)},uColour:{value:0} }), []);
  useEffect(onReady,[onReady]);
  useFrame((state,delta)=>{
    const dt=Math.min(delta,.05); elapsed.current+=dt;
    uniforms.uTime.value=elapsed.current;
    uniforms.uAspect.value=state.size.width/state.size.height;
    const k=1-Math.exp(-dt*5);
    uniforms.uTouch.value.lerp(new THREE.Vector3(input.current.x,1-input.current.y,input.current.energy),k);
    uniforms.uColour.value=THREE.MathUtils.lerp(uniforms.uColour.value,input.current.colour,k);
  });
  return <mesh frustumCulled={false}><planeGeometry args={[2,2]} /><shaderMaterial transparent depthWrite={false} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} /></mesh>;
}
export default function MembraneScene(props: Props){
  const cleanup=useRef<(()=>void)|null>(null);
  useEffect(()=>()=>cleanup.current?.(),[]);
  return <Canvas aria-hidden="true" dpr={[1,1.5]} gl={{alpha:true,antialias:false,powerPreference:'low-power'}} frameloop={props.active?'always':'never'} onCreated={({gl})=>{gl.setClearColor(0,0); const canvas=gl.domElement; const lost=(e:Event)=>{e.preventDefault();props.onFailure();}; canvas.addEventListener('webglcontextlost',lost);cleanup.current=()=>canvas.removeEventListener('webglcontextlost',lost);}} fallback={null}><Material {...props}/></Canvas>;
}
