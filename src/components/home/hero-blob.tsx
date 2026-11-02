import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRightIcon, CheckCircleIcon, FirstAidKitIcon, HeartbeatIcon, HouseLineIcon, StethoscopeIcon } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import { CallButton } from "@/components/shared/blocks";
import { Container, Eyebrow } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { hero, site, stats } from "@/lib/content";
import { testimonials } from "@/lib/collections";
import { cn } from "@/lib/utils";

// Staggers the page-load entrance (animate-rise in globals.css), the same way the other pages do.
const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

const avatar = (name: string) => `/images/avatars/${name.toLowerCase().replace(/\s+/g, "-")}.webp`;

// Icons floating around the photo: [icon, position, bob delay].
const floaters: [Icon, string, string][] = [
  [HeartbeatIcon, "top-[6%] left-[4%]", "0s"],
  [StethoscopeIcon, "top-[2%] right-[14%]", "1.5s"],
  [HouseLineIcon, "bottom-[22%] -right-[2%]", "3s"],
  [FirstAidKitIcon, "bottom-[4%] left-[12%]", "4.5s"],
];

/** Home hero, soft style: text on the left; the photo in a slowly morphing blob with icons bobbing around it and two
 *  small chips; a wave along the bottom that runs into the light green band below. */
export function HeroBlob() {
  return (
    // The band starts under the (transparent) sticky header, so the top padding adds the header height back.
    <section className="relative isolate -mt-[70px] overflow-hidden bg-muted pt-[calc(70px+2.5rem)] pb-24 sm:pt-[calc(70px+3.5rem)] sm:pb-32 lg:-mt-[84px] lg:pt-[calc(84px+3rem)] lg:pb-36">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow className="animate-rise gap-2">
            <span aria-hidden className="size-2 rounded-full bg-primary" /> {site.tagline}
          </Eyebrow>
          <h1 className="animate-rise isolate text-[2.6rem] leading-[1.06] font-bold tracking-[-0.035em] sm:text-[3.5rem] xl:text-[4.25rem]" style={rise(80)}>
            Your Health,
            <br />
            <span className="relative text-primary">
              <span aria-hidden className="absolute inset-x-0 bottom-[0.08em] -z-10 h-[0.32em] rounded-full bg-sage-2" />
              Our Expertise
            </span>
          </h1>
          <p className="animate-rise max-w-[500px] text-base leading-relaxed text-muted-foreground sm:text-lg" style={rise(160)}>{hero.sub}</p>
          <div className="animate-rise grid w-full gap-3 sm:flex sm:w-auto" style={rise(240)}>
            <Link href="/contact#request" className={cn(buttonVariants({ size: "lg" }), "rounded-full")}>{hero.cta} <ArrowRightIcon /></Link>
            <CallButton className="h-11 rounded-full" />
          </div>
          <div className="animate-rise mt-1 flex items-center gap-3" style={rise(300)}>
            <span className="flex -space-x-3">
              {testimonials.slice(0, 4).map((t) => (
                <img key={t.name} src={avatar(t.name)} alt="" width={40} height={40} decoding="async" className="size-10 rounded-full object-cover ring-3 ring-muted" />
              ))}
            </span>
            <span className="text-sm leading-tight">
              <strong className="block font-semibold">{stats.home[0][0]} patients cared for</strong>
              <span className="text-muted-foreground">across Chicagoland</span>
            </span>
          </div>
        </div>

        <div className="animate-rise relative mx-auto aspect-square w-full max-w-[520px] lg:mr-0" style={rise(240)}>
          {/* Soft green blob behind, morphing out of step with the photo's blob. */}
          <span aria-hidden className="absolute inset-0 -z-10 translate-x-4 translate-y-3 rotate-12 animate-[blob_16s_ease-in-out_infinite] rounded-[58%_42%_55%_45%/48%_56%_44%_52%] bg-sage-2 [animation-delay:-6s]" />
          <img
            src="/images/pages/hero-nurse-visit.webp"
            srcSet="/images/pages/hero-nurse-visit-640.webp 640w, /images/pages/hero-nurse-visit.webp 1200w"
            sizes="(max-width: 1024px) 90vw, 520px"
            width={1200}
            height={960}
            alt="Metropolitan nurse sharing a laugh with an older woman during a home visit"
            fetchPriority="high"
            decoding="async"
            className="size-full animate-[blob_14s_ease-in-out_infinite] rounded-[58%_42%_55%_45%/48%_56%_44%_52%] object-cover object-[40%_center] shadow-[0_40px_80px_-40px_rgb(18_48_29/0.5)]"
          />

          {floaters.map(([Glyph, position, delay]) => (
            <span key={position} aria-hidden className={cn("absolute", position)}>
              <span className="grid size-12 animate-[float_6s_ease-in-out_infinite] place-items-center rounded-full bg-card text-primary shadow-[0_14px_30px_-14px_rgb(18_48_29/0.45)] ring-1 ring-foreground/8 sm:size-14" style={{ animationDelay: delay }}>
                <Glyph weight="duotone" className="size-6 sm:size-7" />
              </span>
            </span>
          ))}

          <div className="absolute top-[42%] -left-2 flex items-center gap-2 rounded-full bg-card py-2 pr-4 pl-2 shadow-[0_18px_40px_-20px_rgb(18_48_29/0.5)] ring-1 ring-foreground/8 sm:-left-8">
            <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground"><CheckCircleIcon weight="fill" className="size-4.5" /></span>
            <span className="text-sm font-semibold">{site.badges[0]}</span>
          </div>
          <div className="absolute right-[6%] -bottom-3 rounded-2xl bg-card px-4 py-2.5 shadow-[0_18px_40px_-20px_rgb(18_48_29/0.5)] ring-1 ring-foreground/8">
            <strong className="block text-xl leading-none font-bold text-primary">{stats.home[1][0]}</strong>
            <span className="text-xs text-muted-foreground">{stats.home[1][1]}</span>
          </div>
        </div>
      </Container>

      {/* Wave into the light green band that follows the hero. */}
      <svg aria-hidden viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-16 w-full text-sage sm:h-24">
        <path fill="currentColor" d="M0,72 C240,128 480,124 720,84 C960,44 1200,20 1440,52 L1440,120 L0,120 Z" />
      </svg>
    </section>
  );
}
