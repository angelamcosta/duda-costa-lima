import type { Lang } from "@/lib/i18n";

export interface AboutPrimary {
  label_en: string;
  label_pt: string;
  quote_mark: string;
  quote_en: string;
  quote_pt: string;
  p1_en: string;
  p1_pt: string;
  p2_en: string;
  p2_pt: string;
  status_label_en?: string;
  status_label_pt?: string;
  status_a_en?: string;
  status_a_pt?: string;
  status_b_en?: string;
  status_b_pt?: string;
}

export interface MetaItem {
  key_en: string;
  key_pt: string;
  value_en: string;
  value_pt: string;
}

export interface Props {
  primary: AboutPrimary;
  items: MetaItem[];
  lang: Lang;
}
