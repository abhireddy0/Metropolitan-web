import type { CSSProperties } from "react";
import {
  CalendarCheckIcon,
  CheckCircleIcon,
  EnvelopeSimpleIcon,
  GraduationCapIcon,
  HandHeartIcon,
  HeartbeatIcon,
  LightbulbIcon,
  MedalIcon,
  UsersThreeIcon,
  WalletIcon,
} from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import { CallButton, Faq } from "@/components/shared/blocks";
import { JsonLd } from "@/components/shared/json-ld";
import { Media } from "@/components/shared/media";
import { Container, Eyebrow } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { careers, site, stats } from "@/lib/content";
import { crumbsLd, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  path: "/careers",
  title: "Careers | Metropolitan Home Health Care",
  description: "Join our team of healthcare professionals at Metropolitan Home Health Care. Explore rewarding career opportunities in home healthcare.",
});

const crumbs: [string, string][] = [
  ["Home", "/"],
  ["Careers", "/careers"],
];

// Staggers the hero's page-load entrance (animate-rise in globals.css), the same way the blog page does.
const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

const whyIcons: Icon[] = [HandHeartIcon, UsersThreeIcon, MedalIcon, LightbulbIcon];
const benefitIcons: Icon[] = [HeartbeatIcon, GraduationCapIcon, WalletIcon, CalendarCheckIcon];

const resumeHref = `mailto:${site.email}?subject=${encodeURIComponent("Job application")}`;

/** Centred section heading, matching the blog page's FAQ header. */
function Heading({ eyebrow, title, sub, id }: { eyebrow: string; title: string; sub: string; id: string }) {
  return (
    <div className="mx-auto mb-10 flex max-w-[720px] flex-col items-center gap-3 text-center sm:mb-14">
      <Eyebrow className="self-center">{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-1 text-2xl font-bold sm:text-3xl lg:text-4xl">{title}</h2>
      <p className="text-base text-muted-foreground sm:text-lg">{sub}</p>
    </div>
  );
}

/** Heading on the left that stays in view (lg and up) while the content on the right scrolls past it. */
function SplitSection({ id, eyebrow, title, sub, children }: { id: string; eyebrow: string; title: string; sub: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="py-16 lg:py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="space-y-3 lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id={id} className="mt-1 text-2xl font-bold sm:text-3xl lg:text-4xl">{title}</h2>
          <p className="text-base text-muted-foreground sm:text-lg">{sub}</p>
        </div>
        <div>{children}</div>
      </Container>
    </section>
  );
}

/** Divided list of icon, title and text rows. */
function IconList({ items, icons }: { items: [string, string][]; icons: Icon[] }) {
  return (
    <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
      {items.map(([title, body], i) => {
        const Glyph = icons[i];
        return (
          <li key={title} className="group flex gap-5 py-6">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
              <Glyph weight="duotone" className="size-5" />
            </span>
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-[0.9375rem] text-muted-foreground">{body}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function ResumeButton({ className }: { className?: string }) {
  return (
    <a href={resumeHref} className={cn(buttonVariants(), className)}>
      <EnvelopeSimpleIcon weight="duotone" /> Email your resume
    </a>
  );
}

export default function CareersPage() {
  return (
    <>
      <JsonLd data={crumbsLd(crumbs)} />

      {/* Hero band starts under the transparent header, like the blog's: centred intro, a wide team photo, and the
          stat cards overlapping its lower edge. */}
      <section className="-mt-[70px] bg-muted pt-[calc(70px+2rem)] pb-12 sm:pt-[calc(70px+3rem)] lg:-mt-[84px] lg:pt-[calc(84px+3.5rem)] lg:pb-16">
        <Container>
          <div className="mx-auto flex max-w-[720px] flex-col items-center gap-3 text-center">
            <Eyebrow className="animate-rise self-center">Careers</Eyebrow>
            <h1 className="animate-rise mt-1 text-[2rem] leading-[1.15] font-bold sm:text-[2.5rem] lg:text-[2.75rem]" style={rise(80)}>{careers.title}</h1>
            <p className="animate-rise text-base text-muted-foreground sm:text-lg" style={rise(160)}>{careers.sub}.</p>
            <div className="animate-rise mt-3 grid w-full max-w-xs gap-3 sm:flex sm:w-auto sm:max-w-none sm:justify-center" style={rise(240)}>
              <ResumeButton />
              <CallButton />
            </div>
          </div>

          <div className="animate-rise mt-10 lg:mt-12" style={rise(320)}>
            <Media slot="pages/careers-team" alt="Caregiver sharing a joyful moment with an older woman" eager className="aspect-4/3 rounded-2xl sm:aspect-video lg:aspect-21/9" />
          </div>

          <dl style={rise(400)} className="animate-rise relative grid grid-cols-2 gap-3 pt-4 sm:gap-4 lg:-mt-14 lg:grid-cols-4 lg:px-10 lg:pt-0">
            {stats.careers.map(([value, label]) => (
              <div key={label} className="rounded-xl bg-card p-5 shadow-[0_18px_40px_-28px_rgb(18_48_29/0.45)] ring-1 ring-foreground/8 sm:p-6">
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="mt-1 text-3xl font-bold text-primary sm:text-4xl">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <SplitSection id="why-title" eyebrow="Why join us" title={careers.why.title} sub={careers.why.sub}>
        <IconList items={careers.why.items} icons={whyIcons} />
      </SplitSection>

      <section aria-labelledby="benefits-title" className="bg-muted py-16 lg:py-24">
        <Container>
          <Heading id="benefits-title" eyebrow="Benefits" title={careers.benefits.title} sub={careers.benefits.sub} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {careers.benefits.items.map(([title, body], i) => {
              const Glyph = benefitIcons[i];
              return (
                <div key={title} className="group rounded-xl bg-background p-6 ring-1 ring-foreground/10 transition-shadow duration-300 hover:ring-primary/30 dark:bg-card">
                  <span className="mb-5 grid size-11 place-items-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Glyph weight="duotone" className="size-5" />
                  </span>
                  <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                  <p className="text-[0.9375rem] text-muted-foreground">{body}.</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section aria-labelledby="roles-title" className="py-16 lg:py-24">
        <Container>
          <Heading id="roles-title" eyebrow="Who we hire" title={careers.roles.title} sub={careers.roles.sub} />
          <ul className="mx-auto flex max-w-[900px] flex-wrap justify-center gap-3">
            {careers.roles.items.map((role) => (
              <li key={role} className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-[0.9375rem] font-medium ring-1 ring-foreground/10">
                <CheckCircleIcon weight="fill" className="size-4.5 text-primary" /> {role}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-muted-foreground">{careers.roles.note}</p>
        </Container>
      </section>

      <section aria-labelledby="careers-faq-title" className="bg-muted py-16 lg:py-24">
        <Container>
          <Heading id="careers-faq-title" eyebrow="FAQ’s" title="Questions about working with us" sub="What applicants ask most about joining Metropolitan Home Health Care." />
          <div className="mx-auto max-w-[800px] [&_[data-slot=accordion-item]]:bg-background dark:[&_[data-slot=accordion-item]]:bg-card">
            <Faq items={careers.faqs} />
          </div>
        </Container>
      </section>

    </>
  );
}
