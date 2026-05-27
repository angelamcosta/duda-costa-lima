import { getLang } from "@/lib/i18n";
import { createClient } from "@/prismicio";
import { HeroSlice } from "@/slices/HeroSlice";
import { AboutSlice } from "@/slices/AboutSlice";
import { FooterSlice } from "@/slices/FooterSlice";
import { HeaderSlice } from "@/slices/HeaderSlice";
import { ContactSlice } from "@/slices/ContactSlice";
import { ServicesSlice } from "@/slices/ServicesSlice";

export const dynamic = "force-dynamic";

export default async function Home() {
  const lang = await getLang();
  const client = createClient();
  const page = await client.getSingle("homepage");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const slices: any[] = page.data.slices;

  const header = slices.find((s) => s.slice_type === "header");
  const hero = slices.find((s) => s.slice_type === "hero");
  const about = slices.find((s) => s.slice_type === "about");
  const services = slices.find((s) => s.slice_type === "services");
  const contact = slices.find((s) => s.slice_type === "contact");
  const footer = slices.find((s) => s.slice_type === "footer");

  return (
    <>
      {header && <HeaderSlice primary={header.primary} lang={lang} />}
      <main>
        {hero && <HeroSlice primary={hero.primary} lang={lang} />}
        {about && (
          <AboutSlice
            primary={about.primary}
            items={about.primary.key_text ?? []}
            lang={lang}
          />
        )}
        {services && (
          <ServicesSlice
            primary={services.primary}
            items={services.primary.key_text ?? []}
            lang={lang}
          />
        )}
        {contact && <ContactSlice primary={contact.primary} lang={lang} />}
      </main>
      {footer && <FooterSlice primary={footer.primary} />}
    </>
  );
}
