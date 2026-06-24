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

const data = SECTIONS.risk;

const RISK_VECTORS = [
  { name: "Market Timing", score: 0.18, level: "low" },
  { name: "Team Composition", score: 0.31, level: "medium" },
  { name: "Financial Runway", score: 0.42, level: "medium" },
  { name: "Competitive Moat", score: 0.15, level: "low" },
  { name: "Regulatory", score: 0.55, level: "high" },
  { name: "Technical Debt", score: 0.22, level: "low" },
];

const levelColor = {
  low: "from-emerald-500 to-cyan-500",
  medium: "from-yellow-500 to-orange-500",
  high: "from-red-500 to-pink-500",
};

export function RiskEngineSection() {
  return (
    <SectionWrapper id={data.id}>
      <div className="mb-16 text-center">
        <SectionEyebrow>{data.eyebrow}</SectionEyebrow>
        <SectionTitle>{data.title}</SectionTitle>
        <SectionDescription>{data.description}</SectionDescription>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <GlassPanel data-reveal="visual" glow="purple" className="p-8" data-parallax="0.1">
          <p className="mb-6 font-mono text-[10px] tracking-wider text-white/30 uppercase">
            Risk Vector Analysis
          </p>
          <div className="space-y-5">
            {RISK_VECTORS.map((vector, i) => (
              <div key={vector.name} data-reveal="item">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-xs text-white/60">{vector.name}</span>
                  <span className="font-mono text-xs text-white/30">
                    {(vector.score * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.04]">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${levelColor[vector.level as keyof typeof levelColor]}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${vector.score * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.08 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <div className="space-y-4">
          {data.features.map((feature, i) => (
            <GlassPanel
              key={feature}
              data-reveal="item"
              glow="none"
              intensity="low"
              className="p-5"
            >
              <div className="flex items-start gap-4">
                <span className="font-mono text-xs text-purple-400/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-white/60">{feature}</p>
              </div>
            </GlassPanel>
          ))}

          <GlassPanel glow="purple" intensity="medium" className="mt-6 p-6" data-reveal="item">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[9px] tracking-wider text-white/30 uppercase">
                  Composite Risk Score
                </p>
                <p
                  className="mt-1 text-3xl font-bold text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  0.23
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[9px] tracking-wider text-emerald-400/60 uppercase">
                  Below Threshold
                </p>
                <p className="mt-1 font-mono text-xs text-white/40">Safe to proceed</p>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </SectionWrapper>
  );
}
