import type { CSSProperties } from "react";
import Link from "next/link";
import { CallButton, CtaBand, Faq } from "@/components/shared/blocks";
import { JsonLd } from "@/components/shared/json-ld";
import { ServiceCard } from "@/components/services/service-card";
import { Container, Eyebrow } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { faqIntro, faqs, hero, services, servicesIntro } from "@/lib/content";
import { crumbsLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/services",
  title: "Home Healthcare Services in Chicago | Metropolitan",
  description: "Explore Home Healthcare Services, including skilled nursing, therapy, aides, and social services delivered at home across the Chicago metro area by licensed, compassionate professionals.",
});

const crumbs: [string, string][] = [
  ["Home", "/"],
  ["Services", "/services"],
];

// Staggers the hero's page-load entrance (animate-rise in globals.css), the same way the other pages do.
const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;


/** Centred section heading, matching the other redesigned pages. */
function Heading({ eyebrow, title, sub, id }: { eyebrow: string; title: string; sub: string; id: string }) {
  return (
    <div className="mx-auto mb-10 flex max-w-[720px] flex-col items-center gap-3 text-center sm:mb-14">
      <Eyebrow className="self-center">{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-1 text-2xl font-bold sm:text-3xl lg:text-4xl">{title}</h2>
      <p className="text-base text-muted-foreground sm:text-lg">{sub}</p>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={crumbsLd(crumbs)} />

      {/* Hero band under the transparent header: centred intro and the two main actions. */}
      <section className="-mt-[70px] bg-muted pt-[calc(70px+2rem)] pb-14 sm:pt-[calc(70px+3rem)] lg:-mt-[84px] lg:pt-[calc(84px+3.5rem)] lg:pb-20">
        <Container className="mx-auto flex max-w-[760px] flex-col items-center gap-3 text-center">
          <Eyebrow className="animate-rise self-center">{servicesIntro.eyebrow}</Eyebrow>
          <h1 className="animate-rise mt-1 text-[2rem] leading-[1.15] font-bold sm:text-[2.5rem] lg:text-[2.75rem]" style={rise(80)}>{servicesIntro.title}</h1>
          <p className="animate-rise text-base text-muted-foreground sm:text-lg" style={rise(160)}>{servicesIntro.sub}.</p>
          <div className="animate-rise mt-3 grid w-full max-w-xs gap-3 sm:flex sm:w-auto sm:max-w-none sm:justify-center" style={rise(240)}>
            <Link href="/contact#request" className={buttonVariants()}>{hero.cta}</Link>
            <CallButton />
          </div>
        </Container>
      </section>

      {/* Same card as the blog list: photo, title, two-line summary, and an arrow button that fills on hover.
          Flex-wrap with fixed widths keeps three per row and centres the last card. */}
      <section aria-label="Services" className="py-14 lg:py-20">
        <Container>
          <ul className="flex flex-wrap justify-center gap-6">
            {services.map((s) => (
              <li key={s.slug} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <ServiceCard service={s} as="h2" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="services-faq-title" className="border-t py-16 lg:py-24">
        <Container>
          <Heading id="services-faq-title" eyebrow="FAQ’s" title={faqIntro.title} sub={faqIntro.sub} />
          <div className="mx-auto max-w-[800px]">
            <Faq items={faqs.filter((f) => f.category !== "insurance")} />
          </div>
        </Container>
      </section>


      <CtaBand />
    </>
  );
}
