import { Breadcrumbs } from "@/components/shared/blocks";
import { JsonLd } from "@/components/shared/json-ld";
import { Container } from "@/components/shared/section";
import type { LegalPage } from "@/lib/collections";
import { crumbsLd } from "@/lib/seo";

export function LegalView({ page }: { page: LegalPage }) {
  const crumbs: [string, string][] = [
    ["Home", "/"],
    [page.title, `/${page.slug}`],
  ];
  return (
    <>
      <JsonLd data={crumbsLd(crumbs)} />
      <Container className="pt-8 pb-20 md:pt-12 md:pb-28">
        <Breadcrumbs items={crumbs} />
        <h1 className="mb-10 text-display leading-[1.1]">{page.title}</h1>
        <div className="prose-article max-w-[780px] text-base" dangerouslySetInnerHTML={{ __html: page.body.html }} />
      </Container>
    </>
  );
}
