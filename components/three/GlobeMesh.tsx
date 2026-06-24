"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GlobeMeshProps {
  wireframeOpacity?: number;
}

export function GlobeMesh({ wireframeOpacity = 0.15 }: GlobeMeshProps) {
  const globeRef = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  const wireframeMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#00f0ff",
        wireframe: true,
        transparent: true,
        opacity: wireframeOpacity,
      }),
    [wireframeOpacity]
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.08;
    }
  });

  return (
    <group ref={globeRef}>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial
          color="#001a33"
          transparent
          opacity={0.85}
        />
      </mesh>

      <mesh ref={wireRef}>
        <sphereGeometry args={[2.001, 32, 32]} />
        <primitive object={wireframeMaterial} attach="material" />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.05, 32, 32]} />
        <meshBasicMaterial
          color="#0066ff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Latitude lines */}
      {[-0.6, 0, 0.6].map((yOffset, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, yOffset * 2, 0]}>
          <torusGeometry args={[Math.sqrt(1 - yOffset * yOffset) * 2, 0.003, 8, 64]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.12} />
        </mesh>
      ))}
    </group>
  );
}
