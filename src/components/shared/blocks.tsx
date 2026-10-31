import Link from "next/link";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CertificateIcon,
  CheckCircleIcon,
  ClockIcon,
  EnvelopeSimpleIcon,
  HeartIcon,
  IdentificationBadgeIcon,
  LockKeyIcon,
  MapPinIcon,
  PhoneIcon,
  QuotesIcon,
  ShieldCheckIcon,
  TargetIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Media } from "@/components/shared/media";
import { PanelTabs } from "@/components/shared/panel-tabs";
import { ItemIcon } from "@/components/shared/item-icon";
import { ServiceIcon } from "@/components/shared/service-icon";
import { Container, Eyebrow } from "@/components/shared/section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { closingCta, compliance, contactBlock, faqIntro, mission, site, tel, type County, type Faq, type Pair, type Service } from "@/lib/content";
import { cn } from "@/lib/utils";

export const h2Class = "text-h2 leading-[1.15]";

export function Breadcrumbs({ items }: { items: [name: string, path: string][] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-small text-muted-foreground">
      <ol className="flex flex-wrap gap-1.5">
        {items.map(([name, path], i) => (
          <li key={path} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden className="text-line-strong">/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page">{name}</span>
            ) : (
              <Link href={path} className="hover:text-leaf hover:underline">{name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Badges({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((b) => (
        <li key={b} className="inline-flex items-center gap-1.5 rounded-full border border-sage-2 bg-sage px-3 py-1 text-sm font-semibold text-forest">
          <CheckCircleIcon weight="fill" className="size-4" /> {b}
        </li>
      ))}
    </ul>
  );
}

type PageHeroProps = {
  crumbs: [string, string][];
  eyebrow?: string;
  badges?: string[];
  title: string;
  lead?: React.ReactNode;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  /** Optional icon tile shown before the heading (service pages). */
  icon?: React.ReactNode;
  className?: string;
};

export function PageHero({ crumbs, eyebrow, badges, title, lead, actions, aside, icon, className }: PageHeroProps) {
  return (
    <section className={className}>
      <Container className="pt-8 pb-12 md:pt-12 md:pb-20">
        <Breadcrumbs items={crumbs} />
        <div className={cn(aside && "grid items-center gap-10 lg:grid-cols-2 lg:gap-20")}>
          <div>
            {badges && <Badges items={badges} className="mb-5" />}
            {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
            {icon && <div className="mb-5">{icon}</div>}
            <h1 className="max-w-[820px] text-display leading-[1.1]">{title}</h1>
            {lead && <div className="mt-5 max-w-[680px] text-lead leading-relaxed text-ink-2">{lead}</div>}
            {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {aside}
        </div>
      </Container>
    </section>
  );
}

export function CallButton({ variant = "outline", size = "default", label = site.phone, className }: { variant?: "outline" | "light" | "green"; size?: "default" | "sm"; label?: string; className?: string }) {
  return (
    <a href={tel(site.phone)} className={cn(buttonVariants({ variant, size }), className)}>
      <PhoneIcon weight="duotone" /> {label}
    </a>
  );
}

/** `slide` shows the old homepage slider title/subtitle; default shows the old services-page name/description. */
export function ServiceCard({ service, slide = false, sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px" }: { service: Service; slide?: boolean; sizes?: string }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-shadow hover:border-line-strong hover:shadow-[0_8px_24px_-12px_rgb(29_42_34/0.18)]"
    >
      <div className="relative">
        <Media slot={service.image} alt={service.alt} sizes={sizes} className="aspect-4/3" />
        <ServiceIcon slug={service.slug} className="absolute -bottom-5 left-6 size-12 border-4 border-card bg-sage shadow-[0_4px_12px_-6px_rgb(29_42_34/0.35)]" />
      </div>
      <div className="flex flex-1 flex-col p-6 pt-9">
        <h3 className="mb-1.5 text-xl font-semibold">{slide ? service.heroTitle : service.name}</h3>
        <p className="mb-5 text-base text-muted-foreground">{slide ? service.heroSub : service.card}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 font-semibold text-leaf">
          Learn More <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function ServiceGrid({ list, slide = false }: { list: Service[]; slide?: boolean }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {list.map((s) => (
        <ServiceCard key={s.slug} service={s} slide={slide} />
      ))}
    </div>
  );
}

/** Titles-only grid, used for the "Our … Services" lists on service pages. */
export function ItemGrid({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-4 rounded-2xl border bg-card p-5 transition-colors hover:border-sage-2 hover:bg-[#fdfcf9]">
          <ItemIcon title={t} />
          <span className="text-lg leading-snug font-semibold">{t}</span>
        </li>
      ))}
    </ul>
  );
}

/** One soft row per question, as in the reference design: the first answer starts open, and the small arrow
 *  square turns solid green and flips when its answer is showing. */
export function Faq({ items }: { items: Pick<Faq, "q" | "a">[] }) {
  return (
    <Accordion defaultValue={items.length ? [items[0].q] : []} className="gap-5">
      {items.map(({ q, a }) => (
        <AccordionItem key={q} value={q} className="rounded-md border-0 bg-muted/70 not-last:border-b-0 dark:bg-muted">
          <AccordionTrigger className="items-start gap-4 rounded-md px-5 py-4 text-base font-medium hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden">
            {q}
            <span aria-hidden className="ml-auto grid size-7 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-all duration-200 group-aria-expanded/accordion-trigger:bg-primary group-aria-expanded/accordion-trigger:text-primary-foreground">
              <ArrowDownIcon className="size-4 transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-180" />
            </span>
          </AccordionTrigger>
          <AccordionContent keepMounted hiddenUntilFound className="px-5 pb-4 text-base text-muted-foreground">{a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/** Centred FAQ: heading, category filter tabs, the questions, then the "Still Have Questions?" call strip. */
const faqOrder: Faq["category"][] = ["general", "services", "insurance"];

export function FaqSection({ items, id = "faq-title" }: { items: Faq[]; id?: string }) {
  return (
    <div className="mx-auto max-w-[800px]">
      <div className="mx-auto mb-10 flex max-w-[720px] flex-col items-center gap-3 text-center sm:mb-12">
        <Eyebrow className="self-center">FAQ’s</Eyebrow>
        <h2 id={id} className="mt-1 text-2xl font-bold sm:text-3xl lg:text-4xl">{faqIntro.title}</h2>
        <p className="text-base text-muted-foreground sm:text-lg">{faqIntro.sub}</p>
      </div>
      <PanelTabs
        className="min-w-0"
        tabs={faqIntro.categories.map(([key, label]) => ({
          value: key,
          label,
          // "All" leads with general questions, then services, then insurance and billing.
          panel: <Faq items={key === "all" ? [...items].sort((a, b) => faqOrder.indexOf(a.category) - faqOrder.indexOf(b.category)) : items.filter((f) => f.category === key)} />,
        }))}
      />
      <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-xl bg-primary/8 px-6 py-6 text-center md:flex-row md:px-8 md:text-left">
        <div>
          <h3 className="mb-1 text-lg font-semibold">{faqIntro.stillTitle}</h3>
          <p className="text-muted-foreground">{faqIntro.stillText}</p>
        </div>
        <CallButton className="shrink-0" />
      </div>
    </div>
  );
}

export function Steps({ items, className }: { items: Pair[]; className?: string }) {
  return (
    <ol className={cn("steps", className)}>
      {items.map(([title, body]) => (
        <li key={title}>
          <h3 className="mb-1 text-lg font-semibold">{title}</h3>
          <p className="text-ink-2">{body}</p>
        </li>
      ))}
    </ol>
  );
}

/** `pairs` keeps two per row at every width, for stats sitting in a half-width column. */
export function Stats({ items, pairs = false }: { items: Pair[]; pairs?: boolean }) {
  return (
    <div className={cn("grid grid-cols-2 gap-y-8", !pairs && (items.length === 3 ? "sm:grid-cols-3" : "lg:grid-cols-4"))}>
      {items.map(([value, label], i) => (
        <div key={label} className={cn("border-line-strong px-4 sm:px-7", i % 2 === 0 ? "pl-0 sm:pl-0" : "border-l", i === 2 && !pairs && "sm:border-l sm:pl-7")}>
          <strong className="mb-2.5 block font-display text-stat leading-none font-semibold tracking-[-0.03em] text-forest">{value}</strong>
          <span className="block max-w-[220px] text-ink-2">{label}</span>
        </div>
      ))}
    </div>
  );
}

const complianceIcons: Icon[] = [CertificateIcon, ShieldCheckIcon, LockKeyIcon, IdentificationBadgeIcon];

export function ComplianceStrip() {
  return (
    <section aria-label={compliance.title} className="border-y bg-card py-7">
      <Container className="grid gap-6 sm:grid-cols-2 lg:grid-cols-[auto_repeat(4,1fr)] lg:items-center">
        <p className="text-sm font-semibold tracking-[0.08em] text-muted-foreground uppercase sm:col-span-2 lg:col-span-1 lg:border-r lg:pr-6">{compliance.title}</p>
        {compliance.items.map((title, i) => {
          const Glyph = complianceIcons[i];
          return (
            <div key={title} className="flex items-center gap-3">
              <Glyph weight="duotone" className="size-7 shrink-0 text-leaf" />
              <strong className="text-base font-semibold">{title}</strong>
            </div>
          );
        })}
      </Container>
    </section>
  );
}

export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-1.5 font-semibold text-leaf hover:text-forest-dark", className)}>
      {children} <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

type ContactRow = { icon: Icon; label: string; value: React.ReactNode; note?: string; href?: string; external?: boolean; after?: React.ReactNode };

export function ContactList({ rows, className }: { rows: ContactRow[]; className?: string }) {
  return (
    <ul className={cn("grid", className)}>
      {rows.map(({ icon: Glyph, label, value, note, href, external, after }) => (
        <li key={label} className="flex gap-3.5 border-b py-4 first:pt-0 last:border-b-0 last:pb-0">
          <Glyph weight="duotone" className="mt-0.5 size-[22px] shrink-0 text-leaf" />
          <span>
            <small className="block text-sm text-muted-foreground">{label}</small>
            {href ? (
              <a href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})} className="font-semibold hover:text-leaf hover:underline">{value}</a>
            ) : (
              <span className="font-semibold">{value}</span>
            )}
            {after}
            {note && <span className="block text-sm text-muted-foreground">{note}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Old site's "Contact Us" block: phone, email, service area, hours, plus the coverage area note. */
/** Phone, email, service area and hours as four cards, then the coverage note. Heading on the left (lg). */
export function ContactCards({ id = "contact-cards-title" }: { id?: string }) {
  const cards: { icon: Icon; title: string; value: string; note: string; href?: string }[] = [
    { icon: PhoneIcon, title: "Phone", value: site.phone, note: "Get in Touch", href: tel(site.phone) },
    { icon: EnvelopeSimpleIcon, title: "Email", value: site.email, note: "General Inquiries", href: `mailto:${site.email}` },
    { icon: MapPinIcon, title: "Service Area", value: "Chicago Metro", note: "10 Counties Served", href: "/service-areas" },
    { icon: ClockIcon, title: "Hours", value: "Flexible Hours", note: "Here When You Need Us" },
  ];
  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
      <div className="space-y-3 lg:sticky lg:top-28 lg:self-start">
        <Eyebrow>Get in touch</Eyebrow>
        <h2 id={id} className="mt-1 text-2xl font-bold sm:text-3xl lg:text-4xl">{contactBlock.title}</h2>
        <p className="text-base text-muted-foreground sm:text-lg">{contactBlock.sub}</p>
      </div>
      <div className="grid gap-4">
        <ul className="grid gap-4 sm:grid-cols-2">
          {cards.map(({ icon: Glyph, title, value, note, href }) => (
            <li key={title} className="group relative rounded-xl bg-background p-5 ring-1 ring-foreground/8 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-26px_rgb(18_48_29/0.4)] sm:p-6 dark:bg-card">
              <span className="mb-4 grid size-11 place-items-center rounded-lg bg-primary/10 text-primary"><Glyph weight="duotone" className="size-5" /></span>
              <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
              {href ? (
                <a href={href} className="block font-semibold break-words after:absolute after:inset-0 group-hover:text-primary">{value}</a>
              ) : (
                <p className="font-semibold">{value}</p>
              )}
              <p className="mt-0.5 text-sm text-muted-foreground">{note}</p>
            </li>
          ))}
        </ul>
        <div className="rounded-xl bg-background p-5 ring-1 ring-foreground/8 sm:p-6 dark:bg-card">
          <h3 className="mb-2 flex items-center gap-2 font-semibold"><UsersThreeIcon weight="duotone" className="size-5 text-primary" /> {contactBlock.coverageTitle}</h3>
          <p className="mb-4 text-[0.9375rem] text-muted-foreground">{contactBlock.coverage}</p>
          <TextLink href="/service-areas">View Service Areas</TextLink>
        </div>
      </div>
    </div>
  );
}

export const contactRows = {
  phone: (label = "Phone", note?: string): ContactRow => ({ icon: PhoneIcon, label, value: site.phone, href: tel(site.phone), note }),
  email: (label = "Email", note?: string): ContactRow => ({ icon: EnvelopeSimpleIcon, label, value: site.email, href: `mailto:${site.email}`, note }),
  address: (label = "Office"): ContactRow => ({
    icon: MapPinIcon,
    label,
    value: (
      <>
        {site.address.street}
        <br />
        {site.address.locality}, {site.address.region} {site.address.postalCode}
      </>
    ),
    href: site.mapsUrl,
    external: true,
  }),
};

export function CountyCard({ county }: { county: County }) {
  const fast = county.response.includes("24");
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold">{county.name}</h3>
        <span className="text-sm text-muted-foreground">Pop. {county.population}</span>
      </div>
      <p className="mb-4 text-small text-muted-foreground"><span className="font-semibold text-ink-2">Major Cities:</span> {county.cities.join(", ")}</p>
      <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-semibold", fast ? "bg-sage text-forest" : "bg-sand text-ink-2")}>
        <ClockIcon weight="duotone" className="size-3.5" /> Response Time: {county.response}
      </span>
    </div>
  );
}

// Mission: the first sentence is the statement; the rest splits into its first two sentences and the closing pair.
const missionLead = mission.text.slice(0, mission.text.indexOf(". ") + 1);
const missionSentences = mission.text.slice(mission.text.indexOf(". ") + 2).match(/[^.]+\./g)?.map((t) => t.trim()) ?? [];
const missionPoints: { icon: Icon; title: string; body: string }[] = [
  { icon: TargetIcon, title: "Our goal", body: missionSentences[0] ?? "" },
  { icon: HeartIcon, title: "Our commitment", body: missionSentences[1] ?? "" },
  { icon: UsersThreeIcon, title: "Like family", body: missionSentences.slice(2).join(" ") },
];

/** Mission: the statement on the left (stays in view on lg), the supporting text as three labelled points on the right. */
export function MissionSplit({ id = "mission-title" }: { id?: string }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
      <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
        <QuotesIcon aria-hidden weight="fill" className="size-11 text-primary/25" />
        <Eyebrow>{mission.title}</Eyebrow>
        <h2 id={id} className="text-2xl leading-snug font-bold sm:text-3xl lg:text-[2.25rem]">{missionLead}</h2>
        <p className="pt-2 text-sm font-semibold text-primary">{site.name}</p>
      </div>
      <ol className="divide-y divide-foreground/10 border-t border-foreground/10">
        {missionPoints.map(({ icon: Glyph, title, body }) => (
          <li key={title} className="flex gap-5 py-6">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <Glyph weight="duotone" className="size-5" />
            </span>
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-1 leading-relaxed text-muted-foreground">{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Google map of the Chicago metro around the Wheeling office; loads only when scrolled near. */
// Office location (340 E Dundee Rd, Wheeling). Centring on it with ll= instead of q= avoids Google's place card,
// so our own pin and card can sit on top. Google's attribution and controls stay visible.
const office = { lat: 42.13935, lng: -87.92528 };

export function CoverageMap({ className, zoom = 9 }: { className?: string; zoom?: number }) {
  return (
    <div className={cn("relative isolate min-h-[340px] overflow-hidden rounded-3xl border border-sage-2 bg-sage shadow-[0_24px_48px_-32px_rgb(18_48_29/0.45)]", className)}>
      <iframe
        title="Map of the Chicago metropolitan area served by Metropolitan Home Health Care, office in Wheeling, IL"
        src={`https://maps.google.com/maps?ll=${office.lat},${office.lng}&z=${zoom}&t=m&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-x-0 -top-14 -z-10 h-[calc(100%+3.5rem)] w-full border-0 [filter:saturate(0.7)_contrast(1.02)]"
      />
      {/* Brand tint so the map sits in the green and beige palette. */}
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-sage/20 mix-blend-multiply" />

      {/* Office pin on the map centre (the iframe starts 3.5rem above the box, so its centre sits 1.75rem above ours). */}
      <span aria-hidden className="pointer-events-none absolute top-[calc(50%-1.75rem)] left-1/2 -translate-x-1/2 -translate-y-full">
        <span className="absolute top-full left-1/2 size-14 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-cta/25 motion-reduce:hidden" />
        <span className="relative grid size-12 place-items-center rounded-full rounded-br-none bg-cta text-white shadow-[0_10px_24px_-8px_rgb(18_48_29/0.6)] ring-4 ring-white [transform:rotate(45deg)]">
          <MapPinIcon weight="fill" className="size-6 [transform:rotate(-45deg)]" />
        </span>
      </span>

      {/* One slim info bar along the bottom edge, clear of the pin. */}
      <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-xl bg-card/95 p-3 shadow-[0_14px_30px_-18px_rgb(18_48_29/0.45)] ring-1 ring-foreground/8 backdrop-blur sm:inset-x-5 sm:bottom-5 sm:gap-4 sm:p-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary sm:size-11">
          <MapPinIcon weight="duotone" className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold sm:text-base">{site.name}</p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-0.5 text-xs text-muted-foreground sm:text-sm">
            <span className="truncate">{site.address.street}, {site.address.locality}, {site.address.region}</span>
            <span className="hidden items-center gap-1 font-medium text-primary md:inline-flex">
              <CheckCircleIcon weight="fill" className="size-4" /> 10 counties served
            </span>
          </p>
        </div>
        <a href={site.mapsUrl} target="_blank" rel="noopener" aria-label="Get directions" className={cn(buttonVariants({ size: "sm" }), "shrink-0 max-sm:size-10 max-sm:px-0")}>
          <span className="hidden sm:inline">Get directions</span> <ArrowUpRightIcon />
        </a>
      </div>
    </div>
  );
}

/** Closing call to action on a light band, all in one left-aligned column: heading, line, the contact buttons,
 *  then the compliance badges as a trust row. */
export function CtaBand({ title = closingCta.title, sub = closingCta.sub }: { title?: string; sub?: string }) {
  return (
    <section className="bg-muted py-10 sm:py-12 lg:py-14">
      <Container className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold sm:text-[1.75rem]">{title}</h2>
          <p className="text-base text-muted-foreground sm:text-lg">{sub}</p>
        </div>
        <div className="grid gap-3 sm:flex sm:flex-wrap">
          <Link href="/contact" className={buttonVariants()}>{closingCta.cta}</Link>
          <CallButton />
        </div>
        <ul className="flex flex-wrap gap-2">
          {compliance.items.map((item, i) => {
            const Glyph = complianceIcons[i];
            return (
              <li key={item} className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-sm font-medium text-primary">
                <Glyph weight="duotone" className="size-4" /> {item}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
