"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { StarField } from "./StarField";
import { GlobeMesh } from "./GlobeMesh";
import { DataNodes } from "./DataNodes";
import { ConnectionLines } from "./ConnectionLines";
import { ParticleField } from "./ParticleField";

interface CameraControllerProps {
  introMode?: boolean;
  autoRotate?: boolean;
}

function CameraController({ introMode = false, autoRotate = true }: CameraControllerProps) {
  const { camera } = useThree();
  const targetZ = useRef(introMode ? 8 : 6);
  const currentZ = useRef(introMode ? 12 : 6);

  useFrame(({ clock }, delta) => {
    currentZ.current += (targetZ.current - currentZ.current) * delta * 1.5;
    camera.position.z = currentZ.current;
    camera.position.y = Math.sin(clock.elapsedTime * 0.2) * 0.3;

    if (autoRotate) {
      camera.position.x = Math.sin(clock.elapsedTime * 0.15) * 0.5;
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

interface GlobeSceneProps {
  className?: string;
  introMode?: boolean;
  showParticles?: boolean;
  particleMode?: "logo" | "globe" | "scatter";
  particleAssembling?: boolean;
  heroMode?: boolean;
}

function GlobeContent({
  introMode,
  showParticles,
  particleMode,
  particleAssembling,
  heroMode,
}: Omit<GlobeSceneProps, "className">) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00f0ff" />
      <pointLight position={[-10, -5, -10]} intensity={0.3} color="#0066ff" />

      <StarField />
      <CameraController introMode={introMode} autoRotate={!heroMode} />

      {showParticles && (
        <ParticleField
          count={1500}
          radius={5}
          assembling={particleAssembling}
          assembleTarget={particleMode}
        />
      )}

      <GlobeMesh wireframeOpacity={heroMode ? 0.2 : 0.15} />
      <DataNodes />
      <ConnectionLines animated />
    </>
  );
}

export function GlobeScene({
  className,
  introMode = false,
  showParticles = false,
  particleMode = "scatter",
  particleAssembling = false,
  heroMode = false,
}: GlobeSceneProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, introMode ? 12 : 6], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <GlobeContent
            introMode={introMode}
            showParticles={showParticles}
            particleMode={particleMode}
            particleAssembling={particleAssembling}
            heroMode={heroMode}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export function GlobeSceneBackground({ heroMode = true }: { heroMode?: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <GlobeScene
        className="h-full w-full"
        heroMode={heroMode}
        introMode={false}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_70%)]" />
    </div>
  );
}
