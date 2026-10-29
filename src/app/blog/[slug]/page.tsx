import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard, formatDate, PostCover } from "@/components/blog/post-card";
import { Breadcrumbs, CallButton, TextLink } from "@/components/shared/blocks";
import { JsonLd } from "@/components/shared/json-ld";
import { Container, Eyebrow, Section, SectionHeader } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { posts } from "@/lib/collections";
import { hero } from "@/lib/content";
import { abs, crumbsLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

const find = (slug: string) => posts.find((p) => p.slug === slug);

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
  const more = posts.filter((o) => o !== p).slice(0, 3);

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
      <article>
        <header>
          <Container className="pt-8 md:pt-12">
            <Breadcrumbs items={crumbs} />
            <Eyebrow className="mb-4">{p.category}</Eyebrow>
            <h1 className="max-w-[900px] text-[clamp(2.35rem,1.6rem+3vw,3.6rem)] leading-[1.1]">{p.title}</h1>
            <p className="mt-5 max-w-[680px] text-[clamp(1.1rem,1rem+0.4vw,1.25rem)] text-ink-2">{p.summary}</p>
            <ul className="mt-4 flex flex-wrap gap-2 text-[0.9rem] text-ink-2">
              <li className="rounded-full border bg-card px-3 py-1">By the {p.author}</li>
              <li className="rounded-full border bg-card px-3 py-1"><time dateTime={p.updated}>Updated {formatDate(p.updated)}</time></li>
              <li className="rounded-full border bg-card px-3 py-1">{p.readingTime} min read</li>
            </ul>
            <PostCover post={p} eager sizes="(max-width: 1280px) 100vw, 1200px" className="mt-8 aspect-[16/8] rounded-2xl" />
          </Container>
        </header>
        <Section inner="pt-10 md:pt-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
            <div>
              <div className="prose-article" dangerouslySetInnerHTML={{ __html: p.body.html }} />
              <p className="mt-12 max-w-[720px] rounded-lg bg-sand px-5 py-4 text-[0.95rem] text-ink-2">
                This article is general information, not medical advice. Talk with your physician about your situation. In an emergency, call 911.
              </p>
            </div>
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border bg-card p-7">
                <h2 className="mb-2 font-sans text-xl font-semibold tracking-normal">{hero.personalized.title}</h2>
                <p className="mb-5 text-muted-foreground">{hero.personalized.text}</p>
                <div className="grid gap-3">
                  <Link href="/contact#request" className={buttonVariants()}>{hero.personalized.cta}</Link>
                  <CallButton />
                </div>
              </div>
            </aside>
          </div>
        </Section>
      </article>
      <Section tone="white" aria-labelledby="more-title">
        <SectionHeader id="more-title" title="More guides">
          <TextLink href="/blog">View All Articles</TextLink>
        </SectionHeader>
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((o) => <BlogCard key={o.slug} post={o} />)}
        </div>
      </Section>
    </>
  );
}
