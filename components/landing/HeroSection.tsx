"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { BRAND, NAV_LINKS, HUD_METRICS } from "@/lib/constants";
import { NeonButton } from "@/components/ui/NeonButton";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { createHeroEntranceTimeline } from "@/lib/animations/intro-sequence";

interface HeroSectionProps {
  animateIn?: boolean;
}

export function HeroSection({ animateIn = true }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!animateIn || !sectionRef.current) return;
    const tl = createHeroEntranceTimeline(sectionRef.current);
    return () => {
      tl.kill();
    };
  }, [animateIn]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-16"
    >
      {/* Navigation */}
      <nav
        data-hero="nav"
        className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-5 md:px-12"
      >
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff]" />
          <span
            className="text-sm font-bold tracking-[0.2em] text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {BRAND.name}
          </span>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.slice(0, 5).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[10px] tracking-wider text-white/40 uppercase transition-colors hover:text-cyan-400"
            >
              {link.label}
            </a>
          ))}
        </div>
        <NeonButton variant="primary" size="sm" onClick={() => window.open("https://www.youtube.com", "_self")}}>
          Start Analysis
        </NeonButton>
      </nav>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={animateIn ? undefined : { opacity: 1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
          <span className="font-mono text-[10px] tracking-wider text-cyan-400/80 uppercase">
            Intelligence Engine Online
          </span>
        </motion.div>

        <h1
          data-hero="headline"
          className="text-5xl leading-[1.1] font-bold tracking-tight text-white md:text-7xl lg:text-8xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          BUILD SMARTER.
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            LAUNCH STRONGER.
          </span>
        </h1>

        <p
          data-hero="subheadline"
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/45 md:text-xl"
        >
          {BRAND.description}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <NeonButton data-hero="cta" variant="primary" size="lg" onClick={() => window.open("https://www.youtube.com", "_self")}>
            Start Analysis
          </NeonButton>
          <NeonButton data-hero="cta" variant="secondary" size="lg" onClick={() => window.open("https://www.youtube.com", "_self")}>
            Explore Platforms
          </NeonButton>
        </div>
      </div>

      {/* Floating HUD panels */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {HUD_METRICS.map((metric, i) => {
          const positions = [
            "top-1/4 left-8",
            "top-1/3 right-8",
            "bottom-1/3 left-12",
            "bottom-1/4 right-12",
          ];
          return (
            <GlassPanel
              key={metric.label}
              data-hero="hud-stat"
              glow="cyan"
              intensity="low"
              className={`absolute ${positions[i]} w-44 p-4`}
            >
              <p className="font-mono text-[9px] tracking-wider text-white/30 uppercase">
                {metric.label}
              </p>
              <p className="mt-1 font-mono text-xl text-cyan-400">{metric.value}</p>
              <p className="font-mono text-[10px] text-emerald-400/60">{metric.delta}</p>
            </GlassPanel>
          );
        })}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] tracking-[0.3em] text-white/20 uppercase">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-cyan-400/50 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
