"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 2000;

interface ParticleFieldProps {
  count?: number;
  radius?: number;
  color?: string;
  assembling?: boolean;
  assembleTarget?: "logo" | "globe" | "scatter";
}

export function ParticleField({
  count = PARTICLE_COUNT,
  radius = 4,
  color = "#00f0ff",
  assembling = false,
  assembleTarget = "scatter",
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const progressRef = useRef(0);

  const { positions, targetPositions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const targets = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.5 + Math.random() * 0.5);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      if (assembleTarget === "globe") {
        const gTheta = Math.random() * Math.PI * 2;
        const gPhi = Math.acos(2 * Math.random() - 1);
        const gR = 2.1;
        targets[i * 3] = gR * Math.sin(gPhi) * Math.cos(gTheta);
        targets[i * 3 + 1] = gR * Math.cos(gPhi);
        targets[i * 3 + 2] = gR * Math.sin(gPhi) * Math.sin(gTheta);
      } else if (assembleTarget === "logo") {
        const angle = (i / count) * Math.PI * 2;
        const ringR = 1.2 + (i % 3) * 0.3;
        targets[i * 3] = Math.cos(angle) * ringR;
        targets[i * 3 + 1] = Math.sin(angle) * ringR * 0.4;
        targets[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      } else {
        targets[i * 3] = pos[i * 3];
        targets[i * 3 + 1] = pos[i * 3 + 1];
        targets[i * 3 + 2] = pos[i * 3 + 2];
      }
    }

    return { positions: pos, targetPositions: targets, velocities: vel };
  }, [count, radius, assembleTarget]);

  const positionsRef = useRef(positions);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const posArr = positionsRef.current;
    const geo = pointsRef.current.geometry;
    const attr = geo.getAttribute("position") as THREE.BufferAttribute;

    if (assembling) {
      progressRef.current = Math.min(progressRef.current + delta * 0.4, 1);
      const t = progressRef.current;
      const ease = t * t * (3 - 2 * t);

      for (let i = 0; i < count; i++) {
        posArr[i * 3] += (targetPositions[i * 3] - posArr[i * 3]) * ease * 0.08;
        posArr[i * 3 + 1] +=
          (targetPositions[i * 3 + 1] - posArr[i * 3 + 1]) * ease * 0.08;
        posArr[i * 3 + 2] +=
          (targetPositions[i * 3 + 2] - posArr[i * 3 + 2]) * ease * 0.08;
      }
    } else {
      for (let i = 0; i < count; i++) {
        posArr[i * 3] += velocities[i * 3];
        posArr[i * 3 + 1] += velocities[i * 3 + 1];
        posArr[i * 3 + 2] += velocities[i * 3 + 2];

        const dist = Math.sqrt(
          posArr[i * 3] ** 2 +
            posArr[i * 3 + 1] ** 2 +
            posArr[i * 3 + 2] ** 2
        );
        if (dist > radius * 1.2 || dist < radius * 0.3) {
          velocities[i * 3] *= -1;
          velocities[i * 3 + 1] *= -1;
          velocities[i * 3 + 2] *= -1;
        }
      }
    }

    attr.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positionsRef.current, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={color}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
