"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export function SectionWrapper({
  id,
  children,
  className,
  dark = true,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      data-section-reveal
      className={cn(
        "relative min-h-screen w-full overflow-hidden px-6 py-32 md:px-12 lg:px-20",
        dark ? "bg-transparent" : "bg-black",
        className
      )}
    >
      <div className="relative z-10 mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <motion.p
      data-reveal="eyebrow"
      className="mb-4 font-mono text-xs tracking-[0.3em] text-cyan-400/70 uppercase"
    >
      {children}
    </motion.p>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2
      data-reveal="title"
      className="max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {children}
    </h2>
  );
}

export function SectionDescription({ children }: { children: ReactNode }) {
  return (
    <p
      data-reveal="description"
      className="mt-6 max-w-2xl text-lg leading-relaxed text-white/50"
    >
      {children}
    </p>
  );
}
