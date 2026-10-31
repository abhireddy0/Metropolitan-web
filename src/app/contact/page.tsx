import type { CSSProperties } from "react";
import { ClockIcon, EnvelopeSimpleIcon, MapPinIcon, MapTrifoldIcon, PhoneIcon, PrinterIcon } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Faq } from "@/components/shared/blocks";
import { CopyButton } from "@/components/contact/copy-button";
import { LeadForm } from "@/components/contact/lead-form";
import { JsonLd } from "@/components/shared/json-ld";
import { Media } from "@/components/shared/media";
import { Container, Eyebrow } from "@/components/shared/section";
import { contactPage as page, faqs, site, tel } from "@/lib/content";
import { crumbsLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact Metropolitan Home Health Care | Chicago Home Healthcare Services",
  description: "Get in touch with Metropolitan Home Health Care for professional and compassionate home healthcare services across the Chicago metro area. Medicare certified and licensed professionals ready to assist your family's needs.",
});

const crumbs: [string, string][] = [
  ["Home", "/"],
  ["Contact", "/contact"],
];

const [emailRow, , responseRow] = page.other.items;

// Staggers the hero's page-load entrance (animate-rise in globals.css), the same way the blog and careers pages do.
const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

// The direct ways to reach the office, listed beside the form.
const quick: { icon: Icon; label: string; value: string; note: string; href?: string; copy?: string }[] = [
  { icon: PhoneIcon, label: page.support.title, value: site.phone, note: page.support.text, href: tel(site.phone) },
  { icon: EnvelopeSimpleIcon, label: emailRow[0], value: emailRow[1], note: `${responseRow[0]}: ${responseRow[1].toLowerCase()}`, href: `mailto:${site.email}` },
  { icon: MapPinIcon, label: "Visit us", value: `${site.address.street}, ${site.address.locality}, ${site.address.region}`, note: "Get directions", href: site.mapsUrl },
  { icon: PrinterIcon, label: page.faxBox.title, value: site.fax, note: page.faxBox.text, copy: site.fax },
];

// General questions a first-time caller usually has.
const contactFaqs = ["How do I start home health care services?", "Who qualifies for home health care services?", "What areas do you serve?", "Do we have to pay for it?", "How often will healthcare professionals visit?"].map(
  (q) => faqs.find((f) => f.q === q)!,
);

/** Centred section heading, matching the blog and careers pages. */
function Heading({ eyebrow, title, sub, id }: { eyebrow: string; title: string; sub: string; id: string }) {
  return (
    <div className="mx-auto mb-10 flex max-w-[720px] flex-col items-center gap-3 text-center sm:mb-14">
      <Eyebrow className="self-center">{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-1 text-2xl font-bold sm:text-3xl lg:text-4xl">{title}</h2>
      <p className="text-base text-muted-foreground sm:text-lg">{sub}</p>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <JsonLd data={crumbsLd(crumbs)} />

      {/* Hero band under the transparent header: centred intro and a wide photo. */}
      <section className="-mt-[70px] bg-muted pt-[calc(70px+2rem)] pb-12 sm:pt-[calc(70px+3rem)] lg:-mt-[84px] lg:pt-[calc(84px+3.5rem)] lg:pb-16">
        <Container>
          <div className="mx-auto flex max-w-[720px] flex-col items-center gap-3 text-center">
            <Eyebrow className="animate-rise self-center">{page.eyebrow}</Eyebrow>
            <h1 className="animate-rise mt-1 text-[2rem] leading-[1.15] font-bold sm:text-[2.5rem] lg:text-[2.75rem]" style={rise(80)}>{page.title}</h1>
            <p className="animate-rise text-base text-muted-foreground sm:text-lg" style={rise(160)}>{page.sub}</p>
          </div>
          <div className="animate-rise mt-10 lg:mt-12" style={rise(240)}>
            <Media slot="pages/contact" alt="Older couple relaxing together at home" eager className="aspect-4/3 rounded-2xl sm:aspect-video lg:aspect-21/9" />
          </div>
        </Container>
      </section>

      {/* Side by side: direct contact details as a divided list on the left, the form on the right. */}
      <section aria-labelledby="request-title" className="py-14 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-0">
          <div className="lg:pr-14">
            <h2 className="text-2xl font-bold sm:text-3xl">Reach us directly</h2>
            <p className="mt-2 text-muted-foreground">Call, email or stop by. We&apos;re glad to help with any question.</p>
            <ul className="mt-8 divide-y divide-foreground/10 border-y border-foreground/10">
              {quick.map(({ icon: Glyph, label, value, note, href, copy }) => (
                <li key={label} className="group relative flex items-center gap-4 py-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Glyph weight="duotone" className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-muted-foreground">{label}</span>
                    {href ? (
                      <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})} className="block font-semibold break-words after:absolute after:inset-0 group-hover:text-primary">{value}</a>
                    ) : (
                      <span className="block font-semibold">{value}</span>
                    )}
                    <span className="block text-sm text-muted-foreground">{note}</span>
                  </span>
                  {copy && <CopyButton value={copy} />}
                </li>
              ))}
            </ul>
          </div>

          <div id="request" className="scroll-mt-28 border-t pt-12 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-14">
            <div className="mb-8 space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <ClockIcon weight="bold" className="size-3.5" /> {responseRow[0]}: {responseRow[1].toLowerCase()}
              </span>
              <h2 id="request-title" className="text-2xl font-bold sm:text-3xl">{page.form.title}</h2>
              <p className="text-muted-foreground">{page.form.sub}</p>
            </div>
            <LeadForm bare kind="request" />
          </div>
        </Container>
      </section>

      {/* A plain Google map of the office with Google's own marker and controls. */}
      <section aria-labelledby="visit-title" className="bg-muted py-16 lg:py-24">
        <Container>
          <div className="mx-auto mb-8 flex max-w-[720px] flex-col items-center gap-3 text-center lg:mb-10">
            <Eyebrow className="self-center">Visit us</Eyebrow>
            <h2 id="visit-title" className="mt-1 text-2xl font-bold sm:text-3xl lg:text-4xl">Our Office</h2>
            <address className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-base text-muted-foreground not-italic sm:text-lg">
              <span className="inline-flex items-center gap-2">
                <MapPinIcon weight="duotone" className="size-5 shrink-0 text-primary" />
                {site.address.street}, {site.address.locality}, {site.address.region} {site.address.postalCode.slice(0, 5)}
              </span>
              <a href={site.mapsUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
                <MapTrifoldIcon weight="duotone" className="size-5" /> Get directions
              </a>
            </address>
          </div>
          <iframe
            title="Map of Metropolitan Home Health Care office, 340 E Dundee Rd, Wheeling, IL"
            src="https://www.google.com/maps?q=340+E+Dundee+Rd,+Wheeling,+IL+60090&z=13&output=embed"
            className="block h-[380px] w-full rounded-2xl border-0 md:h-[480px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Container>
      </section>

      <section aria-labelledby="contact-faq-title" className="py-16 lg:py-24">
        <Container>
          <Heading id="contact-faq-title" eyebrow="FAQ’s" title="Before you call" sub="Quick answers to what families ask us most about getting started." />
          <div className="mx-auto max-w-[800px]">
            <Faq items={contactFaqs} />
          </div>
        </Container>
      </section>
    </>
  );
}
