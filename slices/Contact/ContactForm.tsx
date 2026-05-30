"use client";

import type {
  Status,
  FormValues,
  ContactFormProps,
} from "@/slices/Contact/types";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Rotator } from "@/components/Rotator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useId, useState } from "react";

const MESSAGE_MAX = 600;

export function ContactForm({ t, promptLabel, prompts }: ContactFormProps) {
  const formId = useId();
  const nameId = `${formId}-name`;
  const emailId = `${formId}-email`;
  const messageId = `${formId}-message`;
  const nameErrorId = `${nameId}-error`;
  const emailErrorId = `${emailId}-error`;
  const messageErrorId = `${messageId}-error`;
  const messageCounterId = `${messageId}-counter`;
  const statusId = `${formId}-status`;

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

  const [messageLen, setMessageLen] = useState(0);
  const counterClass =
    messageLen >= MESSAGE_MAX
      ? " is-max"
      : messageLen > MESSAGE_MAX * 0.75
        ? " is-near"
        : "";

  const [status, setStatus] = useState<Status>("idle");
  const [statusText, setStatusText] = useState("");
  const [statusFading, setStatusFading] = useState(false);

  const setFormStatus = useCallback((nextStatus: Status) => {
    setStatusText("");
    setStatusFading(false);
    setStatus(nextStatus);
  }, []);

  useEffect(() => {
    if (status === "idle") {
      return;
    }
    const target =
      status === "sending"
        ? t.sending + "..."
        : status === "sent"
          ? t.sent
          : t.err_network;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setStatusText(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(id);
        if (status === "sent") {
          setTimeout(() => setStatusFading(true), 4200);
          setTimeout(() => setFormStatus("idle"), 5400);
        }
      }
    }, 22);
    return () => clearInterval(id);
  }, [setFormStatus, status, t.err_network, t.sending, t.sent]);

  async function onSubmit(values: FormValues) {
    setFormStatus("sending");
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
        setFormStatus("sent");
        reset();
        setMessageLen(0);
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <form
      className="form reveal"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      toolname="request_style_consultation"
      tooldescription="Sends a consultation request to Duda Costa Lima with the visitor's name, email address, and styling goals."
    >
      <div className="contact-prompt" aria-hidden="true">
        <span className="prompt-label mono">{promptLabel}</span>
        <Rotator words={prompts} variant="prompt" />
      </div>

      <div
        className={`field${errors.name ? " has-error" : ""}`}
        data-field="name"
        data-magnet
        style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
      >
        <label htmlFor={nameId}>
          {t.label_name} <span className="req">{t.req}</span>
        </label>
        <input
          id={nameId}
          type="text"
          placeholder={t.ph_name}
          autoComplete="name"
          spellCheck={false}
          aria-required="true"
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? nameErrorId : undefined}
          toolparamdescription="The visitor's full name."
          {...register("name")}
        />
        {errors.name && (
          <span className="err mono" id={nameErrorId}>
            ✕ {errors.name.message}
          </span>
        )}
      </div>

      <div
        className={`field${errors.email ? " has-error" : ""}`}
        data-field="email"
        data-magnet
        style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
      >
        <label htmlFor={emailId}>
          {t.label_email} <span className="req">{t.req}</span>
        </label>
        <input
          id={emailId}
          type="email"
          placeholder={t.ph_email}
          autoComplete="email"
          spellCheck={false}
          aria-required="true"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? emailErrorId : undefined}
          toolparamdescription="The visitor's email address for follow-up."
          {...register("email")}
        />
        {errors.email && (
          <span className="err mono" id={emailErrorId}>
            ✕ {errors.email.message}
          </span>
        )}
      </div>

      <div
        className={`field${errors.message ? " has-error" : ""}${
          messageLen > 0 ? " has-content" : ""
        }`}
        data-field="message"
        data-magnet
        style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
      >
        <label htmlFor={messageId}>
          {t.label_message} <span className="req">{t.req}</span>
        </label>
        <textarea
          id={messageId}
          placeholder={t.ph_message}
          rows={4}
          maxLength={MESSAGE_MAX}
          aria-required="true"
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={
            errors.message
              ? `${messageErrorId} ${messageCounterId}`
              : messageCounterId
          }
          toolparamdescription="The visitor's styling needs, event context, or reason for requesting a consultation."
          {...register("message", {
            onChange: (e) => setMessageLen(e.target.value.length),
          })}
        />
        {errors.message && (
          <span className="err mono" id={messageErrorId}>
            ✕ {errors.message.message}
          </span>
        )}
        <div
          className={`char-counter mono${counterClass}`}
          id={messageCounterId}
          aria-live="polite"
        >
          {messageLen}&nbsp;/&nbsp;{MESSAGE_MAX}
        </div>
      </div>

      <div className="submit-row">
        <button
          type="submit"
          className="submit"
          disabled={!isValid || status === "sending"}
          aria-describedby={status === "idle" ? undefined : statusId}
        >
          <span>{t.submit}</span>
          <span className="arrow">→</span>
          <span className="under" />
        </button>
        <div
          className={`form-status${statusFading ? " fading" : ""}`}
          id={statusId}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {statusText}
          {status === "sending" && <span className="caret" />}
        </div>
      </div>
    </form>
  );
}
