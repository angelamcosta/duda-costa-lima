import type { Lang } from "@/lib/i18n";

export interface FooterPrimary {
  copy: string;
  legal: string;
  built: string;
  palette_name?: string;
  appointment_en?: string;
  appointment_pt?: string;
}

export interface Props {
  primary: FooterPrimary;
  lang: Lang;
}
