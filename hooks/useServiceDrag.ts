"use client";

import { useEffect } from "react";

export function useServiceDrag() {
  useEffect(() => {
    const services = Array.from(
      document.querySelectorAll<HTMLElement>("[data-service]"),
    );
    const cleanups: (() => void)[] = [];

    services.forEach((s) => {
      let startX = 0;
      let dragging = false;
      let raf = 0;
      let x = 0;

      function down(e: MouseEvent) {
        if ((e.target as Element).closest("a, button")) return;
        dragging = true;
        startX = e.clientX;
        s.classList.add("is-dragging");
        document.body.style.userSelect = "none";
      }

      function move(e: MouseEvent) {
        if (!dragging) return;
        x = (e.clientX - startX) * 0.35;
        x = Math.max(-60, Math.min(60, x));
        s.style.transform = `translateX(${x.toFixed(1)}px)`;
      }

      function up() {
        if (!dragging) return;
        dragging = false;
        s.classList.remove("is-dragging");
        document.body.style.userSelect = "";
        let v = 0;
        const stiffness = 180;
        const damping = 18;
        let last = performance.now();

        function step(t: number) {
          const dt = Math.min(0.05, (t - last) / 1000);
          last = t;
          const a = -stiffness * x - damping * v;
          v += a * dt;
          x += v * dt;
          s.style.transform = `translateX(${x.toFixed(2)}px)`;
          if (Math.abs(x) > 0.1 || Math.abs(v) > 0.1) {
            raf = requestAnimationFrame(step);
          } else {
            s.style.transform = "";
          }
        }
        raf = requestAnimationFrame(step);
      }

      s.addEventListener("mousedown", down);
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);

      cleanups.push(() => {
        s.removeEventListener("mousedown", down);
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
        cancelAnimationFrame(raf);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
}
