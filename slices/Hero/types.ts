import type { Lang } from "@/lib/i18n";

export interface HeroPrimary {
  meta_top_en: string;
  meta_top_pt: string;
  name_a: string;
  name_b: string;
  name_c?: string;
  tag_en: string;
  tag_pt: string;
  scroll_en: string;
  scroll_pt: string;
  index_l_en: string;
  index_l_pt: string;
  index_r: string;
  hero_keywords?: { word_en: string; word_pt: string }[];
  rotator_prefix_en?: string;
  rotator_prefix_pt?: string;
}

export interface Props {
  primary: HeroPrimary;
  lang: Lang;
}

export interface TagSpec {
  x: string;
  y: string;
  w: number;
  rot: number;
  delay: number;
  pdepth: number;
  klass: string;
  op?: number;
}
