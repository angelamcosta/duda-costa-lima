import type { Lang } from "@/lib/i18n";

export interface FooterPrimary {
  copy: string;
  legal: string;
  built: string;
}

export interface Props {
  primary: FooterPrimary;
  lang: Lang;
}
