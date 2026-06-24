import { gsap } from "./gsap-config";

export type IntroPhase =
  | "screen1"
  | "screen2"
  | "screen3"
  | "screen4"
  | "complete";

export interface IntroCallbacks {
  onPhaseChange: (phase: IntroPhase) => void;
  onComplete: () => void;
}

export function createIntroMasterTimeline(
  container: HTMLElement,
  callbacks: IntroCallbacks
) {
  const tl = gsap.timeline({
    onComplete: () => {
      callbacks.onPhaseChange("complete");
      callbacks.onComplete();
    },
  });

  const screen1 = container.querySelector("[data-intro='screen1']");
  const screen2 = container.querySelector("[data-intro='screen2']");
  const screen3 = container.querySelector("[data-intro='screen3']");
  const screen4 = container.querySelector("[data-intro='screen4']");
  const dot = container.querySelector("[data-intro='dot']");
  const progressLine = container.querySelector("[data-intro='progress']");
  const progressFill = container.querySelector("[data-intro='progress-fill']");
  const textInit = container.querySelector("[data-intro='text-init']");
  const textLoad = container.querySelector("[data-intro='text-load']");
  const logoParticles = container.querySelector("[data-intro='logo-particles']");
  const logoText = container.querySelector("[data-intro='logo-text']");
  const logoGlow = container.querySelector("[data-intro='logo-glow']");
  const hudPanels = container.querySelectorAll("[data-intro='hud-panel']");
  const hudMetric = container.querySelector("[data-intro='hud-metric']");
  const globeWrapper = container.querySelector("[data-intro='globe-wrapper']");
  const globeMetrics = container.querySelectorAll("[data-intro='globe-metric']");

  gsap.set([screen2, screen3, screen4], { autoAlpha: 0 });
  gsap.set([textInit, textLoad, logoText, logoGlow], { autoAlpha: 0 });
  gsap.set(progressLine, { autoAlpha: 0, scaleX: 0 });
  gsap.set(progressFill, { scaleX: 0, transformOrigin: "left center" });
  gsap.set(dot, { scale: 0, autoAlpha: 0 });
  gsap.set(hudPanels, { autoAlpha: 0, x: -40 });
  gsap.set(globeMetrics, { autoAlpha: 0, y: 20 });

  // SCREEN 1 — Black void, dot expansion
  tl.add(() => callbacks.onPhaseChange("screen1"))
    .to(dot, { autoAlpha: 1, scale: 1, duration: 0.8, ease: "power2.out" })
    .to(dot, { scale: 3, duration: 2.5, ease: "power1.inOut" }, "-=0.2")
    .to(textInit, { autoAlpha: 1, duration: 0.6, ease: "power2.out" }, "-=1.5")
    .to(textLoad, { autoAlpha: 1, duration: 0.6, ease: "power2.out" }, "-=0.8")
    .to(progressLine, { autoAlpha: 1, scaleX: 1, duration: 0.4, ease: "power2.out" }, "-=0.4")
    .to(progressFill, { scaleX: 1, duration: 2.2, ease: "power1.inOut" }, "-=0.2")
    .to([textInit, textLoad, progressLine, dot], {
      autoAlpha: 0,
      duration: 0.6,
      ease: "power2.in",
    });

  // SCREEN 2 — Logo particle assembly
  tl.add(() => callbacks.onPhaseChange("screen2"))
    .set(screen2, { autoAlpha: 1 })
    .fromTo(
      logoParticles,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.3 },
      "-=0.2"
    )
    .to(logoGlow, { autoAlpha: 1, duration: 1.2, ease: "power2.out" }, "-=0.1")
    .to(logoText, { autoAlpha: 1, duration: 1, ease: "power3.out" }, "-=0.8")
    .to([logoText, logoGlow], {
      autoAlpha: 0,
      duration: 0.8,
      ease: "power2.in",
      delay: 1.2,
    })
    .to(screen2, { autoAlpha: 0, duration: 0.5 }, "-=0.3");

  // SCREEN 3 — HUD boot sequence
  tl.add(() => callbacks.onPhaseChange("screen3"))
    .set(screen3, { autoAlpha: 1 })
    .to(hudPanels, {
      autoAlpha: 1,
      x: 0,
      duration: 0.5,
      stagger: 0.12,
      ease: "power3.out",
    })
    .to(
      hudMetric,
      {
        autoAlpha: 1,
        duration: 0.3,
        repeat: 7,
        yoyo: true,
        ease: "none",
      },
      "-=0.2"
    )
    .to(screen3, { autoAlpha: 0, duration: 0.8, ease: "power2.in", delay: 0.5 });

  // SCREEN 4 — Globe cinematic reveal
  tl.add(() => callbacks.onPhaseChange("screen4"))
    .set(screen4, { autoAlpha: 1 })
    .fromTo(
      globeWrapper,
      { scale: 0.3, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 2.5, ease: "power2.inOut" },
      "-=0.3"
    )
    .to(
      globeMetrics,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=1.2"
    )
    .to(screen4, {
      autoAlpha: 0,
      duration: 1.2,
      ease: "power2.inOut",
      delay: 1.5,
    });

  return tl;
}

export function createHeroEntranceTimeline(container: HTMLElement) {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  const headline = container.querySelector("[data-hero='headline']");
  const subheadline = container.querySelector("[data-hero='subheadline']");
  const ctas = container.querySelectorAll("[data-hero='cta']");
  const nav = container.querySelector("[data-hero='nav']");
  const hud = container.querySelectorAll("[data-hero='hud-stat']");

  gsap.set([headline, subheadline, nav], { autoAlpha: 0, y: 40 });
  gsap.set(ctas, { autoAlpha: 0, y: 20 });
  gsap.set(hud, { autoAlpha: 0, x: 30 });

  tl.to(nav, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
    .to(headline, { autoAlpha: 1, y: 0, duration: 1 }, 0.2)
    .to(subheadline, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.5)
    .to(ctas, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 }, 0.7)
    .to(hud, { autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.08 }, 0.9);

  return tl;
}
