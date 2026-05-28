"use client";

import { useEffect } from "react";

const MAGNET_RADIUS_PX = 120;
const MAGNET_STRENGTH = 0.35;

export function useMouseEffects() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reduced) return;

    function onMove(e: MouseEvent) {
      const magnets = Array.from(
        document.querySelectorAll<HTMLElement>("[data-magnet]"),
      );
      let best: { el: HTMLElement; cx: number; cy: number; d: number } | null =
        null;
      let bestDist = Infinity;

      magnets.forEach((m) => {
        const r = m.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const d = Math.hypot(e.clientX - cx, e.clientY - cy);
        m.style.setProperty("--magnet-x", "0");
        m.style.setProperty("--magnet-y", "0");
        if (d < MAGNET_RADIUS_PX && d < bestDist) {
          bestDist = d;
          best = { el: m, cx, cy, d };
        }
      });

      if (best) {
        const mag = best as {
          el: HTMLElement;
          cx: number;
          cy: number;
          d: number;
        };
        const t = 1 - mag.d / MAGNET_RADIUS_PX;
        const dx = (e.clientX - mag.cx) * MAGNET_STRENGTH * t;
        const dy = (e.clientY - mag.cy) * MAGNET_STRENGTH * t;
        mag.el.style.setProperty("--magnet-x", dx.toFixed(2));
        mag.el.style.setProperty("--magnet-y", dy.toFixed(2));
      }

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const service = el?.closest?.("[data-service]");
      const servicesContainer =
        document.querySelector<HTMLElement>(".services");
      if (servicesContainer) {
        if (service) {
          servicesContainer.setAttribute("data-hovered", "true");
          document.querySelectorAll("[data-service]").forEach((s) => {
            s.classList.toggle("is-hovered", s === service);
          });
        } else {
          servicesContainer.setAttribute("data-hovered", "false");
          document
            .querySelectorAll("[data-service]")
            .forEach((s) => s.classList.remove("is-hovered"));
        }
      }
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
}
