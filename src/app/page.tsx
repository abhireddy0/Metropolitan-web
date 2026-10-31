import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRightIcon, CertificateIcon, CheckCircleIcon, ClipboardTextIcon, IdentificationBadgeIcon, InfoIcon, LockKeyIcon, ReceiptIcon, ShieldCheckIcon, WalletIcon } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import { CallButton, CtaBand, FaqSection, MissionSplit } from "@/components/shared/blocks";
import { JsonLd } from "@/components/shared/json-ld";
import { HeroCarousel, type HeroSlide } from "@/components/home/hero-carousel";
import { MasonryGallery } from "@/components/home/masonry-gallery";
import { AwardsTimeline, type Award } from "@/components/home/awards-timeline";
import { ProcessStack } from "@/components/home/process-stack";
import { Testimonials } from "@/components/home/testimonials";
import { ValuePanels } from "@/components/home/value-panels";
import { ServiceCard } from "@/components/services/service-card";
import { Container, Eyebrow } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { about, certificates, compliance, coreValues, faqs, firstVisit, gallery, hero, insurancePartners, services, servicesIntro, site, stats } from "@/lib/content";
import { testimonials } from "@/lib/collections";
import { faqLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/",
  title: "Metropolitan: Professional Home Healthcare Provider in Chicago",
  description: "We provide Home Healthcare in Chicago, offering skilled nursing, home health aides, physical therapy, and more. Licensed professionals delivering compassionate care at home.",
});

// Staggers the hero's page-load entrance (animate-rise in globals.css), the same way the other pages do.
const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

// How billing works, in plain words; the facts come from the insurance answers in the FAQ.
const billing: { icon: Icon; title: string }[] = [
  { icon: ReceiptIcon, title: "No surprise bills with Medicare" },
  { icon: ClipboardTextIcon, title: "We check your benefits for you" },
  { icon: WalletIcon, title: "Paying privately? That’s fine too" },
];
// Certificates newest first for the timeline; the first item in content is the current (2019) award.
const awards: Award[] = [certificates.items[0], ...certificates.items.slice(1).reverse()].map((c, i) => ({ c, year: i === 0 ? "2019" : c.badge, label: i === 0 ? "HomeCare Elite Top 100" : "Award of Excellence" }));
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

/** Centred section heading, matching the other redesigned pages. */
function Heading({ eyebrow, title, sub, id, children }: { eyebrow: string; title: string; sub?: string; id: string; children?: React.ReactNode }) {
  return (
    <div className="mx-auto mb-10 flex max-w-[720px] flex-col items-center gap-3 text-center sm:mb-14">
      <Eyebrow className="self-center">{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-1 text-2xl font-bold sm:text-3xl lg:text-4xl">{title}</h2>
      {sub && <p className="text-base text-muted-foreground sm:text-lg">{sub}</p>}
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqLd(faqs.map((f) => [f.q, f.a]))} />

      {/* Hero band under the transparent header: text on the left, the photo slider on the right, then the numbers. */}
      <section className="-mt-[70px] overflow-hidden bg-muted pt-[calc(70px+2rem)] pb-12 sm:pt-[calc(70px+3rem)] lg:-mt-[84px] lg:pt-[calc(84px+3.5rem)] lg:pb-16">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            <div className="flex flex-col items-start gap-5">
              <Eyebrow className="animate-rise">{site.tagline}</Eyebrow>
              <h1 className="animate-rise text-[2.25rem] leading-[1.08] font-bold sm:text-[3rem] lg:text-[3.5rem]" style={rise(80)}>
                Your Health, <span className="text-primary">Our Expertise</span>
              </h1>
              <p className="animate-rise max-w-[540px] text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl" style={rise(160)}>{hero.sub}</p>
              <div className="animate-rise mt-1 grid w-full gap-3 sm:flex sm:w-auto" style={rise(240)}>
                <Link href="/contact#request" className={buttonVariants({ size: "lg" })}>{hero.cta}</Link>
                <CallButton className="h-11" />
              </div>
              <ul className="animate-rise mt-2 flex w-full flex-wrap gap-x-6 gap-y-2 border-t border-foreground/10 pt-5" style={rise(280)}>
                {site.badges.map((b) => (
                  <li key={b} className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80">
                    <CheckCircleIcon weight="fill" className="size-4.5 text-primary" /> {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="animate-rise" style={rise(320)}>
              <HeroCarousel slides={heroSlides} />
            </div>
          </div>

          <dl style={rise(400)} className="animate-rise mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-14 lg:grid-cols-4">
            {stats.home.map(([value, label]) => (
              <div key={label} className="rounded-xl bg-card p-5 ring-1 ring-foreground/8 sm:p-6">
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="mt-1 text-3xl font-bold text-primary sm:text-4xl">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-label={compliance.title} className="border-b">
        <Container className="grid grid-cols-2 gap-x-6 gap-y-4 py-6 lg:flex lg:items-center lg:justify-between">
          {compliance.items.map((title, i) => {
            const Glyph = complianceIcons[i];
            return (
              <span key={title} className="flex items-center gap-3 text-[0.9375rem] font-medium">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><Glyph weight="duotone" className="size-5" /></span>
                {title}
              </span>
            );
          })}
        </Container>
      </section>

      <section aria-labelledby="services-title" className="py-16 lg:py-24">
        <Container>
          <Heading id="services-title" eyebrow={servicesIntro.eyebrow} title={servicesIntro.title} sub={servicesIntro.sub} />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => <li key={s.slug}><ServiceCard service={s} /></li>)}
          </ul>
          <div className="mt-10 flex justify-center">
            <Link href="/services" className={buttonVariants({ variant: "outline" })}>View all services <ArrowRightIcon /></Link>
          </div>
        </Container>
      </section>

      <Testimonials items={testimonials} />

      <section aria-labelledby="visit-title" className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[5fr_6fr] lg:gap-20">
            <div className="space-y-3 lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>{firstVisit.eyebrow}</Eyebrow>
              <h2 id="visit-title" className="mt-1 text-2xl font-bold sm:text-3xl lg:text-4xl">{firstVisit.title}</h2>
              <p className="text-base text-muted-foreground sm:text-lg">{firstVisit.sub}</p>
              <div className="grid gap-3 pt-4 sm:flex sm:flex-wrap">
                <Link href="/contact#request" className={buttonVariants()}>{hero.cta}</Link>
                <CallButton />
              </div>
            </div>
            <ProcessStack items={firstVisit.steps} />
          </div>

          <div className="mt-16 grid gap-5 md:mt-24 md:grid-cols-2">
            {firstVisit.details.map(([label, text]) => (
              <div key={label} className="rounded-xl bg-card p-6 ring-1 ring-foreground/10">
                <h3 className="mb-2 font-semibold">{label.replace(/:$/, "")}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
            <div className="flex gap-4 rounded-xl bg-primary/8 p-6 md:col-span-2">
              <InfoIcon weight="duotone" className="mt-0.5 size-6 shrink-0 text-primary" />
              <p className="text-[0.9375rem] leading-relaxed text-muted-foreground"><strong className="block text-foreground">{firstVisit.medicare.title}</strong>{firstVisit.medicare.text}</p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="mission-title" className="bg-muted py-16 lg:py-24">
        <Container>
          <MissionSplit />
        </Container>
      </section>

      <section aria-labelledby="values-title" className="py-16 lg:py-24">
        <Container>
          <Heading id="values-title" eyebrow="What guides us" title={coreValues.title} sub={coreValues.sub} />
          <ValuePanels items={coreValues.items} />
        </Container>
      </section>

      {/* Insurance: the accepted plans are the focus, as large logo cards; how billing works follows as one short line. */}
      <section aria-labelledby="insurance-title" className="bg-muted py-16 lg:py-24">
        <Container>
          <Heading
            id="insurance-title"
            eyebrow={insurancePartners.eyebrow}
            title="We work with your insurance"
            sub="Medicare and most major plans are accepted. Our intake team checks your coverage before care begins, so there are no surprises."
          />

          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
            {insurancePartners.accepted.map((name) => {
              const [file, width, height, brand] = insurerLogos[name];
              return (
                <li key={name} className="flex flex-col items-center gap-4 rounded-2xl bg-background px-4 pt-8 pb-5 text-center ring-1 ring-foreground/6 transition duration-300 last:col-span-2 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgb(18_48_29/0.45)] sm:last:col-span-1 motion-reduce:hover:translate-y-0">
                  {/* Light tile behind the logo in dark mode only: several brand logos are dark ink and vanish on dark green. */}
                  <div className="flex h-12 w-full items-center justify-center sm:h-14 dark:h-14 dark:rounded-lg dark:bg-[#f8f5ee] dark:px-2 sm:dark:h-16 sm:dark:px-3">
                    <img src={`/images/insurers/${file}.svg`} width={width} height={height} alt={brand} loading="lazy" decoding="async" className="h-7 w-auto max-w-full object-contain sm:h-10 sm:max-w-[160px]" />
                  </div>
                  <span className="text-sm font-medium text-foreground/80">{name}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    <CheckCircleIcon weight="fill" className="size-3.5" /> Accepted
                  </span>
                </li>
              );
            })}
          </ul>

          <dl className="mt-12 grid grid-cols-2 gap-y-8 lg:grid-cols-4">
            {stats.insurance.map(([value, label], i) => (
              <div key={label} className={i % 2 === 1 ? "border-l border-foreground/10 pl-6 sm:pl-10" : i === 2 ? "lg:border-l lg:border-foreground/10 lg:pl-10" : ""}>
                <dd className="text-4xl font-bold text-primary sm:text-5xl">{value}</dd>
                <dt className="mt-2 text-muted-foreground">{label}</dt>
              </div>
            ))}
          </dl>

          <ul className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {billing.map(({ icon: Glyph, title }) => (
              <li key={title} className="inline-flex items-center gap-2 text-[0.9375rem] font-medium">
                <Glyph weight="duotone" className="size-5 text-primary" /> {title}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <p className="text-muted-foreground">Don’t see your plan? Call us and we’ll check it for you.</p>
            <CallButton />
          </div>
        </Container>
      </section>

      <section aria-labelledby="gallery-title" className="py-16 lg:py-24">
        <Container>
          <Heading id="gallery-title" eyebrow="Gallery" title={gallery.title} sub={gallery.sub} />
          <MasonryGallery items={gallery.items.map(([slot, caption]) => ({ slot, caption }))} />
        </Container>
      </section>

      {/* Recognition: centred heading, then a year-by-year timeline on the left and the selected certificate on the right. */}
      <section aria-labelledby="certificates-title" className="bg-muted py-16 lg:py-24">
        <Container>
          <Heading id="certificates-title" eyebrow="Recognition" title={certificates.title} sub={certificates.sub.replace(/:$/, ".")} />
          <AwardsTimeline awards={awards} />
          <div className="mt-12 flex justify-center">
            <Link href="/certificates" className={buttonVariants({ variant: "outline" })}>View all certificates <ArrowRightIcon /></Link>
          </div>
        </Container>
      </section>

      <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 py-16 lg:py-24">
        <Container>
          <FaqSection items={faqs} />
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
