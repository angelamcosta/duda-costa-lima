"use client";

import type { Lang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { useServiceDrag } from "@/hooks/useServiceDrag";

interface ServicesPrimary {
  label_en: string;
  label_pt: string;
  title_en: string;
  title_pt: string;
  count_en: string;
  count_pt: string;
}

interface ServiceItem {
  name_a_en: string;
  name_a_pt: string;
  name_b_en: string;
  name_b_pt: string;
  desc_en: string;
  desc_pt: string;
  price_en: string;
  price_pt: string;
  duration_en: string;
  duration_pt: string;
}

interface Props {
  primary: ServicesPrimary;
  items: ServiceItem[];
  lang: Lang;
}

export function ServicesSlice({ primary, items, lang }: Props) {
  useReveal();
  useServiceDrag();

  const t = {
    label: lang === "en" ? primary.label_en : primary.label_pt,
    title: lang === "en" ? primary.title_en : primary.title_pt,
    count: lang === "en" ? primary.count_en : primary.count_pt,
  };

  return (
    <section className="services frame" id="services">
      <div className="section-label reveal" style={{ marginBottom: 28 }}>
        ◦ {t.label}
      </div>
      <div className="services-head reveal">
        <h2>{t.title}</h2>
        <div className="count">{t.count}</div>
      </div>
      <div>
        {items.map((s, i) => {
          const nameA = lang === "en" ? s.name_a_en : s.name_a_pt;
          const nameB = lang === "en" ? s.name_b_en : s.name_b_pt;
          const desc = lang === "en" ? s.desc_en : s.desc_pt;
          const price = lang === "en" ? s.price_en : s.price_pt;
          const dur = lang === "en" ? s.duration_en : s.duration_pt;
          return (
            <div
              key={i}
              className="service reveal"
              data-service
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <div className="idx">0{i + 1}</div>
              <div className="name">
                {nameA} <em>{nameB}</em>
              </div>
              <div className="desc">{desc}</div>
              <div className="meta">
                <div className="price">{price}</div>
                <div className="duration">{dur}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
