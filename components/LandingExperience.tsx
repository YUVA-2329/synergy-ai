"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/animations/gsap-config";
import { initScrollEngine, destroyScrollEngine } from "@/lib/animations/scroll-engine";
import { useIntroComplete } from "@/hooks/useIntroComplete";
import { useAudioEngine } from "@/hooks/useAudioEngine";
import { HeroSection } from "@/components/landing/HeroSection";
import { StartupAnalyzerSection } from "@/components/landing/StartupAnalyzerSection";
import { MarketIntelligenceSection } from "@/components/landing/MarketIntelligenceSection";
import { RiskEngineSection } from "@/components/landing/RiskEngineSection";
import { CompetitorIntelligenceSection } from "@/components/landing/CompetitorIntelligenceSection";
import { FinancialForecastingSection } from "@/components/landing/FinancialForecastingSection";
import { InvestorReadinessSection } from "@/components/landing/InvestorReadinessSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";

const IntroSequence = dynamic(
  () => import("@/components/intro/IntroSequence").then((m) => m.IntroSequence),
  { ssr: false }
);

const GlobeSceneBackground = dynamic(
  () =>
    import("@/components/three/GlobeScene").then((m) => m.GlobeSceneBackground),
  { ssr: false }
);

export function LandingExperience() {
  const { introComplete, skipIntro, completeIntro } = useIntroComplete();
  const { prime, playBootTone, playRevealSweep } = useAudioEngine();
  const [showContent, setShowContent] = useState(skipIntro);
  const [transitioning, setTransitioning] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setTransitioning(true);
    playRevealSweep();

    const tl = gsap.timeline({
      onComplete: () => {
        setShowContent(true);
        setTransitioning(false);
        completeIntro();
      },
    });

    tl.fromTo(
      "[data-landing='main']",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1.5, ease: "power2.inOut" },
      0
    );

    const introEl = document.querySelector("[data-intro-container]");
    if (introEl) {
      tl.to(introEl, { autoAlpha: 0, duration: 1.2, ease: "power2.inOut" }, 0);
    }
  }, [completeIntro, playRevealSweep]);

  useEffect(() => {
    if (skipIntro) {
      setShowContent(true);
    }
  }, [skipIntro]);

  useEffect(() => {
    if (!showContent) return;

    const timer = setTimeout(() => {
      initScrollEngine();
    }, 100);

    return () => {
      clearTimeout(timer);
      destroyScrollEngine();
    };
  }, [showContent]);

  return (
    <div
      className="relative min-h-screen bg-black text-white"
      onMouseDown={prime}
      onTouchStart={prime}
    >
      {!introComplete && !skipIntro && (
        <IntroSequence
          onComplete={handleIntroComplete}
          skip={skipIntro}
          onBootSound={playBootTone}
        />
      )}

      <div
        data-landing="main"
        className="relative"
        style={{
          opacity: skipIntro ? 1 : showContent || transitioning ? undefined : 0,
          visibility: skipIntro || showContent || transitioning ? "visible" : "hidden",
        }}
      >
        {(showContent || skipIntro) && <GlobeSceneBackground heroMode />}

        <div className="relative z-10">
          <HeroSection animateIn={!skipIntro && showContent} />
          <StartupAnalyzerSection />
          <MarketIntelligenceSection />
          <RiskEngineSection />
          <CompetitorIntelligenceSection />
          <FinancialForecastingSection />
          <InvestorReadinessSection />
          <PricingSection />
          <FAQSection />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </div>
  );
}
