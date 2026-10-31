import type { CSSProperties } from "react";
import { CertificateIcon, SealCheckIcon, ShieldCheckIcon } from "@phosphor-icons/react/ssr";
import { CertificateGrid, type CertificateItem } from "@/components/certificates/certificate-grid";
import { CtaBand } from "@/components/shared/blocks";
import { JsonLd } from "@/components/shared/json-ld";
import { Container, Eyebrow } from "@/components/shared/section";
import { certificates as page } from "@/lib/content";
import { crumbsLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/certificates",
  title: "Certificates & Accreditations | Metropolitan Home Health Care",
  description: "View our healthcare certifications and accreditations that demonstrate our commitment to quality care and professional standards.",
});

const crumbs: [string, string][] = [
  ["Home", "/"],
  ["Certificates", "/certificates"],
];

// Staggers the hero's page-load entrance (animate-rise in globals.css), the same way the other pages do.
const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

const [current, ...older] = page.items;
// Hero facts, all taken from the certificates and licence shown on this page.
const highlights: [string, string][] = [
  [String(page.items.length), "HomeCare Elite awards"],
  ["Top 100", "US agencies, 2019"],
  ["IDPH", "Licensed in Illinois"],
];

// The earlier awards, newest first.
const earlier: CertificateItem[] = older.reverse().map((c) => ({ c, year: c.badge, label: "Award of Excellence" }));

export default function CertificatesPage() {
  return (
    <>
      <JsonLd data={crumbsLd(crumbs)} />

      {/* Hero band under the transparent header: centred title, then the latest certificate on a light display panel
          with a faint dot texture behind it and the award facts along the bottom. */}
      <section className="-mt-[70px] bg-muted pt-[calc(70px+2rem)] pb-12 sm:pt-[calc(70px+3rem)] lg:-mt-[84px] lg:pt-[calc(84px+3.5rem)] lg:pb-20">
        <Container>
          <div className="mx-auto mb-10 flex max-w-[760px] flex-col items-center gap-4 text-center lg:mb-14">
            <Eyebrow className="animate-rise self-center">Recognition</Eyebrow>
            <h1 className="animate-rise text-[2rem] leading-[1.1] font-bold sm:text-[2.5rem] lg:text-[3rem]" style={rise(80)}>{page.title}</h1>
            <p className="animate-rise text-base text-pretty text-muted-foreground sm:text-lg" style={rise(160)}>{page.sub.replace(/:$/, ".")}</p>
          </div>

          <figure className="animate-rise relative m-0 overflow-hidden rounded-3xl bg-background px-4 pt-10 pb-8 ring-1 ring-foreground/8 sm:px-10 dark:bg-card sm:pt-14 lg:px-16 lg:pt-16 lg:pb-10" style={rise(240)}>
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,var(--color-foreground)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black,transparent)] bg-size-[22px_22px] opacity-[0.12]" />
            <div className="relative mx-auto max-w-[720px]">
              <div className="rounded-2xl bg-white p-2.5 shadow-[0_40px_80px_-40px_rgb(18_48_29/0.55)] ring-1 ring-black/5 sm:p-4">
                <img
                  src={`/images/awards/${current.image}`}
                  width={current.width}
                  height={current.height}
                  fetchPriority="high"
                  className="w-full rounded-lg"
                  alt="HomeCare Elite Top 100 Award of Excellence certificate for Metropolitan Home Health Care, Inc., Wheeling, IL"
                />
              </div>
              <figcaption className="mt-6 flex flex-col items-center gap-2 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <CertificateIcon weight="fill" className="size-3.5" /> Latest award
                </span>
                <strong className="text-lg font-semibold sm:text-xl">HomeCare Elite Top 100, 2019</strong>
              </figcaption>
            </div>
            <dl className="relative mx-auto mt-8 grid max-w-[720px] grid-cols-3 divide-x divide-foreground/10 border-t border-foreground/10 pt-6 text-center">
              {highlights.map(([value, label]) => (
                <div key={label} className="flex flex-col-reverse justify-end px-2 sm:px-4">
                  <dt className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</dt>
                  <dd className="text-xl font-bold text-primary sm:text-3xl">{value}</dd>
                </div>
              ))}
            </dl>
          </figure>
        </Container>
      </section>

      <section aria-labelledby="earlier-title" className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto mb-10 flex max-w-[720px] flex-col items-center gap-3 text-center sm:mb-14">
            <Eyebrow className="self-center">Our record</Eyebrow>
            <h2 id="earlier-title" className="mt-1 text-2xl font-bold sm:text-3xl lg:text-4xl">Award of Excellence, four years running</h2>
            <p className="text-base text-muted-foreground sm:text-lg">Recognized by HomeCare Elite every year from 2006 to 2009. Tap a certificate to see it full size.</p>
          </div>
          <CertificateGrid items={earlier} />
        </Container>
      </section>

      {/* Licensing: centred heading, then both credentials as seals in one card. */}
      <section aria-labelledby="accredited-title" className="border-t py-16 lg:py-24">
        <Container>
          <div className="mx-auto mb-10 flex max-w-[720px] flex-col items-center gap-3 text-center sm:mb-14">
            <Eyebrow className="self-center">Credentials</Eyebrow>
            <h2 id="accredited-title" className="mt-1 text-2xl font-bold sm:text-3xl lg:text-4xl">{page.accredited.title}</h2>
            <p className="text-base text-muted-foreground sm:text-lg">{page.accredited.text}</p>
          </div>
          <ul className="mx-auto grid max-w-[900px] divide-y divide-foreground/10 rounded-3xl bg-card ring-1 ring-foreground/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            {page.accredited.items.map(([title, text], i) => {
              const Glyph = i ? ShieldCheckIcon : CertificateIcon;
              return (
                <li key={title} className="flex flex-col items-center gap-4 px-6 py-10 text-center sm:px-10 sm:py-12">
                  <span className="grid size-16 place-items-center rounded-full bg-primary text-primary-foreground ring-8 ring-primary/12">
                    <Glyph weight="duotone" className="size-8" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="mt-1 text-muted-foreground">{text}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    <SealCheckIcon weight="fill" className="size-3.5" /> Verified
                  </span>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
