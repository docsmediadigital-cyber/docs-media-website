# DOCS MEDIA — Digital Marketing Agency Website

Next.js (App Router) · TypeScript · Tailwind CSS v4. No database, login, admin dashboard or booking system.

Pages: Home, About, Services, Personal Branding, Creative Studio, Projects (+ detail), Blog (+ posts), FAQs, Contact.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Before going live

1. **Set the domain** — `NEXT_PUBLIC_SITE_URL=https://your-domain.com` (no trailing slash). It drives canonical URLs, `sitemap.xml`, `robots.txt`, Open Graph and structured data. Without it, those default to `https://www.connectdocsmedia.com` (`PRODUCTION_URL` in `src/lib/site.ts`). Rebuild after changing it (the value is read at build time).
2. **Add the real logo** — put the file in `public/` and set `siteConfig.logo.src` in `src/lib/site.ts`. The official logo is already set (`public/logo.png`, white on transparent; a purple version is in `public/logo-purple.png`).
3. **Add genuine projects** — edit `src/content/projects.ts`. The list is empty on purpose; the site shows an honest "coming soon" state. Each entry creates a card, filter chip, detail page and sitemap URL. Only add clients/metrics you have permission and real data for.
4. **Configure enquiry delivery** (see below).
5. **Review copy** — services, FAQs and the three blog posts are generic placeholders written without any client claims. Edit in `src/content/`. Optionally add `email` and real social URLs in `src/lib/site.ts` (hidden while empty).

## Where things live

| What | Where |
| --- | --- |
| WhatsApp number/URL, domain, nav, socials | `src/lib/site.ts` |
| Services, process, FAQs, blog, projects | `src/content/*.ts` |
| Personal Branding + Creative Studio pages (copy, FAQs, deliverables) | `src/content/focus-pages.ts` (rendered by `src/components/sections/FocusPageView.tsx`) |
| Local landing pages: Kanhangad, Kasaragod (English only) | `src/content/locations.ts` (URLs in `location-paths.ts`; rendered by `src/components/sections/LocationPageView.tsx`) |
| Page metadata + JSON-LD helpers | `src/lib/seo.ts` |
| Sitemap / robots / social image | `src/app/sitemap.ts`, `robots.ts`, `opengraph-image.tsx` |
| Reusable portfolio components | `src/components/projects/` (`ProjectCard`, `ProjectGrid`, `EmptyProjects`) |
| Enquiry form, schema, API | `src/components/forms/EnquiryForm.tsx`, `src/lib/enquiry-*.ts`, `src/app/api/enquiry/route.ts` |

## Enquiry form architecture

`EnquiryForm` validates in the browser, then POSTs JSON to `/api/enquiry`, which re-validates with the same zod schema, applies a honeypot and an in-memory rate limit (5 / 10 min / IP), and forwards through any configured channel:

- **Email via Resend** — `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`
- **Webhook** (Make, Zapier, n8n, Apps Script) — `ENQUIRY_WEBHOOK_URL`

With no channel configured, the form still works: after validation it hands the visitor to WhatsApp with their message pre-filled, so no enquiry is silently lost. If a configured channel fails, the visitor sees an error and a WhatsApp fallback.

Note: the rate limiter is per server instance (best effort on serverless hosting).

## SEO included

Per-page titles, descriptions, canonical URLs, Open Graph/Twitter cards, `sitemap.xml` (auto-includes posts and projects), `robots.txt` (blocks `/api/`), `manifest.webmanifest`, `/llms.txt` (AI-search summary built from `src/content/`), JSON-LD (Service + WebPage for the Personal Branding and Creative Studio pages, Organization, WebSite, BreadcrumbList, ItemList/Service, FAQPage, BlogPosting, ContactPage), local landing pages for Kanhangad and Kasaragod with Service `areaServed` schema, Organization `areaServed` (`siteConfig.serviceArea`), real HTTP 404s for unknown blog/project slugs and the Arabic URLs of English-only pages (`src/proxy.ts`), semantic headings, skip link, self-hosted fonts.

## SEO

See `docs/SEO-BACKLINK-STRATEGY.md` for the link-building plan (genuine listings, guest posts, industry links; no paid or spam links). On-site SEO is driven by `src/lib/site.ts` (`seoKeywords`, `schemaLogo`), `src/lib/seo.ts` (metadata + JSON-LD) and per-page `buildMetadata()` calls. Optional env vars `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and `NEXT_PUBLIC_BING_SITE_VERIFICATION` add search-console verification tags.

## Next.js 16 notes

This project enables Cache Components (`next.config.ts`). Prerendered code must not call `new Date()`/`Date.now()`/`Math.random()`; the sitemap and footer therefore use constants (`CONTENT_LAST_UPDATED`, `copyrightYear` in `src/lib/site.ts` — update them as content changes). `generateStaticParams` must return at least one param, which is why `projects/[slug]` returns a sentinel while the project list is empty.


## Languages (English + Arabic)

- English lives at the normal URLs (`/about`); Arabic lives under `/ar` (`/ar/about`) and renders right-to-left.
- Files are routed as `src/app/[lang]/...`; `src/proxy.ts` rewrites English URLs to `/en/...` internally and redirects `/en/...` to the plain URL.
- UI text: `src/i18n/en.ts` and `src/i18n/ar.ts` (Arabic must have every key English has, enforced by TypeScript).
- Arabic content: `src/content/ar.ts` (services, FAQs, process, principles, the two landing pages, blog titles/summaries). Use `src/content/localized.ts` accessors.
- Blog articles and the local landing pages (Kanhangad, Kasaragod) are English only; their `/ar/...` URLs return 404, and the language switcher sends Arabic readers to the blog index or the Contact page.
- Blog articles are English only. The Arabic blog index shows Arabic titles and links to the English articles; individual `/ar/blog/<slug>` URLs return 404.
- SEO: each page sets `lang`/`dir`, a self-referencing canonical and `hreflang` alternates (en, ar, x-default); the sitemap lists both languages.
- Arabic font: `@fontsource-variable/noto-sans-arabic` (run `npm install` after pulling this change).
- Have the Arabic copy reviewed by a native speaker before launch.
