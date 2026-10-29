import { CallButton, CountyCard, CoverageMap, CtaBand, FaqSection, h2Class, PageHero } from "@/components/shared/blocks";
import { JsonLd } from "@/components/shared/json-ld";
import { Media } from "@/components/shared/media";
import { Section } from "@/components/shared/section";
import { counties, faqs, serviceAreas, site } from "@/lib/content";
import { crumbsLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/service-areas",
  title: "Service Areas | Metropolitan Home Health Care",
  description: "Metropolitan Home Health Care serves Chicago metro area including Cook, Lake, DuPage, Will, McHenry, Kane, LaSalle, Grundy, Kankakee, and DeKalb counties.",
});

const crumbs: [string, string][] = [
  ["Home", "/"],
  ["Service Areas", "/service-areas"],
];

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd data={crumbsLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow={serviceAreas.sub}
        title={serviceAreas.title}
        lead={serviceAreas.text}
        actions={<CallButton label={site.phoneDashed} />}
        aside={<Media slot="pages/service-areas" width={1400} height={788} alt="View over Chicago neighborhoods toward the downtown skyline" eager className="aspect-16/10 rounded-2xl" />}
      />
      <Section tone="white" aria-labelledby="counties-title">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <h2 id="counties-title" className={h2Class}>{serviceAreas.mapTitle}</h2>
          <div className="rounded-2xl border bg-card px-6 py-4">
            <p className="font-semibold">{serviceAreas.touchTitle}</p>
            <p className="mb-1 text-sm text-muted-foreground">{serviceAreas.touchText}</p>
            <a href={`tel:+1${site.phone.replace(/\D/g, "")}`} className="font-semibold text-leaf hover:underline">{site.phoneDashed}</a>
          </div>
        </div>
        <CoverageMap zoom={8} className="mb-10 aspect-4/3 sm:aspect-16/9 lg:aspect-21/9 md:mb-14" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {counties.map((c) => <CountyCard key={c.name} county={c} />)}
        </div>
      </Section>
      <Section aria-label="Frequently Asked Questions">
        <FaqSection items={faqs} />
      </Section>
      <CtaBand />
    </>
  );
}
