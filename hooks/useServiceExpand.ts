"use client";

import { useEffect } from "react";

export function useServiceExpand() {
  useEffect(() => {
    const rows = Array.from(
      document.querySelectorAll<HTMLElement>("[data-expandable]"),
    );
    if (!rows.length) return;

    const cleanups: (() => void)[] = [];

    rows.forEach((row) => {
      let downX = 0;
      let downY = 0;
      let moved = false;

      const onDown = (e: PointerEvent) => {
        downX = e.clientX;
        downY = e.clientY;
        moved = false;
      };
      const onMove = (e: PointerEvent) => {
        if (Math.hypot(e.clientX - downX, e.clientY - downY) > 8) moved = true;
      };
      const onClick = (e: MouseEvent) => {
        if (moved) return;
        const target = e.target as HTMLElement;
        if (target.closest("a, input, textarea, button.submit")) return;
        row.classList.toggle("is-open");
        const chev = row.querySelector(".service-chev");
        if (chev) {
          chev.setAttribute(
            "aria-expanded",
            row.classList.contains("is-open") ? "true" : "false",
          );
        }
      };

      row.addEventListener("pointerdown", onDown);
      row.addEventListener("pointermove", onMove);
      row.addEventListener("click", onClick);
      cleanups.push(() => {
        row.removeEventListener("pointerdown", onDown);
        row.removeEventListener("pointermove", onMove);
        row.removeEventListener("click", onClick);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
}
