"use client";

import { useEffect } from "react";

const MAGNET_RADIUS_PX = 120;
const MAGNET_STRENGTH = 0.35;
const REPEL_RADIUS_PX = 70;
const REPEL_STRENGTH = 0.55;

export function useMouseEffects() {
  useEffect(() => {
    function onMove(e: MouseEvent) {
      const magnets = Array.from(
        document.querySelectorAll<HTMLElement>("[data-magnet]"),
      );
      let bestMag: {
        el: HTMLElement;
        cx: number;
        cy: number;
        d: number;
      } | null = null;
      let bestDist = Infinity;

      magnets.forEach((m) => {
        const r = m.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const d = Math.hypot(e.clientX - cx, e.clientY - cy);
        if (d < MAGNET_RADIUS_PX && d < bestDist) {
          bestDist = d;
          bestMag = { el: m, cx, cy, d };
        }
        m.style.setProperty("--magnet-x", "0");
        m.style.setProperty("--magnet-y", "0");
      });

      if (bestMag) {
        const mag = bestMag as {
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

      const repelables = Array.from(
        document.querySelectorAll<HTMLElement>(".repel"),
      );
      repelables.forEach((ch) => {
        const r = ch.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = cx - e.clientX;
        const dy = cy - e.clientY;
        const d = Math.hypot(dx, dy);
        if (d < REPEL_RADIUS_PX) {
          const t = 1 - d / REPEL_RADIUS_PX;
          const force = t * REPEL_RADIUS_PX * REPEL_STRENGTH;
          const nx = (dx / (d || 1)) * force;
          const ny = (dy / (d || 1)) * force;
          ch.style.setProperty("--rx", nx.toFixed(1) + "px");
          ch.style.setProperty("--ry", ny.toFixed(1) + "px");
        } else {
          ch.style.setProperty("--rx", "0px");
          ch.style.setProperty("--ry", "0px");
        }
      });

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
