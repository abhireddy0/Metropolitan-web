import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  ClockIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneIcon,
  PrinterIcon,
} from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Breadcrumbs, TextLink } from "@/components/shared/blocks";
import { CopyButton } from "@/components/contact/copy-button";
import { LeadForm } from "@/components/contact/lead-form";
import { JsonLd } from "@/components/shared/json-ld";
import { Media } from "@/components/shared/media";
import { Container, Eyebrow, Section } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { contactPage as page, firstVisit, site, tel } from "@/lib/content";
import { crumbsLd, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact Metropolitan Home Health Care | Chicago Home Healthcare Services",
  description: "Get in touch with Metropolitan Home Health Care for professional and compassionate home healthcare services across the Chicago metro area. Medicare certified and licensed professionals ready to assist your family's needs.",
});

const crumbs: [string, string][] = [
  ["Home", "/"],
  ["Contact", "/contact"],
];

const [emailRow, areaRow, responseRow] = page.other.items;

// Quick ways to reach the office, shown as large tiles under the hero.
const quick: { icon: Icon; label: string; value: string; note: string; href?: string; copy?: string }[] = [
  { icon: PhoneIcon, label: page.support.title, value: site.phone, note: page.support.text, href: tel(site.phone) },
  { icon: EnvelopeSimpleIcon, label: emailRow[0], value: emailRow[1], note: responseRow[0] + ": " + responseRow[1].toLowerCase(), href: `mailto:${site.email}` },
  { icon: PrinterIcon, label: page.faxBox.title, value: site.fax, note: page.faxBox.text, copy: site.fax },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={crumbsLd(crumbs)} />

      <section>
        <Container className="pt-8 pb-12 md:pt-12 md:pb-16">
          <Breadcrumbs items={crumbs} />
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <Eyebrow className="mb-5">{page.eyebrow}</Eyebrow>
              <h1 className="mb-5 text-display leading-[1.05] tracking-[-0.035em]">{page.title}</h1>
              <p className="mb-8 max-w-[520px] text-lead text-ink-2">{page.sub}</p>
              <div className="flex flex-wrap gap-3">
                <a href="#request" className={buttonVariants({ size: "lg" })}>{page.form.title}</a>
                <a href={tel(site.phone)} className={buttonVariants({ variant: "outline", size: "lg" })}><PhoneIcon weight="duotone" /> {site.phone}</a>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-small text-ink-2">
                {[areaRow[1], `${responseRow[0]}: ${responseRow[1]}`, page.partner.items[0][0]].map((t) => (
                  <li key={t} className="flex items-center gap-2"><CheckCircleIcon weight="fill" className="size-[18px] text-leaf" /> {t}</li>
                ))}
              </ul>
            </div>
            <Media slot="pages/contact" alt="Metropolitan care coordinator speaking with a family about home health services" eager sizes="(max-width: 1024px) 100vw, 600px" className="aspect-4/3 rounded-3xl shadow-[0_32px_60px_-36px_rgb(18_48_29/0.45)]" />
          </div>

          <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
            {quick.map(({ icon: Glyph, label, value, note, href, copy }) => (
              <li key={label} className="group relative flex items-center gap-4 rounded-2xl border bg-card p-5 transition-[border-color,box-shadow] hover:border-sage-2 hover:shadow-[0_18px_36px_-24px_rgb(18_48_29/0.4)] md:p-6">
                <span className="grid size-13 shrink-0 place-items-center rounded-xl bg-cta text-white">
                  <Glyph weight="duotone" className="size-7" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm text-muted-foreground">{label}</span>
                  {href ? (
                    <a href={href} className="block truncate text-lg font-semibold text-forest-dark after:absolute after:inset-0 hover:text-leaf">{value}</a>
                  ) : (
                    <span className="block text-lg font-semibold text-forest-dark">{value}</span>
                  )}
                  <span className="block text-sm text-muted-foreground">{note}</span>
                </span>
                {copy && <CopyButton value={copy} />}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Section tone="sage" aria-label="Request care">
        <div className="grid gap-10 lg:grid-cols-[7fr_5fr] lg:gap-14">
          <div id="request" className="scroll-mt-28 [&>*]:shadow-[0_32px_60px_-40px_rgb(18_48_29/0.45)]">
            <LeadForm kind="request" title={page.form.title} intro={page.form.sub} />
          </div>

          <aside className="grid content-start gap-8 lg:pt-4">
            <div>
              <h2 className="mb-6 text-h3 leading-tight">What happens next</h2>
              <ol className="grid gap-5">
                {firstVisit.steps.slice(0, 3).map(([title, body], i) => (
                  <li key={title} className="flex gap-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-card text-sm font-semibold text-forest ring-1 ring-sage-2">{i + 1}</span>
                    <span>
                      <strong className="block font-semibold">{title}</strong>
                      <span className="text-small leading-snug text-ink-2">{body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl bg-card p-6">
              <h2 className="mb-1 text-lg font-semibold tracking-normal">{page.partner.title}</h2>
              <p className="mb-4 text-sm text-muted-foreground">{page.partner.sub}</p>
              <ul className="grid gap-3">
                {page.partner.items.map(([t, d]) => (
                  <li key={t} className="flex gap-3">
                    <CheckCircleIcon weight="fill" className="mt-0.5 size-5 shrink-0 text-leaf" />
                    <span><strong className="font-semibold">{t}</strong> <span className="text-ink-2">{d}</span></span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold tracking-normal">{page.counties.title}</h2>
              <ul className="mb-4 flex flex-wrap gap-2">
                {page.counties.items.map((c) => <li key={c} className="rounded-full border border-sage-2 bg-card px-3 py-1 text-sm font-semibold text-forest">{c}</li>)}
              </ul>
              <TextLink href="/service-areas">{page.counties.link}</TextLink>
            </div>
          </aside>
        </div>
      </Section>

      <Section aria-labelledby="visit-title">
        <div className="relative overflow-hidden rounded-3xl border bg-card shadow-[0_24px_48px_-36px_rgb(18_48_29/0.4)]">
          <iframe
            title="Map of Metropolitan Home Health Care office, 340 E Dundee Rd, Wheeling, IL"
            src="https://www.google.com/maps?q=340+E+Dundee+Rd,+Wheeling,+IL+60090&z=12&output=embed"
            className="block h-[360px] w-full border-0 md:h-[460px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="border-t p-6 md:absolute md:top-6 md:right-6 md:max-w-[340px] md:rounded-2xl md:border md:shadow-[0_18px_36px_-20px_rgb(18_48_29/0.45)] md:bg-card md:p-7">
            <span className="mb-4 grid size-11 place-items-center rounded-xl bg-sage text-forest"><MapPinIcon weight="duotone" className="size-6" /></span>
            <h2 id="visit-title" className="mb-2 text-title leading-tight">Our Office</h2>
            <address className="mb-1 text-ink-2 not-italic">
              {site.address.street}
              <br />
              {site.address.locality}, {site.address.region} {site.address.postalCode}
            </address>
            <p className="mb-5 flex items-center gap-2 text-sm text-muted-foreground"><ClockIcon weight="duotone" className="size-4 text-leaf" /> {responseRow[0]}: {responseRow[1]}</p>
            <a href={site.mapsUrl} target="_blank" rel="noopener" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
              Open in Google Maps <ArrowUpRightIcon />
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
