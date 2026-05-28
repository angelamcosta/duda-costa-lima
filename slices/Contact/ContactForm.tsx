"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";

type FormValues = { name: string; email: string; message: string };
type Status = "idle" | "sending" | "sent" | "error";

interface ContactFormProps {
  t: {
    label_name: string;
    label_email: string;
    label_message: string;
    ph_name: string;
    ph_email: string;
    ph_message: string;
    submit: string;
    sending: string;
    sent: string;
    err_network: string;
    err_name: string;
    err_email_required: string;
    err_email_invalid: string;
    err_message: string;
    req: string;
  };
}

export function ContactForm({ t }: ContactFormProps) {
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
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <form className="form reveal" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div
        className={`field${errors.name ? " has-error" : ""}`}
        data-magnet
        style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
      >
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

      <div
        className={`field${errors.email ? " has-error" : ""}`}
        data-magnet
        style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
      >
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
        style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
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
  );
}
