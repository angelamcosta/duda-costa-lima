"use client";

import { useReveal } from "@/hooks/useReveal";
import type { Props } from "@/slices/Footer/types";
import { DEFAULT_CONTACT_EMAIL } from "@/lib/contact";

export function FooterSlice({ primary }: Props) {
  useReveal();
  const right = primary.built?.trim() || DEFAULT_CONTACT_EMAIL;
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

export default FooterSlice;
