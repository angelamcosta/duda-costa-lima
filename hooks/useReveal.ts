"use client";

import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const SEL =
      ".reveal, .row-reveal, .word-reveal, .mask-reveal, .field, .about-meta, .footer, .section-label, .service";
    const els = Array.from(document.querySelectorAll<HTMLElement>(SEL));
    const vh = window.innerHeight;

    els.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 1.05) el.classList.add("in");
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    els.forEach((el) => {
      if (!el.classList.contains("in")) io.observe(el);
    });

    const safety = setTimeout(() => {
      els.forEach((el) => el.classList.add("in"));
    }, 2500);

    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, []);
}
