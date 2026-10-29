import { CertificateIcon, ShieldCheckIcon } from "@phosphor-icons/react/ssr";
import { CtaBand, h2Class, PageHero } from "@/components/shared/blocks";
import { JsonLd } from "@/components/shared/json-ld";
import { Section } from "@/components/shared/section";
import { certificates as page } from "@/lib/content";
import { crumbsLd, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  path: "/certificates",
  title: "Certificates & Accreditations | Metropolitan Home Health Care",
  description: "View our healthcare certifications and accreditations that demonstrate our commitment to quality care and professional standards.",
});

const crumbs: [string, string][] = [
  ["Home", "/"],
  ["Certificates", "/certificates"],
];

export default function CertificatesPage() {
  const [current, ...earlier] = page.items;
  return (
    <>
      <JsonLd data={crumbsLd(crumbs)} />
      <PageHero crumbs={crumbs} title={page.title} lead={page.sub} />
      <Section tone="white" inner="pt-12 md:pt-16">
        <div className="mb-14 grid items-center gap-12 md:mb-20 lg:grid-cols-2 lg:gap-20">
          <div className="rounded-2xl border bg-card p-3 shadow-[0_1px_2px_rgb(29_42_34/0.06)] sm:p-5">
            <img src={`/images/awards/${current.image}`} width={current.width} height={current.height} fetchPriority="high" className="w-full rounded-md" alt="HomeCare Elite Top 100 Award of Excellence certificate for Metropolitan Home Health Care, Inc., Wheeling, IL" />
          </div>
          <div>
            <span className="mb-4 inline-flex rounded-full bg-sage px-3 py-1 text-sm font-semibold text-forest">Certification {current.badge}</span>
            <h2 className={cn(h2Class, "mb-4")}>{current.title}</h2>
            <p className="mb-6 text-lg text-ink-2">{current.text}</p>
            <a href={`/images/awards/${current.image}`} target="_blank" rel="noopener" className="font-semibold text-leaf underline underline-offset-3">View Certificate</a>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {earlier.map((c) => (
            <figure key={c.badge} className="m-0 rounded-2xl border bg-card p-4">
              <a href={`/images/awards/${c.image}`} target="_blank" rel="noopener" aria-label={`View ${c.title}`}>
                <img src={`/images/awards/${c.image}`} width={c.width} height={c.height} loading="lazy" decoding="async" className="aspect-4/3 w-full rounded-md bg-sand object-contain" alt={`HomeCare Elite ${c.badge} Award of Excellence certificate for Metropolitan Home Health Care, Inc.`} />
              </a>
              <figcaption className="px-1 pt-3.5">
                <span className="mb-1 inline-flex rounded-full bg-sand px-2.5 py-0.5 text-xs font-semibold text-ink-2">{c.badge}</span>
                <strong className="block font-semibold">{c.title}</strong>
                <span className="text-sm text-muted-foreground">{c.text}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
      <Section aria-labelledby="accredited-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 id="accredited-title" className={cn(h2Class, "mb-4")}>{page.accredited.title}</h2>
            <p className="text-lg text-ink-2">{page.accredited.text}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {page.accredited.items.map(([title, text], i) => {
              const Glyph = i ? ShieldCheckIcon : CertificateIcon;
              return (
                <div key={title} className="rounded-2xl border bg-card p-7">
                  <span className="mb-5 grid size-12 place-items-center rounded-xl bg-sage text-forest"><Glyph weight="duotone" className="size-6" /></span>
                  <h3 className="mb-1 text-xl font-semibold">{title}</h3>
                  <p className="text-ink-2">{text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
