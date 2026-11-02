import type { CSSProperties } from "react";
import Link from "next/link";
import { FindCare } from "@/components/home/find-care";
import { ServiceIcon } from "@/components/shared/service-icon";
import { Container, Eyebrow } from "@/components/shared/section";
import { hero, services, site } from "@/lib/content";

// Staggers the page-load entrance (animate-rise in globals.css), the same way the other pages do.
const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

// Photos floating either side of the hero headline (xl); on smaller screens they sit in a row above it.
const orbit: { slot: string; className: string }[] = [
  { slot: "pages/hero-nurse-visit", className: "top-[20%] left-[5%] size-36" },
  { slot: "services/physical-therapy", className: "top-[48%] left-[3%] size-24" },
  { slot: "services/skilled-nursing", className: "top-[16%] right-[6%] size-28" },
  { slot: "pages/about-care", className: "top-[44%] right-[3%] size-36" },
];

/** Home hero, search style: centred headline with floating photos, the "Find care" bar and service shortcuts. */
export function HeroFindCare() {
  return (
    // Starts under the transparent header: round photos float either side of a centred headline (xl), then the
    // "Find care" search bar and a row of service shortcuts.
    <section className="relative isolate -mt-[70px] overflow-hidden bg-muted pt-[calc(70px+2.5rem)] pb-12 sm:pt-[calc(70px+4rem)] lg:-mt-[84px] lg:pt-[calc(84px+4.5rem)] lg:pb-16">
      <span aria-hidden className="absolute top-0 left-1/2 -z-10 size-[56rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--brand)_22%,transparent),transparent)]" />
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle,var(--color-foreground)_1px,transparent_1px)] bg-size-[22px_22px] opacity-[0.06] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
      {orbit.map(({ slot, className }, i) => (
        <img
          key={slot}
          src={`/images/${slot}-640.webp`}
          alt=""
          aria-hidden
          width={640}
          height={480}
          decoding="async"
          className={`animate-rise absolute hidden rounded-full object-cover shadow-[0_24px_50px_-24px_rgb(18_48_29/0.5)] ring-8 ring-background/70 xl:block ${className}`}
          style={rise(240 + i * 80)}
        />
      ))}

      <Container className="relative flex flex-col items-center text-center">
        <div aria-hidden className="animate-rise mb-5 flex -space-x-3 xl:hidden">
          {orbit.map(({ slot }) => (
            <img key={slot} src={`/images/${slot}-640.webp`} alt="" width={48} height={48} decoding="async" className="size-12 rounded-full object-cover ring-4 ring-muted" />
          ))}
        </div>
        <Eyebrow className="animate-rise gap-2 self-center">
          <span aria-hidden className="size-2 rounded-full bg-primary" /> {site.tagline}
        </Eyebrow>
        <h1 className="animate-rise mt-5 max-w-[860px] text-[2.6rem] leading-[1.04] font-bold tracking-[-0.035em] sm:text-[3.75rem] lg:text-[4.5rem]" style={rise(80)}>
          Your Health, <span className="text-primary">Our Expertise</span>
        </h1>
        <p className="animate-rise mt-5 max-w-[580px] text-base leading-relaxed text-muted-foreground sm:text-lg" style={rise(160)}>{hero.sub}</p>
        <div className="animate-rise mt-9 flex w-full justify-center" style={rise(240)}>
          <FindCare />
        </div>
        <ul className="animate-rise mt-10 grid w-full max-w-[1000px] grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-14 lg:grid-cols-6" style={rise(320)}>
          {services.slice(0, 6).map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="flex h-full flex-col items-center gap-2.5 rounded-2xl bg-card px-3 py-4 text-sm font-semibold ring-1 ring-foreground/8 transition duration-300 hover:-translate-y-0.5 hover:text-primary hover:ring-primary/30 motion-reduce:hover:translate-y-0">
                <ServiceIcon slug={s.slug} className="size-11 rounded-xl bg-primary/10 text-primary [&_svg]:size-5.5" />
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
