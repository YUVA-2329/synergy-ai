"use client";

import { PRICING_TIERS } from "@/lib/constants";
import {
  SectionWrapper,
  SectionEyebrow,
  SectionTitle,
} from "@/components/ui/SectionWrapper";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { NeonButton } from "@/components/ui/NeonButton";

export function PricingSection() {
  return (
    <SectionWrapper id="pricing">
      <div className="mb-16 text-center">
        <SectionEyebrow>07 — PRICING</SectionEyebrow>
        <SectionTitle>Invest in certainty</SectionTitle>
        <p
          data-reveal="description"
          className="mx-auto mt-6 max-w-xl text-lg text-white/45"
        >
          From first validation to enterprise portfolio intelligence. Scale as your
          ambition grows.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {PRICING_TIERS.map((tier, i) => (
          <GlassPanel
            key={tier.name}
            data-reveal="item"
            glow={tier.highlighted ? "cyan" : "none"}
            intensity={tier.highlighted ? "high" : "low"}
            className={`relative flex flex-col p-8 ${tier.highlighted ? "md:-mt-4 md:mb-4" : ""}`}
          >
            {tier.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1 font-mono text-[9px] tracking-wider text-white uppercase">
                Most Popular
              </div>
            )}

            <p className="font-mono text-[10px] tracking-wider text-white/30 uppercase">
              {tier.name}
            </p>
            <div className="mt-4 flex items-baseline gap-1">
              <span
                className="text-4xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {tier.price}
              </span>
              {tier.period && (
                <span className="font-mono text-sm text-white/30">{tier.period}</span>
              )}
            </div>
            <p className="mt-2 text-sm text-white/40">{tier.description}</p>

            <ul className="mt-8 flex-1 space-y-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-white/55">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <NeonButton
              variant={tier.highlighted ? "primary" : "secondary"}
              size="md"
              className="mt-8 w-full"
            >
              {tier.cta}
            </NeonButton>
          </GlassPanel>
        ))}
      </div>
    </SectionWrapper>
  );
}
