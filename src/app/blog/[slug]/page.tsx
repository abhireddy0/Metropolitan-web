import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, CalendarBlankIcon, CaretRightIcon, ClockIcon, InfoIcon, ListBulletsIcon, UserCircleIcon } from "@phosphor-icons/react/ssr";
import { BlogCard, formatDate, PostCover } from "@/components/blog/post-card";
import { CtaBand } from "@/components/shared/blocks";
import { JsonLd } from "@/components/shared/json-ld";
import { Container, Eyebrow } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { posts } from "@/lib/collections";
import { abs, crumbsLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

const find = (slug: string) => posts.find((p) => p.slug === slug);

// Staggers the header's page-load entrance (animate-rise in globals.css), the same way the other pages do.
const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const p = find((await params).slug);
  if (!p) return {};
  return pageMetadata({ path: `/blog/${p.slug}`, title: p.title, description: p.summary, type: "article" });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const p = find((await params).slug);
  if (!p) notFound();
  const path = `/blog/${p.slug}`;
  const crumbs: [string, string][] = [
    ["Home", "/"],
    ["Blog", "/blog"],
    [p.title, path],
  ];
  const i = posts.indexOf(p);
  const prev = posts[i - 1];
  const next = posts[i + 1];
  const more = posts.filter((o) => o !== p).slice(0, 3);

  const meta = [
    { icon: UserCircleIcon, text: `By the ${p.author}` },
    { icon: CalendarBlankIcon, text: <>Updated <time dateTime={p.updated}>{formatDate(p.updated)}</time></> },
    { icon: ClockIcon, text: `${p.readingTime} min read` },
  ];

  return (
    <>
      <JsonLd
        data={[
          crumbsLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.summary,
            image: abs(p.cover),
            url: abs(path),
            datePublished: p.date,
            dateModified: p.updated,
            author: { "@type": "Organization", name: `${p.author}, Metropolitan Home Health Care`, url: abs("/about") },
            publisher: { "@id": abs("/#organization") },
            mainEntityOfPage: abs(path),
          },
        ]}
      />

      {/* Full-width header and cover, then the article beside a sticky "In this guide" list. */}
      <article className="py-10 sm:py-14 lg:py-16">
        <Container>
          <header className="space-y-5">
            <nav aria-label="Breadcrumb" className="animate-rise">
              <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted-foreground">
                {crumbs.map(([name, href], n) => (
                  <li key={href} className="inline-flex min-w-0 items-center gap-1.5">
                    {n > 0 && <CaretRightIcon aria-hidden className="size-3.5 shrink-0" />}
                    {n === crumbs.length - 1 ? (
                      <span aria-current="page" className="line-clamp-1 font-medium text-foreground">{name}</span>
                    ) : (
                      <Link href={href} className="hover:text-primary">{name}</Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            <Eyebrow className="animate-rise border-transparent bg-primary/10 text-primary">{p.category}</Eyebrow>
            <h1 className="animate-rise text-[1.875rem] leading-[1.15] font-bold sm:text-[2.5rem] lg:text-[2.75rem]" style={rise(80)}>{p.title}</h1>
            <p className="animate-rise max-w-[1000px] text-lg text-pretty text-muted-foreground sm:text-xl" style={rise(160)}>{p.summary}</p>
          </header>

          <div className="animate-rise mt-8 sm:mt-10" style={rise(240)}>
            <PostCover post={p} eager sizes="(max-width: 1280px) 100vw, 1200px" className="aspect-video rounded-2xl lg:aspect-21/9" />
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-b pb-6 text-sm text-muted-foreground">
              {meta.map(({ icon: Glyph, text }, n) => (
                <li key={n} className="inline-flex items-center gap-2">
                  <Glyph weight="duotone" className="size-4.5 text-primary" /> {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 grid gap-10 sm:mt-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
            <div className="min-w-0">
              <div className="prose-article max-w-none [&_h2]:scroll-mt-28" dangerouslySetInnerHTML={{ __html: p.body.html }} />

              <aside role="note" className="mt-12 flex gap-3 rounded-xl bg-muted px-5 py-4 text-sm text-muted-foreground dark:bg-card">
                <InfoIcon weight="duotone" className="mt-0.5 size-5 shrink-0 text-primary" />
                <p><strong className="block text-foreground">Not medical advice</strong>This article is general information. Talk with your physician about your situation. In an emergency, call 911.</p>
              </aside>

              {/* Previous and next guides, in list order. */}
              <nav aria-label="Previous and next guides" className="mt-12 grid gap-3 border-t pt-8 sm:grid-cols-2">
                {prev ? (
                  <Link href={`/blog/${prev.slug}`} className="group rounded-xl p-4 ring-1 ring-foreground/10 transition hover:ring-primary/40">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><ArrowLeftIcon className="size-4 transition-transform group-hover:-translate-x-0.5" /> Previous guide</span>
                    <span className="mt-1 line-clamp-2 block font-semibold group-hover:text-primary">{prev.title}</span>
                  </Link>
                ) : <span className="hidden sm:block" />}
                {next && (
                  <Link href={`/blog/${next.slug}`} className="group rounded-xl p-4 text-right ring-1 ring-foreground/10 transition hover:ring-primary/40">
                    <span className="flex items-center justify-end gap-1.5 text-sm text-muted-foreground">Next guide <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" /></span>
                    <span className="mt-1 line-clamp-2 block font-semibold group-hover:text-primary">{next.title}</span>
                  </Link>
                )}
              </nav>
            </div>

            {p.body.sections.length > 0 && (
              <aside aria-labelledby="toc-title" className="hidden lg:block">
                <div className="sticky top-28">
                  <p id="toc-title" className="mb-4 flex items-center gap-2 text-sm font-semibold"><ListBulletsIcon weight="duotone" className="size-4.5 text-primary" /> In this guide</p>
                  <ol className="space-y-1 border-l">
                    {p.body.sections.map((sec) => (
                      <li key={sec.id}>
                        <a href={`#${sec.id}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary">{sec.text}</a>
                      </li>
                    ))}
                  </ol>
                </div>
              </aside>
            )}
          </div>
        </Container>
      </article>

      <section aria-labelledby="more-title" className="border-t py-12 lg:py-16">
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="more-title" className="text-2xl font-bold sm:text-3xl">More guides</h2>
            <Link href="/blog" className={buttonVariants({ variant: "outline", size: "sm" })}>View all guides <ArrowRightIcon /></Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((o) => <BlogCard key={o.slug} post={o} />)}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
