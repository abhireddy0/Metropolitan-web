import { BlogCard, FeaturedPost } from "@/components/blog/post-card";
import { CtaBand, PageHero } from "@/components/shared/blocks";
import { JsonLd } from "@/components/shared/json-ld";
import { Section } from "@/components/shared/section";
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

export default function BlogPage() {
  const [first, ...rest] = posts;
  return (
    <>
      <JsonLd data={crumbsLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Health resources"
        title="Guides for patients and families"
        lead="Practical advice from our clinical team on recovering at home, managing conditions, and navigating coverage."
      />
      <Section tone="white" inner="pt-12 md:pt-16">
        {first && <FeaturedPost post={first} />}
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => <BlogCard key={p.slug} post={p} />)}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
