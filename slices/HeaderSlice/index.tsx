"use client";

import type { Lang } from "@/lib/i18n";
import { useRouter } from "next/navigation";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";

interface HeaderPrimary {
  brand_mark: string;
  nav_about_en: string;
  nav_about_pt: string;
  nav_services_en: string;
  nav_services_pt: string;
  nav_contact_en: string;
  nav_contact_pt: string;
}

interface Props {
  primary: HeaderPrimary;
  lang: Lang;
}

export function HeaderSlice({ primary, lang }: Props) {
  const router = useRouter();
  useHeaderScroll();

  function setLang(l: Lang) {
    document.cookie = `me_lang=${l}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  }

  const t = {
    about: lang === "en" ? primary.nav_about_en : primary.nav_about_pt,
    services: lang === "en" ? primary.nav_services_en : primary.nav_services_pt,
    contact: lang === "en" ? primary.nav_contact_en : primary.nav_contact_pt,
  };

  return (
    <header className="topbar">
      <a href="#hero" className="mark mono" aria-label="Duda Costa Lima — home">
        <span className="mark-d">D</span>
        <span className="mark-l">L</span>
      </a>
      <nav>
        <a href="#about">{t.about}</a>
        <a href="#services">{t.services}</a>
        <a href="#contact">{t.contact}</a>
      </nav>
      <div className="lang-toggle mono">
        <button aria-pressed={lang === "en"} onClick={() => setLang("en")}>
          EN
        </button>
        <span className="sep">·</span>
        <button aria-pressed={lang === "pt"} onClick={() => setLang("pt")}>
          PT
        </button>
      </div>
      <span className="topbar-rule" aria-hidden="true" />
    </header>
  );
}
