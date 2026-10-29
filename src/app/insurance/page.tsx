import Link from "next/link";
import { CheckCircleIcon, HeadsetIcon, ShieldCheckIcon } from "@phosphor-icons/react/ssr";
import { CtaBand, Faq, h2Class, PageHero, Steps } from "@/components/shared/blocks";
import { LeadForm } from "@/components/contact/lead-form";
import { JsonLd } from "@/components/shared/json-ld";
import { PanelTabs } from "@/components/shared/panel-tabs";
import { Section, SectionHeader } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { faqIntro, faqs, firstVisit, insurancePage as page, site, tel } from "@/lib/content";
import { crumbsLd, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  path: "/insurance",
  title: "Insurance Coverage - Metropolitan Home Health Care",
  description: "Learn about insurance coverage for home health services. We accept Medicare, Medicaid, and most major insurance plans in Chicago.",
});

const crumbs: [string, string][] = [
  ["Home", "/"],
  ["Insurance", "/insurance"],
];

function ServiceList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border bg-card p-7">
      <h4 className="mb-4 text-lg font-semibold">{title}</h4>
      <ul className="grid gap-2.5">
        {items.map((i) => (
          <li key={i} className="flex items-center gap-2.5"><CheckCircleIcon weight="duotone" className="size-5 shrink-0 text-leaf" /> {i}</li>
        ))}
      </ul>
    </div>
  );
}

export default function InsurancePage() {
  const [verifyTitle, verifyText, verifyCta] = page.quick.verify;
  const [helpTitle, helpText] = page.quick.help;
  return (
    <>
      <JsonLd data={crumbsLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        badges={site.badges}
        title={page.title}
        lead={page.sub}
        actions={
          <>
            <Link href="#check" className={buttonVariants()}>{page.cta}</Link>
            <a href={tel(site.phone)} className={buttonVariants({ variant: "outline" })}>Contact Us: {site.phoneDashed}</a>
          </>
        }
        aside={
          <div className="grid gap-4 sm:grid-cols-2">
            {page.badges.map((b) => (
              <div key={b} className="rounded-2xl border bg-card p-6">
                <ShieldCheckIcon weight="duotone" className="mb-3 size-8 text-leaf" />
                <p className="text-lg font-semibold">{b}</p>
              </div>
            ))}
            <Link href="#check" className="group rounded-2xl border bg-card p-6 hover:border-leaf">
              <CheckCircleIcon weight="duotone" className="mb-3 size-8 text-leaf" />
              <p className="text-lg font-semibold">{verifyTitle}</p>
              <p className="mb-3 text-muted-foreground">{verifyText}</p>
              <span className="font-semibold text-leaf group-hover:underline">{verifyCta}</span>
            </Link>
            <a href={tel(site.phone)} className="group rounded-2xl border bg-card p-6 hover:border-leaf">
              <HeadsetIcon weight="duotone" className="mb-3 size-8 text-leaf" />
              <p className="text-lg font-semibold">{helpTitle}</p>
              <p className="mb-3 text-muted-foreground">{helpText}</p>
              <span className="font-semibold text-leaf group-hover:underline">Call {site.phoneDashed}</span>
            </a>
          </div>
        }
      />

      <Section tone="white" aria-label="Insurance details">
        <PanelTabs
          tabs={[
            {
              value: "providers",
              label: page.tabs[0],
              panel: (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {page.providers.map((p) => (
                    <div key={p.name} className="flex flex-col rounded-2xl border bg-card p-6">
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <h3 className="text-xl font-semibold">{p.name}</h3>
                        {p.accepting && <span className="rounded-full bg-sage px-2.5 py-1 text-[0.8rem] font-semibold whitespace-nowrap text-forest">Accepting</span>}
                      </div>
                      <p className="mb-4 text-ink-2">{p.description}</p>
                      <p className="mt-auto border-t pt-3 text-sm"><span className="text-muted-foreground">Coverage: </span><span className="font-semibold">{p.coverage}</span></p>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              value: "benefits",
              label: page.tabs[1],
              panel: (
                <>
                  <h3 className={cn(h2Class, "mb-2")}>{page.benefits.title}</h3>
                  <p className="mb-8 text-lg text-ink-2">{page.benefits.sub}</p>
                  <div className="grid gap-5 md:grid-cols-2">
                    <ServiceList title="Clinical Services" items={page.benefits.clinical} />
                    <ServiceList title="Support Services" items={page.benefits.support} />
                  </div>
                </>
              ),
            },
            {
              value: "authorization",
              label: page.tabs[2],
              panel: (
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
                  <div>
                    <h3 className={cn(h2Class, "mb-2")}>{page.authorization.title}</h3>
                    <p className="text-lg text-ink-2">{page.authorization.sub}</p>
                  </div>
                  <Steps items={page.authorization.steps} />
                </div>
              ),
            },
          ]}
        />
      </Section>

      <Section id="check" aria-labelledby="check-title" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader id="check-title" title={page.cta} sub={verifyText} className="mb-6 md:mb-8" />
            <p className="rounded-2xl border border-sage-2 bg-sage p-6 text-forest-dark"><strong>{firstVisit.medicare.title}</strong> {firstVisit.medicare.text}</p>
          </div>
          <LeadForm kind="coverage" />
        </div>
      </Section>
      <Section tone="white" aria-labelledby="faq-title">
        <div className="mx-auto max-w-3xl">
          <SectionHeader id="faq-title" title={faqIntro.title} sub="Billing, payment and coverage questions" />
          <Faq items={faqs.filter((f) => f.category === "insurance")} />
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
