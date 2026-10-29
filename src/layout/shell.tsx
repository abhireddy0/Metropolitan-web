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
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-forest focus:px-4 focus:py-2.5 focus:text-white">
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
      {/* Phones: keep the two main actions one tap away. */}
      <div role="region" aria-label="Quick contact" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t bg-card px-3 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] shadow-[0_-6px_20px_-12px_rgb(0_0_0/0.2)] md:hidden">
        <a href={tel(site.phone)} className={cn(buttonVariants({ variant: "outline" }), "h-[46px] px-3")}>
          <PhoneIcon weight="duotone" /> Call Us
        </a>
        <Link href="/contact#request" className={cn(buttonVariants(), "h-[46px] px-3")}>{hero.cta}</Link>
      </div>
    </>
  );
}
