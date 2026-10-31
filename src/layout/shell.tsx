import Link from "next/link";
import { PhoneIcon } from "@phosphor-icons/react/ssr";
import { buttonVariants } from "@/components/ui/button";
import { SiteFooter } from "@/layout/footer";
import { SiteHeader } from "@/layout/header";
import { Reveal } from "@/layout/reveal";
import { hero, site, tel } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-pine focus:px-4 focus:py-2.5 focus:text-white">
        Skip to content
      </a>
      <div className="flex min-h-screen flex-col overflow-x-clip pb-[72px] md:pb-0">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </div>
      <Reveal />
      {/* Phones: a small floating dock that keeps the two main actions one tap away. */}
      <div
        role="region"
        aria-label="Quick contact"
        className="fixed bottom-[calc(12px+env(safe-area-inset-bottom))] left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-background/90 p-1.5 shadow-[0_12px_32px_-12px_rgb(18_48_29/0.45)] ring-1 ring-foreground/10 backdrop-blur-md md:hidden"
      >
        <a href={tel(site.phone)} aria-label={`Call us at ${site.phone}`} className="grid size-9 place-items-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
          <PhoneIcon weight="duotone" className="size-4.5" />
        </a>
        <Link href="/contact#request" className={cn(buttonVariants({ size: "sm" }), "h-9 rounded-full px-4")}>{hero.cta}</Link>
      </div>
    </>
  );
}
