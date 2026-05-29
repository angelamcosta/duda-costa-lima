import type { Lang } from "@/lib/i18n";

export interface HeaderPrimary {
  brand_mark: string;
  nav_about_en: string;
  nav_about_pt: string;
  nav_services_en: string;
  nav_services_pt: string;
  nav_contact_en: string;
  nav_contact_pt: string;
}

export interface Props {
  primary: HeaderPrimary;
  lang: Lang;
}
