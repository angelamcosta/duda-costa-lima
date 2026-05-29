import { getLang } from "@/lib/i18n";
import { Toc } from "@/components/Toc";
import { HeroSlice } from "@/slices/Hero";
import { createClient } from "@/prismicio";
import type { ComponentProps } from "react";
import { AboutSlice } from "@/slices/About";
import { FooterSlice } from "@/slices/Footer";
import { HeaderSlice } from "@/slices/Header";
import { ContactSlice } from "@/slices/Contact";
import type { Content } from "@prismicio/client";
import { ServicesSlice } from "@/slices/Services";

export const dynamic = "force-dynamic";

type HomepageSlice = Content.HomepageDocumentDataSlicesSlice;
type HeaderPrimary = ComponentProps<typeof HeaderSlice>["primary"];
type HeroPrimary = ComponentProps<typeof HeroSlice>["primary"];
type AboutPrimary = ComponentProps<typeof AboutSlice>["primary"];
type AboutItems = ComponentProps<typeof AboutSlice>["items"];
type ServicesPrimary = ComponentProps<typeof ServicesSlice>["primary"];
type ServicesItems = ComponentProps<typeof ServicesSlice>["items"];
type ContactPrimary = ComponentProps<typeof ContactSlice>["primary"];
type FooterPrimary = ComponentProps<typeof FooterSlice>["primary"];

function isSlice<T extends HomepageSlice["slice_type"]>(sliceType: T) {
  return (
    slice: HomepageSlice,
  ): slice is Extract<HomepageSlice, { slice_type: T }> =>
    slice.slice_type === sliceType;
}

export default async function Home() {
  const lang = await getLang();
  const client = createClient();
  const page = await client.getSingle("homepage");
  const slices: HomepageSlice[] = page.data.slices;

  const header = slices.find(isSlice("header"));
  const hero = slices.find(isSlice("hero"));
  const about = slices.find(isSlice("about"));
  const services = slices.find(isSlice("services"));
  const contact = slices.find(isSlice("contact"));
  const footer = slices.find(isSlice("footer"));

  return (
    <>
      {header && (
        <HeaderSlice
          primary={header.primary as unknown as HeaderPrimary}
          lang={lang}
        />
      )}
      <Toc lang={lang} />
      <main>
        {hero && (
          <HeroSlice
            primary={hero.primary as unknown as HeroPrimary}
            lang={lang}
          />
        )}
        {about && (
          <AboutSlice
            primary={about.primary as unknown as AboutPrimary}
            items={(about.primary.key_text ?? []) as unknown as AboutItems}
            lang={lang}
          />
        )}
        {services && (
          <ServicesSlice
            primary={services.primary as unknown as ServicesPrimary}
            items={
              (services.primary.key_text ?? []) as unknown as ServicesItems
            }
            lang={lang}
          />
        )}
        {contact && (
          <ContactSlice
            primary={contact.primary as unknown as ContactPrimary}
            lang={lang}
          />
        )}
      </main>
      {footer && (
        <FooterSlice
          primary={footer.primary as unknown as FooterPrimary}
          lang={lang}
        />
      )}
    </>
  );
}
