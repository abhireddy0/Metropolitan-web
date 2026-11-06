import Link from "next/link";
import { ServiceIcon } from "@/components/shared/service-icon";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";

function Pill({ slug, name, hidden }: { slug: string; name: string; hidden?: boolean }) {
  return (
    <Link
      href={`/services/${slug}`}
      tabIndex={hidden ? -1 : undefined}
      className="inline-flex items-center gap-2 rounded-full bg-card py-1.5 pr-4 pl-1.5 text-sm font-semibold whitespace-nowrap ring-1 ring-foreground/10 transition duration-300 hover:-translate-y-0.5 hover:text-primary hover:ring-brand motion-reduce:hover:translate-y-0"
    >
      <ServiceIcon slug={slug} className="size-7 rounded-full bg-linear-to-br from-brand to-cta text-white [&_svg]:size-4" />
      {name}
    </Link>
  );
}

/** All ten services as pills with a logo-green icon: one sideways-scrolling row on phones (edges fade), wrapping from sm.
 *  With `loop`, the pills instead glide past in an endless row at every width, pausing while hovered or focused;
 *  reduced motion turns the glide off and leaves a row you can scroll. */
export function ServicePills({ className, style, loop }: { className?: string; style?: React.CSSProperties; loop?: boolean }) {
  if (loop)
    return (
      <nav aria-label="Our services" className={cn("group/loop overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5rem,black_calc(100%-5rem),transparent)] motion-reduce:overflow-x-auto", className)} style={style}>
        <ul className="flex w-max animate-[marquee_45s_linear_infinite] py-1 group-hover/loop:[animation-play-state:paused] group-focus-within/loop:[animation-play-state:paused]">
          {[0, 1].map((copy) =>
            services.map((s) => (
              // The second copy is only there to close the loop, so screen readers and the keyboard skip it.
              <li key={`${copy}-${s.slug}`} aria-hidden={copy === 1 || undefined} className="shrink-0 pr-2">
                <Pill slug={s.slug} name={s.name} hidden={copy === 1} />
              </li>
            )),
          )}
        </ul>
      </nav>
    );

  return (
    <nav aria-label="Our services" className={cn("-mx-4", className)} style={style}>
      <ul className="flex scrollbar-none gap-2 overflow-x-auto px-4 py-1 [mask-image:linear-gradient(to_right,transparent,black_1rem,black_calc(100%-2rem),transparent)] sm:flex-wrap sm:overflow-visible sm:[mask-image:none]">
        {services.map((s) => (
          <li key={s.slug} className="shrink-0">
            <Pill slug={s.slug} name={s.name} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
