// TEMPORARY: layout options for the Careers page body (Why join us, Benefits, Roles). Delete once one is picked.
import Link from "next/link";
import {
  ArrowRightIcon,
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
import { Container, Eyebrow } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { careers, site } from "@/lib/content";

export const metadata = { title: "Careers layout options (preview)", robots: { index: false, follow: false } };

const whyIcons: Icon[] = [HandHeartIcon, UsersThreeIcon, MedalIcon, LightbulbIcon];
const benefitIcons: Icon[] = [HeartbeatIcon, GraduationCapIcon, WalletIcon, CalendarCheckIcon];
const resumeHref = `mailto:${site.email}?subject=${encodeURIComponent("Job application")}`;

function Heading({ eyebrow, title, sub, left = false }: { eyebrow: string; title: string; sub: string; left?: boolean }) {
  return (
    <div className={left ? "space-y-3" : "mx-auto mb-10 flex max-w-[720px] flex-col items-center gap-3 text-center sm:mb-14"}>
      <Eyebrow className={left ? "" : "self-center"}>{eyebrow}</Eyebrow>
      <h2 className="mt-1 text-2xl font-bold sm:text-3xl lg:text-4xl">{title}</h2>
      <p className="text-base text-muted-foreground sm:text-lg">{sub}</p>
    </div>
  );
}

function IconTile({ icon: Glyph }: { icon: Icon }) {
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
      <Glyph weight="duotone" className="size-5" />
    </span>
  );
}

/* A: editorial split rows. Each topic is a heading on the left and a clean divided list on the right. */
function OptionSplit() {
  const block = (eyebrow: string, title: string, sub: string, items: [string, string][], icons: Icon[], muted = false) => (
    <section className={muted ? "bg-muted py-16 lg:py-20" : "py-16 lg:py-20"}>
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Heading left eyebrow={eyebrow} title={title} sub={sub} />
        <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
          {items.map(([t, b], i) => (
            <li key={t} className="flex gap-5 py-6">
              <IconTile icon={icons[i]} />
              <div>
                <h3 className="text-lg font-semibold">{t}</h3>
                <p className="mt-1 text-[0.9375rem] text-muted-foreground">{b}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
  return (
    <>
      {block("Why join us", careers.why.title, careers.why.sub, careers.why.items, whyIcons)}
      {block("Benefits", careers.benefits.title, careers.benefits.sub, careers.benefits.items, benefitIcons, true)}
      <section className="py-16 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Heading left eyebrow="Who we hire" title={careers.roles.title} sub={careers.roles.sub} />
          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {careers.roles.items.map((r) => (
                <li key={r} className="flex items-center gap-3 rounded-lg bg-card px-4 py-3 font-medium ring-1 ring-foreground/10"><CheckCircleIcon weight="fill" className="size-5 text-primary" />{r}</li>
              ))}
            </ul>
            <p className="mt-5 text-muted-foreground">{careers.roles.note}</p>
          </div>
        </Container>
      </section>
    </>
  );
}

/* B: one bento grid holding everything, with a green feature tile that carries the call to action. */
function OptionBento() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <Heading eyebrow="Life at Metropolitan" title="Why clinicians choose us" sub={careers.why.sub} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col justify-between gap-8 rounded-2xl bg-cta p-7 text-white md:col-span-2 lg:row-span-2">
            <div className="space-y-3">
              <p className="text-sm font-semibold tracking-[0.12em] text-white/75 uppercase">We’re hiring</p>
              <p className="text-2xl leading-snug font-bold sm:text-3xl">{careers.roles.title}</p>
              <ul className="flex flex-wrap gap-2 pt-2">
                {careers.roles.items.map((r) => <li key={r} className="rounded-full bg-white/15 px-3 py-1 text-sm">{r}</li>)}
              </ul>
            </div>
            <a href={resumeHref} className={buttonVariants({ variant: "light" }) + " w-fit"}><EnvelopeSimpleIcon weight="duotone" />Email your resume</a>
          </div>
          {careers.why.items.map(([t, b], i) => (
            <div key={t} className="rounded-2xl bg-card p-6 ring-1 ring-foreground/10">
              <IconTile icon={whyIcons[i]} />
              <h3 className="mt-4 text-lg font-semibold">{t}</h3>
              <p className="mt-1 text-[0.9375rem] text-muted-foreground">{b}</p>
            </div>
          ))}
          {careers.benefits.items.map(([t, b], i) => (
            <div key={t} className="rounded-2xl bg-muted p-6 ring-1 ring-foreground/5">
              <IconTile icon={benefitIcons[i]} />
              <h3 className="mt-4 text-lg font-semibold">{t}</h3>
              <p className="mt-1 text-[0.9375rem] text-muted-foreground">{b}.</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* C: one compact section with tabs to switch between the three topics. */
function OptionTabs() {
  const grid = (items: [string, string][], icons: Icon[]) => (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map(([t, b], i) => (
        <div key={t} className="flex gap-4 rounded-xl bg-card p-6 ring-1 ring-foreground/10">
          <IconTile icon={icons[i]} />
          <div>
            <h3 className="text-lg font-semibold">{t}</h3>
            <p className="mt-1 text-[0.9375rem] text-muted-foreground">{b}</p>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <Heading eyebrow="Working here" title="Everything you’d want to know" sub="Why our team stays, what we offer, and who we’re looking for." />
        <Tabs defaultValue="why" className="items-center gap-8">
          <TabsList className="h-auto! gap-1 rounded-full bg-muted p-1">
            {[["why", "Why join us"], ["benefits", "Benefits"], ["roles", "Roles"]].map(([v, l]) => (
              <TabsTrigger key={v} value={v} className="h-9 rounded-full px-5 text-sm after:hidden data-active:bg-primary data-active:text-primary-foreground dark:data-active:border-transparent dark:data-active:bg-primary dark:data-active:text-primary-foreground">{l}</TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="why" className="mx-auto w-full max-w-[1000px]">{grid(careers.why.items, whyIcons)}</TabsContent>
          <TabsContent value="benefits" className="mx-auto w-full max-w-[1000px]">{grid(careers.benefits.items, benefitIcons)}</TabsContent>
          <TabsContent value="roles" className="mx-auto w-full max-w-[1000px]">
            <ul className="flex flex-wrap justify-center gap-3">
              {careers.roles.items.map((r) => <li key={r} className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 font-medium ring-1 ring-foreground/10"><CheckCircleIcon weight="fill" className="size-4.5 text-primary" />{r}</li>)}
            </ul>
            <p className="mt-6 text-center text-muted-foreground">{careers.roles.note}</p>
          </TabsContent>
        </Tabs>
      </Container>
    </section>
  );
}

const options = [
  { id: "a", name: "Option A: Split rows (editorial)", View: OptionSplit },
  { id: "b", name: "Option B: Bento grid", View: OptionBento },
  { id: "c", name: "Option C: Tabs (compact)", View: OptionTabs },
];

export default function CareersPreviewPage() {
  return (
    <div className="pb-24">
      <Container className="py-10">
        <h1 className="text-2xl font-bold">Careers page: middle-section options</h1>
        <p className="text-muted-foreground">
          These replace Why join us, Benefits and Roles. Compare with the <Link href="/careers#why-title" className="text-primary">current page</Link>.{" "}
          {options.map((o) => <Link key={o.id} href={`#${o.id}`} className="ml-3 inline-flex items-center gap-1 font-semibold text-primary"><ArrowRightIcon className="size-3.5 rotate-90" />{o.id.toUpperCase()}</Link>)}
        </p>
      </Container>
      {options.map(({ id, name, View }) => (
        <div key={id} id={id} className="scroll-mt-28 border-t-4 border-primary/30 pt-8">
          <Container><p className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground">{name}<ArrowRightIcon className="size-4 rotate-90" /></p></Container>
          <View />
        </div>
      ))}
    </div>
  );
}
