import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, CheckCircleIcon } from "@phosphor-icons/react/ssr";
import { CallButton } from "@/components/shared/blocks";
import { Container } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { hero, services, site, stats } from "@/lib/content";

// Staggers the page-load entrance (animate-rise in globals.css), the same way the other pages do.
const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

const featured = ["skilled-nursing", "physical-therapy", "health-aide"].map((slug) => services.find((s) => s.slug === slug)!);

/** Home hero, cards style: big headline on deep green, then three tall service photo cards in a row that widen on
 *  hover or focus (from sm), and the numbers along the bottom. */
export function HeroCards() {
  return (
    // The band starts under the (transparent) sticky header, so the top padding adds the header height back.
    <section className="relative isolate -mt-[70px] overflow-hidden bg-pine pt-[calc(70px+2.5rem)] pb-12 text-white sm:pt-[calc(70px+3.5rem)] lg:-mt-[84px] lg:pt-[calc(84px+4rem)] lg:pb-16">
      <span aria-hidden className="absolute -top-48 -right-40 -z-10 size-[40rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--brand)_35%,transparent),transparent)]" />
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16">
          <div className="flex flex-col items-start gap-5">
            <span className="animate-rise inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-sm font-medium ring-1 ring-white/20">
              <span aria-hidden className="size-2 rounded-full bg-brand" /> {site.tagline}
            </span>
            <h1 className="animate-rise text-[2.75rem] leading-[1] font-bold tracking-[-0.04em] sm:text-[4rem] lg:text-[4.75rem] xl:text-[5.5rem]" style={rise(80)}>
              Your Health,
              <br />
              <span className="text-brand">Our Expertise</span>
            </h1>
          </div>
          <div className="animate-rise space-y-6 lg:pb-2" style={rise(160)}>
            <p className="max-w-[460px] text-base leading-relaxed text-white/75 sm:text-lg">{hero.sub}</p>
            <div className="grid gap-3 sm:flex">
              <Link href="/contact#request" className={buttonVariants({ size: "lg" })}>{hero.cta} <ArrowRightIcon /></Link>
              <CallButton variant="ghost-light" className="h-11" />
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {site.badges.map((b) => (
                <li key={b} className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80">
                  <CheckCircleIcon weight="fill" className="size-4 text-brand" /> {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="animate-rise mt-12 flex flex-col gap-3 sm:h-[380px] sm:flex-row sm:gap-4 lg:mt-16 lg:h-[440px]" style={rise(260)}>
          {featured.map((s, i) => (
            <li key={s.slug} className="h-72 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] has-[a:focus-visible]:grow-[1.8] sm:h-auto sm:flex-1 sm:hover:grow-[1.8]">
              <Link href={`/services/${s.slug}`} className="group relative isolate flex size-full flex-col justify-between overflow-hidden rounded-[1.75rem] p-5 focus-visible:outline-white sm:p-6">
                <img
                  src={`/images/${s.image}.webp`}
                  srcSet={`/images/${s.image}-640.webp 640w, /images/${s.image}.webp 1200w`}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  width={1200}
                  height={960}
                  alt={s.alt}
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : "low"}
                  className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-pine/90 via-pine/25 to-pine/10" />
                <span className="flex items-start justify-between">
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-[0.12em] tabular-nums ring-1 ring-white/25 backdrop-blur-md">{String(i + 1).padStart(2, "0")}</span>
                  <span className="grid size-11 place-items-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur-md transition-colors duration-300 group-hover:bg-brand group-hover:ring-brand">
                    <ArrowUpRightIcon className="size-5" />
                  </span>
                </span>
                <span>
                  <strong className="block text-xl font-semibold sm:text-2xl">{s.name}</strong>
                  <span className="mt-1.5 line-clamp-2 block max-w-[360px] text-sm text-white/80">{s.card}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <dl className="animate-rise mt-10 grid grid-cols-2 gap-y-6 border-t border-white/15 pt-8 lg:grid-cols-4" style={rise(340)}>
          {stats.home.map(([value, label], i) => (
            <div key={label} className={`flex flex-col-reverse ${i % 2 === 1 ? "border-l border-white/15 pl-6" : i === 2 ? "lg:border-l lg:border-white/15 lg:pl-6" : ""}`}>
              <dt className="mt-1 text-sm text-white/65">{label}</dt>
              <dd className="text-3xl font-bold tracking-[-0.03em] sm:text-4xl">{value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
