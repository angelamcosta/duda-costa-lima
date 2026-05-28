"use client";

import type { Lang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { ContactForm } from "@/slices/ContactSlice/ContactForm";

interface ContactPrimary {
  label_en: string;
  label_pt: string;
  title_a_en: string;
  title_a_pt: string;
  title_b_en: string;
  title_b_pt: string;
  blurb_en: string;
  blurb_pt: string;
  detail_email: string;
  detail_hours_en: string;
  detail_hours_pt: string;
  detail_location: string;
  label_name_en: string;
  label_name_pt: string;
  label_email: string;
  label_message_en: string;
  label_message_pt: string;
  placeholder_name: string;
  placeholder_email: string;
  placeholder_message_en: string;
  placeholder_message_pt: string;
  submit_en: string;
  submit_pt: string;
  sending_en: string;
  sending_pt: string;
  sent_en: string;
  sent_pt: string;
  error_name_en: string;
  error_name_pt: string;
  error_email_required_en: string;
  error_email_required_pt: string;
  error_email_invalid_en: string;
  error_email_invalid_pt: string;
  error_message_en: string;
  error_message_pt: string;
  error_network_en: string;
  error_network_pt: string;
  required_en: string;
  required_pt: string;
}

interface Props {
  primary: ContactPrimary;
  lang: Lang;
}

export function ContactSlice({ primary, lang }: Props) {
  useReveal();

  const p = primary;
  const en = lang === "en";

  const t = {
    label: en ? p.label_en : p.label_pt,
    title_a: en ? p.title_a_en : p.title_a_pt,
    title_b: en ? p.title_b_en : p.title_b_pt,
    blurb: en ? p.blurb_en : p.blurb_pt,
    detail_email: p.detail_email,
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
    <section className="contact frame" id="contact">
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
        </div>
      </div>
      <ContactForm t={t} />
    </section>
  );
}
