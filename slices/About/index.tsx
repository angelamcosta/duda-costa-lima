"use client";

import { useReveal } from "@/hooks/useReveal";
import type { Props } from "@/slices/About/types";

export function AboutSlice({ primary, items, lang }: Props) {
  useReveal();

  const en = lang === "en";

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
        <div
          className="about-status reveal"
          style={{ "--reveal-delay": "520ms" } as React.CSSProperties}
        >
          <span className="live-dot live-dot--in" />
          <span>{en ? "Currently" : "Atualmente"}</span>
          <span className="status-sep">—</span>
          <span>{en ? "FW26 wardrobe edits" : "Edições de closet FW26"}</span>
          <span className="status-sep">/</span>
          <span>
            {en ? "Booking from August" : "Agendamentos a partir de Agosto"}
          </span>
        </div>
      </div>
    </section>
  );
}

export default AboutSlice;
