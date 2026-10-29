import Link from "next/link";
import { ClockIcon, EnvelopeSimpleIcon, HeadsetIcon, MapPinIcon, PrinterIcon } from "@phosphor-icons/react/ssr";
import { ContactList, PageHero, TextLink } from "@/components/shared/blocks";
import { CopyButton } from "@/components/contact/copy-button";
import { LeadForm } from "@/components/contact/lead-form";
import { JsonLd } from "@/components/shared/json-ld";
import { Section } from "@/components/shared/section";
import { contactPage as page, site, tel } from "@/lib/content";
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

const card = "rounded-2xl border bg-card p-7";

export default function ContactPage() {
  const [emailRow, areaRow, responseRow] = page.other.items;
  return (
    <>
      <JsonLd data={crumbsLd(crumbs)} />
      <PageHero crumbs={crumbs} eyebrow={page.eyebrow} title={page.title} lead={page.sub} className="[&>div]:pb-4 md:[&>div]:pb-6" />
      <Section inner="pt-6 md:pt-8">
        <div className="grid gap-10 lg:grid-cols-[7fr_5fr] lg:gap-14">
          <div id="request" className="scroll-mt-28 lg:sticky lg:top-[100px] lg:max-h-[calc(100vh-116px)] lg:self-start lg:overflow-y-auto lg:rounded-2xl lg:scrollbar-none">
            <LeadForm kind="request" title={page.form.title} intro={page.form.sub} />
          </div>
          <aside className="grid content-start gap-5">
            <div className={card}>
              <h2 className="mb-1 font-sans text-xl font-semibold tracking-normal">{page.support.title}</h2>
              <p className="mb-3 text-muted-foreground">{page.support.text}</p>
              <a href={tel(site.phone)} className="flex items-center gap-2 text-2xl font-semibold text-forest hover:underline"><HeadsetIcon weight="duotone" className="size-7 text-leaf" /> {site.phone}</a>
            </div>
            <div className={card}>
              <h2 className="mb-1 font-sans text-xl font-semibold tracking-normal">{page.faxBox.title}</h2>
              <p className="mb-3 text-muted-foreground">{page.faxBox.text}</p>
              <p className="flex items-center gap-2 text-lg font-semibold"><PrinterIcon weight="duotone" className="size-6 text-leaf" /> {site.fax} <CopyButton value={site.fax} /></p>
            </div>
            <div className={card}>
              <h2 className="mb-5 font-sans text-xl font-semibold tracking-normal">{page.other.title}</h2>
              <ContactList
                rows={[
                  { icon: EnvelopeSimpleIcon, label: emailRow[0], value: emailRow[1], href: `mailto:${site.email}` },
                  { icon: MapPinIcon, label: areaRow[0], value: areaRow[1] },
                  { icon: ClockIcon, label: responseRow[0], value: responseRow[1] },
                ]}
              />
            </div>
            <div className={card}>
              <h2 className="mb-4 font-sans text-xl font-semibold tracking-normal">{page.counties.title}</h2>
              <ul className="mb-5 flex flex-wrap gap-2">
                {page.counties.items.map((c) => <li key={c} className="rounded-full bg-sage px-3 py-1 text-sm font-semibold text-forest">{c}</li>)}
              </ul>
              <TextLink href="/service-areas">{page.counties.link}</TextLink>
            </div>
            <div className="rounded-2xl border border-sage-2 bg-sage p-7">
              <h2 className="mb-1 font-sans text-xl font-semibold tracking-normal">{page.partner.title}</h2>
              <p className="mb-4 text-ink-2">{page.partner.sub}</p>
              <ul className="grid gap-3">
                {page.partner.items.map(([t, d]) => (
                  <li key={t}><strong className="block">{t}</strong><span className="text-ink-2">{d}</span></li>
                ))}
              </ul>
            </div>
            <div className="aspect-4/3 overflow-hidden rounded-2xl border">
              <iframe
                title="Map of Metropolitan Home Health Care office, 340 E Dundee Rd, Wheeling, IL"
                src="https://www.google.com/maps?q=340+E+Dundee+Rd,+Wheeling,+IL+60090&output=embed"
                className="size-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {site.address.street}, {site.address.locality}, {site.address.region} {site.address.postalCode}. <Link href="/service-areas" className="text-leaf underline underline-offset-3">Service Areas</Link>
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
