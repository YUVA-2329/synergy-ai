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

const data = SECTIONS.finance;

const PROJECTIONS = [
  { year: "Y1", revenue: 120, costs: 480 },
  { year: "Y2", revenue: 890, costs: 720 },
  { year: "Y3", revenue: 2400, costs: 1100 },
  { year: "Y4", revenue: 5800, costs: 1800 },
  { year: "Y5", revenue: 12400, costs: 2900 },
];

const maxVal = 12400;

export function FinancialForecastingSection() {
  return (
    <SectionWrapper id={data.id}>
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <GlassPanel
          data-reveal="visual"
          glow="cyan"
          className="p-8"
          data-parallax="0.18"
        >
          <p className="mb-6 font-mono text-[10px] tracking-wider text-white/30 uppercase">
            5-Year Revenue Projection
          </p>
          <div className="flex h-64 items-end gap-3">
            {PROJECTIONS.map((p, i) => (
              <div key={p.year} className="flex flex-1 flex-col items-center gap-2">
                <div className="relative flex w-full flex-col items-center gap-1">
                  <motion.div
                    className="w-full rounded-t-sm bg-gradient-to-t from-blue-600/60 to-cyan-400/40"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(p.revenue / maxVal) * 200}px` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.12, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute bottom-0 w-full rounded-t-sm bg-red-500/20"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(p.costs / maxVal) * 200}px` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.12 + 0.2, ease: "easeOut" }}
                  />
                </div>
                <span className="font-mono text-[10px] text-white/30">{p.year}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-6 border-t border-white/[0.06] pt-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-sm bg-cyan-400/60" />
              <span className="font-mono text-[9px] text-white/30">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-sm bg-red-400/30" />
              <span className="font-mono text-[9px] text-white/30">Costs</span>
            </div>
          </div>
        </GlassPanel>

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
      </div>
    </SectionWrapper>
  );
}
