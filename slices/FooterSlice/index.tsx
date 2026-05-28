"use client";

import { useReveal } from "@/hooks/useReveal";

interface FooterPrimary {
  copy: string;
  legal: string;
  built: string;
}

interface Props {
  primary: FooterPrimary;
}

const DEFAULT_EMAIL = "meduarda.cly@gmail.com";

export function FooterSlice({ primary }: Props) {
  useReveal();
  const right = primary.built?.trim() || DEFAULT_EMAIL;
  const looksLikeEmail = /@/.test(right);

  return (
    <footer className="footer frame" data-screen-label="Footer">
      <span>{primary.copy}</span>
      <span>{primary.legal}</span>
      <span>
        {looksLikeEmail ? <a href={`mailto:${right}`}>{right}</a> : right}
      </span>
    </footer>
  );
}
