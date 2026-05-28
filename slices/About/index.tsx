"use client";

import type { Lang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";

interface AboutPrimary {
  label_en: string;
  label_pt: string;
  quote_mark: string;
  quote_en: string;
  quote_pt: string;
  p1_en: string;
  p1_pt: string;
  p2_en: string;
  p2_pt: string;
}

interface MetaItem {
  key_en: string;
  key_pt: string;
  value_en: string;
  value_pt: string;
}

interface Props {
  primary: AboutPrimary;
  items: MetaItem[];
  lang: Lang;
}

export function AboutSlice({ primary, items, lang }: Props) {
  useReveal();

  const t = {
    label: lang === "en" ? primary.label_en : primary.label_pt,
    quote: lang === "en" ? primary.quote_en : primary.quote_pt,
    p1: lang === "en" ? primary.p1_en : primary.p1_pt,
    p2: lang === "en" ? primary.p2_en : primary.p2_pt,
  };

  return (
    <section className="about frame" id="about" data-screen-label="About">
      <div>
        <div className="section-label reveal mb-7">◦ {t.label}</div>
        <blockquote
          className="about-quote mask-reveal"
          style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
        >
          <span className="mark">{primary.quote_mark}</span>
          {t.quote}
        </blockquote>
      </div>
      <div className="about-body">
        <p
          className="reveal"
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          {t.p1}
        </p>
        <p
          className="reveal"
          style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
        >
          {t.p2}
        </p>
        <dl
          className="about-meta reveal"
          style={{ "--reveal-delay": "360ms" } as React.CSSProperties}
        >
          {items.map((m, i) => (
            <div
              key={i}
              style={{ "--col-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <dt>{lang === "en" ? m.key_en : m.key_pt}</dt>
              <dd>{lang === "en" ? m.value_en : m.value_pt}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default AboutSlice;
