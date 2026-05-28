"use client";

import { useEffect, useRef } from "react";

interface SwatchSpec {
  x: string;
  y: string;
  w: number;
  h: number;
  pdepth: number;
  klass: string;
  r: number;
  dur: number;
  delay: number;
  op?: number;
  drift?: [number, number, number, number, number, number];
}

const SWATCHES: SwatchSpec[] = [
  {
    x: "6%",
    y: "16%",
    w: 148,
    h: 96,
    pdepth: 1.4,
    klass: "solid-deep",
    r: -3,
    dur: 24,
    delay: 0,
    op: 0.32,
    drift: [16, -10, -8, 18, 12, 6],
  },
  {
    x: "78%",
    y: "12%",
    w: 128,
    h: 84,
    pdepth: 0.7,
    klass: "outline solid-warm",
    r: 4,
    dur: 28,
    delay: -3,
    drift: [-14, 12, 10, -8, -18, 4],
  },
  {
    x: "22%",
    y: "38%",
    w: 62,
    h: 62,
    pdepth: 1.8,
    klass: "solid-warm",
    r: 8,
    dur: 20,
    delay: -7,
    op: 0.42,
    drift: [22, 8, -10, -14, 6, 20],
  },
  {
    x: "88%",
    y: "44%",
    w: 78,
    h: 110,
    pdepth: 1.1,
    klass: "solid-soft",
    r: -6,
    dur: 32,
    delay: -2,
    op: 0.28,
    drift: [-12, -20, 14, 10, -6, 18],
  },
  {
    x: "12%",
    y: "68%",
    w: 116,
    h: 76,
    pdepth: 0.9,
    klass: "outline solid-jet",
    r: 2,
    dur: 26,
    delay: -10,
    drift: [10, 14, -16, -6, 8, -18],
  },
  {
    x: "64%",
    y: "72%",
    w: 92,
    h: 64,
    pdepth: 1.6,
    klass: "solid-deep",
    r: -2,
    dur: 22,
    delay: -5,
    op: 0.3,
    drift: [-8, 16, 18, -10, -12, 8],
  },
  {
    x: "42%",
    y: "86%",
    w: 60,
    h: 60,
    pdepth: 2.0,
    klass: "solid-warm tiny-dot",
    r: 0,
    dur: 18,
    delay: -4,
    op: 0.55,
    drift: [12, -8, -6, 12, 14, 4],
  },
  {
    x: "52%",
    y: "22%",
    w: 44,
    h: 44,
    pdepth: 2.2,
    klass: "solid-soft tiny-dot",
    r: 0,
    dur: 16,
    delay: -9,
    op: 0.55,
    drift: [-10, 14, 8, -8, -14, 6],
  },
  {
    x: "30%",
    y: "8%",
    w: 96,
    h: 56,
    pdepth: 0.6,
    klass: "outline solid-soft",
    r: 5,
    dur: 30,
    delay: -1,
    drift: [14, 10, -8, -12, 12, 6],
  },
  {
    x: "70%",
    y: "56%",
    w: 50,
    h: 50,
    pdepth: 1.9,
    klass: "solid-jet tiny-dot",
    r: 0,
    dur: 14,
    delay: -6,
    op: 0.42,
  },
  {
    x: "4%",
    y: "50%",
    w: 38,
    h: 38,
    pdepth: 1.5,
    klass: "solid-deep tiny-dot",
    r: 0,
    dur: 19,
    delay: -8,
    op: 0.55,
  },
  {
    x: "56%",
    y: "4%",
    w: 60,
    h: 88,
    pdepth: 0.8,
    klass: "outline solid-jet",
    r: -4,
    dur: 26,
    delay: -11,
    drift: [8, -12, -14, 6, 4, 18],
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
      {SWATCHES.map((s, i) => {
        const wrapStyle = {
          "--x": s.x,
          "--y": s.y,
          "--w": `${s.w}px`,
          "--h": `${s.h}px`,
          "--pdepth": s.pdepth,
        } as React.CSSProperties;
        const swatchStyle: React.CSSProperties = {
          "--r": `${s.r}deg`,
          "--dur": `${s.dur}s`,
          "--delay": `${s.delay}s`,
          ...(s.op !== undefined ? { "--op": s.op } : {}),
          ...(s.drift
            ? {
                "--dx1": `${s.drift[0]}px`,
                "--dy1": `${s.drift[1]}px`,
                "--dx2": `${s.drift[2]}px`,
                "--dy2": `${s.drift[3]}px`,
                "--dx3": `${s.drift[4]}px`,
                "--dy3": `${s.drift[5]}px`,
              }
            : {}),
        } as React.CSSProperties;
        return (
          <div className="swatch-wrap" style={wrapStyle} key={i}>
            <div className={`swatch ${s.klass}`} style={swatchStyle} />
          </div>
        );
      })}
    </div>
  );
}
