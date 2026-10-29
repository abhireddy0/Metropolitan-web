import Link from "next/link";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CertificateIcon,
  CheckCircleIcon,
  ClockIcon,
  EnvelopeSimpleIcon,
  IdentificationBadgeIcon,
  LockKeyIcon,
  MapPinIcon,
  PhoneIcon,
  QuotesIcon,
  ShieldCheckIcon,
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

/** One soft card per question; the square arrow button turns solid green when the answer is open. */
export function Faq({ items }: { items: Faq[] }) {
  return (
    <Accordion className="gap-4">
      {items.map(({ q, a }) => (
        <AccordionItem key={q} value={q} className="rounded-xl border border-transparent bg-sand transition-colors not-last:border-b-0 has-aria-expanded:border-line-strong/60">
          <AccordionTrigger className="items-center gap-5 px-5 py-5 text-lg font-semibold hover:no-underline md:px-6 **:data-[slot=accordion-trigger-icon]:hidden">
            {q}
            <span aria-hidden className="ml-auto grid size-9 shrink-0 place-items-center rounded-lg bg-[color-mix(in_oklab,var(--cta)_14%,var(--card))] text-cta transition-colors group-aria-expanded/accordion-trigger:bg-cta group-aria-expanded/accordion-trigger:text-white">
              <ArrowDownIcon weight="bold" className="size-4 group-aria-expanded/accordion-trigger:hidden" />
              <ArrowUpIcon weight="bold" className="hidden size-4 group-aria-expanded/accordion-trigger:block" />
            </span>
          </AccordionTrigger>
          <AccordionContent keepMounted hiddenUntilFound className="px-5 pr-16 pb-6 text-base leading-relaxed text-ink-2 md:px-6 md:pr-20">{a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/** Centred FAQ: heading, category filter tabs, the questions, then the "Still Have Questions?" call strip. */
export function FaqSection({ items, id = "faq-title" }: { items: Faq[]; id?: string }) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mx-auto mb-10 grid max-w-2xl justify-items-center gap-4 text-center md:mb-12">
        <Eyebrow>FAQs</Eyebrow>
        <h2 id={id} className={h2Class}>{faqIntro.title}</h2>
        <p className="text-lg text-ink-2">{faqIntro.sub}</p>
      </div>
      <PanelTabs
        className="min-w-0 [&>[data-slot=tabs-list]]:mx-auto"
        tabs={faqIntro.categories.map(([key, label]) => ({
          value: key,
          label,
          panel: <Faq items={key === "all" ? items : items.filter((f) => f.category === key)} />,
        }))}
      />
      <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-sage-2 bg-sage px-6 py-6 text-center md:flex-row md:px-8 md:text-left">
        <div>
          <h3 className="mb-1 text-lg font-semibold">{faqIntro.stillTitle}</h3>
          <p className="text-ink-2">{faqIntro.stillText}</p>
        </div>
        <CallButton label={`Call ${site.phoneDashed}`} className="shrink-0" />
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
export function ContactCards() {
  const cards: { icon: Icon; title: string; value: string; note: string; href?: string }[] = [
    { icon: PhoneIcon, title: "Phone", value: site.phone, note: "Get in Touch", href: tel(site.phone) },
    { icon: EnvelopeSimpleIcon, title: "Email", value: site.email, note: "General Inquiries", href: `mailto:${site.email}` },
    { icon: MapPinIcon, title: "Service Area", value: "Chicago Metro", note: "10 Counties Served", href: "/service-areas" },
    { icon: ClockIcon, title: "Hours", value: "Flexible Hours", note: "Here When You Need Us" },
  ];
  return (
    <div>
      <h2 className={cn(h2Class, "mb-2")}>{contactBlock.title}</h2>
      <p className="mb-8 text-lg text-ink-2">{contactBlock.sub}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map(({ icon: Glyph, title, value, note, href }) => (
          <div key={title} className="rounded-2xl border bg-card p-5">
            <span className="mb-3 grid size-10 place-items-center rounded-lg bg-sage text-forest"><Glyph weight="duotone" className="size-5" /></span>
            <h3 className="text-sm font-semibold text-muted-foreground">{title}</h3>
            {href ? <a href={href} className="font-semibold break-all hover:text-leaf hover:underline">{value}</a> : <p className="font-semibold">{value}</p>}
            <p className="text-sm text-muted-foreground">{note}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border bg-card p-5">
        <h3 className="mb-1 flex items-center gap-2 font-semibold"><UsersThreeIcon weight="duotone" className="size-5 text-leaf" /> {contactBlock.coverageTitle}</h3>
        <p className="mb-3 text-small text-ink-2">{contactBlock.coverage}</p>
        <TextLink href="/service-areas">View Service Areas</TextLink>
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

// Mission: the first sentence is the statement, the rest supports it.
const missionLead = mission.text.slice(0, mission.text.indexOf(". ") + 1);
const missionRest = mission.text.slice(mission.text.indexOf(". ") + 2);

/** Green mission panel: the first sentence as a bold statement, the rest beside it. Pass `id` when it heads its own section. */
export function MissionPanel({ id, actions, className }: { id?: string; actions?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl border border-sage-2 bg-sage px-7 py-10 md:px-14 md:py-16", className)}>
      <QuotesIcon aria-hidden weight="fill" className="absolute -top-6 -left-3 size-32 text-sage-2/80 md:size-44" />
      <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
        <div>
          {id ? <h2 id={id} className="eyebrow mb-6 font-sans tracking-normal">{mission.title}</h2> : <Eyebrow className="mb-6">{mission.title}</Eyebrow>}
          <p className="text-h2 leading-[1.2] font-semibold tracking-[-0.025em] text-forest-dark">{missionLead}</p>
        </div>
        <div className="border-forest/15 lg:border-l lg:pl-12">
          <p className="text-lg leading-relaxed text-ink-2">{missionRest}</p>
          <p className="mt-6 flex items-center gap-3 text-sm font-semibold text-forest">
            <span aria-hidden className="h-px w-8 bg-leaf" /> {site.name}
          </p>
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
      </div>
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

      <div className="pointer-events-none absolute inset-x-3 top-3 flex flex-wrap items-start justify-between gap-3 sm:inset-x-5 sm:top-5">
        <div className="pointer-events-auto max-w-[300px] rounded-2xl bg-card/95 p-4 shadow-[0_14px_30px_-16px_rgb(18_48_29/0.45)] backdrop-blur sm:p-5">
          <p className="mb-0.5 text-small font-semibold text-forest-dark">{site.name}</p>
          <p className="mb-3 text-sm text-muted-foreground">{site.address.street}, {site.address.locality}, {site.address.region}</p>
          <a href={site.mapsUrl} target="_blank" rel="noopener" className={buttonVariants({ size: "sm" })}>
            Get directions <ArrowRightIcon />
          </a>
        </div>
        <span className="pointer-events-auto hidden items-center gap-2 rounded-full bg-forest-dark/90 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgb(0_0_0/0.5)] backdrop-blur sm:inline-flex">
          <CheckCircleIcon weight="fill" className="size-4 text-sage-2" /> 10 Counties Served
        </span>
      </div>
    </div>
  );
}

export function CtaBand({ title = closingCta.title, sub = closingCta.sub }: { title?: string; sub?: string }) {
  return (
    <section>
      <Container className="py-12 md:py-18">
        <div className="grid items-center gap-8 rounded-2xl bg-forest-dark p-9 text-[#e9efe9] md:p-16 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className={cn(h2Class, "mb-2.5 text-white")}>{title}</h2>
            <p className="text-lg text-[#c9d6cc]">{sub}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <CallButton variant="light" />
            <Link href="/contact" className={buttonVariants({ variant: "ghost-light" })}>{closingCta.cta}</Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
