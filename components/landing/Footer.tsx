"use client";

import { BRAND, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff]" />
              <span
                className="text-sm font-bold tracking-[0.2em] text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {BRAND.name}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/35">
              AI-powered startup validation, market intelligence, risk prediction,
              and investor readiness — built for founders who refuse to guess.
            </p>
          </div>

          <div>
            <p className="mb-4 font-mono text-[10px] tracking-wider text-white/25 uppercase">
              Platform
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/40 transition-colors hover:text-cyan-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-[10px] tracking-wider text-white/25 uppercase">
              Legal
            </p>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Security", "SOC 2"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-white/40 transition-colors hover:text-cyan-400"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.04] pt-8 md:flex-row">
          <p className="font-mono text-[10px] text-white/20">
            © {new Date().getFullYear()} Synergy AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400/60" />
            <span className="font-mono text-[10px] text-white/20">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
