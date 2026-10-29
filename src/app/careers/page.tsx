import { HandHeartIcon, LightbulbIcon, MedalIcon, UsersThreeIcon } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import { PageHero, Stats } from "@/components/shared/blocks";
import { JsonLd } from "@/components/shared/json-ld";
import { Media } from "@/components/shared/media";
import { Section, SectionHeader } from "@/components/shared/section";
import { careers, stats } from "@/lib/content";
import { crumbsLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/careers",
  title: "Careers | Metropolitan Home Health Care",
  description: "Join our team of healthcare professionals at Metropolitan Home Health Care. Explore rewarding career opportunities in home healthcare.",
});

const crumbs: [string, string][] = [
  ["Home", "/"],
  ["Careers", "/careers"],
];

const whyIcons: Icon[] = [HandHeartIcon, UsersThreeIcon, MedalIcon, LightbulbIcon];

export default function CareersPage() {
  return (
    <>
      <JsonLd data={crumbsLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        title={careers.title}
        lead={careers.sub}
        aside={<Media slot="pages/careers-nurse" width={900} height={1100} alt="Smiling nurse in teal scrubs" eager className="aspect-[4/4.2] rounded-2xl object-top" />}
      />
      <Section tone="white" tight aria-label="Our team in numbers" className="border-t">
        <Stats items={stats.careers} />
      </Section>
      <Section aria-labelledby="why-title">
        <SectionHeader id="why-title" title={careers.why.title} sub={careers.why.sub} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {careers.why.items.map(([title, body], i) => {
            const Glyph = whyIcons[i];
            return (
              <div key={title} className="rounded-2xl border bg-card p-7">
                <span className="mb-5 grid size-12 place-items-center rounded-xl bg-sage text-forest"><Glyph weight="duotone" className="size-6" /></span>
                <h3 className="mb-2 text-xl font-semibold">{title}</h3>
                <p className="text-ink-2">{body}</p>
              </div>
            );
          })}
        </div>
      </Section>
      <Section tone="sand" aria-labelledby="benefits-title">
        <SectionHeader id="benefits-title" title={careers.benefits.title} sub={careers.benefits.sub} />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {careers.benefits.items.map(([title, body]) => (
            <div key={title} className="border-t-[1.5px] border-leaf pt-5">
              <h3 className="mb-2 font-display text-title font-medium">{title}</h3>
              <p className="text-ink-2">{body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
