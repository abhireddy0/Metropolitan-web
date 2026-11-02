import Link from "next/link";
import { ServiceIcon } from "@/components/shared/service-icon";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";

/** All ten services as pills with a logo-green icon: one sideways-scrolling row on phones (edges fade), wrapping from sm. */
export function ServicePills({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <nav aria-label="Our services" className={cn("-mx-4", className)} style={style}>
      <ul className="flex scrollbar-none gap-2 overflow-x-auto px-4 py-1 [mask-image:linear-gradient(to_right,transparent,black_1rem,black_calc(100%-2rem),transparent)] sm:flex-wrap sm:overflow-visible sm:[mask-image:none]">
        {services.map((s) => (
          <li key={s.slug} className="shrink-0">
            <Link
              href={`/services/${s.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-card py-1.5 pr-4 pl-1.5 text-sm font-semibold whitespace-nowrap ring-1 ring-foreground/10 transition duration-300 hover:-translate-y-0.5 hover:text-primary hover:ring-brand motion-reduce:hover:translate-y-0"
            >
              <ServiceIcon slug={s.slug} className="size-7 rounded-full bg-linear-to-br from-brand to-cta text-white [&_svg]:size-4" />
              {s.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
