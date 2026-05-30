"use client";

import { useState, useEffect } from "react";
import { useReveal } from "@/hooks/useReveal";
import type { Props } from "@/slices/Services/types";
import { useServiceDrag } from "@/hooks/useServiceDrag";
import { useServiceExpand } from "@/hooks/useServiceExpand";

interface ExpandCol {
  includes_en: string;
  includes_pt: string;
  leave_en: string;
  leave_pt: string;
  ideal_en: string;
  ideal_pt: string;
}

const EXPAND_CONTENT: ExpandCol[] = [
  {
    includes_en:
      "90-min studio session · colour, line & voice reading · written report",
    includes_pt:
      "Sessão de 90 min em estúdio · leitura de cor, linha e voz · relatório escrito",
    leave_en: "Written palette · curated do / don't · three signature looks",
    leave_pt: "Paleta escrita · do / don't curado · três looks-assinatura",
    ideal_en: "Anyone walking into a new chapter — role, city, or self.",
    ideal_pt:
      "Quem está entrando num novo capítulo — papel, cidade ou si mesmo.",
  },
  {
    includes_en:
      "Full closet pass · re-styling on the rack · keep / edit / replace",
    includes_pt:
      "Passada completa pelo closet · restyling no cabide · ficar / editar / substituir",
    leave_en: "Edited closet · written keep-list · sourcing brief",
    leave_pt: "Closet editado · lista do que fica · brief de sourcing",
    ideal_en: "Closets full of «almost».",
    ideal_pt: "Closets cheios de «quase».",
  },
  {
    includes_en: "Monthly written brief · calendar dressing · on-call response",
    includes_pt: "Brief escrito mensal · dressing por agenda · plantão",
    leave_en: "Look-aheads per event · ongoing sourcing · season review",
    leave_pt: "Looks por evento · sourcing contínuo · fechamento de estação",
    ideal_en: "Founders, performers, public roles.",
    ideal_pt: "Founders, artistas, funções públicas.",
  },
  {
    includes_en: "Brief intake · vintage & made-to-measure sourcing · fittings",
    includes_pt: "Brief inicial · sourcing vintage e sob-medida · provas",
    leave_en:
      "3–5 options per piece · fittings coordinated · finished garments",
    leave_pt: "3–5 opções por peça · provas coordenadas · peças finalizadas",
    ideal_en: "Pieces that don't exist off-the-rack.",
    ideal_pt: "Peças que não existem pronta-entrega.",
  },
];

const EXPAND_LABELS = {
  includes_en: "Includes",
  includes_pt: "Inclui",
  leave_en: "You leave with",
  leave_pt: "Você sai com",
  ideal_en: "Ideal for",
  ideal_pt: "Ideal para",
};

export function ServicesSlice({ primary, items, lang }: Props) {
  useReveal();
  useServiceDrag();
  useServiceExpand();

  const [currency, setCurrency] = useState<"USD" | "BRL">("USD");

  useEffect(() => {
    let isBR = false;
    const navLang = navigator.language ?? "";
    if (navLang.toLowerCase().includes("-br")) {
      isBR = true;
    }
    if (!isBR && typeof Intl !== "undefined") {
      try {
        const region = new Intl.Locale(navLang).region;
        if (region === "BR") isBR = true;
      } catch {
        const resolved = Intl.DateTimeFormat().resolvedOptions().locale ?? "";
        if (resolved.toLowerCase().includes("-br")) isBR = true;
      }
    }
    if (isBR) queueMicrotask(() => setCurrency("BRL"));
  }, []);

  const t = {
    label: lang === "en" ? primary.label_en : primary.label_pt,
    title: lang === "en" ? primary.title_en : primary.title_pt,
    count: lang === "en" ? primary.count_en : primary.count_pt,
  };
  const expandLabel =
    lang === "en"
      ? "Expand service details for"
      : "Expandir detalhes do serviço";

  return (
    <section
      className="services frame"
      id="services"
      data-screen-label="Services"
    >
      <div className="section-label reveal mb-7">◦ {t.label}</div>
      <div className="services-head reveal">
        <h2>{t.title}</h2>
        <div className="count">{t.count}</div>
      </div>
      <div>
        {items.map((s, i) => {
          const nameA = lang === "en" ? s.name_a_en : s.name_a_pt;
          const nameB = lang === "en" ? s.name_b_en : s.name_b_pt;
          const desc = lang === "en" ? s.desc_en : s.desc_pt;
          const price = (currency === "BRL" ? s.price_brl : s.price_usd) ?? "";
          const dur = lang === "en" ? s.duration_en : s.duration_pt;
          return (
            <div
              key={i}
              className="service row-reveal"
              data-service
              data-expandable
              style={
                {
                  "--reveal-delay": `${60 + i * 90}ms`,
                  "--row-rule-delay": `${260 + i * 100}ms`,
                } as React.CSSProperties
              }
            >
              <div className="idx">0{i + 1}</div>
              <div className="name">
                {nameA} <em>{nameB}</em>
              </div>
              <div className="desc">{desc}</div>
              <div className="meta">
                <div className="price">{price}</div>
                <div className="duration">{dur}</div>
                <button
                  className="service-chev"
                  type="button"
                  aria-label={`${expandLabel} ${nameA} ${nameB}`.trim()}
                  aria-expanded="false"
                >
                  <span />
                  <span />
                </button>
              </div>
              <div className="service-expand" aria-hidden="true">
                <div className="expand-col">
                  <div className="expand-key mono">
                    {lang === "en"
                      ? EXPAND_LABELS.includes_en
                      : EXPAND_LABELS.includes_pt}
                  </div>
                  <div className="expand-val">
                    {EXPAND_CONTENT[i]
                      ? lang === "en"
                        ? EXPAND_CONTENT[i].includes_en
                        : EXPAND_CONTENT[i].includes_pt
                      : ""}
                  </div>
                </div>
                <div className="expand-col">
                  <div className="expand-key mono">
                    {lang === "en"
                      ? EXPAND_LABELS.leave_en
                      : EXPAND_LABELS.leave_pt}
                  </div>
                  <div className="expand-val">
                    {EXPAND_CONTENT[i]
                      ? lang === "en"
                        ? EXPAND_CONTENT[i].leave_en
                        : EXPAND_CONTENT[i].leave_pt
                      : ""}
                  </div>
                </div>
                <div className="expand-col">
                  <div className="expand-key mono">
                    {lang === "en"
                      ? EXPAND_LABELS.ideal_en
                      : EXPAND_LABELS.ideal_pt}
                  </div>
                  <div className="expand-val">
                    {EXPAND_CONTENT[i]
                      ? lang === "en"
                        ? EXPAND_CONTENT[i].ideal_en
                        : EXPAND_CONTENT[i].ideal_pt
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ServicesSlice;
