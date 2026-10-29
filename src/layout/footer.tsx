import Link from "next/link";
import { CheckCircleIcon, ClockIcon, EnvelopeSimpleIcon, MapPinIcon, PhoneIcon, PrinterIcon } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/shared/section";
import { compliance, services, site, tel } from "@/lib/content";
import { cn } from "@/lib/utils";

// Services get a wide two-column block; the other pages are grouped by who they are for.
const columns: [string, [string, string][]][] = [
  [
    "Company",
    [
      ["/about", "About Us"],
      ["/certificates", "Certificates"],
      ["/careers", "Career Opportunities"],
      ["/blog", "Blog"],
    ],
  ],
  [
    "Patients & Families",
    [
      ["/service-areas", "Service Areas"],
      ["/insurance", "Insurance Information"],
      ["/#faq", "FAQs"],
      ["/contact", "Contact Us"],
    ],
  ],
];

const legal: [string, string][] = [
  ["/privacy-policy", "Privacy Policy"],
  ["/hipaa-notice", "HIPAA Notice"],
];

const heading = "mb-4 text-sm font-semibold text-foreground";
const link = "text-ink-2 transition-colors hover:text-leaf";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card text-[0.95rem]">
      <Container className="pt-12 md:pt-16">
        <div className="grid gap-10 pb-12 sm:grid-cols-2 md:pb-14 lg:grid-cols-[1.25fr_1.6fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <img src="/images/logos/logo.png" width={456} height={154} alt={site.name} loading="lazy" className="mb-5 h-14 w-auto" />
            <p className="mb-6 max-w-[320px] text-ink-2">{site.tagline} {site.description}</p>
            <ul className="grid gap-3 text-ink-2">
              <li className="flex gap-2.5">
                <PhoneIcon weight="duotone" className="mt-0.5 size-[18px] shrink-0 text-leaf" />
                <a href={tel(site.phone)} className="font-semibold text-foreground hover:text-leaf">{site.phone}</a>
              </li>
              <li className="flex gap-2.5">
                <EnvelopeSimpleIcon weight="duotone" className="mt-0.5 size-[18px] shrink-0 text-leaf" />
                <a href={`mailto:${site.email}`} className="break-all hover:text-leaf">{site.email}</a>
              </li>
              <li className="flex gap-2.5">
                <MapPinIcon weight="duotone" className="mt-0.5 size-[18px] shrink-0 text-leaf" />
                <a href={site.mapsUrl} target="_blank" rel="noopener" className="hover:text-leaf">
                  {site.address.street}, {site.address.locality}, {site.address.region} {site.address.postalCode}
                </a>
              </li>
              <li className="flex gap-2.5">
                <PrinterIcon weight="duotone" className="mt-0.5 size-[18px] shrink-0 text-leaf" />
                <span>Fax {site.fax}</span>
              </li>
              <li className="flex gap-2.5">
                <ClockIcon weight="duotone" className="mt-0.5 size-[18px] shrink-0 text-leaf" />
                <span>Flexible hours, here when you need us</span>
              </li>
            </ul>
          </div>

          <nav aria-labelledby="footer-services">
            <h2 id="footer-services" className={heading}>Our Services</h2>
            <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={link}>{s.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="font-semibold text-leaf hover:text-forest-dark">All services</Link>
              </li>
            </ul>
          </nav>

          {columns.map(([title, links]) => (
            <nav key={title} aria-label={title}>
              <h2 className={heading}>{title}</h2>
              <ul className="grid gap-2.5">
                {links.map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className={link}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <ul aria-label={compliance.title} className="flex flex-wrap gap-2 border-t py-6">
          {[...compliance.items, ...site.footerNotes].map((title) => (
            <li key={title} className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-sm text-ink-2">
              <CheckCircleIcon weight="duotone" className="size-4 text-leaf" /> {title}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t py-6 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {site.legalName} All rights reserved.</p>
          <ul className="flex flex-wrap gap-2">
            {legal.map(([href, label]) => (
              <li key={href}>
                <Link href={href} className={cn("rounded-full px-3 py-1.5 hover:bg-accent", link)}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
