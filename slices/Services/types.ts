import type { Lang } from "@/lib/i18n";

export interface ServicesPrimary {
  label_en: string;
  label_pt: string;
  title_en: string;
  title_pt: string;
  count_en: string;
  count_pt: string;
}

export interface ServiceItem {
  name_a_en: string;
  name_a_pt: string;
  name_b_en: string;
  name_b_pt: string;
  desc_en: string;
  desc_pt: string;
  price_usd: string;
  price_brl: string;
  duration_en: string;
  duration_pt: string;
}

export interface Props {
  primary: ServicesPrimary;
  items: ServiceItem[];
  lang: Lang;
}
