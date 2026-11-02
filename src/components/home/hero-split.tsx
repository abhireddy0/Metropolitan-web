import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRightIcon, CheckCircleIcon, HeartIcon } from "@phosphor-icons/react/ssr";
import { CallButton } from "@/components/shared/blocks";
import { buttonVariants } from "@/components/ui/button";
import { firstVisit, hero, site, stats } from "@/lib/content";
import { cn } from "@/lib/utils";

// Staggers the page-load entrance (animate-rise in globals.css), the same way the other pages do.
const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

/** "How care starts" card that sits on the seam between the panel and the photo: the first three visit steps. */
function StartCard({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={cn("rounded-2xl bg-card p-5 text-foreground shadow-[0_30px_60px_-30px_rgb(18_48_29/0.55)] ring-1 ring-foreground/8", className)} style={style}>
      <p className="text-xs font-semibold tracking-[0.12em] text-primary uppercase">How care starts</p>
      <ol className="mt-3 space-y-3">
        {firstVisit.steps.slice(0, 3).map(([title], i) => (
          <li key={title} className="flex items-center gap-3 text-[0.9375rem] font-semibold">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary tabular-nums">{i + 1}</span>
            {title}
          </li>
        ))}
      </ol>
      <Link href="/#visit-title" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">What to expect <ArrowRightIcon className="size-4" /></Link>
    </div>
  );
}

/** Home hero, split style: a solid green text panel and a full-height photo side by side (lg), with the
 *  "How care starts" card overlapping the seam. Phones: the panel, then the photo with the card over its lower edge. */
export function HeroSplit() {
  return (
    // The band starts under the (transparent) sticky header, so the panel's top padding adds the header height back.
    <section className="-mt-[70px] grid lg:-mt-[84px] lg:min-h-[min(100svh,860px)] lg:grid-cols-2">
      <div className="relative isolate overflow-hidden bg-cta px-4 pt-[calc(70px+2.5rem)] pb-14 text-white sm:px-8 sm:pt-[calc(70px+3.5rem)] lg:flex lg:items-center lg:pt-[calc(84px+3rem)] lg:pr-20 lg:pb-20 lg:pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]">
        <HeartIcon aria-hidden weight="fill" className="absolute -right-24 -bottom-24 -z-10 size-[26rem] text-white/[0.06]" />
        <div className="flex max-w-[560px] flex-col items-start gap-6">
          <span className="animate-rise inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-sm font-medium ring-1 ring-white/25">
            <span aria-hidden className="size-2 rounded-full bg-white" /> {site.tagline}
          </span>
          <h1 className="animate-rise text-[2.75rem] leading-[1] font-bold tracking-[-0.04em] sm:text-[4rem] xl:text-[4.75rem]" style={rise(80)}>
            Your Health,
            <br />
            Our Expertise.
          </h1>
          <p className="animate-rise text-base leading-relaxed text-white/85 sm:text-lg" style={rise(160)}>{hero.sub}</p>
          <div className="animate-rise grid w-full gap-3 sm:flex sm:w-auto" style={rise(240)}>
            <Link href="/contact#request" className={buttonVariants({ variant: "light", size: "lg" })}>{hero.cta} <ArrowRightIcon /></Link>
            <CallButton variant="ghost-light" className="h-11" />
          </div>
          <dl className="animate-rise mt-2 grid w-full grid-cols-3 gap-4 border-t border-white/20 pt-6" style={rise(300)}>
            {stats.home.slice(0, 3).map(([value, label]) => (
              <div key={label} className="flex flex-col-reverse">
                <dt className="mt-0.5 text-xs text-white/75 sm:text-sm">{label}</dt>
                <dd className="text-2xl font-bold sm:text-3xl">{value}</dd>
              </div>
            ))}
          </dl>
          <ul className="animate-rise flex flex-wrap gap-x-5 gap-y-2" style={rise(340)}>
            {site.badges.map((b) => (
              <li key={b} className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90">
                <CheckCircleIcon weight="fill" className="size-4" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative">
        <img
          src="/images/pages/about-care.webp"
          srcSet="/images/pages/about-care-640.webp 640w, /images/pages/about-care.webp 1200w"
          sizes="(max-width: 1024px) 100vw, 50vw"
          width={1200}
          height={900}
          alt="Caregiver in green scrubs smiling and talking with an older woman"
          fetchPriority="high"
          decoding="async"
          className="h-80 w-full object-cover object-[60%_center] sm:h-[460px] lg:absolute lg:inset-0 lg:h-full"
        />
        {/* Phones and tablets: the card overlaps the photo's lower edge; lg: it sits on the seam, near the bottom. */}
        <div className="relative -mt-16 px-4 pb-10 sm:px-8 lg:absolute lg:bottom-16 lg:left-0 lg:mt-0 lg:-translate-x-1/2 lg:p-0">
          <StartCard className="animate-rise mx-auto max-w-[340px] lg:w-[320px]" style={rise(400)} />
        </div>
      </div>
    </section>
  );
}
