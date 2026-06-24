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

const data = SECTIONS.market;

const TREND_DATA = [
  { vertical: "AI Infrastructure", velocity: 94, direction: "up" },
  { vertical: "Climate Tech", velocity: 78, direction: "up" },
  { vertical: "HealthTech", velocity: 71, direction: "up" },
  { vertical: "EdTech", velocity: 42, direction: "down" },
  { vertical: "Web3", velocity: 28, direction: "down" },
];

export function MarketIntelligenceSection() {
  return (
    <SectionWrapper id={data.id}>
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <GlassPanel
          data-reveal="visual"
          glow="blue"
          className="order-2 p-8 lg:order-1"
          data-parallax="0.15"
        >
          <p className="mb-6 font-mono text-[10px] tracking-wider text-white/30 uppercase">
            Trend Velocity Index
          </p>
          <div className="space-y-4">
            {TREND_DATA.map((item, i) => (
              <div key={item.vertical} data-reveal="item">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm text-white/70">{item.vertical}</span>
                  <span
                    className={`font-mono text-xs ${item.direction === "up" ? "text-emerald-400" : "text-red-400/70"}`}
                  >
                    {item.velocity}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className={`h-full rounded-full ${item.direction === "up" ? "bg-gradient-to-r from-cyan-500 to-blue-500" : "bg-gradient-to-r from-red-500/50 to-orange-500/50"}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.velocity}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/[0.06] pt-6">
            <div>
              <p className="font-mono text-2xl text-cyan-400">$4.2T</p>
              <p className="font-mono text-[8px] tracking-wider text-white/25 uppercase">
                Total Addressable
              </p>
            </div>
            <div>
              <p className="font-mono text-2xl text-blue-400">847</p>
              <p className="font-mono text-[8px] tracking-wider text-white/25 uppercase">
                Active Signals
              </p>
            </div>
          </div>
        </GlassPanel>

        <div className="order-1 lg:order-2">
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
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
