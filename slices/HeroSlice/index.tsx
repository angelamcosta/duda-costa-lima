"use client";

import { useMemo } from "react";
import type { Lang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { HeroBackdrop } from "@/slices/HeroSlice/HeroBackdrop";

interface HeroPrimary {
  meta_top_en: string;
  meta_top_pt: string;
  name_a: string;
  name_b: string;
  tag_en: string;
  tag_pt: string;
  scroll_en: string;
  scroll_pt: string;
  index_l_en: string;
  index_l_pt: string;
  index_r: string;
}

interface Props {
  primary: HeroPrimary;
  lang: Lang;
}

function StaggerText({
  text,
  baseDelay = 0,
  perChar = 28,
}: {
  text: string;
  baseDelay?: number;
  perChar?: number;
}) {
  const chars = useMemo(() => Array.from(text), [text]);
  return (
    <span aria-label={text}>
      {chars.map((c, i) => (
        <span
          key={i}
          className="stagger-char repel"
          style={
            {
              "--char-delay": `${baseDelay + i * perChar}ms`,
            } as React.CSSProperties
          }
        >
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
  );
}

export function HeroSlice({ primary, lang }: Props) {
  useReveal();

  const t = {
    meta_top: lang === "en" ? primary.meta_top_en : primary.meta_top_pt,
    tag: lang === "en" ? primary.tag_en : primary.tag_pt,
    scroll: lang === "en" ? primary.scroll_en : primary.scroll_pt,
    index_l: lang === "en" ? primary.index_l_en : primary.index_l_pt,
  };

  return (
    <section className="hero frame" id="hero">
      <HeroBackdrop />
      <div className="hero-meta mono reveal">
        <span>{t.meta_top}</span>
      </div>
      <h1
        className="hero-name"
        aria-label={`${primary.name_a} ${primary.name_b}`}
      >
        <span className="row">
          <StaggerText text={primary.name_a} baseDelay={120} perChar={42} />
        </span>
        <span className="row indent">
          <em>
            <StaggerText text={primary.name_b} baseDelay={420} perChar={42} />
          </em>
        </span>
      </h1>
      <p
        className="hero-tag reveal"
        style={{ "--reveal-delay": "900ms" } as React.CSSProperties}
      >
        {t.tag}
      </p>
      <div className="hero-bottom">
        <div
          className="scroll-cue reveal"
          style={{ "--reveal-delay": "1100ms" } as React.CSSProperties}
        >
          <span>↓ {t.scroll}</span>
          <span className="line" />
        </div>
        <div
          className="hero-index reveal"
          style={{ "--reveal-delay": "1100ms" } as React.CSSProperties}
        >
          <span>{t.index_l}</span>
          &nbsp;·&nbsp;
          <strong>{primary.index_r}</strong>
        </div>
      </div>
    </section>
  );
}
