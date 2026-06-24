"use client";

import { useRef, useCallback } from "react";

/**
 * Audio engine ready for cinematic intro SFX.
 * Browsers require user gesture before playback — call `prime()` on first interaction.
 */
export function useAudioEngine() {
  const ctxRef = useRef<AudioContext | null>(null);
  const primedRef = useRef(false);

  const getContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const prime = useCallback(() => {
    const ctx = getContext();
    if (!ctx || primedRef.current) return;
    primedRef.current = true;
    if (ctx.state === "suspended") {
      void ctx.resume();
    }
  }, [getContext]);

  const playBootTone = useCallback(() => {
    const ctx = getContext();
    if (!ctx || !primedRef.current) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  }, [getContext]);

  const playRevealSweep = useCallback(() => {
    const ctx = getContext();
    if (!ctx || !primedRef.current) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(120, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 1.2);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.2);
  }, [getContext]);

  return { prime, playBootTone, playRevealSweep };
}
