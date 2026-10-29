import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactCards, CtaBand, h2Class, ItemGrid, PageHero, ServiceGrid, TextLink } from "@/components/shared/blocks";
import { LeadForm } from "@/components/contact/lead-form";
import { JsonLd } from "@/components/shared/json-ld";
import { Media } from "@/components/shared/media";
import { ServiceIcon } from "@/components/shared/service-icon";
import { Section, SectionHeader } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { contactPage, hero, services, servicesIntro, site, tel } from "@/lib/content";
import { abs, crumbsLd, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

const find = (slug: string) => services.find((s) => s.slug === slug);

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const s = find((await params).slug);
  if (!s) return {};
  return pageMetadata({ path: `/services/${s.slug}`, title: s.title, description: s.description });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const s = find((await params).slug);
  if (!s) notFound();
  const path = `/services/${s.slug}`;
  const crumbs: [string, string][] = [
    ["Home", "/"],
    ["Services", "/services"],
    [s.name, path],
  ];
  const others = services.filter((o) => o.slug !== s.slug);
  const at = services.indexOf(s);
  const related = [...others.slice(at), ...others.slice(0, at)].slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          crumbsLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.name,
            serviceType: s.name,
            description: s.description,
            url: abs(path),
            provider: { "@id": abs("/#organization") },
            areaServed: { "@type": "AdministrativeArea", name: "Chicago metropolitan area, Illinois" },
          },
        ]}
      />
      <PageHero
        crumbs={crumbs}
        badges={site.badges}
        icon={<ServiceIcon slug={s.slug} className="size-14 [&_svg]:size-8" />}
        title={s.heroTitle}
        lead={s.heroSub}
        actions={
          <>
            <Link href="#request" className={buttonVariants()}>{hero.cta}</Link>
            <a href={tel(site.phone)} className={buttonVariants({ variant: "outline" })}>Contact Us: {site.phoneDashed}</a>
          </>
        }
        aside={<Media slot={s.image} alt={s.alt} eager sizes="(max-width: 1024px) 100vw, 560px" className="aspect-4/3 rounded-2xl" />}
      />

      <Section tone="white" aria-labelledby="expertise-title">
        <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <div>
            <h2 id="expertise-title" className={cn(h2Class, "mb-5")}>{hero.title}</h2>
            <p className="text-lg text-ink-2">{hero.sub}</p>
          </div>
          <div>
            {s.intro.map((p) => (
              <p key={p} className="mb-5 text-lg text-ink-2 last:mb-0">{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section aria-labelledby="list-title">
        <SectionHeader id="list-title" title={s.listTitle} />
        <ItemGrid items={s.items} />
      </Section>

      <Section tone="sand" aria-label="Contact Us">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ContactCards />
          <div id="request" className="scroll-mt-28">
            <LeadForm kind="request" preset={s.name} title={contactPage.form.title} intro={contactPage.form.sub} />
          </div>
        </div>
      </Section>

      <Section aria-labelledby="related-title">
        <SectionHeader id="related-title" title={servicesIntro.title}>
          <TextLink href="/services">Explore Our Services</TextLink>
        </SectionHeader>
        <ServiceGrid list={related} />
      </Section>

      <CtaBand />
    </>
  );
}
