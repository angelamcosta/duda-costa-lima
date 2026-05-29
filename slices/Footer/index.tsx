"use client";

import { useReveal } from "@/hooks/useReveal";
import type { Props } from "@/slices/Footer/types";
import { useLiveClock } from "@/hooks/useLiveClock";
import { DEFAULT_CONTACT_EMAIL } from "@/lib/contact";

function FooterClock() {
  const { madison, mounted } = useLiveClock();
  return (
    <span className="footer-clock">
      <span className="live-dot" />
      Madison&nbsp;<strong>{mounted ? madison : "—"}</strong>
    </span>
  );
}

export function FooterSlice({ primary, lang }: Props) {
  useReveal();
  const en = lang === "en";
  const email = primary.built?.trim() || DEFAULT_CONTACT_EMAIL;
  const appointment = en ? "All work by appointment" : "Tudo sob agendamento";

  return (
    <footer className="footer frame" data-screen-label="Footer">
      <span>{primary.copy}</span>
      <span className="footer-palette" aria-label="Bright Winter palette">
        <span
          className="palette-dot"
          style={{ "--c": "var(--color-warm)" } as React.CSSProperties}
        />
        <span
          className="palette-dot"
          style={{ "--c": "var(--color-warm-soft)" } as React.CSSProperties}
        />
        <span
          className="palette-dot"
          style={{ "--c": "var(--color-deep)" } as React.CSSProperties}
        />
        <span className="palette-name">Bright Winter</span>
      </span>
      <span>{appointment}</span>
      <span>
        <a href={`mailto:${email}`}>{email}</a>
      </span>
      <FooterClock />
    </footer>
  );
}

export default FooterSlice;
