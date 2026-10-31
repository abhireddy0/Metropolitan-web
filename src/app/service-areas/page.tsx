import type { CSSProperties } from "react";
import { ClockIcon, MapPinIcon, UsersThreeIcon } from "@phosphor-icons/react/ssr";
import { CallButton, CoverageMap, CtaBand, Faq } from "@/components/shared/blocks";
import { JsonLd } from "@/components/shared/json-ld";
import { Media } from "@/components/shared/media";
import { Container, Eyebrow } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { counties, faqs, serviceAreas } from "@/lib/content";
import { crumbsLd, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  path: "/service-areas",
  title: "Service Areas | Metropolitan Home Health Care",
  description: "Metropolitan Home Health Care serves Chicago metro area including Cook, Lake, DuPage, Will, McHenry, Kane, LaSalle, Grundy, Kankakee, and DeKalb counties.",
});

const crumbs: [string, string][] = [
  ["Home", "/"],
  ["Service Areas", "/service-areas"],
];

// Staggers the hero's page-load entrance (animate-rise in globals.css), the same way the other pages do.
const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

// Questions about where we go and how quickly we can start.
const areaFaqs = ["What areas do you serve?", "How do I start home health care services?", "Who qualifies for home health care services?", "How often will healthcare professionals visit?", "Do we have to pay for it?"].map(
  (q) => faqs.find((f) => f.q === q)!,
);

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

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd data={crumbsLd(crumbs)} />

      {/* Hero band under the transparent header: centred intro and a wide photo. */}
      <section className="-mt-[70px] bg-muted pt-[calc(70px+2rem)] pb-12 sm:pt-[calc(70px+3rem)] lg:-mt-[84px] lg:pt-[calc(84px+3.5rem)] lg:pb-16">
        <Container>
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-3 text-center">
            <Eyebrow className="animate-rise self-center">{serviceAreas.title}</Eyebrow>
            <h1 className="animate-rise mt-1 text-[2rem] leading-[1.15] font-bold sm:text-[2.5rem] lg:text-[2.75rem]" style={rise(80)}>{serviceAreas.sub}</h1>
            <p className="animate-rise text-base text-muted-foreground sm:text-lg" style={rise(160)}>{serviceAreas.text}</p>
            <div className="animate-rise mt-3 grid w-full max-w-xs gap-3 sm:flex sm:w-auto sm:max-w-none sm:justify-center" style={rise(240)}>
              <a href="#counties-title" className={buttonVariants()}><MapPinIcon weight="duotone" /> Find your county</a>
              <CallButton />
            </div>
          </div>
          <div className="animate-rise mt-10 lg:mt-12" style={rise(320)}>
            <Media slot="pages/service-areas" width={1400} height={788} alt="View over Chicago neighborhoods toward the downtown skyline" eager className="aspect-4/3 rounded-2xl sm:aspect-video lg:aspect-21/9" />
          </div>
        </Container>
      </section>

      <section aria-labelledby="counties-title" className="scroll-mt-24 border-b py-16 lg:py-24">
        <Container>
          <Heading id="counties-title" eyebrow="Coverage" title={serviceAreas.mapTitle} sub={`${counties.length} counties across Northern Illinois, served from our office in Wheeling.`} />
          <CoverageMap zoom={8} className="mb-10 aspect-3/4 sm:aspect-video lg:mb-14 lg:aspect-21/9" />

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {counties.map((c) => {
              const fast = c.response.includes("24");
              return (
                <li key={c.name} className="group flex h-full flex-col rounded-xl bg-card ring-1 ring-foreground/10 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-26px_rgb(18_48_29/0.4)] motion-reduce:hover:translate-y-0">
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                        <MapPinIcon weight="duotone" className="size-5" />
                      </span>
                      <h3 className="text-lg font-semibold transition-colors duration-300 group-hover:text-primary">{c.name}</h3>
                    </div>
                    <p className="text-[0.9375rem] text-muted-foreground">{c.cities.join(", ")}</p>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t px-6 py-3.5 text-sm">
                    <span className={cn("inline-flex items-center gap-1.5 font-medium", fast ? "text-primary" : "text-muted-foreground")}>
                      <ClockIcon weight="duotone" className="size-4" /> {c.response}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <UsersThreeIcon weight="duotone" className="size-4" /> {c.population}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="areas-faq-title" className="py-16 lg:py-24">
        <Container>
          <Heading id="areas-faq-title" eyebrow="FAQ’s" title="Questions about coverage" sub="What families ask before starting care in their area." />
          <div className="mx-auto max-w-[800px]">
            <Faq items={areaFaqs} />
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
