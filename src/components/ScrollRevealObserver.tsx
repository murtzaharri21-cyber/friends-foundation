"use client";

import { useEffect } from "react";

export default function ScrollRevealObserver() {
  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopViewport = window.matchMedia("(min-width: 641px)");
    const observedElements = new WeakSet<HTMLElement>();
    let revealElements = new Set<HTMLElement>();
    let revealFrame = 0;

    const revealAll = () => {
      revealElements.forEach((element) => {
        element.dataset.scrollRevealed = "true";
      });
      if (revealFrame) window.cancelAnimationFrame(revealFrame);
      revealFrame = window.requestAnimationFrame(() => {
        revealFrame = 0;
        revealElements.forEach((element) => {
          if (element.isConnected) element.dataset.scrollRevealed = "true";
        });
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) return;
          entry.target.dataset.scrollRevealed = "true";
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    const prepareElement = (element: HTMLElement, directionIndex: number) => {
      if (observedElements.has(element)) return;
      observedElements.add(element);
      element.classList.add("scroll-reveal");
      const containsVisual = element.matches("img, picture, figure") || element.querySelector("img, picture, figure") !== null;
      if (directionIndex % 3 === 2 || (containsVisual && directionIndex % 2 === 0)) {
        element.classList.remove("scroll-reveal-from-left", "scroll-reveal-from-right");
        element.classList.add("scroll-reveal-from-bottom");
      } else if (
        !element.classList.contains("scroll-reveal-from-left") &&
        !element.classList.contains("scroll-reveal-from-right") &&
        !element.classList.contains("scroll-reveal-from-bottom")
      ) {
        element.classList.add(directionIndex % 2 === 0 ? "scroll-reveal-from-left" : "scroll-reveal-from-right");
      }
      element.style.setProperty("--scroll-reveal-delay", `${(directionIndex % 3) * 65}ms`);
      revealElements.add(element);
      if (element.dataset.scrollRevealed === "true") return;
      element.dataset.scrollReady = "true";
      if (motionPreference.matches && !desktopViewport.matches) {
        revealAll();
      } else {
        observer.observe(element);
      }
    };

    const scanPage = () => {
      document.querySelectorAll<HTMLElement>("main").forEach((main) => {
        let directionIndex = 0;
        [...main.children].forEach((child) => {
          if (!(child instanceof HTMLElement)) return;
          if (child.tagName === "SCRIPT" || child.tagName === "STYLE") return;

          const explicitReveals = [...child.querySelectorAll<HTMLElement>(".scroll-reveal")];
          if (child.matches(".scroll-reveal")) explicitReveals.unshift(child);
          if (explicitReveals.length > 0) {
            explicitReveals.forEach((element) => prepareElement(element, directionIndex++));
          } else {
            prepareElement(child, directionIndex++);
          }
        });
      });
    };

    const updateRevealBehavior = () => {
      scanPage();
      if (motionPreference.matches && !desktopViewport.matches) {
        observer.disconnect();
        revealAll();
      } else {
        revealElements.forEach((element) => {
          if (element.isConnected && element.dataset.scrollRevealed !== "true") {
            observer.observe(element);
          }
        });
      }
    };

    const mutations = new MutationObserver(() => {
      scanPage();
      if (motionPreference.matches && !desktopViewport.matches) revealAll();
    });

    mutations.observe(document.body, { childList: true, subtree: true });
    updateRevealBehavior();

    motionPreference.addEventListener("change", updateRevealBehavior);
    desktopViewport.addEventListener("change", updateRevealBehavior);

    return () => {
      mutations.disconnect();
      observer.disconnect();
      motionPreference.removeEventListener("change", updateRevealBehavior);
      desktopViewport.removeEventListener("change", updateRevealBehavior);
      if (revealFrame) window.cancelAnimationFrame(revealFrame);
    };
  }, []);

  return null;
}
