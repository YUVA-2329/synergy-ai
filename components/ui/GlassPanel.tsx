"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  glow?: "cyan" | "blue" | "purple" | "none";
  intensity?: "low" | "medium" | "high";
  children?: ReactNode;
}

const glowMap = {
  cyan: "shadow-[0_0_40px_rgba(0,240,255,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]",
  blue: "shadow-[0_0_40px_rgba(0,102,255,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]",
  purple: "shadow-[0_0_40px_rgba(139,92,246,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]",
  none: "shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
};

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  function GlassPanel(
    { className, glow = "cyan", intensity = "medium", children, ...props },
    ref
  ) {
    const opacity =
      intensity === "low"
        ? "bg-white/[0.02]"
        : intensity === "high"
          ? "bg-white/[0.06]"
          : "bg-white/[0.04]";

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl border border-white/[0.08] backdrop-blur-xl",
          opacity,
          glowMap[glow],
          className
        )}
        {...props}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />
        {children}
      </div>
    );
  }
);
