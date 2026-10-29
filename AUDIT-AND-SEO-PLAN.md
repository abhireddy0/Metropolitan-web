# emetrocare.com: Audit & SEO Plan

Audit date: 2026-10-28. Method: fetched live HTML, robots.txt, sitemap.xml and the production JS/CSS bundle, and extracted all content, routes, assets and form wiring.

## 1. What exists today

**Stack:** React single-page app (Vite, built with Lovable), hosted on Vercel (308 redirects for http→https and www→apex).

**Business facts (kept as-is):**

| | |
|---|---|
| Legal name | Metropolitan Home Health Care, Inc. |
| Address | 340 E Dundee Rd, Wheeling, IL 60090-3176 |
| Phone | (847) 568-1033 |
| Fax | (847) 568-1034 |
| Email | metro@emetrocare.com (also info@emetrocare.com) |
| Licensing | Licensed by the Illinois Department of Public Health; Medicare-certified; HIPAA compliant |
| Recognition | HomeCare Elite® awards 2006, 2007, 2008, 2009; HomeCare Elite Top 100 (2019); certificate images on site |
| Counties | Cook, Lake, DuPage, Will, McHenry, Kane, LaSalle, Grundy, Kankakee, DeKalb |
| Stats used on site | 3,000+ patients served · 15+ years · 100+ licensed professionals · 98% satisfaction |
| Mission | "To deliver quality homecare services in a compassionate and cost effective manner…" |
| Analytics | GA4 `G-SE3LNF55S7`, Microsoft Clarity `tnxmu093oc` |
| Contact form | EmailJS (`service_oa6u4ji` / `template_3lrp36m`), fields: name, email, phone, service, message |

**URL structure (from sitemap + router):**
`/`, `/about`, `/services`, `/services/{skilled-nursing, health-aide, social-worker, physical-therapy, speech-therapy, occupational-therapy, specialized-care, palliative-care, infusion-therapy, homemaker}`, `/insurance` (live but missing from sitemap), `/service-areas`, `/awards`, `/certificates`, `/blog`, `/blog/1`…`/blog/9`, `/careers`, `/contact`, `/privacy-policy`, `/hipaa-notice`.

## 2. Issues found

### Critical (SEO / indexing)
1. **Every page ships an empty `<div id="root">`.** All content is rendered by JavaScript. Google can render it eventually, but Bing, social crawlers and AI search engines see no content. Every URL also returns the **homepage's** `<title>`, description and canonical (`https://emetrocare.com`) in its raw HTML, which tells crawlers that all 30 URLs are duplicates of the homepage.
2. **Soft 404s.** Any made-up URL (e.g. `/this-page-does-not-exist`) returns HTTP 200 with the homepage shell.
3. **Broken social image.** `og:image` (`/og-image.jpg`) and `twitter:image` return the HTML page, not an image, so shared links show no preview.
4. **Blog URLs are numeric** (`/blog/1`) and posts are one-paragraph stubs (thin content). Authors are named doctors (e.g. "Dr. Sarah Johnson") whose names are also used in the testimonials, which reads as fabricated and hurts E-E-A-T.
5. `/insurance` is live but missing from the sitemap. The sitemap lists `/services/homemaker`, while the app links to `/services/home-maker`.

### Trust / legal
6. Testimonial and blog photos are **hot-linked watermark previews from iStock and Vecteezy** plus `randomuser.me` avatars. That is unlicensed use and visibly fake.
7. **The Privacy Policy lists another company's details**: "400 Interstate North Parkway SE, Suite 1600, Atlanta, Georgia 30339", `privacy@metropolitanhomehealthcare.com`, and 1-800-408-4442. These look copied from a different organisation's notice.
8. The insurance verification form collects **date of birth, insurance member ID and diagnosis** and sends them through EmailJS, which is not a HIPAA-compliant channel.
9. The cost calculator shows invented per-visit prices ($150/visit and so on) as estimates.
10. Facebook, X and LinkedIn icons link to the bare homepages of those networks.
11. Footer says "HomeCare Elite Agency 2023", but the certificates on file are 2006–2009 and 2019.

### UX / performance
12. A 1 MB JS bundle must download and run before anything shows. Images are unoptimised (up to 1.2 MB JPEGs).
13. Mixed visual language (gradients, multicolour icons, many card styles), with no consistent type scale.

## 3. Redesign decisions

* **Static, pre-rendered HTML** for every page (Next.js 16 static export, same structure as the Stream Quanta Tech site). Each URL gets its own title, description, canonical, OG tags and JSON-LD in the raw HTML, so crawlers no longer depend on JavaScript.
* **Keep every existing URL** so rankings carry over, with 301s only where a URL improves:
  * `/blog/1`…`/blog/9` → descriptive slugs
  * `/awards` → `/certificates` (on the live old site `/awards` was a 404; the certificates page was the real one)
  * `/services/home-maker` → `/services/homemaker`
  * `/insurance/*` → `/insurance`
* **Real 404** (`404.html`, served with status 404 by Vercel).
* **Structured data:** `MedicalBusiness` (full NAP, fax, area served, awards) site-wide; `Service` + `BreadcrumbList` on service pages; `FAQPage` on the About page; `Article` on blog posts.
* **Fresh sitemap.xml** (all canonical URLs, including `/insurance`) and robots.txt.
* **Local SEO:** consistent NAP in the footer of every page, "Wheeling, IL" + county/city coverage on `/service-areas`, internal linking between services, areas and insurance.
* **Images:** free-licence Unsplash photos (Unsplash License, commercial use OK, no attribution required), self-hosted, resized to WebP at 2 widths, lazy-loaded with explicit dimensions. Original certificate scans and the logo are kept.
* **Forms:** the contact / request-care form keeps the same EmailJS service and template, so leads go to the same inbox. Insurance verification now asks only for name, phone, email and carrier, never DOB, member ID or diagnosis. A coordinator verifies benefits by phone. A honeypot field filters spam.
* **Removed:** fake avatars, watermarked images, placeholder social links, invented price calculator, `meta keywords`.
* **Blog:** the live old `/blog` only said "Coming Soon" and `/blog/1`–`/blog/9` were 404s. The client chose to keep 9 new full articles, attributed to "Metropolitan Clinical Team".
* **Analytics:** GA4 and Clarity tags are preserved, loaded after page content.

## 4. Items the client must confirm before launch
1. Correct privacy-officer address, email and phone for the Privacy Policy (the current one is Atlanta-based).
2. Whether the five testimonials are from real patients/families (and permission to publish). They are kept, with names shortened to first name + last initial.
3. "HomeCare Elite 2023": provide the certificate, or keep the verified 2006–2009 and 2019 awards only (current redesign).
4. Real Facebook / LinkedIn URLs, if any.
5. Office hours. The current site only says "Flexible hours" and "Call us anytime", and the redesign keeps that wording. Adding real hours would strengthen the Google Business / schema data.
6. Roles currently being hired.

## 5. Content decision (2026-10-29)

The client asked for the copy to stay the same as the old site. Every page now uses the old site's wording, captured from the live rendered pages: headings, paragraphs, service lists, FAQs (all 16), testimonials (full names), stats, insurance providers, careers, contact, page titles and meta descriptions. An automated comparison finds 828 of 847 old text lines on the new pages; the remainder are typo fixes ("Commericial" → "Commercial", "IV Fusion" → "IV Infusion", "Homemaker Service Services" → "Homemaker Services") and formatting.

Client choices where the old content had issues:
- Privacy Policy and HIPAA Notice: **exactly as old**, including the Atlanta privacy-officer address, privacy@metropolitanhomehealthcare.com and 1-800-408-4442 (items 1 above still stands as a legal risk).
- Insurance: old text and provider list, but the verification form asks only name, phone, email, insurer and service (no DOB, insurance ID or diagnosis), and the cost calculator is not shown.
- Careers: exactly as old (no application form).
- Blog: keep the 9 new articles.
