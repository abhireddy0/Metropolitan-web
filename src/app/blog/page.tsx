import type { CSSProperties } from "react";
import { BlogCard } from "@/components/blog/post-card";
import { CtaBand } from "@/components/shared/blocks";
import { JsonLd } from "@/components/shared/json-ld";
import { Container } from "@/components/shared/section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { posts } from "@/lib/collections";
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

// Staggers the hero's page-load entrance (animate-rise in globals.css), like the reference blog.
const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

export default function BlogPage() {
  const categories = [...new Set(posts.map((p) => p.category))];
  const groups: [string, typeof posts][] = [[ALL, posts], ...categories.map((c) => [c, posts.filter((p) => p.category === c)] as [string, typeof posts])];

  return (
    <>
      <JsonLd data={crumbsLd(crumbs)} />
      <section className="bg-muted">
        <Container className="space-y-10 py-16 sm:py-20 lg:space-y-14 lg:py-24">
          <div className="mx-auto max-w-[860px] space-y-4 text-center">
            <h1 className="animate-rise text-h2 leading-[1.15]">Guides for patients and families</h1>
            <p className="animate-rise text-lead text-muted-foreground" style={rise(120)}>
              Practical advice from our clinical team on recovering at home, managing conditions, and navigating coverage.
            </p>
          </div>

          {/* "All" is the default panel, so every post is in the server-rendered HTML. */}
          <Tabs defaultValue={ALL} className="items-center gap-10 lg:gap-14">
            <TabsList style={rise(240)} className="animate-rise max-w-[960px] flex-wrap group-data-horizontal/tabs:h-auto justify-center gap-2 bg-transparent p-0">
              {groups.map(([name]) => (
                <TabsTrigger
                  key={name}
                  value={name}
                  className="h-9 flex-none rounded-full border-border bg-background px-4 text-sm text-ink-2 hover:border-leaf/40 hover:text-leaf data-active:border-primary data-active:bg-primary data-active:text-primary-foreground data-active:shadow-none"
                >
                  {name}
                </TabsTrigger>
              ))}
            </TabsList>
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
      <CtaBand />
    </>
  );
}
