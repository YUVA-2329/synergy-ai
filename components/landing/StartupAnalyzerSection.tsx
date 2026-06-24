"use client";

import { SECTIONS } from "@/lib/constants";
import {
  SectionWrapper,
  SectionEyebrow,
  SectionTitle,
  SectionDescription,
} from "@/components/ui/SectionWrapper";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { motion } from "framer-motion";

const data = SECTIONS.analyzer;

export function StartupAnalyzerSection() {
  return (
    <SectionWrapper id={data.id}>
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionEyebrow>{data.eyebrow}</SectionEyebrow>
          <SectionTitle>{data.title}</SectionTitle>
          <SectionDescription>{data.description}</SectionDescription>
          <ul className="mt-8 space-y-3">
            {data.features.map((feature) => (
              <li
                key={feature}
                data-reveal="item"
                className="flex items-start gap-3 text-sm text-white/60"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <GlassPanel
          data-reveal="visual"
          glow="cyan"
          className="relative p-8"
          data-parallax="0.2"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <span className="font-mono text-[10px] tracking-wider text-white/30 uppercase">
                Validation Report
              </span>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 font-mono text-[10px] text-emerald-400">
                LIVE
              </span>
            </div>

            <div className="flex items-center justify-center py-8">
              <div className="relative">
                <svg viewBox="0 0 120 120" className="h-40 w-40">
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="4"
                  />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="339.292"
                    initial={{ strokeDashoffset: 339.292 }}
                    whileInView={{ strokeDashoffset: 339.292 * 0.04 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    transform="rotate(-90 60 60)"
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#00f0ff" />
                      <stop offset="100%" stopColor="#0066ff" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className="text-4xl font-bold text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    96
                  </span>
                  <span className="font-mono text-[9px] tracking-wider text-white/30 uppercase">
                    Score
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {data.stats.map((stat) => (
                <div key={stat.label} data-reveal="item" className="text-center">
                  <p className="font-mono text-lg text-cyan-400">{stat.value}</p>
                  <p className="mt-1 font-mono text-[8px] tracking-wider text-white/25 uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>
      </div>
    </SectionWrapper>
  );
}
