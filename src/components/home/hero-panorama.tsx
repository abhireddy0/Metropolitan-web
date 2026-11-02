import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRightIcon, CalendarCheckIcon, IdentificationBadgeIcon, MapPinIcon, MedalIcon, ShieldCheckIcon } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import { CallButton } from "@/components/shared/blocks";
import { ServicePills } from "@/components/home/service-pills";
import { Container, Eyebrow } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { hero, site, stats } from "@/lib/content";

// Staggers the page-load entrance (animate-rise in globals.css), the same way the other pages do.
const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

const [, years, pros] = stats.home;
// The four cards along the photo's lower edge; response times come from the county list (24 to 48 hours).
const cards: { icon: Icon; title: string; text: string }[] = [
  { icon: ShieldCheckIcon, title: site.badges[0], text: "We check your coverage before care begins." },
  { icon: CalendarCheckIcon, title: "Fast first visits", text: "Usually within 24 to 48 hours of your call." },
  { icon: IdentificationBadgeIcon, title: `${pros[0]} ${pros[1]}`, text: "Nurses, therapists and home health aides." },
  { icon: MedalIcon, title: `${years[0]} ${years[1]}`, text: "Caring for families across Chicagoland." },
];

/** Home hero, panorama style: big headline and actions across the top, a row of service pills, a wide photo in a
 *  rounded frame below, and four white info cards overlapping the photo's lower edge. */
export function HeroPanorama() {
  return (
    // The band starts under the (transparent) sticky header, so the top padding adds the header height back.
    // Colours follow the logo: its bright green (brand) fading into the site's deeper green (primary/cta), as on the logo's cross.
    <section className="-mt-[70px] bg-linear-to-b from-sage to-muted pt-[calc(70px+2.5rem)] pb-12 sm:pt-[calc(70px+3.5rem)] lg:-mt-[84px] lg:pt-[calc(84px+3.5rem)] lg:pb-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
          <div className="flex flex-col items-start gap-5">
            <Eyebrow className="animate-rise gap-2">
              <span aria-hidden className="size-2 rounded-full bg-brand" /> {site.tagline}
            </Eyebrow>
            <h1 className="animate-rise text-[2.75rem] leading-[1] font-bold tracking-[-0.04em] sm:text-[4rem] lg:text-[4.5rem] xl:text-[5.25rem]" style={rise(80)}>
              Your Health, <span className="bg-linear-to-r from-primary to-brand bg-clip-text pb-[0.06em] text-transparent">Our Expertise</span>
            </h1>
          </div>
          <div className="animate-rise space-y-6 lg:pb-2" style={rise(160)}>
            <p className="max-w-[460px] text-base leading-relaxed text-muted-foreground sm:text-lg">{hero.sub}</p>
            <div className="grid gap-3 sm:flex">
              <Link href="/contact#request" className={buttonVariants({ size: "lg" })}>{hero.cta} <ArrowRightIcon /></Link>
              <CallButton className="h-11" />
            </div>
          </div>
        </div>

        <ServicePills className="animate-rise mt-9 lg:mt-12" style={rise(200)} />

        <div className="animate-rise relative mt-6 lg:mt-8" style={rise(240)}>
          <img
            src="/images/pages/hero-nurse-visit.webp"
            srcSet="/images/pages/hero-nurse-visit-640.webp 640w, /images/pages/hero-nurse-visit.webp 1200w"
            sizes="(max-width: 1280px) 100vw, 1200px"
            width={1200}
            height={960}
            alt="Metropolitan nurse sharing a laugh with an older woman during a home visit"
            fetchPriority="high"
            decoding="async"
            className="aspect-4/3 w-full rounded-[1.75rem] object-cover object-[center_30%] sm:aspect-video lg:aspect-21/9 lg:rounded-[2.5rem]"
          />
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-sm font-semibold text-pine backdrop-blur sm:top-6 sm:left-6">
            <MapPinIcon weight="fill" className="size-4 text-brand" /> Serving 10 counties across Chicagoland
          </span>
        </div>

        <ul className="animate-rise relative mx-2 -mt-14 grid grid-cols-2 gap-3 sm:mx-6 sm:-mt-20 lg:mx-10 lg:grid-cols-4 lg:gap-4" style={rise(320)}>
          {cards.map(({ icon: Glyph, title, text }) => (
            <li key={title} className="rounded-2xl border-t-3 border-brand bg-card p-4 shadow-[0_24px_50px_-30px_rgb(18_48_29/0.5)] ring-1 ring-foreground/8 sm:p-5">
              <span className="mb-3 grid size-10 place-items-center rounded-xl bg-linear-to-br from-brand to-cta text-white shadow-[0_8px_18px_-8px_var(--cta)] sm:size-11"><Glyph weight="duotone" className="size-5" /></span>
              <strong className="block text-[0.9375rem] leading-snug font-semibold sm:text-base">{title}</strong>
              <span className="mt-1 block text-xs leading-relaxed text-muted-foreground sm:text-sm">{text}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
