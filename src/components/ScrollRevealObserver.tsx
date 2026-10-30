"use client";

import { useEffect } from "react";

export default function ScrollRevealObserver() {
  useEffect(() => {
    const elements = [...document.querySelectorAll<HTMLElement>(".scroll-reveal")];
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionPreference.matches) {
      elements.forEach((element) => {
        element.dataset.scrollRevealed = "true";
        element.style.opacity = "1";
        element.style.transform = "none";
      });
      return;
    }

    elements.forEach((element) => {
      element.dataset.scrollReady = "true";
      element.style.animation = "none";
      element.style.transition = "none";
    });

    let frame = 0;
    const updateScrollMotion = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * 0.92;
      const end = viewportHeight * 0.38;

      elements.forEach((element) => {
        const distance = start - element.getBoundingClientRect().top;
        const progress = Math.max(0, Math.min(1, distance / (start - end)));
        const horizontalOffset = element.classList.contains("scroll-reveal-from-left")
          ? -56
          : element.classList.contains("scroll-reveal-from-right")
            ? 56
            : 0;
        const scale = element.classList.contains("scroll-reveal-scale") ? 0.96 : 1;

        element.style.opacity = String(progress);
        element.style.transform = `translate3d(${horizontalOffset * (1 - progress)}px, ${48 * (1 - progress)}px, 0) scale(${1 - (1 - scale) * (1 - progress)})`;
        element.dataset.scrollRevealed = progress === 1 ? "true" : "false";
      });
    };

    const scheduleScrollMotion = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScrollMotion);
    };

    updateScrollMotion();
    window.addEventListener("scroll", scheduleScrollMotion, { passive: true });
    window.addEventListener("resize", scheduleScrollMotion);

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      if (!event.matches) return;
      window.removeEventListener("scroll", scheduleScrollMotion);
      window.removeEventListener("resize", scheduleScrollMotion);
      if (frame) window.cancelAnimationFrame(frame);
      elements.forEach((element) => {
        element.style.opacity = "1";
        element.style.transform = "none";
        element.dataset.scrollRevealed = "true";
      });
    };
    motionPreference.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      window.removeEventListener("scroll", scheduleScrollMotion);
      window.removeEventListener("resize", scheduleScrollMotion);
      motionPreference.removeEventListener("change", handleMotionPreferenceChange);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
