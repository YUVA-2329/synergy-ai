"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getNodePositions } from "@/lib/globe-utils";

interface DataNodesProps {
  radius?: number;
}

export function DataNodes({ radius = 2.05 }: DataNodesProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = useMemo(() => getNodePositions(radius), [radius]);

  const pulseRefs = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    pulseRefs.current.forEach((mesh, i) => {
      if (mesh) {
        const scale = 1 + Math.sin(clock.elapsedTime * 2 + i * 0.7) * 0.3;
        mesh.scale.setScalar(scale);
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.4 + Math.sin(clock.elapsedTime * 2 + i) * 0.2;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <group key={node.label} position={node.position}>
          <mesh>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.9} />
          </mesh>
          <mesh
            ref={(el) => {
              if (el) pulseRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial
              color="#00f0ff"
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
