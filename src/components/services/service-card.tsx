import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { Media } from "@/components/shared/media";
import { ServiceIcon } from "@/components/shared/service-icon";
import { Card, CardContent } from "@/components/ui/card";
import type { Service } from "@/lib/content";

/** Service card in the same shape as the blog's post card: photo, icon and name, two-line summary, and an arrow
 *  button that fills green while the card is hovered. */
export function ServiceCard({ service: s, as: Heading = "h3" }: { service: Service; as?: "h2" | "h3" }) {
  const href = `/services/${s.slug}`;
  return (
    <Card className="group h-full gap-0 py-6 shadow-none">
      <CardContent className="flex h-full flex-col gap-3 px-6">
        <Link href={href} tabIndex={-1} className="mb-3 block overflow-hidden rounded-lg">
          <Media slot={s.image} alt={s.alt} sizes="(max-width: 640px) 100vw, 400px" className="aspect-16/10 transition-transform duration-300 group-hover:scale-105" />
        </Link>
        <div className="flex items-center gap-3">
          <ServiceIcon slug={s.slug} className="size-9 rounded-lg bg-primary/10 text-primary [&_svg]:size-[18px]" />
          <Heading className="font-sans text-lg leading-snug font-medium tracking-normal md:text-xl">
            <Link href={href} className="hover:text-primary">{s.name}</Link>
          </Heading>
        </div>
        <p className="line-clamp-2 text-base text-muted-foreground">{s.card}</p>
        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="text-sm font-medium text-muted-foreground">Learn more</span>
          <Link
            href={href}
            className="inline-flex size-8 items-center justify-center rounded-lg border bg-background shadow-xs transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowUpRightIcon className="size-4" />
            <span className="sr-only">Learn more about {s.name}</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
