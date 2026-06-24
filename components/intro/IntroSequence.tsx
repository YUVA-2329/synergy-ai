"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { gsap } from "@/lib/animations/gsap-config";
import {
  createIntroMasterTimeline,
  type IntroPhase,
} from "@/lib/animations/intro-sequence";
import { INTRO_SCREENS, BRAND, HUD_METRICS } from "@/lib/constants";
import dynamic from "next/dynamic";

const GlobeScene = dynamic(
  () => import("@/components/three/GlobeScene").then((m) => m.GlobeScene),
  { ssr: false }
);

const LogoParticleCanvas = dynamic(
  () => import("./LogoParticleCanvas").then((m) => m.LogoParticleCanvas),
  { ssr: false }
);

interface IntroSequenceProps {
  onComplete: () => void;
  skip?: boolean;
  onBootSound?: () => void;
}

export function IntroSequence({ onComplete, skip = false, onBootSound }: IntroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [phase, setPhase] = useState<IntroPhase>("screen1");
  const [metricIndex, setMetricIndex] = useState(0);
  const phaseState = useRef<IntroPhase>("screen1");

  useEffect(() => {
    if (skip) {
      onComplete();
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const tl = createIntroMasterTimeline(container, {
      onPhaseChange: (p) => {
        phaseState.current = p;
        setPhase(p);
      },
      onComplete,
    });

    timelineRef.current = tl;

    tl.eventCallback("onStart", () => {
      onBootSound?.();
    });

    return () => {
      tl.kill();
    };
  }, [onComplete, skip, onBootSound]);

  // HUD metric cycling during screen3
  useEffect(() => {
    if (phase !== "screen3") return;
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % INTRO_SCREENS.screen3.metrics.length;
      setMetricIndex(i);
    }, 400);
    return () => clearInterval(interval);
  }, [phase]);

  const handleSkip = useCallback(() => {
    timelineRef.current?.progress(1);
    onComplete();
  }, [onComplete]);

  if (skip) return null;

  return (
    <div
      ref={containerRef}
      data-intro-container
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
    >
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-[110] font-mono text-[10px] tracking-[0.2em] text-white/20 uppercase transition-colors hover:text-white/50"
      >
        Skip Intro
      </button>

      {/* SCREEN 1 */}
      <div
        data-intro="screen1"
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <div
          data-intro="dot"
          className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_20px_#00f0ff,0_0_60px_#00f0ff]"
        />
        <p
          data-intro="text-init"
          className="mt-16 font-mono text-xs tracking-[0.5em] text-cyan-400/80"
        >
          {INTRO_SCREENS.screen1.initializing}
        </p>
        <p
          data-intro="text-load"
          className="mt-3 max-w-md text-center font-mono text-[10px] tracking-[0.25em] text-white/30"
        >
          {INTRO_SCREENS.screen1.loading}
        </p>
        <div
          data-intro="progress"
          className="mt-8 h-px w-64 overflow-hidden bg-white/10"
        >
          <div
            data-intro="progress-fill"
            className="h-full w-full bg-gradient-to-r from-cyan-500 to-blue-600"
          />
        </div>
      </div>

      {/* SCREEN 2 */}
      <div
        data-intro="screen2"
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <div data-intro="logo-particles" className="relative h-64 w-64">
          <LogoParticleCanvas />
        </div>
        <div
          data-intro="logo-glow"
          className="pointer-events-none absolute h-48 w-96 bg-cyan-500/10 blur-[100px]"
        />
        <h1
          data-intro="logo-text"
          className="relative mt-8 text-5xl font-bold tracking-[0.3em] text-white md:text-7xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {BRAND.name}
        </h1>
      </div>

      {/* SCREEN 3 — HUD Boot */}
      <div
        data-intro="screen3"
        className="absolute inset-0 flex items-center justify-center p-8"
      >
        <div className="relative w-full max-w-4xl">
          {/* HUD corners */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-0 h-8 w-8 border-t border-l border-cyan-400/40" />
            <div className="absolute top-0 right-0 h-8 w-8 border-t border-r border-cyan-400/40" />
            <div className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-cyan-400/40" />
            <div className="absolute right-0 bottom-0 h-8 w-8 border-r border-b border-cyan-400/40" />
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {HUD_METRICS.map((m, i) => (
              <div
                key={m.label}
                data-intro="hud-panel"
                className="border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm"
              >
                <p className="font-mono text-[9px] tracking-wider text-white/30 uppercase">
                  {m.label}
                </p>
                <p className="mt-2 font-mono text-2xl text-cyan-400">{m.value}</p>
                <p className="mt-1 font-mono text-[10px] text-emerald-400/70">
                  {m.delta}
                </p>
              </div>
            ))}
          </div>

          <div
            data-intro="hud-metric"
            className="mt-8 text-center font-mono text-sm tracking-[0.4em] text-cyan-400 md:text-base"
          >
            {INTRO_SCREENS.screen3.metrics[metricIndex]}
          </div>

          {/* Scan lines */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
            <div className="h-px w-full animate-[scan_2s_linear_infinite] bg-cyan-400/50" />
          </div>
        </div>
      </div>

      {/* SCREEN 4 — Globe Reveal */}
      <div
        data-intro="screen4"
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          data-intro="globe-wrapper"
          className="relative h-full w-full max-h-[80vh] max-w-[80vw]"
        >
          <GlobeScene
            className="h-full w-full"
            introMode
            showParticles
            particleMode="globe"
            particleAssembling
          />
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-16">
          <div className="flex gap-8 md:gap-16">
            {[
              { label: "Markets Tracked", value: "200+" },
              { label: "Data Points", value: "48M" },
              { label: "Startups Analyzed", value: "12K+" },
            ].map((m) => (
              <div
                key={m.label}
                data-intro="globe-metric"
                className="text-center"
              >
                <p
                  className="text-2xl font-bold text-white md:text-3xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {m.value}
                </p>
                <p className="mt-1 font-mono text-[9px] tracking-wider text-white/30 uppercase">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
