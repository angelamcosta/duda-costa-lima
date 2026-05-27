# Duda Costa Lima — Portfolio

Personal portfolio site for Image & Style Consultant Duda Costa Lima, who happens to be my sister <3. Built with Next.js 16, Prismic CMS, Tailwind CSS v4 and lots of love. I miss you dudinha <3

## Stack

- **Next.js 16** (App Router, React 19)
- **Prismic** — headless CMS with Slice Machine for structured content
- **Tailwind CSS v4** — config lives in `globals.css` `@theme` block, no `tailwind.config.ts`
- **TypeScript**

## Slices

| Slice      | Purpose                    |
| ---------- | -------------------------- |
| `Hero`     | Full-bleed opening section |
| `About`    | Bio / artist statement     |
| `Services` | Offered services listing   |
| `Contact`  | Contact form or info       |
| `Header`   | Site header / nav          |
| `Footer`   | Site footer                |

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the dev server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Run Slice Machine (Prismic CMS builder):

```bash
pnpm slicemachine
```

Open [http://localhost:9999](http://localhost:9999).

## Project Structure

```
app/          # Next.js App Router pages and layouts
slices/       # Prismic Slice Machine components
components/   # Shared UI components
lib/          # Utilities (i18n, Prismic client)
hooks/        # React hooks
design/       # Design assets / tokens
customtypes/  # Prismic custom type definitions
```

## Content

Content is managed via [Prismic](https://prismic.io).
