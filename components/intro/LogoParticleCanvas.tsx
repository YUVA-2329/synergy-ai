"use client";

import { useRef, useEffect } from "react";

const PARTICLE_COUNT = 800;

function generateLogoPoints() {
  const points: [number, number][] = [];
  const cx = 0.5;
  const cy = 0.5;

  // Outer ring
  for (let i = 0; i < 120; i++) {
    const angle = (i / 120) * Math.PI * 2;
    points.push([
      cx + Math.cos(angle) * 0.38,
      cy + Math.sin(angle) * 0.38,
    ]);
  }

  // Inner hexagon
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
    points.push([
      cx + Math.cos(angle) * 0.22,
      cy + Math.sin(angle) * 0.22,
    ]);
  }

  // Cross lines (S shape abstract)
  for (let i = 0; i < 40; i++) {
    const t = i / 40;
    points.push([cx - 0.15 + t * 0.3, cy - 0.1 + Math.sin(t * Math.PI) * 0.15]);
  }

  // Energy trails
  for (let i = 0; i < 60; i++) {
    const angle = (i / 60) * Math.PI * 2;
    const r = 0.28 + (i % 3) * 0.04;
    points.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r * 0.6]);
  }

  return points;
}

const TARGETS = generateLogoPoints();

export function LogoParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const progressRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 256;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const target = TARGETS[i % TARGETS.length];
      return {
        x: 0.5 + (Math.random() - 0.5) * 1.5,
        y: 0.5 + (Math.random() - 0.5) * 1.5,
        tx: target[0],
        ty: target[1],
        speed: 0.02 + Math.random() * 0.04,
        size: 1 + Math.random() * 2,
        alpha: 0.3 + Math.random() * 0.7,
      };
    });

    const lines: { from: number; to: number; progress: number }[] = [];
    for (let i = 0; i < 30; i++) {
      lines.push({
        from: Math.floor(Math.random() * PARTICLE_COUNT),
        to: Math.floor(Math.random() * PARTICLE_COUNT),
        progress: Math.random(),
      });
    }

    function draw(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);
      progressRef.current = Math.min(progressRef.current + 0.008, 1);

      // Glow center
      const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size * 0.4
      );
      gradient.addColorStop(0, "rgba(0, 240, 255, 0.08)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      // Connection lines
      lines.forEach((line) => {
        const p1 = particles[line.from % particles.length];
        const p2 = particles[line.to % particles.length];
        const ease = progressRef.current;
        if (ease < 0.3) return;

        ctx.beginPath();
        ctx.moveTo(p1.x * size, p1.y * size);
        ctx.lineTo(p2.x * size, p2.y * size);
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 * ease})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Particles assembling
      particles.forEach((p) => {
        const ease =
          progressRef.current * progressRef.current * (3 - 2 * progressRef.current);
        p.x += (p.tx - p.x) * p.speed * (0.5 + ease);
        p.y += (p.ty - p.y) * p.speed * (0.5 + ease);

        const dist = Math.sqrt((p.x - p.tx) ** 2 + (p.y - p.ty) ** 2);
        const brightness = Math.max(0.3, 1 - dist * 3) * p.alpha * ease;

        ctx.beginPath();
        ctx.arc(p.x * size, p.y * size, p.size * ease, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${brightness})`;
        ctx.fill();

        // Trail
        if (ease > 0.2 && dist > 0.02) {
          ctx.beginPath();
          ctx.moveTo(p.x * size, p.y * size);
          ctx.lineTo(
            (p.x + (p.tx - p.x) * 0.3) * size,
            (p.y + (p.ty - p.y) * 0.3) * size
          );
          ctx.strokeStyle = `rgba(0, 102, 255, ${brightness * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      // Rotating energy ring
      const ringAngle = time * 0.001;
      ctx.beginPath();
      ctx.arc(
        size / 2,
        size / 2,
        size * 0.35 * progressRef.current,
        ringAngle,
        ringAngle + Math.PI * 1.2
      );
      ctx.strokeStyle = `rgba(0, 240, 255, ${0.4 * progressRef.current})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
