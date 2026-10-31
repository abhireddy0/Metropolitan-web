import type { CSSProperties } from "react";
import { BlogCard } from "@/components/blog/post-card";
import { CtaBand, Faq } from "@/components/shared/blocks";
import { ChipScroller } from "@/components/shared/chip-scroller";
import { JsonLd } from "@/components/shared/json-ld";
import { Container, Eyebrow } from "@/components/shared/section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { posts } from "@/lib/collections";
import { faqs } from "@/lib/content";
import { crumbsLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/blog",
  title: "Healthcare Blog | Metro Home Healthcare - Expert Medical Insights",
  description: "Expert healthcare insights, patient care tips, and medical advice from our professional medical team serving the Chicago metropolitan area.",
});

const crumbs: [string, string][] = [
  ["Home", "/"],
  ["Blog", "/blog"],
];

const ALL = "All";

// The five questions a reader landing on the blog most likely has.
const blogFaqs = [
  "What is home health care?",
  "Who qualifies for home health care services?",
  "How do I start home health care services?",
  "Do we have to pay for it?",
  "How often will healthcare professionals visit?",
].map((q) => faqs.find((f) => f.q === q)!);

// Staggers the hero's page-load entrance (animate-rise in globals.css), like the reference blog.
const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

export default function BlogPage() {
  const categories = [...new Set(posts.map((p) => p.category))];
  const groups: [string, typeof posts][] = [[ALL, posts], ...categories.map((c) => [c, posts.filter((p) => p.category === c)] as [string, typeof posts])];

  return (
    <>
      <JsonLd data={crumbsLd(crumbs)} />
      {/* The band starts under the (transparent) sticky header, so the top padding adds the header height back. */}
      <section className="-mt-[70px] bg-muted pt-[calc(70px+2rem)] pb-16 sm:pt-[calc(70px+3rem)] lg:-mt-[84px] lg:pt-[calc(84px+3.5rem)] lg:pb-24">
        <Container>
          <div className="mx-auto flex max-w-[720px] flex-col items-center gap-3 text-center">
            <Eyebrow className="animate-rise self-center">Health Library</Eyebrow>
            <h1 className="animate-rise mt-1 text-[2rem] leading-[1.15] font-bold sm:text-[2.5rem] lg:text-[2.75rem]" style={rise(80)}>
              Guides for patients and families
            </h1>
            <p className="animate-rise text-base text-muted-foreground sm:text-lg" style={rise(160)}>
              Practical advice from our clinical team on recovering at home, managing conditions, and navigating coverage.
            </p>
          </div>

          {/* "All" is the default panel, so every post is in the server-rendered HTML. */}
          <Tabs defaultValue={ALL} className="mt-8 gap-8 lg:mt-10">
            {/* One row of chips, centred when it fits and scrolling sideways when it doesn't. */}
            <ChipScroller style={rise(240)} className="animate-rise">
              <TabsList className="mx-auto w-max gap-1.5 bg-transparent p-0 group-data-horizontal/tabs:h-auto">
                {groups.map(([name, list]) => (
                  <TabsTrigger
                    key={name}
                    value={name}
                    className="h-9 flex-none gap-1.5 rounded-full border-border bg-card px-3 text-sm text-foreground/75 shadow-none after:hidden hover:border-primary/40 hover:text-primary data-active:border-primary data-active:bg-primary data-active:text-primary-foreground data-active:hover:text-primary-foreground dark:data-active:border-primary dark:data-active:bg-primary dark:data-active:text-primary-foreground"
                  >
                    {name}
                    {name === ALL && <span className="rounded-full bg-current/15 px-1.5 text-xs leading-5 tabular-nums">{list.length}</span>}
                  </TabsTrigger>
                ))}
              </TabsList>
            </ChipScroller>
            {groups.map(([name, list]) => (
              // The grid rises in last on page load and again, without the wait, when a tab is picked.
              <TabsContent key={name} value={name} className="w-full animate-rise" style={rise(name === ALL ? 360 : 0)}>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((p, i) => <BlogCard key={p.slug} post={p} eager={name === ALL && i < 3} />)}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Container>
      </section>

      {/* Short FAQ under the posts, laid out like the reference blog's. The full list lives on the home page. */}
      <section aria-labelledby="blog-faq-title" className="py-12 sm:py-16 lg:py-24">
        <Container>
          <div className="mx-auto mb-10 flex max-w-[720px] flex-col items-center gap-3 text-center sm:mb-14">
            <Eyebrow className="self-center">FAQ’s</Eyebrow>
            <h2 id="blog-faq-title" className="mt-1 text-2xl font-bold sm:text-3xl lg:text-4xl">Need help? We’ve got you covered</h2>
            <p className="text-base text-muted-foreground sm:text-lg">Answers to what families ask most about home health care, coverage, and getting started.</p>
          </div>
          <div className="mx-auto max-w-[800px]">
            <Faq items={blogFaqs} />
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
