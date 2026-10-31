import Link from "next/link";
import { EnvelopeSimpleIcon, MapPinIcon, PhoneIcon, PrinterIcon } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/shared/section";
import { services, site, tel } from "@/lib/content";

// Tagline and phone on the left, four link columns on the right, then the copyright row,
// then an oversized faded "METROPOLITAN" wordmark that sits on the bottom edge.
const columns: [string, [string, string][]][] = [
  ["Services", [...services.slice(0, 4).map((s): [string, string] => [`/services/${s.slug}`, s.name]), ["/services", "All services"]]],
  [
    "Company",
    [
      ["/about", "About Us"],
      ["/certificates", "Certificates"],
      ["/careers", "Careers"],
      ["/blog", "Blog"],
    ],
  ],
  [
    "Patients",
    [
      ["/service-areas", "Service Areas"],
      ["/#faq", "FAQs"],
      ["/contact", "Contact Us"],
    ],
  ],
];

const legal: [string, string][] = [
  ["/privacy-policy", "Privacy Policy"],
  ["/hipaa-notice", "HIPAA Notice"],
];

const link = "link-animated text-muted-foreground transition-colors duration-300 hover:text-foreground";
const row = "flex items-start gap-2.5 transition-colors duration-300";
const icon = "mt-0.5 size-[18px] shrink-0 text-primary";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t bg-background">
      <Container className="grid gap-12 pt-16 pb-10 lg:grid-cols-12 lg:pt-20">
        <div className="space-y-5 lg:col-span-4">
          <p className="text-2xl leading-snug font-bold">{site.tagline}</p>
          <p className="max-w-[320px] text-[0.9375rem] text-muted-foreground">Compassionate, professional care in the comfort of home across the Chicago metro.</p>
          <a href={tel(site.phone)} className="inline-flex items-center gap-2 text-lg font-semibold text-primary hover:underline">
            <PhoneIcon weight="duotone" className="size-5" />
            {site.phone}
          </a>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-[1fr_1fr_1fr_1.35fr] lg:col-span-8">
          {columns.map(([title, links]) => (
            <nav key={title} aria-label={title} className="flex flex-col gap-4">
              <h2 className="font-sans text-base font-semibold tracking-normal">{title}</h2>
              <ul className="space-y-3 text-[0.9375rem]">
                {links.map(([href, label]) => (
                  <li key={href}><Link href={href} className={link}>{label}</Link></li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-1">
            <h2 className="font-sans text-base font-semibold tracking-normal">Office</h2>
            <address className="space-y-3 text-[0.9375rem] text-muted-foreground not-italic">
              <a href={site.mapsUrl} target="_blank" rel="noopener" className={`${row} hover:text-foreground`}>
                <MapPinIcon weight="duotone" className={icon} />
                <span>
                  {site.address.street}
                  <br />
                  <span className="whitespace-nowrap">{site.address.locality}, {site.address.region} {site.address.postalCode.slice(0, 5)}</span>
                </span>
              </a>
              <a href={`mailto:${site.email}`} className={`${row} hover:text-foreground`}>
                <EnvelopeSimpleIcon weight="duotone" className={icon} />
                <span className="break-words">{site.email}</span>
              </a>
              <span className={row}>
                <PrinterIcon weight="duotone" className={icon} />
                Fax {site.fax}
              </span>
            </address>
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t py-6 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {site.legalName} All rights reserved.</p>
          <div className="flex gap-6">
            {legal.map(([href, label]) => <Link key={href} href={href} className={link}>{label}</Link>)}
          </div>
        </div>
      </Container>
      {/* SVG so the word is stretched to exactly the container width at every screen size; it fades out downward. */}
      <Container aria-hidden className="pointer-events-none select-none">
        <svg viewBox="0 0 1000 118" className="-mb-[2%] block w-full text-primary">
          <defs>
            <linearGradient id="footer-wordmark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="currentColor" stopOpacity="0.16" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <text x="500" y="112" textAnchor="middle" textLength="1000" lengthAdjust="spacingAndGlyphs" fill="url(#footer-wordmark)" className="font-sans text-[148px] font-extrabold">
            METROPOLITAN
          </text>
        </svg>
      </Container>
    </footer>
  );
}
