"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

interface NeonButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  "data-hero"?: string;
}

export const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  function NeonButton(
    {
      className,
      variant = "primary",
      size = "md",
      children,
      type = "button",
      onClick,
      disabled,
      "data-hero": dataHero,
    },
    ref
  ) {
    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    const variants = {
      primary:
        "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-cyan-400/40 text-cyan-50 hover:from-cyan-500/30 hover:to-blue-600/30 hover:border-cyan-400/60 shadow-[0_0_30px_rgba(0,240,255,0.15)] hover:shadow-[0_0_40px_rgba(0,240,255,0.25)]",
      secondary:
        "bg-white/[0.03] border-white/10 text-white/80 hover:bg-white/[0.06] hover:border-white/20",
      ghost:
        "bg-transparent border-transparent text-white/60 hover:text-white/90 hover:bg-white/[0.04]",
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        data-hero={dataHero}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-full border font-medium tracking-wide transition-colors duration-300",
          sizes[size],
          variants[variant],
          className
        )}
      >
        {variant === "primary" && (
          <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-500/10 blur-sm" />
        )}
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);
