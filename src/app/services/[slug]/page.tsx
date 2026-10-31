import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon, CaretRightIcon, CheckCircleIcon, FirstAidKitIcon, HandHeartIcon, ShieldCheckIcon } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import { CallButton, ContactCards, CtaBand } from "@/components/shared/blocks";
import { ItemIcon } from "@/components/shared/item-icon";
import { JsonLd } from "@/components/shared/json-ld";
import { Media } from "@/components/shared/media";
import { Container, Eyebrow } from "@/components/shared/section";
import { ServiceCard } from "@/components/services/service-card";
import { buttonVariants } from "@/components/ui/button";
import { hero, services, site } from "@/lib/content";
import { abs, crumbsLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

const find = (slug: string) => services.find((s) => s.slug === slug);

// Labels for the three "about" paragraphs, which every service writes as what it is, how we help, then our approach.
const aboutBlocks: [Icon, string][] = [
  [FirstAidKitIcon, "What we do"],
  [HandHeartIcon, "How we help"],
  [ShieldCheckIcon, "Our approach"],
];

// Staggers the hero's page-load entrance (animate-rise in globals.css), the same way the other pages do.
const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const s = find((await params).slug);
  if (!s) return {};
  return pageMetadata({ path: `/services/${s.slug}`, title: s.title, description: s.description });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const s = find((await params).slug);
  if (!s) notFound();
  const path = `/services/${s.slug}`;
  const crumbs: [string, string][] = [
    ["Home", "/"],
    ["Services", "/services"],
    [s.name, path],
  ];
  const others = services.filter((o) => o.slug !== s.slug);
  const at = services.indexOf(s);
  const related = [...others.slice(at), ...others.slice(0, at)].slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          crumbsLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.name,
            serviceType: s.name,
            description: s.description,
            url: abs(path),
            provider: { "@id": abs("/#organization") },
            areaServed: { "@type": "AdministrativeArea", name: "Chicago metropolitan area, Illinois" },
          },
        ]}
      />

      {/* Hero band under the transparent header: breadcrumb, then the intro and actions. The photo lives in the content below. */}
      <section className="-mt-[70px] bg-muted pt-[calc(70px+2rem)] pb-12 sm:pt-[calc(70px+3rem)] lg:-mt-[84px] lg:pt-[calc(84px+3.5rem)] lg:pb-20">
        <Container>
          <nav aria-label="Breadcrumb" className="animate-rise mb-8 lg:mb-10">
            <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted-foreground">
              {crumbs.map(([name, href], n) => (
                <li key={href} className="inline-flex items-center gap-1.5">
                  {n > 0 && <CaretRightIcon aria-hidden className="size-3.5 shrink-0" />}
                  {n === crumbs.length - 1 ? (
                    <span aria-current="page" className="font-medium text-foreground">{name}</span>
                  ) : (
                    <Link href={href} className="hover:text-primary">{name}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <div className="flex max-w-[860px] flex-col items-start gap-5">
            <h1 className="animate-rise text-[2rem] leading-[1.1] font-bold sm:text-[2.5rem] lg:text-[3rem]" style={rise(80)}>{s.heroTitle}</h1>
            <p className="animate-rise text-base text-pretty text-muted-foreground sm:text-lg lg:text-xl" style={rise(160)}>{s.heroSub}</p>
            <div className="animate-rise mt-1 grid w-full gap-3 sm:flex sm:w-auto" style={rise(240)}>
              <Link href={`/contact?service=${encodeURIComponent(s.name)}#request`} className={buttonVariants()}>{hero.cta}</Link>
              <CallButton />
            </div>
            <ul className="animate-rise mt-2 flex flex-wrap gap-x-6 gap-y-2" style={rise(280)}>
              {site.badges.map((b) => (
                <li key={b} className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80">
                  <CheckCircleIcon weight="fill" className="size-4.5 text-primary" /> {b}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* About the service: photo on the left, matched to the height of the three labelled points on the right. */}
      <section aria-labelledby="expertise-title" className="py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch lg:gap-16">
          <div className="relative">
            <Media slot={s.image} alt={s.alt} eager sizes="(max-width: 1024px) 100vw, 600px" className="aspect-4/3 rounded-2xl lg:absolute lg:inset-0 lg:aspect-auto lg:h-full" />
          </div>
          <div>
            <h2 id="expertise-title" className="text-2xl font-bold sm:text-3xl lg:text-4xl">About {s.name}</h2>
            <ol className="mt-8 grid gap-7">
              {s.intro.map((body, i) => {
                const [Glyph, title] = aboutBlocks[i] ?? aboutBlocks[0];
                return (
                  <li key={body} className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Glyph weight="duotone" className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold">{title}</h3>
                      <p className="mt-1 leading-relaxed text-muted-foreground">{body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </Container>
      </section>

      <section aria-labelledby="list-title" className="scroll-mt-20 border-t py-16 lg:py-24">
        <Container>
          <div className="mx-auto mb-10 flex max-w-[720px] flex-col items-center gap-3 text-center sm:mb-14">
            <Eyebrow className="self-center">What’s included</Eyebrow>
            <h2 id="list-title" className="mt-1 text-2xl font-bold sm:text-3xl lg:text-4xl">{s.listTitle}</h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.items.map((t) => (
              <li key={t} className="flex items-center gap-4 rounded-xl bg-card p-5 ring-1 ring-foreground/10">
                <ItemIcon title={t} className="size-11 rounded-lg bg-primary/10 text-primary [&_svg]:size-5" />
                <span className="font-semibold leading-snug">{t}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="contact-cards-title" className="bg-muted py-16 lg:py-24">
        <Container>
          <ContactCards />
        </Container>
      </section>

      <section aria-labelledby="related-title" className="py-12 lg:py-16">
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="related-title" className="text-2xl font-bold sm:text-3xl">Other services</h2>
            <Link href="/services" className={buttonVariants({ variant: "outline", size: "sm" })}>View all services <ArrowRightIcon /></Link>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((o) => <li key={o.slug}><ServiceCard service={o} /></li>)}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
