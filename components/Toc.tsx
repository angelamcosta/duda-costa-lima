"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";

interface TocEntry {
  id: string;
  num: string;
  label_en: string;
  label_pt: string;
}

const ENTRIES: TocEntry[] = [
  { id: "hero", num: "I", label_en: "Opening", label_pt: "Abertura" },
  { id: "about", num: "II", label_en: "About", label_pt: "Sobre" },
  { id: "services", num: "III", label_en: "Services", label_pt: "Serviços" },
  { id: "contact", num: "IV", label_en: "Contact", label_pt: "Contato" },
];

export function Toc({ lang }: { lang: Lang }) {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const sections = ENTRIES.map((e) => document.getElementById(e.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        let best: Element | null = null;
        let bestTop = Infinity;
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const t = Math.abs(en.boundingClientRect.top);
            if (t < bestTop) {
              bestTop = t;
              best = en.target;
            }
          }
        });
        if (best) setActive((best as HTMLElement).id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  function onClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const sec = document.getElementById(id);
    if (!sec) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top: sec.offsetTop - 24,
      behavior: reduced ? "auto" : "smooth",
    });
  }

  const en = lang === "en";

  return (
    <aside className="toc" aria-label="Sections">
      {ENTRIES.map((entry) => (
        <a
          key={entry.id}
          href={`#${entry.id}`}
          className={`toc-item${active === entry.id ? " is-active" : ""}`}
          onClick={(e) => onClick(e, entry.id)}
        >
          <span className="toc-num">{entry.num}</span>
          <span className="toc-label">
            {en ? entry.label_en : entry.label_pt}
          </span>
          <span className="toc-bar" aria-hidden="true" />
        </a>
      ))}
    </aside>
  );
}

export default Toc;
