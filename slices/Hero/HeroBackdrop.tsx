"use client";

import { useEffect, useRef } from "react";
import type { TagSpec } from "@/slices/Hero/types";

const TAGS: TagSpec[] = [
  {
    x: "7%",
    y: "7%",
    w: 70,
    rot: -7,
    delay: 0.05,
    pdepth: 1.1,
    klass: "solid-warm",
    op: 0.84,
  },
  {
    x: "17%",
    y: "30%",
    w: 60,
    rot: 5,
    delay: 0.32,
    pdepth: 0.8,
    klass: "outline solid-soft",
  },
  {
    x: "24%",
    y: "9%",
    w: 78,
    rot: 3,
    delay: 0.18,
    pdepth: 1.25,
    klass: "solid-jet",
    op: 0.62,
  },
  {
    x: "33%",
    y: "40%",
    w: 56,
    rot: -4,
    delay: 0.5,
    pdepth: 0.7,
    klass: "solid-deep",
    op: 0.8,
  },
  {
    x: "42%",
    y: "14%",
    w: 66,
    rot: 6,
    delay: 0.24,
    pdepth: 1.0,
    klass: "outline solid-warm",
  },
  {
    x: "53%",
    y: "5%",
    w: 74,
    rot: -3,
    delay: 0.1,
    pdepth: 1.2,
    klass: "solid-soft",
    op: 0.8,
  },
  {
    x: "61%",
    y: "38%",
    w: 58,
    rot: 4,
    delay: 0.46,
    pdepth: 0.75,
    klass: "solid-warm",
    op: 0.82,
  },
  {
    x: "69%",
    y: "12%",
    w: 70,
    rot: -6,
    delay: 0.28,
    pdepth: 1.05,
    klass: "outline solid-deep",
  },
  {
    x: "78%",
    y: "33%",
    w: 62,
    rot: 5,
    delay: 0.4,
    pdepth: 0.85,
    klass: "solid-jet",
    op: 0.6,
  },
  {
    x: "86%",
    y: "8%",
    w: 76,
    rot: 2,
    delay: 0.15,
    pdepth: 1.15,
    klass: "solid-deep",
    op: 0.82,
  },
  {
    x: "94%",
    y: "31%",
    w: 58,
    rot: -5,
    delay: 0.54,
    pdepth: 0.8,
    klass: "outline solid-soft",
  },
  {
    x: "49%",
    y: "47%",
    w: 50,
    rot: 7,
    delay: 0.6,
    pdepth: 0.65,
    klass: "solid-warm",
    op: 0.7,
  },
];

export function HeroBackdrop() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (typeof window === "undefined") return;

    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reduced) return;

    let rect = wrap.getBoundingClientRect();
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    let raf: number | null = null;

    const measure = () => {
      rect = wrap.getBoundingClientRect();
    };
    const onResize = () => measure();
    window.addEventListener("resize", onResize, { passive: true });

    function animate() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      wrap!.style.setProperty("--parallax-x", cx.toFixed(2) + "px");
      wrap!.style.setProperty("--parallax-y", cy.toFixed(2) + "px");
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        raf = requestAnimationFrame(animate);
      } else {
        raf = null;
      }
    }

    function onMove(e: MouseEvent) {
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const inside =
        mx >= 0 && mx <= rect.width && my >= 0 && my <= rect.height;
      wrap!.style.setProperty("--mx", mx + "px");
      wrap!.style.setProperty("--my", my + "px");
      wrap!.style.setProperty("--spot-on", inside ? "1" : "0");
      const nx = (mx / rect.width - 0.5) * 2;
      const ny = (my / rect.height - 0.5) * 2;
      tx = nx * 18;
      ty = ny * 18;
      if (raf === null) raf = requestAnimationFrame(animate);
    }

    function onLeave() {
      wrap!.style.setProperty("--spot-on", "0");
      tx = 0;
      ty = 0;
      if (raf === null) raf = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hero-backdrop" ref={wrapRef} aria-hidden="true">
      <div className="hero-spotlight" />
      {TAGS.map((s, i) => {
        const wrapStyle = {
          "--x": s.x,
          "--y": s.y,
          "--w": `${s.w}px`,
          "--rot": `${s.rot}deg`,
          "--delay": `${s.delay}s`,
          "--pdepth": s.pdepth,
        } as React.CSSProperties;
        const tagStyle =
          s.op !== undefined
            ? ({ "--op": s.op } as React.CSSProperties)
            : undefined;
        return (
          <div className="tag-wrap" style={wrapStyle} key={i}>
            <span className="tag-string" />
            <span className={`tag ${s.klass}`} style={tagStyle} />
          </div>
        );
      })}
    </div>
  );
}

export default HeroBackdrop;
