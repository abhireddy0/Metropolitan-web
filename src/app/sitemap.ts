import type { MetadataRoute } from "next";
import { services } from "@/lib/content";
import { legalPages, posts } from "@/lib/collections";
import { abs } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const page = (path: string, priority: number) => ({ url: abs(path), lastModified, priority });
  return [
    page("/", 1),
    page("/services", 0.9),
    ...services.map((s) => page(`/services/${s.slug}`, 0.8)),
    page("/insurance", 0.8),
    page("/service-areas", 0.8),
    page("/contact", 0.8),
    page("/about", 0.7),
    page("/certificates", 0.6),
    page("/careers", 0.6),
    page("/blog", 0.6),
    ...posts.map((p) => ({ ...page(`/blog/${p.slug}`, 0.5), lastModified: new Date(p.updated) })),
    ...legalPages.map((l) => page(`/${l.slug}`, 0.2)),
  ];
}
