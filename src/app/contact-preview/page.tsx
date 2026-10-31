// TEMPORARY: layout options for the Contact page form section. Delete once one is picked.
import Link from "next/link";
import { ArrowRightIcon, ClockIcon, EnvelopeSimpleIcon, PhoneIcon } from "@phosphor-icons/react/ssr";
import { LeadForm } from "@/components/contact/lead-form";
import { TextLink } from "@/components/shared/blocks";
import { Container, Eyebrow } from "@/components/shared/section";
import { contactPage as page, firstVisit, site, tel } from "@/lib/content";

export const metadata = { title: "Contact form options (preview)", robots: { index: false, follow: false } };

const steps = firstVisit.steps.slice(0, 3);
const response = `${page.other.items[2][0]}: ${page.other.items[2][1].toLowerCase()}`;

function Badge() {
  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
      <ClockIcon weight="bold" className="size-3.5" /> {response}
    </span>
  );
}

function Steps({ light = false }: { light?: boolean }) {
  return (
    <ol className="grid gap-5">
      {steps.map(([title, body], i) => (
        <li key={title} className="flex gap-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-sm font-bold text-primary">{i + 1}</span>
          <span>
            <strong className="block font-semibold">{title}</strong>
            <span className={light ? "text-sm leading-snug text-muted-foreground" : "text-[0.9375rem] leading-snug text-muted-foreground"}>{body}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

function Counties() {
  return (
    <div>
      <h3 className="mb-3 text-base font-semibold">{page.counties.title}</h3>
      <ul className="mb-4 flex flex-wrap gap-2">
        {page.counties.items.map((c) => <li key={c} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{c}</li>)}
      </ul>
      <TextLink href="/service-areas">{page.counties.link}</TextLink>
    </div>
  );
}

/* A: the previous layout, polished. Form on the left with no box, steps and counties on the right behind a divider. */
function OptionA() {
  return (
    <section className="py-16 lg:py-20">
      <Container className="grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-0">
        <div className="lg:pr-14">
          <div className="mb-8 space-y-3">
            <Badge />
            <h2 className="text-2xl font-bold sm:text-3xl">{page.form.title}</h2>
            <p className="text-muted-foreground">{page.form.sub}</p>
          </div>
          <LeadForm bare kind="request" />
        </div>
        <aside className="grid content-start gap-10 border-t pt-10 lg:border-t-0 lg:border-l lg:pt-2 lg:pl-14">
          <div>
            <h3 className="mb-6 text-xl font-bold">What happens next</h3>
            <Steps />
          </div>
          <Counties />
        </aside>
      </Container>
    </section>
  );
}

/* B: the two-panel block, with a light beige left panel instead of solid green. */
function OptionB() {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div className="grid overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/8 lg:grid-cols-[5fr_7fr]">
          <div className="order-last flex flex-col gap-8 bg-muted p-8 sm:p-10 lg:order-first lg:p-12 dark:bg-muted/60">
            <div className="space-y-3">
              <Eyebrow>Get started</Eyebrow>
              <h2 className="text-2xl font-bold sm:text-3xl">{page.form.title}</h2>
              <p className="text-muted-foreground">{page.form.sub}</p>
            </div>
            <Steps light />
            <div className="mt-auto grid gap-3 border-t pt-6">
              <a href={tel(site.phone)} className="flex items-center gap-3 font-semibold hover:text-primary"><PhoneIcon weight="duotone" className="size-5 text-primary" />{site.phone}</a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary"><EnvelopeSimpleIcon weight="duotone" className="size-5 text-primary" />{site.email}</a>
            </div>
          </div>
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-bold">Your details</h3>
              <Badge />
            </div>
            <LeadForm bare kind="request" />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* C: centred. Three step cards in a row, then one centred form below. */
function OptionC() {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div className="mx-auto mb-10 flex max-w-[720px] flex-col items-center gap-3 text-center">
          <Eyebrow className="self-center">Get started</Eyebrow>
          <h2 className="mt-1 text-2xl font-bold sm:text-3xl lg:text-4xl">{page.form.title}</h2>
          <p className="text-muted-foreground sm:text-lg">{page.form.sub}</p>
        </div>
        <ol className="mx-auto mb-12 grid max-w-[1000px] gap-4 md:grid-cols-3">
          {steps.map(([title, body], i) => (
            <li key={title} className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
              <span className="mb-3 grid size-9 place-items-center rounded-lg bg-primary/10 text-sm font-bold text-primary">{i + 1}</span>
              <strong className="block font-semibold">{title}</strong>
              <span className="text-sm leading-snug text-muted-foreground">{body}</span>
            </li>
          ))}
        </ol>
        <div className="mx-auto max-w-[760px]">
          <div className="mb-6 flex justify-center"><Badge /></div>
          <LeadForm bare kind="request" />
        </div>
      </Container>
    </section>
  );
}

const options = [
  { id: "a", name: "Option A: Previous layout, polished", View: OptionA },
  { id: "b", name: "Option B: Two panels, light colours", View: OptionB },
  { id: "c", name: "Option C: Centred form", View: OptionC },
];

export default function ContactPreviewPage() {
  return (
    <div className="pb-24">
      <Container className="py-10">
        <h1 className="text-2xl font-bold">Contact page: form section options</h1>
        <p className="text-muted-foreground">
          Compare with the <Link href="/contact#request" className="text-primary">current page</Link>.{" "}
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
