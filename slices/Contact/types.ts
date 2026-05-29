import type { Lang } from "@/lib/i18n";

export interface ContactPromptItem {
  prompt_en: string;
  prompt_pt: string;
}

export interface ContactPrimary {
  contact_prompts?: ContactPromptItem[];
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

export interface Props {
  primary: ContactPrimary;
  lang: Lang;
}

export type FormValues = { name: string; email: string; message: string };
export type Status = "idle" | "sending" | "sent" | "error";

export interface ContactFormProps {
  promptLabel: string;
  prompts: string[];
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
