import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Mesh } from "three";

type LiquidSphereProps = {
  percent: number;
};

export default function LiquidSphere({ percent }: LiquidSphereProps) {
  const liquidRef = useRef<Mesh>(null!);
  const particleRef = useRef<THREE.Points>(null!);
  const fill = THREE.MathUtils.clamp(percent / 100, 0, 1);

  useFrame(({ clock }) => {
    if (!liquidRef.current) return;
    const mat = liquidRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = clock.getElapsedTime();
    mat.uniforms.uFill.value = fill;
    mat.uniforms.uWaveAmp.value =
      fill >= 0.999 ? 0 : Math.min(2.6, Math.pow(1 - fill, 0.18) * 2.1);
    if (particleRef.current) {
      const pMat = particleRef.current.material as THREE.ShaderMaterial;
      pMat.uniforms.uTime.value = clock.getElapsedTime();
      pMat.uniforms.uFill.value = fill;
    }
  });

  const liquidMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uFill: { value: fill },
        uRadius: { value: 1.818 },
        uWaveAmp: { value: 1 },
        uColor: { value: new THREE.Color("#4fd0e5") },
        uDeep: { value: new THREE.Color("#0a3557") },
        uHighlight: { value: new THREE.Color("#dff8ff") },
        uWallDir: { value: new THREE.Vector3(1, 0, 0).normalize() },
      },
      vertexShader: `
        varying vec3 vPos;
        varying float vWave;
        varying float vWall;
        uniform float uTime;
        uniform float uRadius;
        uniform float uWaveAmp;
        uniform vec3 uWallDir;

        void main() {
          vPos = position;
          vec3 pos = position;
          float t = uTime;
          vec2 p = pos.xz;
          vec2 d1 = normalize(vec2(1.0, 0.35));
          vec2 d2 = normalize(vec2(-0.6, 1.0));
          vec2 d3 = normalize(vec2(0.4, -1.0));
          vec2 d4 = normalize(vec2(1.0, -0.2));
          float w1 = 1.15;
          float w2 = 0.85;
          float w3 = 1.55;
          float w4 = 2.1;
          float a1 = 0.13;
          float a2 = 0.09;
          float a3 = 0.06;
          float a4 = 0.03;
          float s1 = 0.8;
          float s2 = 0.65;
          float s3 = 0.5;
          float s4 = 0.35;
          float f1 = dot(d1, p) * w1 + t * 0.8;
          float f2 = dot(d2, p) * w2 + t * 0.6;
          float f3 = dot(d3, p) * w3 - t * 0.75;
          float f4 = dot(d4, p) * w4 + t * 1.05;
          vec2 offset = d1 * (a1 * s1 * cos(f1))
                      + d2 * (a2 * s2 * cos(f2))
                      + d3 * (a3 * s3 * cos(f3))
                      + d4 * (a4 * s4 * cos(f4));
          float wave = a1 * sin(f1) + a2 * sin(f2) + a3 * sin(f3) + a4 * sin(f4);
          float pulse = 0.5 + 0.5 * sin(t * 2.094);
          float micro = sin((p.x * 7.2 + p.y * 5.6) + t * 1.5) * 0.018;
          float choppy = sign(wave) * pow(abs(wave), 1.25);
          wave = (choppy + micro) * mix(0.5, 1.0, pulse);
          wave *= 1.6;
          wave *= uWaveAmp;
          pos.xz += offset * uWaveAmp * 0.6;
          float wall = smoothstep(
            0.2,
            1.0,
            dot(normalize(uWallDir), pos) / uRadius * 0.5 + 0.5
          );
          wave *= mix(1.0, 1.6, wall);
          float surface = smoothstep(0.2, 1.0, pos.y / uRadius + 1.0);
          pos.y += wave * surface;
          float lenPos = length(pos);
          pos *= min(1.0, uRadius / lenPos);
          vWave = wave;
          vWall = wall;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vPos;
        varying float vWave;
        varying float vWall;
        uniform float uFill;
        uniform float uRadius;
        uniform vec3 uColor;
        uniform vec3 uDeep;
        uniform vec3 uHighlight;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }

        void main() {
          float yFill = -uRadius + uFill * (uRadius * 2.0);
          float mask = step(vPos.y, yFill);
          float rim = smoothstep(0.0, 0.6, 1.0 - length(vPos.xy) / uRadius);
          float edge = smoothstep(0.35, 1.0, length(vPos.xy) / uRadius);
          float depth = clamp((vPos.y + uRadius) / (uRadius * 2.0), 0.0, 1.0);
          vec3 col = mix(uDeep, uColor, depth);
          float fresnel = pow(1.0 - abs(vPos.z / uRadius), 3.0);
          float sheen = edge * 0.28 + fresnel * 0.22;
          float surface = smoothstep(yFill - 0.12, yFill + 0.03, vPos.y) * mask;
          float crest = smoothstep(0.02, 0.18, abs(vWave)) * surface;
          float foamMask = smoothstep(0.04, 0.2, abs(vWave)) * surface;
          float foamNoise = noise(vPos.xz * 6.2 + vPos.y * 1.6);
          float foam = foamMask * smoothstep(0.45, 0.78, foamNoise);
          foam *= mix(1.0, 3.0, vWall);
          float splash = smoothstep(0.6, 1.0, vWall) * surface;
          float breakline = smoothstep(0.0, 0.2, abs(vWave)) * surface;
          col += uHighlight * surface * 0.4;
          col += uHighlight * crest * 0.45;
          col = mix(col, uHighlight, foam * 0.6);
          col += uHighlight * splash * 0.25;
          col += uHighlight * breakline * 0.2;
          col += sheen;
          float alpha = mask * (0.6 + rim * 0.35);
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });
  }, [fill]);

  const particleData = useMemo(() => {
    const count = 600;
    const radius = 1.71;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const rand = (i: number, offset: number) => {
      const x = Math.sin(i * 12.9898 + offset * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };
    for (let i = 0; i < count; i += 1) {
      const r = Math.cbrt(rand(i, 1)) * radius;
      const theta = rand(i, 2) * Math.PI * 2;
      const phi = Math.acos(2 * rand(i, 3) - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      seeds[i] = rand(i, 4);
    }
    return { positions, seeds, count, radius };
  }, []);

  const particleMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uFill: { value: fill },
        uRadius: { value: 1.818 },
        uSilver: { value: new THREE.Color("#e4f4ff") },
        uGold: { value: new THREE.Color("#bfe9ff") },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uFill;
        uniform float uRadius;
        attribute float aSeed;
        varying float vAlpha;
        varying float vMix;
        varying float vTwinkle;

        void main() {
          vec3 pos = position;
          float drift = sin(uTime * 0.6 + aSeed * 6.28318) * 0.05;
          pos.x += drift;
          pos.z += cos(uTime * 0.5 + aSeed * 6.28318) * 0.05;
          vec2 p = pos.xz;
          vec2 d1 = normalize(vec2(1.0, 0.35));
          vec2 d2 = normalize(vec2(-0.6, 1.0));
          vec2 d3 = normalize(vec2(0.4, -1.0));
          vec2 d4 = normalize(vec2(1.0, -0.2));
          float w1 = 1.15;
          float w2 = 0.85;
          float w3 = 1.55;
          float w4 = 2.1;
          float a1 = 0.13;
          float a2 = 0.09;
          float a3 = 0.06;
          float a4 = 0.03;
          float s1 = 0.8;
          float s2 = 0.65;
          float s3 = 0.5;
          float s4 = 0.35;
          float f1 = dot(d1, p) * w1 + uTime * 0.8;
          float f2 = dot(d2, p) * w2 + uTime * 0.6;
          float f3 = dot(d3, p) * w3 - uTime * 0.75;
          float f4 = dot(d4, p) * w4 + uTime * 1.05;
          vec2 offset = d1 * (a1 * s1 * cos(f1))
                      + d2 * (a2 * s2 * cos(f2))
                      + d3 * (a3 * s3 * cos(f3))
                      + d4 * (a4 * s4 * cos(f4));
          float wave = a1 * sin(f1) + a2 * sin(f2) + a3 * sin(f3) + a4 * sin(f4);
          float pulse = 0.5 + 0.5 * sin(uTime * 2.094);
          float micro = sin((p.x * 7.2 + p.y * 5.6) + uTime * 1.5) * 0.018;
          float choppy = sign(wave) * pow(abs(wave), 1.25);
          wave = (choppy + micro) * mix(0.5, 1.0, pulse);
          wave *= 1.6;
          pos.xz += offset * 0.6;
          pos.y += wave * 0.55;
          float yFill = -uRadius + uFill * (uRadius * 2.0);
          vAlpha = smoothstep(yFill + 0.15, yFill - 0.08, pos.y);
          vMix = aSeed;
          vTwinkle = 0.7 + 0.3 * sin(uTime * 2.6 + aSeed * 10.0);
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = mix(1.7, 3.2, aSeed) * vTwinkle;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        varying float vMix;
        varying float vTwinkle;
        uniform vec3 uSilver;
        uniform vec3 uGold;

        void main() {
          float d = length(gl_PointCoord - 0.5);
          float soft = smoothstep(0.5, 0.1, d);
          vec3 col = mix(uSilver, uGold, vMix);
          gl_FragColor = vec4(col, soft * vAlpha * (vTwinkle * 1.25));
        }
      `,
    });
  }, [fill]);

  const rimMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: new THREE.Color("#ffffff") },
        uLightDir: { value: new THREE.Vector3(0.4, 0.2, 1).normalize() },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vView;

        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vView = normalize(-mvPosition.xyz);
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vView;
        uniform vec3 uColor;
        uniform vec3 uLightDir;

        void main() {
          float fresnel = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.6);
          vec3 lightDir = normalize(uLightDir);
          vec3 reflectDir = reflect(-lightDir, vNormal);
          float spec = pow(max(dot(reflectDir, vView), 0.0), 64.0);
          float alpha = clamp(fresnel * 0.35 + spec * 0.8, 0.0, 1.0);
          vec3 col = uColor * (fresnel * 0.7 + spec);
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });
  }, []);

  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.98, 196, 196]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.0}
          metalness={0.0}
          transmission={1}
          thickness={0.5}
          ior={1.48}
          attenuationColor="#ffffff"
          attenuationDistance={8.0}
          clearcoat={1}
          clearcoatRoughness={0.0}
          envMapIntensity={2.2}
          transparent
          opacity={0.03}
          depthWrite={false}
        />
      </mesh>
      <mesh material={rimMaterial}>
        <sphereGeometry args={[2.052, 128, 128]} />
      </mesh>
      <mesh ref={liquidRef} material={liquidMaterial} renderOrder={1}>
        <sphereGeometry args={[1.818, 196, 196]} />
      </mesh>
      <points ref={particleRef} material={particleMaterial} renderOrder={2}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particleData.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-aSeed"
            args={[particleData.seeds, 1]}
          />
        </bufferGeometry>
      </points>
    </group>
  );
}
