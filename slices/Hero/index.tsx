"use client";

import { useReveal } from "@/hooks/useReveal";
import type { Props } from "@/slices/Hero/types";
import { Rotator } from "@/components/Rotator";
import { useLiveClock } from "@/hooks/useLiveClock";
import { HeroBackdrop } from "@/slices/Hero/HeroBackdrop";

const ROTATOR_EN = ["silhouette", "palette", "posture", "voice"];
const ROTATOR_PT = ["silhueta", "paleta", "postura", "voz"];

function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span
      className="word-reveal"
      style={{ "--word-delay": `${delay}ms` } as React.CSSProperties}
    >
      <span>{text}</span>
    </span>
  );
}

function HeroClock() {
  const { madison, you, sameTime, mounted } = useLiveClock();
  return (
    <span className="live-clock">
      <span className="live-dot" />
      <span className="clock-seg">
        Madison&nbsp;<strong>{mounted ? madison : "—"}</strong>
      </span>
      {mounted && !sameTime && (
        <span className="clock-seg clock-you">
          <span className="clock-slash">/</span>You&nbsp;<strong>{you}</strong>
        </span>
      )}
    </span>
  );
}

export function HeroSlice({ primary, lang }: Props) {
  useReveal();
  const en = lang === "en";

  const t = {
    meta_top: en ? primary.meta_top_en : primary.meta_top_pt,
    tag: en ? primary.tag_en : primary.tag_pt,
    scroll: en ? primary.scroll_en : primary.scroll_pt,
    index_l: en ? primary.index_l_en : primary.index_l_pt,
  };

  const rotatorPrefix = en ? "A practice of" : "Uma prática de";
  const keywords =
    primary.hero_keywords && primary.hero_keywords.length > 0
      ? primary.hero_keywords.map((k) => (en ? k.word_en : k.word_pt))
      : en
        ? ROTATOR_EN
        : ROTATOR_PT;

  const nameLine1A = primary.name_a;
  const nameLine1B = primary.name_c ? primary.name_b : "";
  const nameLine2 = primary.name_c ?? primary.name_b;

  return (
    <section className="hero frame" id="hero" data-screen-label="Hero">
      <HeroBackdrop />

      <div className="hero-meta reveal">
        <span>{t.meta_top}</span>
        <span className="dot">·</span>
        <HeroClock />
      </div>

      <h1
        className="hero-name reveal"
        aria-label={`${nameLine1A}${nameLine1B ? ` ${nameLine1B}` : ""} ${nameLine2}`}
      >
        <span className="row">
          <span className="word">
            <WordReveal text={nameLine1A} delay={120} />
          </span>
          {nameLine1B && (
            <span className="word">
              <WordReveal text={nameLine1B} delay={280} />
            </span>
          )}
        </span>
        <span className="row indent">
          <em>
            <span className="word">
              <WordReveal text={nameLine2} delay={520} />
            </span>
          </em>
        </span>
      </h1>

      <div
        className="hero-rotator reveal"
        style={{ "--reveal-delay": "700ms" } as React.CSSProperties}
      >
        <span className="rotator-prefix mono">{rotatorPrefix}</span>
        <Rotator words={keywords} variant="rotator" />
      </div>

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

export default HeroSlice;
