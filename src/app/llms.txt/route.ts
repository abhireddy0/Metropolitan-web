import { counties, services, site } from "@/lib/content";
import { posts } from "@/lib/collections";
import { abs } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const body = [
    `# ${site.legalName}`,
    "",
    `> ${site.tagline} ${site.description}`,
    "",
    `Office: ${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}. Phone ${site.phone}, fax ${site.fax}, ${site.email}.`,
    `Counties served: ${counties.map((c) => c.name.replace(" County", "")).join(", ")} (Illinois).`,
    "",
    "## Services",
    ...services.map((s) => `- [${s.name}](${abs(`/services/${s.slug}`)}): ${s.card}`),
    "",
    "## Patients & families",
    `- [Insurance & Medicare](${abs("/insurance")}): Medicare, Illinois Medicaid, BCBS, Aetna, UnitedHealthcare, Cigna.`,
    `- [Service areas](${abs("/service-areas")})`,
    `- [Request care](${abs("/contact")})`,
    "",
    "## Resources",
    ...posts.map((p) => `- [${p.title}](${abs(`/blog/${p.slug}`)}): ${p.summary}`),
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
