import Link from "next/link";
import { ArrowRightIcon, EnvelopeSimpleIcon, MapPinIcon, PhoneIcon, PrinterIcon } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/shared/section";
import { Separator } from "@/components/ui/separator";
import { services, site, tel } from "@/lib/content";
import { cn } from "@/lib/utils";

// Services get a wide two-column block next to the brand; the other pages are grouped by who they are for.
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

const contacts = [
  { icon: PhoneIcon, href: tel(site.phone), body: site.phone, strong: true },
  { icon: EnvelopeSimpleIcon, href: `mailto:${site.email}`, body: site.email },
  {
    icon: MapPinIcon,
    href: site.mapsUrl,
    external: true,
    body: (
      <>
        {site.address.street}
        <br />
        {site.address.locality}, {site.address.region} {site.address.postalCode}
      </>
    ),
  },
  { icon: PrinterIcon, body: `Fax ${site.fax}` },
];

const heading = "text-base font-semibold text-foreground";
const link = "link-animated transition-colors duration-300 hover:text-foreground";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card text-small">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 sm:py-16 md:py-20 lg:grid-cols-12 lg:gap-x-6">
        <div className="flex flex-col items-start gap-5 sm:col-span-2 lg:col-span-4 lg:pr-10">
          <Link href="/">
            <img src="/images/logos/logo.png" width={456} height={154} alt={site.name} loading="lazy" className="h-14 w-auto" />
          </Link>
          <p className="max-w-[360px] text-muted-foreground">{site.tagline} {site.description}</p>
          <address className="grid gap-3 text-muted-foreground not-italic">
            {contacts.map(({ icon: Icon, href, external, body, strong }, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sage text-leaf">
                  <Icon weight="duotone" className="size-4" />
                </span>
                {href ? (
                  <a href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})} className={cn(link, "mt-1 break-all", strong && "font-semibold text-foreground")}>
                    {body}
                  </a>
                ) : (
                  <span className="mt-1">{body}</span>
                )}
              </div>
            ))}
          </address>
        </div>

        <nav aria-labelledby="footer-services" className="flex flex-col gap-5 sm:col-span-2 lg:col-span-4">
          <h2 id="footer-services" className={heading}>Our Services</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-muted-foreground">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className={link}>{s.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/services" className="link-animated inline-flex items-center gap-1 font-semibold text-leaf">
                All services <ArrowRightIcon className="size-4" />
              </Link>
            </li>
          </ul>
        </nav>

        {columns.map(([title, links]) => (
          <nav key={title} aria-label={title} className="flex flex-col gap-5 lg:col-span-2">
            <h2 className={heading}>{title}</h2>
            <ul className="space-y-3 text-muted-foreground">
              {links.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className={link}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <Separator />
      <Container className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-6 text-center text-sm font-medium">
        <p>© {new Date().getFullYear()} {site.legalName} All rights reserved.</p>
        {legal.map(([href, label]) => (
          <span key={href} className="flex items-center gap-2">
            <span aria-hidden className="text-muted-foreground">·</span>
            <Link href={href} className={link}>{label}</Link>
          </span>
        ))}
      </Container>
    </footer>
  );
}
