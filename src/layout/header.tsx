"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRightIcon, ArticleIcon, BriefcaseIcon, CaretDownIcon, CaretRightIcon, ChatCircleDotsIcon, EnvelopeSimpleIcon, HandHeartIcon, InfoIcon, ListIcon, MapPinIcon, PhoneIcon, XIcon } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Brand } from "@/components/shared/brand";
import { ServiceIcon } from "@/components/shared/service-icon";
import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { hero, nav, services, servicesIntro, site, tel } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/layout/theme-toggle";

// Light bar: muted links that turn green on hover, with a soft green pill marking the current page.
const linkStyle = "bg-transparent px-3 text-base font-medium text-foreground/75 hover:bg-primary/8 hover:text-primary focus:bg-transparent focus-visible:bg-primary/8 data-popup-open:bg-primary/8 data-popup-open:text-primary aria-[current=page]:bg-primary/10 aria-[current=page]:text-primary aria-[current=page]:focus:bg-primary/10";

// Mobile menu rows: an icon tile, the label, and a caret.
const rowStyle = "flex items-center gap-3.5 rounded-xl px-2 py-2 text-base font-semibold transition-colors hover:bg-primary/8";
const tileStyle = "grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary";
const navIcons: Record<string, Icon> = { "/service-areas": MapPinIcon, "/about": InfoIcon, "/careers": BriefcaseIcon, "/blog": ArticleIcon, "/contact": ChatCircleDotsIcon };

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    // A light bar hanging from the top edge with rounded lower corners. The header itself stays transparent so a page's
    // first band (e.g. the blog's) shows around the bar; the bar gains a shadow once the page scrolls.
    <header className="sticky top-0 z-40 h-[70px] px-2 sm:px-4 lg:h-[84px]">
      <div className={cn("mx-auto flex h-full max-w-[1220px] items-center gap-5 rounded-b-2xl bg-background/90 px-4 ring-1 ring-foreground/8 backdrop-blur-md transition-shadow duration-300 sm:px-6 lg:px-8", scrolled && "shadow-[0_14px_34px_-18px_rgb(18_48_29/0.35)]")}>
        <Brand />

        <NavigationMenu className="mx-auto hidden lg:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuTrigger className={linkStyle}>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[780px] grid-cols-[1fr_230px] gap-3 p-3">
                  <div>
                    <p className="px-3 pt-2 pb-2 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">{servicesIntro.eyebrow}</p>
                    <div className="grid grid-cols-2 gap-0.5">
                      {services.map((s) => (
                        <NavigationMenuLink
                          key={s.slug}
                          render={<Link href={`/services/${s.slug}`} />}
                          aria-current={isCurrent(`/services/${s.slug}`) ? "page" : undefined}
                          className="group/item flex flex-row items-center gap-3 rounded-lg px-3 py-2.5 text-[0.9375rem] font-medium text-foreground hover:bg-primary/6 hover:text-primary focus:bg-transparent focus-visible:bg-primary/6 aria-[current=page]:text-primary"
                        >
                          <ServiceIcon slug={s.slug} className="size-9 rounded-lg bg-primary/10 text-primary [&_svg]:size-[18px]" />
                          {s.name}
                        </NavigationMenuLink>
                      ))}
                    </div>
                    <NavigationMenuLink render={<Link href="/services" />} className="mt-1 inline-flex flex-row items-center gap-1.5 px-3 py-2 text-sm font-semibold text-primary hover:bg-transparent hover:underline focus:bg-transparent">
                      View all services <ArrowRightIcon className="size-4" />
                    </NavigationMenuLink>
                  </div>

                  <div className="flex flex-col justify-between gap-5 rounded-xl bg-muted p-5">
                    <div className="space-y-2">
                      <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary"><HandHeartIcon weight="duotone" className="size-5" /></span>
                      <p className="pt-1 text-base font-bold text-foreground">{hero.personalized.title}</p>
                      <p className="text-sm text-muted-foreground">Tell us what you need and we&apos;ll build a care plan around it.</p>
                    </div>
                    <div className="grid gap-2">
                      <NavigationMenuLink render={<Link href="/contact#request" />} className={cn(buttonVariants({ size: "sm" }), "w-full flex-row text-white hover:bg-cta/85")}>{hero.cta}</NavigationMenuLink>
                      <a href={tel(site.phone)} className="inline-flex items-center justify-center gap-2 py-1 text-sm font-semibold text-foreground hover:text-primary">
                        <PhoneIcon weight="duotone" className="size-4.5 text-primary" /> {site.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {nav.map(([href, label]) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink render={<Link href={href} />} aria-current={isCurrent(href) ? "page" : undefined} className={cn(navigationMenuTriggerStyle(), linkStyle)}>
                  {label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2.5 lg:ml-0">
          <ThemeToggle className="size-10" />
          <a href={tel(site.phone)} aria-label={`Call ${site.phone}`} className={cn(buttonVariants({ variant: "outline", size: "icon" }), "hidden lg:inline-flex")}>
            <PhoneIcon weight="duotone" className="size-5" />
          </a>
          <Link href="/contact#request" className={cn(buttonVariants({ size: "sm" }), "hidden lg:inline-flex")}>{hero.cta}</Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<button type="button" aria-label="Open menu" className={cn(buttonVariants({ variant: "outline", size: "icon" }), "lg:hidden")} />}>
              <ListIcon className="size-[22px]" />
            </SheetTrigger>
            {/* Phones: full-height panel with icon rows (current page highlighted), services as a two-column grid,
                and the two main actions pinned to the bottom. */}
            <SheetContent side="right" showCloseButton={false} className="gap-0 border-l-0 bg-background data-[side=right]:w-full sm:border-l data-[side=right]:sm:max-w-sm">
              <SheetHeader className="flex-row items-center justify-between border-b px-5 py-3">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Brand />
                <SheetClose render={<button type="button" aria-label="Close menu" className={buttonVariants({ variant: "outline", size: "icon" })} />}>
                  <XIcon className="size-5" />
                </SheetClose>
              </SheetHeader>

              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4" onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
                <details className="group" open={isCurrent("/services")}>
                  <summary className={cn(rowStyle, "cursor-pointer list-none [&::-webkit-details-marker]:hidden", isCurrent("/services") && "text-primary")}>
                    <span className={tileStyle}><HandHeartIcon weight="duotone" className="size-5" /></span>
                    Services
                    <CaretDownIcon className="ml-auto size-4.5 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <div className="mx-1 mt-1 mb-3 rounded-2xl bg-muted p-2 dark:bg-card">
                    <ul className="grid gap-0.5">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            aria-current={pathname === `/services/${s.slug}` ? "page" : undefined}
                            className="flex items-center gap-3 rounded-xl px-2 py-1.5 text-[0.9375rem] font-medium hover:bg-background aria-[current=page]:bg-background aria-[current=page]:text-primary dark:hover:bg-muted"
                          >
                            <ServiceIcon slug={s.slug} className="size-8 shrink-0 rounded-lg [&_svg]:size-4.5" />
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link href="/services" className="mt-0.5 flex items-center gap-3 rounded-xl px-2 py-1.5 text-[0.9375rem] font-semibold text-primary hover:bg-background dark:hover:bg-muted">
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground"><ArrowRightIcon className="size-4" /></span>
                      View all services
                    </Link>
                  </div>
                </details>
                {[...nav, ["/contact", "Contact"] as const].map(([href, label]) => {
                  const Glyph = navIcons[href];
                  return (
                    <Link key={href} href={href} aria-current={isCurrent(href) ? "page" : undefined} className={cn(rowStyle, "aria-[current=page]:bg-primary/10 aria-[current=page]:text-primary")}>
                      <span className={tileStyle}><Glyph weight="duotone" className="size-5" /></span>
                      {label}
                      <CaretRightIcon className="ml-auto size-4 text-muted-foreground" />
                    </Link>
                  );
                })}
              </nav>

              <div className="border-t bg-muted/60 px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] dark:bg-card/60">
                <div className="flex gap-2.5">
                  <Link href="/contact#request" onClick={() => setOpen(false)} className={cn(buttonVariants(), "flex-1")}>{hero.cta}</Link>
                  <a href={tel(site.phone)} aria-label={`Call ${site.phone}`} className={buttonVariants({ variant: "outline", size: "icon" })}>
                    <PhoneIcon weight="duotone" className="size-5" />
                  </a>
                </div>
                <a href={`mailto:${site.email}`} className="mt-3 flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
                  <EnvelopeSimpleIcon weight="duotone" className="size-4.5 text-primary" /> {site.email}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
