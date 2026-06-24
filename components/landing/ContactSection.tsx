"use client";

import { useState } from "react";
import {
  SectionWrapper,
  SectionEyebrow,
  SectionTitle,
} from "@/components/ui/SectionWrapper";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { NeonButton } from "@/components/ui/NeonButton";
import { motion } from "framer-motion";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <SectionWrapper id="contact">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionEyebrow>09 — CONTACT</SectionEyebrow>
          <SectionTitle>Ready to validate your vision?</SectionTitle>
          <p
            data-reveal="description"
            className="mt-6 max-w-md text-lg text-white/45"
          >
            Join 12,000+ founders who trust Synergy AI to de-risk their startup
            journey. Our team responds within 24 hours.
          </p>

          <div className="mt-8 space-y-4" data-reveal="item">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-cyan-400/40" />
              <span className="font-mono text-xs text-white/40">hello@synergy.ai</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-cyan-400/40" />
              <span className="font-mono text-xs text-white/40">San Francisco · London · Singapore</span>
            </div>
          </div>
        </div>

        <GlassPanel data-reveal="visual" glow="cyan" className="p-8" data-parallax="0.1">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center py-12 text-center"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/10">
                <svg className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-medium text-white/80">Message received</p>
              <p className="mt-2 text-sm text-white/40">
                Our intelligence team will reach out within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block font-mono text-[10px] tracking-wider text-white/30 uppercase">
                  Name
                </label>
                <input
                  required
                  type="text"
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-cyan-400/30"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-2 block font-mono text-[10px] tracking-wider text-white/30 uppercase">
                  Email
                </label>
                <input
                  required
                  type="email"
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-cyan-400/30"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="mb-2 block font-mono text-[10px] tracking-wider text-white/30 uppercase">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-cyan-400/30"
                  placeholder="Tell us about your startup..."
                />
              </div>
              <NeonButton type="submit" variant="primary" size="lg" className="w-full">
                Send Message
              </NeonButton>
            </form>
          )}
        </GlassPanel>
      </div>
    </SectionWrapper>
  );
}
