'use client';

import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

export type SceneProps = {
  pull: { x: number; y: number };
  open: boolean;
  reduced: boolean;
  active: boolean;
  resetKey: number;
  onReady: () => void;
  onFailure: () => void;
};

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uOpen;
  uniform vec2 uPull;
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    float t = uv.x * 6.2831853;
    float w = (uv.y - .5) * (1.45 + .7 * sin(uv.x * 3.14159));
    float twist = t * .85 - .65 + .14 * sin(uTime * .23);
    vec3 p = vec3((uv.x - .5) * 6.7, sin(t * .88 - .85) * 1.12, cos(t * .9) * .65);
    p.y += w * cos(twist);
    p.z += w * sin(twist);
    float influence = sin(uv.x * 3.14159);
    p.x += uPull.x * influence * .85;
    p.y += uPull.y * influence * .8 + .06 * sin(t + uTime * .35);
    p.z += .1 * sin(t * 2.0 + uTime * .28) * influence;
    p.y += uOpen * (sin(t * .7) * .5);
    p.x *= 1.0 + uOpen * .13;
    vec4 world = modelMatrix * vec4(p, 1.0);
    vPosition = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;
const fragment = /* glsl */ `
  uniform sampler2D uArtwork;
  uniform float uOpen;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vec3 n = normalize(cross(dFdx(vPosition), dFdy(vPosition)));
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - abs(dot(n, viewDir)), 2.0);
    // Sample only the lower, text-free dinner artwork. Original asset is unmodified.
    vec2 refracted = vec2(.43 + vUv.x * .52, .30 + vUv.y * .23);
    refracted += n.xy * .055 + vec2(sin(vUv.y * 8.0 + uTime * .12) * .012, 0.0);
    vec3 art = texture2D(uArtwork, refracted).rgb;
    vec3 ivory = vec3(.97, .83, .61);
    vec3 honey = vec3(.65, .29, .065);
    vec3 lightDir = normalize(vec3(-.5, .8, 1.0));
    float sheen = pow(abs(dot(n, normalize(lightDir + viewDir))), 24.0);
    float edgeDistance = min(vUv.y, 1.0 - vUv.y);
    float edge = 1.0 - smoothstep(.0, .018, edgeDistance);
    float veins = pow(.5 + .5 * sin(vUv.y * 30.0 + vUv.x * 12.0), 10.0) * .06;
    vec3 colour = mix(ivory, art, .82 + .12 * fresnel);
    colour = mix(colour, honey, .28 + fresnel * .38);
    colour += vec3(1.0, .86, .65) * (sheen * .28 + veins);
    colour = mix(colour, vec3(.65, .32, .08), edge * .9);
    float tip = smoothstep(.0, .065, vUv.x) * smoothstep(.0, .065, 1.0 - vUv.x);
    float alpha = (.87 + fresnel * .12 + edge * .1) * tip * (1.0 - uOpen * .58);
    gl_FragColor = vec4(colour, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function Ribbon({ pull, open, reduced, resetKey, onReady }: SceneProps) {
  const viewport = useThree(state => state.viewport);
  const texture = useLoader(THREE.TextureLoader, '/references/approved-flyer.png');
  const mesh = useRef<THREE.Mesh>(null);
  const clock = useRef(0);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 }, uOpen: { value: 0 },
    uPull: { value: new THREE.Vector2() }, uArtwork: { value: texture },
  }), [texture]);
  useEffect(() => { texture.colorSpace = THREE.SRGBColorSpace; }, [texture]);
  useEffect(() => { onReady(); }, [onReady]);
  useEffect(() => { clock.current = 0; uniforms.uTime.value = 0; }, [resetKey, uniforms]);
  useFrame((_, delta) => {
    const step = Math.min(delta, .05);
    if (!reduced) clock.current += step;
    uniforms.uTime.value = clock.current;
    const blend = reduced ? 1 : 1 - Math.exp(-step * 6);
    uniforms.uOpen.value = THREE.MathUtils.lerp(uniforms.uOpen.value, open ? 1 : 0, blend);
    uniforms.uPull.value.lerp(new THREE.Vector2(pull.x, pull.y), blend);
    if (mesh.current) mesh.current.rotation.z = -.22 + uniforms.uPull.value.x * .045;
  });
  return (
    <mesh ref={mesh} scale={Math.min(1, viewport.width / 8.0)} rotation={[.15, -.12, -.22]}>
      <planeGeometry args={[1, 1, 160, 32]} />
      <shaderMaterial vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} transparent side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

export default function MembraneScene(props: SceneProps) {
  const removeListener = useRef<(() => void) | null>(null);
  useEffect(() => () => { removeListener.current?.(); }, []);
  return (
    <Canvas
      aria-hidden="true"
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 7.6], fov: 43 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      frameloop={props.active ? 'always' : 'never'}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        const canvas = gl.domElement;
        const lost = (event: Event) => { event.preventDefault(); props.onFailure(); };
        canvas.addEventListener('webglcontextlost', lost);
        removeListener.current = () => canvas.removeEventListener('webglcontextlost', lost);
      }}
      fallback={null}
    >
      <Suspense fallback={null}><Ribbon {...props} /></Suspense>
    </Canvas>
  );
}
