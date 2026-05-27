/**
 * Prismic Migration Script
 * Creates the homepage document with all EN + PT content strings.
 *
 * Run AFTER pushing custom types from Slice Machine:
 *   node scripts/migrate-to-prismic.mjs
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME=maria-eduarda
 *   PRISMIC_ACCESS_TOKEN=<write token>
 */

import * as prismic from "@prismicio/client"
import { readFileSync } from "fs"

// Load env vars from .env.local manually (no dotenv dependency needed)
const envFile = readFileSync(".env.local", "utf-8")
const env = Object.fromEntries(
  envFile
    .split("\n")
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => l.split("=").map((p) => p.trim()))
    .filter(([k]) => k)
    .map(([k, ...rest]) => [k, rest.join("=")])
)

const REPO = env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME
const TOKEN = env.PRISMIC_ACCESS_TOKEN

if (!REPO || !TOKEN) {
  console.error("Missing NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME or PRISMIC_ACCESS_TOKEN in .env.local")
  process.exit(1)
}

const client = prismic.createWriteClient(REPO, { writeToken: TOKEN })
const migration = prismic.createMigration()

// ─── All content strings ────────────────────────────────────────────────────

const homepage = migration.createDocument(
  {
    type: "homepage",
    uid: null,
    lang: "en-us",
    data: {
      slices: [
        // ── HeaderSlice ──────────────────────────────────────────────────
        {
          slice_type: "header",
          slice_label: null,
          variation: "default",
          primary: {
            brand_mark: "M·E — Image & Style",
            nav_about_en: "About",
            nav_about_pt: "Sobre",
            nav_services_en: "Services",
            nav_services_pt: "Serviços",
            nav_contact_en: "Contact",
            nav_contact_pt: "Contato",
          },
          items: [],
        },

        // ── HeroSlice ────────────────────────────────────────────────────
        {
          slice_type: "hero",
          slice_label: null,
          variation: "default",
          primary: {
            meta_top_en: "Image & Style Consultant · Recife / Worldwide",
            meta_top_pt: "Consultoria de Imagem & Estilo · Recife / Mundo",
            name_a: "Maria",
            name_b: "Eduarda",
            tag_en: "An image and style consultancy for people whose presence already speaks. The work is editing — pulling silhouette, palette and posture into the shape of a single, defensible person.",
            tag_pt: "Uma consultoria de imagem e estilo para quem já tem presença. O trabalho é editar — silhueta, paleta e postura ajustadas ao formato de uma pessoa única e coerente.",
            scroll_en: "Scroll",
            scroll_pt: "Role",
            index_l_en: "Index",
            index_l_pt: "Índice",
            index_r: "01 — 04",
          },
          items: [],
        },

        // ── AboutSlice ───────────────────────────────────────────────────
        {
          slice_type: "about",
          slice_label: null,
          variation: "default",
          primary: {
            label_en: "About",
            label_pt: "Sobre",
            quote_mark: "“",
            quote_en: "Style is not a category of clothes. It is the rhythm at which you appear in a room.",
            quote_pt: "Estilo não é uma categoria de roupa. É o ritmo com que você aparece em uma sala.",
            p1_en: "Born in Recife, Pernambuco. Maria Eduarda read Linguistics at the Universidade Federal de Pernambuco and General Studies at Northeast Wisconsin Technical College — Phi Theta Kappa Honor Society — before turning the same attention she gave to grammar onto the people in front of her, instead of words on a page.",
            p1_pt: "Nascida em Recife, Pernambuco. Maria Eduarda estudou Letras na Universidade Federal de Pernambuco e General Studies no Northeast Wisconsin Technical College — Phi Theta Kappa Honor Society — antes de voltar a mesma atenção que dava à gramática para as pessoas à sua frente, em vez das palavras na página.",
            p2_en: "Each engagement is private. There is no template, no seasonal package, no styling reel. The deliverable is a small set of decisions you will not have to make again.",
            p2_pt: "Cada projeto é privado. Não há template, pacote sazonal ou portfólio público. O entregável é um pequeno conjunto de decisões que você não precisará tomar de novo.",
            key_text: [
              {
                key_en: "Based in",
                key_pt: "Sediada em",
                value_en: "Recife · São Paulo · Remote",
                value_pt: "Recife · São Paulo · Remoto",
              },
              {
                key_en: "Working since",
                key_pt: "Trabalhando desde",
                value_en: "2014",
                value_pt: "2014",
              },
              {
                key_en: "Languages",
                key_pt: "Idiomas",
                value_en: "Português · English · Italiano · Русский · 日本語 (learning)",
                value_pt: "Português · English · Italiano · Русский · 日本語 (estudando)",
              },
              {
                key_en: "Formation",
                key_pt: "Formação",
                value_en: "UFPE · NWTC — Phi Theta Kappa",
                value_pt: "UFPE · NWTC — Phi Theta Kappa",
              },
            ],
          },
          items: [],
        },

        // ── ServicesSlice ────────────────────────────────────────────────
        {
          slice_type: "services",
          slice_label: null,
          variation: "default",
          primary: {
            label_en: "Services",
            label_pt: "Serviços",
            title_en: "Four ways in.",
            title_pt: "Quatro caminhos.",
            count_en: "Four · IV",
            count_pt: "Quatro · IV",
            key_text: [
              {
                name_a_en: "The First",
                name_a_pt: "Primeira",
                name_b_en: "Conversation",
                name_b_pt: "Conversa",
                desc_en: "A ninety-minute private session. We map what you already own, what you are signalling, and what you would like to be read as. You leave with a written brief.",
                desc_pt: "Uma sessão privada de noventa minutos. Mapeamos o que você já possui, o que está sinalizando e como gostaria de ser lido. Você sai com um briefing por escrito.",
                price_en: "from R$ 1.800",
                price_pt: "a partir de R$ 1.800",
                duration_en: "90 min · 1 session",
                duration_pt: "90 min · 1 sessão",
              },
              {
                name_a_en: "Wardrobe",
                name_a_pt: "Edição de",
                name_b_en: "Edit",
                name_b_pt: "Guarda-roupa",
                desc_en: "A full reading of your closet in your home. We remove what is no longer you, document what stays, and produce a printed reference of every working combination.",
                desc_pt: "Uma leitura completa do seu closet, na sua casa. Removemos o que já não é você, documentamos o que fica e entregamos uma referência impressa de cada combinação que funciona.",
                price_en: "from R$ 6.400",
                price_pt: "a partir de R$ 6.400",
                duration_en: "One day · in-person",
                duration_pt: "Um dia · presencial",
              },
              {
                name_a_en: "Personal",
                name_a_pt: "Personal",
                name_b_en: "Shopping",
                name_b_pt: "Shopping",
                desc_en: "We assemble the missing pieces — in person in Recife or São Paulo, or curated and shipped. Brand-agnostic. Discretion guaranteed.",
                desc_pt: "Montamos as peças que faltam — presencialmente em Recife ou São Paulo, ou curadas e enviadas. Sem marca-âncora. Discrição garantida.",
                price_en: "from R$ 4.200",
                price_pt: "a partir de R$ 4.200",
                duration_en: "Per assignment",
                duration_pt: "Por projeto",
              },
              {
                name_a_en: "Year",
                name_a_pt: "Retentor",
                name_b_en: "Retainer",
                name_b_pt: "Anual",
                desc_en: "An ongoing relationship. Quarterly recalibration, on-call dressing for moments that matter, and a single point of contact for anything image-adjacent.",
                desc_pt: "Uma relação contínua. Recalibração trimestral, vestuário sob demanda para momentos que importam e um único ponto de contato para tudo que envolve imagem.",
                price_en: "by enquiry",
                price_pt: "sob consulta",
                duration_en: "12 months",
                duration_pt: "12 meses",
              },
            ],
          },
          items: [],
        },

        // ── ContactSlice ─────────────────────────────────────────────────
        {
          slice_type: "contact",
          slice_label: null,
          variation: "default",
          primary: {
            label_en: "Contact",
            label_pt: "Contato",
            title_a_en: "Write",
            title_a_pt: "Escreva",
            title_b_en: "to me.",
            title_b_pt: "para mim.",
            blurb_en: "A short note about who you are and what is unsettled is enough. I reply personally within two working days.",
            blurb_pt: "Uma nota breve sobre quem você é e o que está incomodando já basta. Respondo pessoalmente em até dois dias úteis.",
            detail_email: "studio@mariaeduarda.consulting",
            detail_hours_en: "Mon – Thu · 10h – 18h BRT",
            detail_hours_pt: "Seg – Qui · 10h – 18h BRT",
            detail_location: "Casa Forte, Recife",
            label_name_en: "Full name",
            label_name_pt: "Nome completo",
            label_email: "Email",
            label_message_en: "Message",
            label_message_pt: "Mensagem",
            placeholder_name: "Maria Eduarda",
            placeholder_email: "you@elsewhere.com",
            placeholder_message_en: "What would you like to be read as?",
            placeholder_message_pt: "Como você gostaria de ser lido?",
            submit_en: "Send the note",
            submit_pt: "Enviar a nota",
            sending_en: "Sending",
            sending_pt: "Enviando",
            sent_en: "Received · I will write back within two working days.",
            sent_pt: "Recebido · respondo em até dois dias úteis.",
            error_name_en: "name required",
            error_name_pt: "nome obrigatório",
            error_email_required_en: "email required",
            error_email_required_pt: "email obrigatório",
            error_email_invalid_en: "not a valid email",
            error_email_invalid_pt: "email inválido",
            error_message_en: "tell me a little more",
            error_message_pt: "conte um pouco mais",
            error_network_en: "Something went wrong · please try again",
            error_network_pt: "Algo deu errado · tente novamente",
            required_en: "required",
            required_pt: "obrigatório",
          },
          items: [],
        },

        // ── FooterSlice ──────────────────────────────────────────────────
        {
          slice_type: "footer",
          slice_label: null,
          variation: "default",
          primary: {
            copy: "© 2026 Maria Eduarda Consultoria",
            legal: "Recife · Pernambuco · Brasil",
            built: "Site · v0.2",
          },
          items: [],
        },
      ],
    },
  },
  "Homepage"
)

// ─── Execute migration ───────────────────────────────────────────────────────

console.log(`\n📦 Migrating to Prismic repository: ${REPO}\n`)

try {
  await client.migrate(migration, {
    reporter: (event) => {
      if (event.type === "documents:creating") {
        console.log(`  Creating document ${event.data.current}/${event.data.total}: ${event.data.document?.document?.type ?? ""}`)
      }
      if (event.type === "documents:created") {
        console.log(`  ✓ Created ${event.data.created} document(s)`)
      }
    },
  })
  console.log("\n✅ Migration complete. Your Prismic homepage document is ready.\n")
} catch (err) {
  console.error("\n❌ Migration failed:\n", err.message ?? err)
  if (err.cause) console.error("Cause:", err.cause)
  if (err.response) console.error("Response:", String(err.response))
  console.error("Full error:", JSON.stringify(err, null, 2))
  process.exit(1)
}
