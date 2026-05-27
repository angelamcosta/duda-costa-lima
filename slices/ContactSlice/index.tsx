"use client";

import { z } from "zod";
import type { Lang } from "@/lib/i18n";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { zodResolver } from "@hookform/resolvers/zod";

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

type FormValues = { name: string; email: string; message: string };

type Status = "idle" | "sending" | "sent" | "error";

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

  const schema = z.object({
    name: z.string().min(2, t.err_name),
    email: z.string().min(1, t.err_email_required).email(t.err_email_invalid),
    message: z.string().min(8, t.err_message),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const [status, setStatus] = useState<Status>("idle");
  const [statusText, setStatusText] = useState("");
  const [statusFading, setStatusFading] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      setStatusText("");
      setStatusFading(false);
      return;
    }
    const target =
      status === "sending"
        ? t.sending + "…"
        : status === "sent"
          ? t.sent
          : t.err_network;

    setStatusFading(false);
    setStatusText("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setStatusText(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(id);
        if (status === "sent") {
          setTimeout(() => setStatusFading(true), 4200);
          setTimeout(() => setStatus("idle"), 5400);
        }
      }
    }, 22);
    return () => clearInterval(id);
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  async function onSubmit(values: FormValues) {
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="contact frame" id="contact">
      <div className="contact-head">
        <div className="section-label reveal" style={{ marginBottom: 28 }}>
          ◦ {t.label}
        </div>
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

      <form
        className="form reveal"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className={`field${errors.name ? " has-error" : ""}`} data-magnet>
          <label>
            {t.label_name} <span className="req">{t.req}</span>
          </label>
          <input
            type="text"
            placeholder={t.ph_name}
            autoComplete="off"
            spellCheck={false}
            {...register("name")}
          />
          {errors.name && (
            <span className="err mono">✕ {errors.name.message}</span>
          )}
        </div>

        <div className={`field${errors.email ? " has-error" : ""}`} data-magnet>
          <label>
            {t.label_email} <span className="req">{t.req}</span>
          </label>
          <input
            type="email"
            placeholder={t.ph_email}
            autoComplete="off"
            spellCheck={false}
            {...register("email")}
          />
          {errors.email && (
            <span className="err mono">✕ {errors.email.message}</span>
          )}
        </div>

        <div
          className={`field${errors.message ? " has-error" : ""}`}
          data-magnet
        >
          <label>
            {t.label_message} <span className="req">{t.req}</span>
          </label>
          <textarea
            placeholder={t.ph_message}
            rows={4}
            {...register("message")}
          />
          {errors.message && (
            <span className="err mono">✕ {errors.message.message}</span>
          )}
        </div>

        <div className="submit-row">
          <button
            type="submit"
            className="submit"
            disabled={!isValid || status === "sending"}
          >
            <span>{t.submit}</span>
            <span className="arrow">→</span>
            <span className="under" />
          </button>
          <div className={`form-status${statusFading ? " fading" : ""}`}>
            {statusText}
            {status === "sending" && <span className="caret" />}
          </div>
        </div>
      </form>
    </section>
  );
}
