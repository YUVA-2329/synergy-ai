import { gsap, ScrollTrigger, registerGsapPlugins } from "./gsap-config";

export function initScrollEngine() {
  registerGsapPlugins();

  const sections = document.querySelectorAll("[data-section-reveal]");

  sections.forEach((section) => {
    const eyebrow = section.querySelector("[data-reveal='eyebrow']");
    const title = section.querySelector("[data-reveal='title']");
    const description = section.querySelector("[data-reveal='description']");
    const visual = section.querySelector("[data-reveal='visual']");
    const items = section.querySelectorAll("[data-reveal='item']");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        end: "top 25%",
        toggleActions: "play none none reverse",
      },
    });

    if (eyebrow) {
      tl.fromTo(
        eyebrow,
        { autoAlpha: 0, x: -30 },
        { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" }
      );
    }

    if (title) {
      tl.fromTo(
        title,
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      );
    }

    if (description) {
      tl.fromTo(
        description,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }

    if (visual) {
      tl.fromTo(
        visual,
        { autoAlpha: 0, scale: 0.92, rotateY: 8 },
        { autoAlpha: 1, scale: 1, rotateY: 0, duration: 1, ease: "power2.out" },
        "-=0.5"
      );
    }

    if (items.length) {
      tl.fromTo(
        items,
        { autoAlpha: 0, y: 25 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }
  });

  // Parallax depth layers
  document.querySelectorAll("[data-parallax]").forEach((el) => {
    const speed = parseFloat(el.getAttribute("data-parallax") || "0.3");
    gsap.to(el, {
      y: () => speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el.parentElement || el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  // Horizontal keynote-style pin sections
  document.querySelectorAll("[data-pin-section]").forEach((section) => {
    const inner = section.querySelector("[data-pin-inner]");
    if (!inner) return;

    const panels = inner.querySelectorAll("[data-pin-panel]");
    if (panels.length <= 1) return;

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => `+=${(panels.length - 1) * window.innerWidth * 0.8}`,
      },
    });
  });
}

export function destroyScrollEngine() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
}
