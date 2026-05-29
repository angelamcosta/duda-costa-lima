"use client";

import { useEffect } from "react";

export function useHeaderScroll() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".topbar");
    if (!header) return;
    const bar = document.querySelector<HTMLElement>(".topbar-progress");

    let lastY = window.scrollY;
    let ticking = false;
    const THRESHOLD = 8;

    function updateProgress() {
      if (!bar) return;
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      bar.style.setProperty("--scroll-progress", p.toFixed(4));
    }

    function onScroll() {
      const y = window.scrollY;
      const dy = y - lastY;
      header!.classList.toggle("is-scrolled", y > 16);
      if (y < 60) {
        header!.classList.remove("is-hidden");
      } else if (Math.abs(dy) > THRESHOLD) {
        header!.classList.toggle("is-hidden", dy > 0);
      }
      updateProgress();
      lastY = y;
      ticking = false;
    }

    function handler() {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }

    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    const raf = requestAnimationFrame(() => {
      header.classList.add("ready");
      updateProgress();
    });

    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", updateProgress);
      cancelAnimationFrame(raf);
    };
  }, []);
}
