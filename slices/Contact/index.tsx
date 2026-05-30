"use client";

import { useReveal } from "@/hooks/useReveal";
import type { Props } from "@/slices/Contact/types";
import { useLiveClock } from "@/hooks/useLiveClock";
import { DEFAULT_CONTACT_EMAIL } from "@/lib/contact";
import { ContactForm } from "@/slices/Contact/ContactForm";

const FALLBACK_PROMPTS_EN = [
  "What event are you dressing for?",
  "What does the room look like?",
  "Have we worked together before?",
  "What hasn't worked, in past consultations?",
];

const FALLBACK_PROMPTS_PT = [
  "Para qual evento você está se vestindo?",
  "Como é a sala em que você entra?",
  "Já trabalhamos juntas antes?",
  "O que não funcionou em consultorias passadas?",
];

function ContactTime() {
  const { madison, you, mounted } = useLiveClock();
  return (
    <div className="contact-time">
      <span className="live-dot" />
      <span className="ct-here">
        Madison&nbsp;<strong>{mounted ? madison : "—"}</strong>
      </span>
      <span className="sep">/</span>
      <span className="ct-you">
        Your time&nbsp;<strong>{mounted ? you : "—"}</strong>
      </span>
    </div>
  );
}

export function ContactSlice({ primary, lang }: Props) {
  useReveal();

  const p = primary;
  const en = lang === "en";
  const email = p.detail_email?.trim() || DEFAULT_CONTACT_EMAIL;

  const prompts =
    p.contact_prompts && p.contact_prompts.length > 0
      ? p.contact_prompts.map((item) => (en ? item.prompt_en : item.prompt_pt))
      : en
        ? FALLBACK_PROMPTS_EN
        : FALLBACK_PROMPTS_PT;

  const promptLabel =
    (en ? p.prompt_label_en : p.prompt_label_pt) ||
    (en ? "Try opening with" : "Tente abrir com");

  const t = {
    label: en ? p.label_en : p.label_pt,
    title_a: en ? p.title_a_en : p.title_a_pt,
    title_b: en ? p.title_b_en : p.title_b_pt,
    blurb: en ? p.blurb_en : p.blurb_pt,
    detail_email: email,
    detail_hours: en ? p.detail_hours_en : p.detail_hours_pt,
    label_name: en ? p.label_name_en : p.label_name_pt,
    label_email: p.label_email,
    label_message: en ? p.label_message_en : p.label_message_pt,
    ph_name: p.placeholder_name,
    ph_email: p.placeholder_email,
    ph_message: en ? p.placeholder_message_en : p.placeholder_message_pt,
    submit: en ? p.submit_en : p.submit_pt,
    sending: en ? p.sending_en : p.sending_pt,
    sent: en ? p.sent_en : p.sent_pt,
    err_network: en ? p.error_network_en : p.error_network_pt,
    err_name: en ? p.error_name_en : p.error_name_pt,
    err_email_required: en
      ? p.error_email_required_en
      : p.error_email_required_pt,
    err_email_invalid: en ? p.error_email_invalid_en : p.error_email_invalid_pt,
    err_message: en ? p.error_message_en : p.error_message_pt,
    req: en ? p.required_en : p.required_pt,
  };

  return (
    <section className="contact frame" id="contact" data-screen-label="Contact">
      <div className="contact-head">
        <div className="section-label reveal mb-7">◦ {t.label}</div>
        <h2 className="reveal">
          {t.title_a} <em>{t.title_b}</em>
        </h2>
        <p
          className="reveal"
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          {t.blurb}
        </p>
        <div
          className="contact-detail reveal"
          style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
        >
          <div>
            <a href={`mailto:${t.detail_email}`}>{t.detail_email}</a>
          </div>
          <div>{t.detail_hours}</div>
          <div>{p.detail_location}</div>
          <ContactTime />
        </div>
      </div>

      <ContactForm t={t} promptLabel={promptLabel} prompts={prompts} />
    </section>
  );
}

export default ContactSlice;
