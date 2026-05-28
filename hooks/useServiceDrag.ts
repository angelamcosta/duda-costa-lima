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

      function down(clientX: number, target: EventTarget | null) {
        if ((target as Element | null)?.closest?.("a, button, input, textarea"))
          return;
        dragging = true;
        startX = clientX;
        s.classList.add("is-dragging");
        document.body.style.userSelect = "none";
      }

      function move(clientX: number) {
        if (!dragging) return;
        x = (clientX - startX) * 0.35;
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

      const onMouseDown = (e: MouseEvent) => down(e.clientX, e.target);
      const onMouseMove = (e: MouseEvent) => move(e.clientX);
      const onTouchStart = (e: TouchEvent) =>
        down(e.touches[0].clientX, e.target);
      const onTouchMove = (e: TouchEvent) => move(e.touches[0].clientX);

      s.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", up);
      s.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: true });
      window.addEventListener("touchend", up);

      cleanups.push(() => {
        s.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", up);
        s.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", up);
        cancelAnimationFrame(raf);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
}
