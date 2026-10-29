import Link from "next/link";
import { CertificateIcon } from "@phosphor-icons/react/ssr";
import { CtaBand, FaqSection, h2Class, PageHero, Stats, TextLink } from "@/components/shared/blocks";
import { JsonLd } from "@/components/shared/json-ld";
import { Media } from "@/components/shared/media";
import { Eyebrow, Section } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { about, faqs, mission, serviceAreas, site, stats, tel } from "@/lib/content";
import { crumbsLd, faqLd, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  path: "/about",
  title: "About Metropolitan Home Health Care Chicago | Mission & Core Values",
  description: "Discover Metropolitan Home Health Care's mission to provide compassionate home healthcare in Chicago. Skilled nursing, therapy, and social services.",
});

const crumbs: [string, string][] = [
  ["Home", "/"],
  ["About", "/about"],
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[crumbsLd(crumbs), faqLd(faqs.map((f) => [f.q, f.a]))]} />
      <PageHero
        crumbs={crumbs}
        eyebrow={about.tagline}
        title={about.title}
        lead={
          <>
            <p>{about.text}</p>
            <p className="mt-6 inline-flex items-center gap-3 rounded-2xl border bg-card px-5 py-3.5 text-base">
              <CertificateIcon weight="duotone" className="size-8 shrink-0 text-leaf" />
              <span><strong className="block text-foreground">{about.award[0]}</strong><span className="text-muted-foreground">{about.award[1]}</span></span>
            </p>
          </>
        }
        aside={<Media slot="pages/about-care" alt="Caregiver in green scrubs smiling and talking with an older woman" eager sizes="(max-width: 1024px) 100vw, 560px" className="aspect-4/3 rounded-2xl" />}
      />

      <Section tone="white" aria-labelledby="mission-title">
        <div className="grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <h2 id="mission-title" className={h2Class}>{mission.title}</h2>
          <div>
            <p className="font-display text-[clamp(1.25rem,1.05rem+0.8vw,1.65rem)] leading-[1.5]">{mission.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/services" className={buttonVariants({ variant: "green" })}>Explore Our Services</Link>
              <Link href="/contact" className={buttonVariants({ variant: "outline" })}>Contact Us Today</Link>
            </div>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="values-title">
        <h2 id="values-title" className={cn(h2Class, "mb-10 md:mb-14")}>Our Values</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map(([title, body]) => (
            <div key={title} className="border-t-[1.5px] border-leaf pt-5">
              <h3 className="mb-2 font-display text-[1.4rem] font-medium">{title}</h3>
              <p className="text-ink-2">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Media slot="pages/about-team" width={900} height={675} alt="Caregiver and older woman laughing together" className="aspect-4/3 rounded-2xl" />
          <div className="grid gap-10">
            <div>
              <h2 className={cn(h2Class, "mb-4")}>{about.development.title}</h2>
              <p className="mb-2 text-lg text-ink-2">{about.development.text}</p>
              <ul className="checklist">
                {about.development.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
            <div>
              <h2 className={cn(h2Class, "mb-4")}>{about.costEffective.title}</h2>
              <p className="text-lg text-ink-2">{about.costEffective.text}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="white" tight aria-label="Metropolitan in numbers">
        <Stats items={stats.about} />
      </Section>

      <Section aria-label="Frequently Asked Questions">
        <FaqSection items={faqs} />
      </Section>

      <Section tone="sage" aria-labelledby="areas-title">
        <div className="grid items-center gap-8 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <div>
            <Eyebrow className="mb-4">{serviceAreas.sub}</Eyebrow>
            <h2 id="areas-title" className={h2Class}>{serviceAreas.title}</h2>
          </div>
          <div>
            <p className="mb-5 text-lg text-ink-2">{serviceAreas.text}</p>
            <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border bg-card px-6 py-4">
              <span><strong className="block">{serviceAreas.touchTitle}</strong><span className="text-sm text-muted-foreground">{serviceAreas.touchText}</span></span>
              <a href={tel(site.phone)} className="font-semibold text-leaf hover:underline">{site.phoneDashed}</a>
            </div>
            <TextLink href="/service-areas">{serviceAreas.mapTitle}</TextLink>
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
