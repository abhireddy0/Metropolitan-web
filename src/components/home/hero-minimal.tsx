import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRightIcon, QuotesIcon } from "@phosphor-icons/react/ssr";
import { buttonVariants } from "@/components/ui/button";
import { ServicePills } from "@/components/home/service-pills";
import { Container } from "@/components/shared/section";
import { hero, site, stats, tel } from "@/lib/content";
import { testimonials } from "@/lib/collections";

// Staggers the page-load entrance (animate-rise in globals.css), the same way the other pages do.
const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

// The first patient story's opening sentence, as on the testimonial cards.
const story = testimonials[0];
const quote = story.quote.match(/^(.+?[.!?])(\s|$)/)?.[1] ?? story.quote;
const avatar = `/images/avatars/${story.name.toLowerCase().replace(/\s+/g, "-")}.webp`;

/** Home hero, minimal style: a quiet text column with one action and a line of numbers, and a tall portrait photo
 *  with one large rounded corner and a patient quote overlapping its lower edge; the ten service pills run underneath. */
export function HeroMinimal() {
  return (
    // The band starts under the (transparent) sticky header, so the top padding adds the header height back.
    <section className="-mt-[70px] pt-[calc(70px+3rem)] pb-16 sm:pt-[calc(70px+4rem)] lg:-mt-[84px] lg:pt-[calc(84px+3rem)] lg:pb-20">
      {/* grid-cols-1 (minmax(0,1fr)) keeps the long pill row from widening the single phone column. */}
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div className="max-w-[600px]">
          <p className="animate-rise text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Home health care in Chicagoland</p>
          <h1 className="animate-rise mt-6 text-[2.5rem] leading-[1.08] font-semibold tracking-[-0.035em] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem]" style={rise(80)}>
            Your Health,
            <br />
            <span className="bg-linear-to-r from-primary to-brand bg-clip-text pb-[0.06em] text-transparent">Our Expertise</span>
          </h1>
          <p className="animate-rise mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg" style={rise(160)}>{hero.sub}</p>
          <div className="animate-rise mt-9 flex flex-wrap items-center gap-x-7 gap-y-4" style={rise(240)}>
            <Link href="/contact#request" className={buttonVariants({ size: "lg" })}>{hero.cta} <ArrowRightIcon /></Link>
            <a href={tel(site.phone)} className="font-semibold text-foreground underline decoration-brand/60 decoration-2 underline-offset-6 transition-colors hover:text-primary hover:decoration-brand">
              or call {site.phone}
            </a>
          </div>
          <dl className="animate-rise mt-14 grid grid-cols-3 gap-6 border-t pt-7" style={rise(300)}>
            {stats.home.slice(0, 3).map(([value, label]) => (
              // justify-end packs a reversed column at the top, so the numbers line up even when a label wraps.
              <div key={label} className="flex flex-col-reverse justify-end">
                <dt className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</dt>
                <dd className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="animate-rise relative m-0 mx-auto w-full max-w-[460px] lg:mr-0" style={rise(200)}>
          <img
            src="/images/services/health-aide.webp"
            srcSet="/images/services/health-aide-640.webp 640w, /images/services/health-aide.webp 1200w"
            sizes="(max-width: 1024px) 90vw, 480px"
            width={1200}
            height={900}
            alt="Home health aide holding hands with a smiling older woman"
            fetchPriority="high"
            decoding="async"
            className="aspect-4/5 w-full rounded-[2rem] lg:aspect-5/6 rounded-tr-[9rem] object-cover object-[65%_center] sm:rounded-tr-[12rem]"
          />
          <figcaption className="relative mx-4 -mt-24 rounded-2xl bg-card p-5 shadow-[0_30px_60px_-30px_rgb(18_48_29/0.45)] ring-1 ring-foreground/8 sm:mx-0 sm:-ml-10 sm:w-[340px] sm:p-6">
            <QuotesIcon aria-hidden weight="fill" className="size-7 text-brand/60" />
            <blockquote className="mt-2 text-[0.9375rem] leading-relaxed font-medium">{quote}</blockquote>
            <div className="mt-4 flex items-center gap-3">
              <img src={avatar} alt="" width={40} height={40} decoding="async" className="size-10 rounded-full object-cover" />
              <span className="text-sm leading-tight">
                <strong className="block font-semibold">{story.name}</strong>
                <span className="text-muted-foreground">{story.location}</span>
              </span>
            </div>
          </figcaption>
        </figure>

        {/* The services strip across the foot of the hero: a small label, then the pills. */}
        <div className="animate-rise min-w-0 border-t pt-8 lg:col-span-2 lg:flex lg:items-start lg:gap-8" style={rise(360)}>
          <p className="mb-4 shrink-0 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase lg:mb-0 lg:pt-3.5 lg:whitespace-nowrap">Care we provide</p>
          <ServicePills loop className="min-w-0 lg:flex-1" />
        </div>
      </Container>
    </section>
  );
}
