# Metropolitan Home Health Care — Website

Website for **Metropolitan Home Health Care, Inc.** (emetrocare.com), built with Next.js 16 (App Router, TypeScript), Tailwind CSS v4 and shadcn/ui on Base UI, with Phosphor icons. It exports to static HTML, so it deploys to any static host. The audit of the previous site and the SEO decisions are in `AUDIT-AND-SEO-PLAN.md`.

## Commands

```bash
pnpm dev                  # local dev server at http://localhost:3000
pnpm build                # static export into out/
pnpm lint
node scripts/serve.mjs    # preview out/ like Vercel (clean URLs, redirects, real 404) at http://localhost:4321
node scripts/check.mjs    # SEO + link + redirect QA against the preview
```

Deploy to Vercel (same host as the old site). `vercel.json` sets clean URLs, the 301s for old URLs (`/blog/1`…`/blog/9`, `/awards`, `/services/home-maker`, `/insurance/*`) and security headers; static exports cannot run redirects themselves. After launch, submit `https://emetrocare.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Where things live

| What | Where |
|---|---|
| All page copy: services, FAQs, counties, insurers, stats, values, careers, contact (word for word from the old site) | `src/lib/content.ts` |
| Blog articles (one Markdown file each) | `content/blog/*.md` (copy `_TEMPLATE.md`) |
| Privacy Policy, HIPAA Notice | `content/legal/*.md` |
| Testimonials | `content/testimonials.json` |
| Photo sources and licences | `content/image-credits.json` |
| Brand colours, fonts, radius, prose styles | `src/app/globals.css` |
| Shared blocks (page hero, cards, FAQ, CTA band…) | `src/components/shared/` |
| Forms (request care, insurance verification) | `src/components/contact/lead-form.tsx` |
| Header, footer, mobile call bar | `src/layout/` |
| Pages | `src/app/` |

## Forms

All three forms post to the same EmailJS service and template as the previous site (`service_oa6u4ji` / `template_3lrp36m`, keys in `site.emailjs`), so leads arrive in the same inbox. The template receives `from_name`, `from_email`, `from_phone`, `service`, `message` and `time`. The coverage form deliberately asks for no date of birth, member ID or diagnosis; coordinators collect those by phone.

## Images

- Logo and icons: `public/images/logos/`
- Service photos: `public/images/services/<slug>.webp`, page photos: `public/images/pages/`, blog covers: `public/images/blog/`, award certificates: `public/images/awards/`
- Every 1200px photo has a `-640.webp` copy for phones. To add or swap a stock photo, add a line to `scripts/images.txt` and run `powershell -File scripts/fetch-images.ps1`.
- Stock photos are from Unsplash (Unsplash License, free for commercial use); sources are listed in `content/image-credits.json`.

## SEO

Every page has its own title, description, canonical URL and Open Graph tags, plus JSON-LD (`MedicalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`, `Article`). `sitemap.xml`, `robots.txt`, `llms.txt` and the web manifest are generated at build time. URLs match the old site (no trailing slash).
