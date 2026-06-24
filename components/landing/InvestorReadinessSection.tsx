"use client";

import { SECTIONS } from "@/lib/constants";
import {
  SectionWrapper,
  SectionEyebrow,
  SectionTitle,
  SectionDescription,
} from "@/components/ui/SectionWrapper";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { NeonButton } from "@/components/ui/NeonButton";
import { motion } from "framer-motion";

const data = SECTIONS.investors;

const INVESTOR_MATCHES = [
  { firm: "Sequoia Capital", match: 94, stage: "Series A", thesis: "Enterprise AI" },
  { firm: "a16z", match: 89, stage: "Seed", thesis: "Platform" },
  { firm: "Benchmark", match: 82, stage: "Series A", thesis: "B2B SaaS" },
  { firm: "Founders Fund", match: 76, stage: "Seed", thesis: "Deep Tech" },
];

export function InvestorReadinessSection() {
  return (
    <SectionWrapper id={data.id}>
      <div className="mb-16 text-center">
        <SectionEyebrow>{data.eyebrow}</SectionEyebrow>
        <SectionTitle>{data.title}</SectionTitle>
        <div className="mx-auto max-w-2xl">
          <SectionDescription>{data.description}</SectionDescription>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          {data.features.map((feature, i) => (
            <div
              key={feature}
              data-reveal="item"
              className="flex items-start gap-3 border-l border-cyan-400/20 py-2 pl-4 text-sm text-white/60"
            >
              <span className="font-mono text-[10px] text-cyan-400/50">
                0{i + 1}
              </span>
              {feature}
            </div>
          ))}
        </div>

        <GlassPanel
          data-reveal="visual"
          glow="cyan"
          className="p-8 lg:col-span-2"
          data-parallax="0.1"
        >
          <div className="mb-6 flex items-center justify-between">
            <p className="font-mono text-[10px] tracking-wider text-white/30 uppercase">
              Investor Match Engine
            </p>
            <NeonButton variant="secondary" size="sm">
              Export List
            </NeonButton>
          </div>

          <div className="space-y-3">
            {INVESTOR_MATCHES.map((inv, i) => (
              <motion.div
                key={inv.firm}
                data-reveal="item"
                className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                whileHover={{ borderColor: "rgba(0,240,255,0.15)" }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 font-mono text-xs text-cyan-400">
                    {inv.match}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">{inv.firm}</p>
                    <p className="font-mono text-[10px] text-white/30">
                      {inv.stage} · {inv.thesis}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="h-1 w-24 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${inv.match}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </SectionWrapper>
  );
}
