"use client";

import { useEffect } from "react";

export function useHeaderScroll() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".topbar");
    if (!header) return;

    let lastY = window.scrollY;
    let ticking = false;
    const THRESHOLD = 8;

    function onScroll() {
      const y = window.scrollY;
      const dy = y - lastY;
      header!.classList.toggle("is-scrolled", y > 16);
      if (y < 60) {
        header!.classList.remove("is-hidden");
      } else if (Math.abs(dy) > THRESHOLD) {
        header!.classList.toggle("is-hidden", dy > 0);
      }
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
    const raf = requestAnimationFrame(() => header.classList.add("ready"));

    return () => {
      window.removeEventListener("scroll", handler);
      cancelAnimationFrame(raf);
    };
  }, []);
}
