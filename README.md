# MOBI FLOR

Website for **MOBI FLOR**, a custom furniture workshop in Suceava, Romania (Antoniciuc Florin Întreprindere Individuală): kitchens, wardrobes, bedrooms, wall panelling and commercial fit-outs.

The site is bilingual (Romanian at `/ro`, English at `/en`) and built for local search ("mobilă la comandă Suceava"), with a page for every project and every service.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components, static generation), React 19, TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [Lenis](https://lenis.darkroom.engineering) for smooth scrolling; scroll effects are CSS scroll-driven animations
- [sharp](https://sharp.pixelplumbing.com) for importing photos and rendering share images
- Fonts via `next/font`: Newsreader (headings) and Inter (text)

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000 (redirects to /ro or /en based on browser language)
```

Production build:

```bash
npm run build
npm start
```

`npm run lint` runs ESLint. Stop `npm start` before running `npm run build` again: rebuilding underneath a running server leaves it serving pages that point at deleted files. To build a second copy without touching a running server, set `NEXT_DIST_DIR=.next-verify`.

## Project structure

```
src/
  app/
    [lang]/                    # every page lives under /ro or /en
      page.tsx                 # home page (one long page with all sections)
      proiecte/[slug]/         # project pages + their share images
      servicii/[slug]/         # service pages + their share images
      opengraph-image.tsx      # home share image
    actions.ts                 # contact form (Server Action)
    sitemap.ts, robots.ts, manifest.ts, icon.svg
  proxy.ts                     # language redirect for "/" and real 404s for unknown slugs
  config/site.ts               # business details: name, phone, email, address, domain
  dictionaries/ro.ts, en.ts    # all interface text and section copy
  content/
    projects.ts                # projects: titles, descriptions, highlights, photo alt texts
    services.ts                # service pages: headings, copy, related projects
    project-images.ts          # GENERATED photo imports (see below)
  assets/projects/             # processed photos, one folder per project
  components/                  # page sections and UI pieces
  lib/seo.ts, lib/og.tsx       # metadata, structured data (JSON-LD), share images
scripts/import-photos.mjs      # photo import pipeline
```

## Editing content

| What | Where |
|---|---|
| Phone, email, address, social links, domain | `src/config/site.ts` |
| Section text, FAQ, form labels (RO and EN) | `src/dictionaries/ro.ts`, `src/dictionaries/en.ts` |
| Project titles, descriptions, highlights, alt texts | `src/content/projects.ts` |
| Service pages | `src/content/services.ts` |

Optional business fields (street address, social profiles) are hidden on the site and left out of structured data until they're filled in.

### Adding or changing project photos

Original photos are **not** committed. They live in `proiecte/` (git-ignored): WhatsApp zip archives, one per project, plus loose images.

1. Put the new files in `proiecte/`.
2. In `scripts/import-photos.mjs`, add or edit the project's entry in `PROJECTS`. Photos are referenced by their WhatsApp timestamp (e.g. `"14.04.58 (1)"`), and the first one is the cover.
3. Run `npm run import-photos`. It unzips the archives, auto-rotates and resizes the photos (2400px long edge), strips all metadata including GPS location, writes descriptive file names to `src/assets/projects/<slug>/`, and regenerates `src/content/project-images.ts`.
4. Add the project's text in `src/content/projects.ts`, with exactly one alt text per photo in each language (the build fails if the counts differ).

## SEO

- Statically generated pages with per-page titles, descriptions, canonical URLs and `hreflang` (ro / en / x-default)
- JSON-LD: `FurnitureStore` (local business), `WebSite`, `FAQPage`, `ItemList` of projects, plus `BreadcrumbList` and `CreativeWork` / `Service` on project and service pages
- Sitemap with language alternates and image entries; generated share images per page
- Real 404s for unknown project and service URLs

### Domain and indexing

The canonical domain comes from the `NEXT_PUBLIC_SITE_URL` environment variable (see `.env.example`):

- **Not set (draft):** on Vercel the site uses its own `*.vercel.app` address, so links and share previews work, and it tells search engines **not to index** it.
- **Set to the real domain:** canonical URLs, the sitemap and structured data use that domain, and indexing is switched on.

## Deployment

The site runs on [Vercel](https://vercel.com) with no extra configuration: import the GitHub repository and deploy. Set `NEXT_PUBLIC_SITE_URL` only once the real domain is connected.

## Still to do

- **Contact form:** requests are validated and logged on the server but **not delivered** yet. Connect an email service (e.g. Resend) in `src/app/actions.ts`.
- **Business details:** street address, opening hours and social profiles in `src/config/site.ts`.
- **Real domain:** register it, connect it in Vercel, set `NEXT_PUBLIC_SITE_URL`.
- **Google Business Profile and Search Console:** set up, then submit `/sitemap.xml`.

## License

Private project. All rights reserved. Photos © MOBI FLOR.
