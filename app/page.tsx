import { createClient } from "@/prismicio"
import { getLang } from "@/lib/i18n"
import { HeaderSlice } from "@/slices/HeaderSlice"
import { HeroSlice } from "@/slices/HeroSlice"
import { AboutSlice } from "@/slices/AboutSlice"
import { ServicesSlice } from "@/slices/ServicesSlice"
import { ContactSlice } from "@/slices/ContactSlice"
import { FooterSlice } from "@/slices/FooterSlice"

export const dynamic = "force-static"

export default async function Home() {
  const lang = await getLang()
  const client = createClient()
  const page = await client.getSingle("homepage")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const slices: any[] = page.data.slices

  const header = slices.find((s) => s.slice_type === "header_slice")
  const hero = slices.find((s) => s.slice_type === "hero_slice")
  const about = slices.find((s) => s.slice_type === "about_slice")
  const services = slices.find((s) => s.slice_type === "services_slice")
  const contact = slices.find((s) => s.slice_type === "contact_slice")
  const footer = slices.find((s) => s.slice_type === "footer_slice")

  return (
    <>
      {header && <HeaderSlice primary={header.primary} lang={lang} />}
      <main>
        {hero && <HeroSlice primary={hero.primary} lang={lang} />}
        {about && (
          <AboutSlice
            primary={about.primary}
            items={about.items ?? []}
            lang={lang}
          />
        )}
        {services && (
          <ServicesSlice
            primary={services.primary}
            items={services.items ?? []}
            lang={lang}
          />
        )}
        {contact && <ContactSlice primary={contact.primary} lang={lang} />}
      </main>
      {footer && <FooterSlice primary={footer.primary} />}
    </>
  )
}
