import Link from "next/link";
import { ContactCards, CtaBand, Faq, PageHero, ServiceGrid } from "@/components/shared/blocks";
import { LeadForm } from "@/components/contact/lead-form";
import { JsonLd } from "@/components/shared/json-ld";
import { Section, SectionHeader } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { contactPage, faqIntro, faqs, hero, services, servicesIntro } from "@/lib/content";
import { crumbsLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/services",
  title: "Home Healthcare Services in Chicago | Metropolitan",
  description: "Explore Home Healthcare Services, including skilled nursing, therapy, aides, and social services delivered at home across the Chicago metro area by licensed, compassionate professionals.",
});

const crumbs: [string, string][] = [
  ["Home", "/"],
  ["Services", "/services"],
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={crumbsLd(crumbs)} />
      <PageHero crumbs={crumbs} eyebrow={servicesIntro.eyebrow} title={servicesIntro.title} lead={servicesIntro.sub} />
      <Section tone="white" aria-label="Services">
        <ServiceGrid list={services} />
        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-2xl border bg-sage p-8 md:p-10">
          <div className="max-w-2xl">
            <h2 className="mb-2 text-h3">{hero.personalized.title}</h2>
            <p className="text-lg text-ink-2">{hero.personalized.text}</p>
          </div>
          <Link href="/contact" className={buttonVariants({ variant: "green" })}>{hero.personalized.cta}</Link>
        </div>
      </Section>
      <Section aria-labelledby="faq-title">
        <div className="mx-auto max-w-3xl">
          <SectionHeader id="faq-title" title={faqIntro.title} sub={faqIntro.sub} />
          <Faq items={faqs.filter((f) => f.category !== "insurance")} />
        </div>
      </Section>
      <Section tone="white" aria-label="Contact Us">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ContactCards />
          <LeadForm kind="request" title={contactPage.form.title} intro={contactPage.form.sub} />
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
