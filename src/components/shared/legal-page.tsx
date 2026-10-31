import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRightIcon, CaretDownIcon, EnvelopeSimpleIcon, FileTextIcon, ListBulletsIcon, PhoneIcon, ShieldCheckIcon } from "@phosphor-icons/react/ssr";
import { JsonLd } from "@/components/shared/json-ld";
import { Container, Eyebrow } from "@/components/shared/section";
import { legalPages, type LegalPage } from "@/lib/collections";
import { site, tel } from "@/lib/content";
import { crumbsLd } from "@/lib/seo";

// Staggers the hero's page-load entrance (animate-rise in globals.css), the same way the other pages do.
const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

/** Privacy policy and HIPAA notice: hero band (no visible breadcrumb; the JSON-LD trail stays for search), then the text beside a sticky "On this page" list and a contact card. */
export function LegalView({ page }: { page: LegalPage }) {
  const crumbs: [string, string][] = [
    ["Home", "/"],
    [page.title, `/${page.slug}`],
  ];
  const sections = page.body.sections;
  const other = legalPages.find((p) => p.slug !== page.slug);

  return (
    <>
      <JsonLd data={crumbsLd(crumbs)} />

      <section className="-mt-[70px] bg-muted pt-[calc(70px+2rem)] pb-10 sm:pt-[calc(70px+3rem)] lg:-mt-[84px] lg:pt-[calc(84px+3.5rem)] lg:pb-14">
        <Container>
          <div className="flex max-w-[860px] flex-col items-start gap-4">
            <Eyebrow className="animate-rise">Legal</Eyebrow>
            <h1 className="animate-rise text-[2rem] leading-[1.1] font-bold sm:text-[2.5rem] lg:text-[3rem]" style={rise(80)}>{page.title}</h1>
            {page.description && <p className="animate-rise text-base text-pretty text-muted-foreground sm:text-lg" style={rise(160)}>{page.description}</p>}
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-14 lg:py-16">
        <Container className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            {sections.length > 0 && (
              <>
                {/* Phones and tablets: the section list folds away above the text. */}
                <details className="group rounded-xl bg-card ring-1 ring-foreground/10 lg:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center gap-2"><ListBulletsIcon weight="duotone" className="size-4.5 text-primary" /> On this page</span>
                    <CaretDownIcon className="size-4 text-muted-foreground transition-transform group-open:rotate-180" />
                  </summary>
                  <ol className="space-y-1 border-t px-3 py-3">
                    {sections.map((sec) => (
                      <li key={sec.id}>
                        <a href={`#${sec.id}`} className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-primary">{sec.text}</a>
                      </li>
                    ))}
                  </ol>
                </details>

                <nav aria-labelledby="toc-title" className="hidden lg:block">
                  <p id="toc-title" className="mb-4 flex items-center gap-2 text-sm font-semibold"><ListBulletsIcon weight="duotone" className="size-4.5 text-primary" /> On this page</p>
                  <ol className="space-y-1 border-l">
                    {sections.map((sec) => (
                      <li key={sec.id}>
                        <a href={`#${sec.id}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary">{sec.text}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </>
            )}

            <div className="mt-8 hidden rounded-xl bg-muted p-5 lg:block dark:bg-card">
              <span className="mb-3 grid size-10 place-items-center rounded-lg bg-primary/10 text-primary"><ShieldCheckIcon weight="duotone" className="size-5" /></span>
              <p className="font-semibold">Questions about your privacy?</p>
              <p className="mt-1 text-sm text-muted-foreground">Our team can explain any part of this page.</p>
              <ul className="mt-4 space-y-2 text-sm font-medium">
                <li><a href={tel(site.phone)} className="inline-flex items-center gap-2 hover:text-primary"><PhoneIcon weight="duotone" className="size-4.5 text-primary" /> {site.phone}</a></li>
                <li><a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 break-all hover:text-primary"><EnvelopeSimpleIcon weight="duotone" className="size-4.5 shrink-0 text-primary" /> {site.email}</a></li>
              </ul>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="prose-article max-w-[780px] text-base sm:text-[1.0625rem] [&_h2]:scroll-mt-28" dangerouslySetInnerHTML={{ __html: page.body.html }} />

            {other && (
              <Link href={`/${other.slug}`} className="group mt-12 flex max-w-[780px] items-center gap-4 rounded-xl p-5 ring-1 ring-foreground/10 transition hover:ring-primary/40">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><FileTextIcon weight="duotone" className="size-5" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm text-muted-foreground">Also read</span>
                  <span className="block font-semibold group-hover:text-primary">{other.title}</span>
                </span>
                <ArrowRightIcon className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
