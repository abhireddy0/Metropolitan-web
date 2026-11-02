import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRightIcon, CheckCircleIcon, HeartIcon, ShieldCheckIcon } from "@phosphor-icons/react/ssr";
import { CallButton } from "@/components/shared/blocks";
import { Container, Eyebrow } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { hero, site, stats } from "@/lib/content";
import { testimonials } from "@/lib/collections";

// Staggers the page-load entrance (animate-rise in globals.css), the same way the other pages do.
const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

const [patients, , , satisfaction] = stats.home;
const avatar = (name: string) => `/images/avatars/${name.toLowerCase().replace(/\s+/g, "-")}.webp`;

const photo = (slot: string, alt: string, className: string) => (
  <img
    src={`/images/${slot}.webp`}
    srcSet={`/images/${slot}-640.webp 640w, /images/${slot}.webp 1200w`}
    sizes="(max-width: 1024px) 50vw, 300px"
    width={1200}
    height={960}
    alt={alt}
    decoding="async"
    className={`w-full rounded-[1.75rem] object-cover shadow-[0_30px_60px_-34px_rgb(18_48_29/0.5)] ${className}`}
  />
);

// Small white badge pinned to a photo: icon or avatars, a bold value and a label.
const badge = "absolute flex items-center gap-3 rounded-2xl bg-card/95 p-2.5 pr-4 shadow-[0_18px_40px_-20px_rgb(18_48_29/0.5)] ring-1 ring-foreground/8 backdrop-blur";

/** Home hero, stacked style: text on a soft green gradient, and three rounded photos at staggered heights
 *  on the right with stat badges pinned to them. */
export function HeroStacked() {
  return (
    // The band starts under the (transparent) sticky header, so the top padding adds the header height back.
    <section className="relative isolate -mt-[70px] overflow-hidden bg-linear-to-br from-sage via-muted to-muted pt-[calc(70px+2.5rem)] pb-14 sm:pt-[calc(70px+3.5rem)] lg:-mt-[84px] lg:pt-[calc(84px+4rem)] lg:pb-20">
      <span aria-hidden className="absolute top-1/4 -left-40 -z-10 size-[30rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--brand)_20%,transparent),transparent)]" />
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow className="animate-rise gap-2">
            <span aria-hidden className="size-2 rounded-full bg-primary" /> {site.tagline}
          </Eyebrow>
          <h1 className="animate-rise text-[2.6rem] leading-[1.04] font-bold tracking-[-0.035em] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem]" style={rise(80)}>
            Your Health,
            <br />
            <span className="text-primary">Our Expertise</span>
          </h1>
          <p className="animate-rise max-w-[500px] text-base leading-relaxed text-muted-foreground sm:text-lg" style={rise(160)}>{hero.sub}</p>
          <div className="animate-rise grid w-full gap-3 sm:flex sm:w-auto" style={rise(240)}>
            <Link href="/contact#request" className={buttonVariants({ size: "lg" })}>{hero.cta} <ArrowRightIcon /></Link>
            <CallButton className="h-11" />
          </div>
          <ul className="animate-rise mt-2 flex w-full flex-wrap gap-x-6 gap-y-2 border-t border-foreground/10 pt-6" style={rise(300)}>
            {site.badges.map((b) => (
              <li key={b} className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80">
                <CheckCircleIcon weight="fill" className="size-4.5 text-primary" /> {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Two columns of photos at different heights: one tall photo set lower on the left, two stacked on the right. */}
        <div className="animate-rise relative mx-auto grid w-full max-w-[560px] grid-cols-2 gap-3 sm:gap-5 lg:mr-0" style={rise(320)}>
          <span aria-hidden className="absolute top-1/2 left-1/2 -z-10 size-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10" />

          <div className="relative mt-12 sm:mt-20">
            {photo("pages/about-care", "Caregiver in green scrubs smiling with an older woman at home", "aspect-3/4 object-[60%_center]")}
            <div className={`${badge} -bottom-5 -left-2 sm:-left-6`}>
              <span className="flex -space-x-2.5">
                {testimonials.slice(0, 3).map((t) => (
                  <img key={t.name} src={avatar(t.name)} alt="" width={32} height={32} decoding="async" className="size-8 rounded-full object-cover ring-2 ring-card" />
                ))}
              </span>
              <span className="leading-tight">
                <strong className="block font-bold text-primary">{patients[0]}</strong>
                <span className="text-xs text-muted-foreground">{patients[1]}</span>
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:gap-5">
            <div className="relative">
              {photo("pages/hero-nurse-visit", "Metropolitan nurse sharing a laugh with an older woman during a home visit", "aspect-square object-[30%_center]")}
              <div className={`${badge} -top-4 -right-2 sm:-right-5`}>
                <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary"><HeartIcon weight="fill" className="size-4.5" /></span>
                <span className="leading-tight">
                  <strong className="block font-bold text-primary">{satisfaction[0]}</strong>
                  <span className="text-xs text-muted-foreground">{satisfaction[1]}</span>
                </span>
              </div>
            </div>
            <div className="relative">
              {photo("services/skilled-nursing", "Nurse checking a patient's blood pressure at home", "aspect-4/5 object-[45%_center]")}
              <div className={`${badge} -bottom-4 -right-2 sm:-right-5`}>
                <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary"><ShieldCheckIcon weight="duotone" className="size-5" /></span>
                <strong className="text-sm font-semibold">{site.badges[0]}</strong>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
