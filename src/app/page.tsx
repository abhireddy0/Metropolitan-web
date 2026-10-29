import Link from "next/link";
import { CertificateIcon, CheckCircleIcon, IdentificationBadgeIcon, LockKeyIcon, PhoneIcon, QuotesIcon, ShieldCheckIcon } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import { CtaBand, FaqSection, h2Class, ServiceGrid, Stats, TextLink } from "@/components/shared/blocks";
import { JsonLd } from "@/components/shared/json-ld";
import { HeroCarousel, type HeroSlide } from "@/components/home/hero-carousel";
import { MasonryGallery } from "@/components/home/masonry-gallery";
import { ProcessStack } from "@/components/home/process-stack";
import { ValuePanels } from "@/components/home/value-panels";
import { Testimonials } from "@/components/home/testimonials";
import { Container, Eyebrow, Section, SectionHeader } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { about, certificates, compliance, coreValues, faqs, firstVisit, gallery, hero, insurancePartners, mission, services, servicesIntro, site, stats, tel } from "@/lib/content";
import { testimonials } from "@/lib/collections";
import { faqLd, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  path: "/",
  title: "Metropolitan: Professional Home Healthcare Provider in Chicago",
  description: "We provide Home Healthcare in Chicago, offering skilled nursing, home health aides, physical therapy, and more. Licensed professionals delivering compassionate care at home.",
});

// Mission: the first sentence is the statement, the rest supports it.
const [missionLead, missionRest] = [mission.text.slice(0, mission.text.indexOf(". ") + 1), mission.text.slice(mission.text.indexOf(". ") + 2)];

const complianceIcons: Icon[] = [CertificateIcon, ShieldCheckIcon, LockKeyIcon, IdentificationBadgeIcon];
// Logos in public/images/insurers (trademarks of each insurer), keyed by the accepted-plan label: [file, width, height, brand].
const insurerLogos: Record<string, [string, number, number, string]> = {
  "Traditional Medicare": ["medicare", 197, 28, "Medicare"],
  "Almost all BCBS plans": ["bcbs", 216, 45, "Blue Cross Blue Shield"],
  "Commercial Aetna": ["aetna", 121, 30, "Aetna"],
  "Commercial UHC plans": ["uhc", 160, 50, "UnitedHealthcare"],
  "Commercial Cigna": ["cigna", 164, 60, "Cigna"],
};

const service = (slug: string) => services.find((s) => s.slug === slug)!;
const nursing = service("skilled-nursing");
const aide = service("health-aide");

const heroSlides: HeroSlide[] = [
  { slot: "pages/hero-nurse-visit", alt: "Metropolitan nurse sharing a laugh with an older woman during a home visit", title: about.award[0], text: about.award[1], position: "object-[35%_center]" },
  { slot: nursing.image, alt: nursing.alt, title: nursing.heroTitle, text: nursing.heroSub },
  { slot: aide.image, alt: aide.alt, title: aide.heroTitle, text: aide.heroSub },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqLd(faqs.map((f) => [f.q, f.a]))} />
      <section className="overflow-hidden">
        <Container className="grid items-center gap-12 pt-8 pb-16 md:pt-12 md:pb-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 xl:gap-20">
          <div>
            <Eyebrow className="mb-6">{site.tagline}</Eyebrow>
            <h1 className="mb-6 text-[clamp(2.6rem,1.7rem+3.6vw,4.4rem)] leading-[1.04] tracking-[-0.035em]">
              Your Health, <span className="text-leaf">Our Expertise</span>
            </h1>
            <p className="mb-9 max-w-[540px] text-[clamp(1.1rem,1rem+0.4vw,1.25rem)] leading-relaxed text-ink-2">{hero.sub}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact#request" className={buttonVariants({ size: "lg" })}>{hero.cta}</Link>
              <a href={tel(site.phone)} className={buttonVariants({ variant: "outline", size: "lg" })}>
                <PhoneIcon weight="duotone" /> {site.phone}
              </a>
            </div>
            <ul className="mt-10 grid max-w-[540px] grid-cols-3 gap-4 border-t pt-6 text-sm leading-snug text-ink-2">
              {site.badges.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <CheckCircleIcon weight="fill" className="mt-px size-[18px] shrink-0 text-leaf" /> {b}
                </li>
              ))}
            </ul>
          </div>
          <HeroCarousel slides={heroSlides} className="lg:-mr-6 xl:-mr-16" />
        </Container>
      </section>

      <section aria-label="Metropolitan in numbers" className="border-y bg-card">
        <Container className="py-12 md:py-14">
          <Stats items={stats.home} />
        </Container>
        <div className="border-t">
          <Container className="grid grid-cols-2 gap-x-6 gap-y-4 py-6 lg:flex lg:items-center lg:justify-between">
            {compliance.items.map((title, i) => {
              const Glyph = complianceIcons[i];
              return (
                <span key={title} className="flex items-center gap-2.5 text-[0.95rem] font-medium text-ink-2">
                  <Glyph weight="duotone" className="size-6 shrink-0 text-leaf" /> {title}
                </span>
              );
            })}
          </Container>
        </div>
      </section>

      <Section aria-labelledby="services-title">
        <SectionHeader id="services-title" eyebrow={servicesIntro.eyebrow} title={servicesIntro.title} sub={servicesIntro.sub}>
          <Link href="/services" className={buttonVariants({ variant: "outline" })}>Explore Our Services</Link>
        </SectionHeader>
        <ServiceGrid list={services.slice(0, 6)} slide />
      </Section>

      <Testimonials items={testimonials} />

      <Section aria-labelledby="visit-title">
        <div className="grid gap-12 lg:grid-cols-[5fr_6fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow className="mb-4">{firstVisit.eyebrow}</Eyebrow>
            <h2 id="visit-title" className={cn(h2Class, "mb-5")}>{firstVisit.title}</h2>
            <p className="text-lg text-ink-2">{firstVisit.sub}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className={buttonVariants()}>{hero.cta}</Link>
              <a href={tel(site.phone)} className={buttonVariants({ variant: "outline" })}><PhoneIcon weight="duotone" /> {site.phoneDashed}</a>
            </div>
          </div>
          <ProcessStack items={firstVisit.steps} />
        </div>
        <div className="mt-16 grid gap-5 md:mt-28 md:grid-cols-2">
          {firstVisit.details.map(([label, text]) => (
            <p key={label} className="rounded-2xl border bg-card p-6 text-ink-2"><strong className="text-foreground">{label}</strong> {text}</p>
          ))}
          <p className="rounded-2xl border border-sage-2 bg-sage p-6 text-forest-dark md:col-span-2"><strong>{firstVisit.medicare.title}</strong> {firstVisit.medicare.text}</p>
        </div>
      </Section>

      <Section tone="white" aria-labelledby="values-title">
        <div className="relative mb-16 overflow-hidden rounded-3xl border border-sage-2 bg-sage px-7 py-10 md:mb-24 md:px-14 md:py-16">
          <QuotesIcon aria-hidden weight="fill" className="absolute -top-6 -left-3 size-32 text-sage-2/80 md:size-44" />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            <div>
              <Eyebrow className="mb-6">{mission.title}</Eyebrow>
              <p className="text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)] leading-[1.2] font-semibold tracking-[-0.025em] text-forest-dark">{missionLead}</p>
            </div>
            <div className="border-forest/15 lg:border-l lg:pl-12">
              <p className="text-lg leading-relaxed text-ink-2">{missionRest}</p>
              <p className="mt-6 flex items-center gap-3 text-sm font-semibold text-forest">
                <span aria-hidden className="h-px w-8 bg-leaf" /> {site.name}
              </p>
            </div>
          </div>
        </div>
        <SectionHeader id="values-title" title={coreValues.title} sub={coreValues.sub} />
        <ValuePanels items={coreValues.items} />
      </Section>

      <Section tone="sage" aria-labelledby="insurance-title">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow className="mb-4">{insurancePartners.eyebrow}</Eyebrow>
            <h2 id="insurance-title" className={cn(h2Class, "mb-5")}>{insurancePartners.title}</h2>
            <p className="mb-10 text-lg text-ink-2">{insurancePartners.sub}</p>
            <Stats items={stats.insurance} pairs />
          </div>
          <div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {insurancePartners.accepted.map((name) => {
                const [file, width, height, brand] = insurerLogos[name];
                return (
                  <li key={name} className="flex flex-col items-center justify-center gap-4 rounded-2xl border bg-card px-6 py-7 text-center sm:last:col-span-2">
                    <img src={`/images/insurers/${file}.svg`} width={width} height={height} alt={brand} loading="lazy" decoding="async" className="h-10 w-auto max-w-[180px] object-contain" />
                    <span className="inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-ink-2">
                      <CheckCircleIcon weight="fill" className="size-4 shrink-0 text-leaf" /> {name}
                    </span>
                  </li>
                );
              })}
            </ul>
            <TextLink href="/insurance" className="mt-6">Insurance Information</TextLink>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="gallery-title">
        <SectionHeader id="gallery-title" title={gallery.title} sub={gallery.sub} />
        <MasonryGallery items={gallery.items.map(([slot, caption]) => ({ slot, caption }))} />
      </Section>

      <Section tone="white" aria-labelledby="certificates-title">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="rounded-2xl border bg-card p-3 shadow-[0_1px_2px_rgb(29_42_34/0.06)] sm:p-5">
            <img src="/images/awards/award-2019.jpg" width={794} height={616} loading="lazy" decoding="async" className="w-full rounded-md" alt="HomeCare Elite Top 100 Award of Excellence certificate awarded to Metropolitan Home Health Care, Inc., Wheeling, IL" />
          </div>
          <div>
            <h2 id="certificates-title" className={cn(h2Class, "mb-5")}>{certificates.title}</h2>
            <p className="text-lg text-ink-2">{certificates.sub}</p>
            <ul className="my-6 flex flex-wrap gap-2">
              {certificates.items.map((c) => (
                <li key={c.badge} className="rounded-full border border-line-strong bg-card px-3.5 py-1.5 text-[0.95rem] font-semibold">{c.badge}</li>
              ))}
            </ul>
            <TextLink href="/certificates">View Certificate</TextLink>
          </div>
        </div>
      </Section>

      <Section id="faq" aria-labelledby="faq-title" className="scroll-mt-20">
        <FaqSection items={faqs} />
      </Section>

      <CtaBand />
    </>
  );
}
