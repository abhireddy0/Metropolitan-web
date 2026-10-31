import type { CSSProperties } from "react";
import Link from "next/link";
import { CertificateIcon, CheckCircleIcon, CurrencyCircleDollarIcon, GraduationCapIcon, HandHeartIcon, MedalIcon, ShieldCheckIcon, UsersThreeIcon } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import { CallButton, CoverageMap, CtaBand, Faq, MissionSplit } from "@/components/shared/blocks";
import { JsonLd } from "@/components/shared/json-ld";
import { Media } from "@/components/shared/media";
import { Container, Eyebrow } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { about, faqs, serviceAreas, stats } from "@/lib/content";
import { crumbsLd, faqLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/about",
  title: "About Metropolitan Home Health Care Chicago | Mission & Core Values",
  description: "Discover Metropolitan Home Health Care's mission to provide compassionate home healthcare in Chicago. Skilled nursing, therapy, and social services.",
});

const crumbs: [string, string][] = [
  ["Home", "/"],
  ["About", "/about"],
];

// Staggers the hero's page-load entrance (animate-rise in globals.css), the same way the other pages do.
const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

const valueIcons: Icon[] = [HandHeartIcon, MedalIcon, ShieldCheckIcon, UsersThreeIcon];


// General questions about who we are and how care works.
const aboutFaqs = ["What is home health care?", "Who qualifies for home health care services?", "How do I start home health care services?", "What areas do you serve?", "How often will healthcare professionals visit?", "What safety measures do you follow?"].map(
  (q) => faqs.find((f) => f.q === q)!,
);

/** Centred section heading, matching the other redesigned pages. */
function Heading({ eyebrow, title, sub, id }: { eyebrow: string; title: string; sub?: string; id: string }) {
  return (
    <div className="mx-auto mb-10 flex max-w-[720px] flex-col items-center gap-3 text-center sm:mb-14">
      <Eyebrow className="self-center">{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-1 text-2xl font-bold sm:text-3xl lg:text-4xl">{title}</h2>
      {sub && <p className="text-base text-muted-foreground sm:text-lg">{sub}</p>}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[crumbsLd(crumbs), faqLd(aboutFaqs.map((f) => [f.q, f.a]))]} />

      {/* Hero band under the transparent header: text on the left, the photo on the right at the same height,
          then the stat cards in a row. */}
      <section className="-mt-[70px] bg-muted pt-[calc(70px+2rem)] pb-12 sm:pt-[calc(70px+3rem)] lg:-mt-[84px] lg:pt-[calc(84px+3.5rem)] lg:pb-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-14">
            <div className="flex flex-col items-start gap-4">
              <Eyebrow className="animate-rise">About us</Eyebrow>
              <h1 className="animate-rise text-[2rem] leading-[1.15] font-bold sm:text-[2.5rem] lg:text-[2.75rem]" style={rise(80)}>{about.title}</h1>
              <p className="animate-rise text-base leading-relaxed text-muted-foreground sm:text-lg" style={rise(160)}>{about.text}</p>
              <div className="animate-rise mt-1 grid w-full gap-3 sm:flex sm:w-auto" style={rise(240)}>
                <Link href="/services" className={buttonVariants()}>Explore Our Services</Link>
                <CallButton />
              </div>
              <div className="animate-rise mt-2 flex items-center gap-3 border-t border-foreground/10 pt-5" style={rise(280)}>
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><CertificateIcon weight="duotone" className="size-5" /></span>
                <span className="text-sm">
                  <strong className="block font-semibold">{about.award[0]}</strong>
                  <span className="text-muted-foreground">{about.award[1]}</span>
                </span>
              </div>
            </div>
            <div className="animate-rise relative" style={rise(320)}>
              <Media slot="pages/about-care" alt="Caregiver in green scrubs smiling and talking with an older woman" eager sizes="(max-width: 1024px) 100vw, 600px" className="aspect-4/3 rounded-2xl lg:absolute lg:inset-0 lg:aspect-auto lg:h-full" />
            </div>
          </div>

          <dl style={rise(400)} className="animate-rise mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-12 lg:grid-cols-3">
            {stats.about.map(([value, label]) => (
              <div key={label} className="rounded-xl bg-card p-5 ring-1 ring-foreground/8 last:col-span-2 sm:p-6 lg:last:col-span-1">
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="mt-1 text-3xl font-bold text-primary sm:text-4xl">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="mission-title" className="py-16 lg:py-24">
        <Container>
          <MissionSplit />
        </Container>
      </section>

      <section aria-labelledby="values-title" className="bg-muted py-16 lg:py-24">
        <Container>
          <Heading id="values-title" eyebrow="What guides us" title="Our Values" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {about.values.map(([title, body], i) => {
              const Glyph = valueIcons[i];
              return (
                <div key={title} className="group rounded-xl bg-background p-6 ring-1 ring-foreground/10 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-26px_rgb(18_48_29/0.4)] dark:bg-card">
                  <span className="mb-5 grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Glyph weight="duotone" className="size-5" />
                  </span>
                  <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                  <p className="text-[0.9375rem] text-muted-foreground">{body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Photo on the left, matched to the height of the two labelled points on the right (as on the service pages). */}
      <section aria-labelledby="team-title" className="py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch lg:gap-16">
          <div className="relative">
            <Media slot="pages/about-team" width={900} height={675} alt="Caregiver and older woman laughing together" className="aspect-4/3 rounded-2xl lg:absolute lg:inset-0 lg:aspect-auto lg:h-full" />
          </div>
          <div>
            <h2 id="team-title" className="text-2xl font-bold sm:text-3xl lg:text-4xl">How we care for our team and you</h2>
            <ol className="mt-8 grid gap-7">
              <li className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><GraduationCapIcon weight="duotone" className="size-5" /></span>
                <div>
                  <h3 className="text-lg font-semibold">{about.development.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted-foreground">{about.development.text}</p>
                  <ul className="mt-3 grid gap-2">
                    {about.development.items.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-[0.9375rem] font-medium">
                        <CheckCircleIcon weight="fill" className="mt-0.5 size-4.5 shrink-0 text-primary" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><CurrencyCircleDollarIcon weight="duotone" className="size-5" /></span>
                <div>
                  <h3 className="text-lg font-semibold">{about.costEffective.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted-foreground">{about.costEffective.text}</p>
                </div>
              </li>
            </ol>
          </div>
        </Container>
      </section>

      <section aria-labelledby="areas-title" className="bg-muted py-16 lg:py-24">
        <Container>
          <Heading id="areas-title" eyebrow={serviceAreas.title} title={serviceAreas.sub} sub="10 counties across Northern Illinois, served from our office in Wheeling." />
          <CoverageMap className="aspect-3/4 sm:aspect-video lg:aspect-21/9" />
          <div className="mt-8 flex justify-center">
            <Link href="/service-areas" className={buttonVariants({ variant: "outline" })}>View all counties we serve</Link>
          </div>
        </Container>
      </section>

      <section aria-labelledby="about-faq-title" className="py-16 lg:py-24">
        <Container>
          <Heading id="about-faq-title" eyebrow="FAQ’s" title="Questions families ask us" sub="Quick answers about home health care and how we work." />
          <div className="mx-auto max-w-[800px]">
            <Faq items={aboutFaqs} />
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
