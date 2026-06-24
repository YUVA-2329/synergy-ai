"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getNodePositions, getStableConnections } from "@/lib/globe-utils";

interface ConnectionLinesProps {
  radius?: number;
  animated?: boolean;
}

export function ConnectionLines({ radius = 2.02, animated = true }: ConnectionLinesProps) {
  const linesRef = useRef<THREE.LineSegments>(null);
  const nodes = useMemo(() => getNodePositions(radius), [radius]);
  const pairs = useMemo(() => getStableConnections(nodes.length), [nodes.length]);

  const { geometry, material } = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const cyan = new THREE.Color("#00f0ff");
    const blue = new THREE.Color("#0066ff");

    pairs.forEach(([a, b]) => {
      const start = nodes[a].position;
      const end = nodes[b].position;
      const mid = [
        (start[0] + end[0]) / 2,
        (start[1] + end[1]) / 2 + 0.4,
        (start[2] + end[2]) / 2,
      ];

      for (let t = 0; t <= 1; t += 0.05) {
        const t2 = t * t;
        const mt = 1 - t;
        const x = mt * mt * start[0] + 2 * mt * t * mid[0] + t2 * end[0];
        const y = mt * mt * start[1] + 2 * mt * t * mid[1] + t2 * end[1];
        const z = mt * mt * start[2] + 2 * mt * t * mid[2] + t2 * end[2];
        positions.push(x, y, z);
        const color = cyan.clone().lerp(blue, t);
        colors.push(color.r, color.g, color.b);
      }
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const mat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geo, material: mat };
  }, [nodes, pairs]);

  useFrame(({ clock }) => {
    if (linesRef.current && animated) {
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.25 + Math.sin(clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return <lineSegments ref={linesRef} geometry={geometry} material={material} />;
}
