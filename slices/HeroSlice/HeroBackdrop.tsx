"use client";

import { useEffect, useRef } from "react";

interface GlyphItem {
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  ch: string;
  rot: number;
  tone: number;
  alpha: number;
}

export function HeroBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d")!;

    function readPalette() {
      const cs = getComputedStyle(document.documentElement);
      const get = (name: string) => (cs.getPropertyValue(name) || "").trim();
      return {
        jet: get("--color-text-rgb") || "0, 48, 73",
        warm: get("--color-warm-rgb") || "214, 40, 40",
        soft: get("--color-warm-soft-rgb") || "247, 127, 0",
        deep: get("--color-deep-rgb") || "252, 191, 73",
      };
    }
    let palette = readPalette();

    const GLYPHS = "aeioustrmlnpscdgvfh".split("");
    const items: GlyphItem[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let W = 0,
      H = 0,
      DPR = 1;

    function rand(min: number, max: number) {
      return min + Math.random() * (max - min);
    }

    function init() {
      const rect = wrap!.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = W * DPR;
      canvas!.height = H * DPR;
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      items.length = 0;
      const cols = Math.max(6, Math.floor(W / 90));
      const rows = Math.max(4, Math.floor(H / 110));
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (W / cols) * (c + 0.5) + rand(-30, 30);
          const y = (H / rows) * (r + 0.5) + rand(-30, 30);
          items.push({
            hx: x,
            hy: y,
            x,
            y,
            vx: 0,
            vy: 0,
            size: rand(34, 110),
            ch: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
            rot: rand(-0.25, 0.25),
            tone: Math.random(),
            alpha: rand(0.07, 0.2),
          });
        }
      }
    }

    function onMove(e: MouseEvent) {
      const rect = wrap!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active =
        mouse.x >= 0 && mouse.x <= W && mouse.y >= 0 && mouse.y <= H;
      wrap!.style.setProperty("--mx", mouse.x + "px");
      wrap!.style.setProperty("--my", mouse.y + "px");
      wrap!.style.setProperty("--spot-on", mouse.active ? "1" : "0");
    }

    const PUSH_RADIUS = 240,
      PUSH_FORCE = 0.6,
      SPRING_K = 0.025,
      DAMPING = 0.86;
    let raf: number;

    function tick() {
      ctx.clearRect(0, 0, W, H);
      for (const it of items) {
        if (mouse.active) {
          const dx = it.x - mouse.x,
            dy = it.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < PUSH_RADIUS && d > 0.001) {
            const t = 1 - d / PUSH_RADIUS;
            const f = t * PUSH_FORCE * 4;
            it.vx += (dx / d) * f;
            it.vy += (dy / d) * f;
          }
        }
        it.vx += (it.hx - it.x) * SPRING_K;
        it.vy += (it.hy - it.y) * SPRING_K;
        it.vx *= DAMPING;
        it.vy *= DAMPING;
        it.x += it.vx;
        it.y += it.vy;

        ctx.save();
        ctx.translate(it.x, it.y);
        ctx.rotate(it.rot);
        ctx.font = `italic 500 ${it.size}px "Cormorant Garamond", serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const rgb =
          it.tone < 0.45
            ? palette.jet
            : it.tone < 0.7
              ? palette.warm
              : it.tone < 0.9
                ? palette.soft
                : palette.deep;
        ctx.fillStyle = `rgba(${rgb}, ${it.alpha})`;
        ctx.fillText(it.ch, 0, 0);
        ctx.restore();
      }
      raf = requestAnimationFrame(tick);
    }

    init();
    raf = requestAnimationFrame(tick);

    function onResize() {
      palette = readPalette();
      init();
    }
    function onLeave() {
      mouse.active = false;
      wrap!.style.setProperty("--spot-on", "0");
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="hero-backdrop" ref={wrapRef} aria-hidden="true">
      <div className="hero-spotlight" />
      <canvas ref={canvasRef} />
    </div>
  );
}
