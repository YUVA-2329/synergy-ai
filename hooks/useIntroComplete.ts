"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "synergy-intro-seen";

export function useIntroComplete() {
  const [introComplete, setIntroComplete] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(STORAGE_KEY);
      if (seen === "true") {
        setSkipIntro(true);
        setIntroComplete(true);
      }
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  const completeIntro = useCallback(() => {
    setIntroComplete(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
  }, []);

  const forceReplay = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setSkipIntro(false);
    setIntroComplete(false);
  }, []);

  return { introComplete, skipIntro, completeIntro, forceReplay };
}
