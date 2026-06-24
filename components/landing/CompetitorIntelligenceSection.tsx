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

const data = SECTIONS.competitors;

const COMPETITORS = [
  { name: "NovaLaunch", funding: "$42M", threat: 82, trend: "rising" },
  { name: "VentureIQ", funding: "$18M", threat: 67, trend: "stable" },
  { name: "PitchForge", funding: "$8M", threat: 45, trend: "declining" },
  { name: "StartupLens", funding: "$31M", threat: 74, trend: "rising" },
];

export function CompetitorIntelligenceSection() {
  return (
    <SectionWrapper id={data.id}>
      <div className="grid items-start gap-16 lg:grid-cols-2">
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
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-pink-400" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal="visual" className="space-y-3" data-parallax="0.12">
          {COMPETITORS.map((comp, i) => (
            <GlassPanel
              key={comp.name}
              data-reveal="item"
              glow={comp.threat > 70 ? "cyan" : "none"}
              intensity="low"
              className="p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] font-mono text-xs text-white/50">
                    {comp.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">{comp.name}</p>
                    <p className="font-mono text-[10px] text-white/30">{comp.funding} raised</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${comp.threat}px` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                    />
                    <span className="font-mono text-xs text-white/50">{comp.threat}</span>
                  </div>
                  <p
                    className={`mt-1 font-mono text-[9px] uppercase ${comp.trend === "rising" ? "text-red-400/70" : comp.trend === "declining" ? "text-emerald-400/70" : "text-white/30"}`}
                  >
                    {comp.trend}
                  </p>
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
