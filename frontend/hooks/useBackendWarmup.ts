import { useEffect } from "react";

const BACKEND_WARMUP_KEY = "backend-warmup-complete";
const BACKEND_WARMUP_DELAY_MS = 4000;

type BrowserWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function useBackendWarmup() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const browserWindow = window as BrowserWindow;

    try {
      if (window.sessionStorage.getItem(BACKEND_WARMUP_KEY) === "true") {
        return;
      }
    } catch {
      // Ignore session storage access issues and proceed with a best-effort warm-up.
    }

    let isWarmed = false;
    let timeoutId: number | null = null;
    let idleCallbackId: number | null = null;

    const markWarm = () => {
      if (isWarmed) {
        return;
      }

      isWarmed = true;

      try {
        window.sessionStorage.setItem(BACKEND_WARMUP_KEY, "true");
      } catch {
        // Ignore storage write failures.
      }

      void fetch("/api/health", {
        method: "GET",
        cache: "no-store",
        keepalive: true
      }).catch(() => {
        // Ignore warm-up failures. This call is best effort only.
      });
    };

    const onFirstInteraction = () => {
      markWarm();
      cleanupListeners();
    };

    const scheduleIdleWarmup = () => {
      if (browserWindow.requestIdleCallback) {
        idleCallbackId = browserWindow.requestIdleCallback(markWarm, {
          timeout: BACKEND_WARMUP_DELAY_MS
        });
        return;
      }

      timeoutId = window.setTimeout(markWarm, BACKEND_WARMUP_DELAY_MS);
    };

    const cleanupListeners = () => {
      window.removeEventListener("scroll", onFirstInteraction);
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
    };

    window.addEventListener("scroll", onFirstInteraction, { passive: true });
    window.addEventListener("pointerdown", onFirstInteraction, { passive: true });
    window.addEventListener("keydown", onFirstInteraction);
    window.addEventListener("touchstart", onFirstInteraction, { passive: true });

    scheduleIdleWarmup();

    return () => {
      cleanupListeners();

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }

      if (idleCallbackId !== null && browserWindow.cancelIdleCallback) {
        browserWindow.cancelIdleCallback(idleCallbackId);
      }
    };
  }, []);
}
