"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/constants";
import {
  SectionWrapper,
  SectionEyebrow,
  SectionTitle,
} from "@/components/ui/SectionWrapper";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { motion, AnimatePresence } from "framer-motion";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionWrapper id="faq">
      <div className="mb-16 text-center">
        <SectionEyebrow>08 — FAQ</SectionEyebrow>
        <SectionTitle>Questions answered</SectionTitle>
      </div>

      <div className="mx-auto max-w-3xl space-y-3">
        {FAQ_ITEMS.map((item, i) => (
          <GlassPanel
            key={item.question}
            data-reveal="item"
            glow="none"
            intensity="low"
            className="overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between p-6 text-left"
            >
              <span className="pr-4 text-sm font-medium text-white/80">
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: openIndex === i ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 font-mono text-lg text-cyan-400/60"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed text-white/45">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassPanel>
        ))}
      </div>
    </SectionWrapper>
  );
}
