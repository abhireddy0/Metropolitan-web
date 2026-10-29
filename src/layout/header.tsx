"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRightIcon, CaretDownIcon, ListIcon, PhoneIcon } from "@phosphor-icons/react/ssr";
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { hero, nav, services, servicesIntro, site, tel } from "@/lib/content";
import { cn } from "@/lib/utils";

const linkStyle = "bg-transparent px-3 text-[0.975rem] font-medium text-foreground hover:bg-accent hover:text-leaf aria-[current=page]:bg-accent aria-[current=page]:text-leaf";

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
    <header className={cn("sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md transition-colors", scrolled ? "border-border" : "border-transparent")}>
      <div className="mx-auto flex h-[70px] max-w-[1280px] items-center gap-6 px-4 sm:px-8 lg:h-[84px] lg:px-10">
        <Brand />

        <NavigationMenu className="ml-auto hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={linkStyle}>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[640px] grid-cols-2 gap-x-6 gap-y-1 p-5">
                  <p className="col-span-2 mb-2 px-2.5 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">{servicesIntro.eyebrow}</p>
                  {services.map((s) => (
                    <NavigationMenuLink key={s.slug} render={<Link href={`/services/${s.slug}`} />} aria-current={isCurrent(`/services/${s.slug}`) ? "page" : undefined} className="flex flex-row items-center gap-3 px-2.5 py-2 text-[0.95rem] hover:bg-accent hover:text-leaf">
                      <ServiceIcon slug={s.slug} className="size-9 rounded-lg [&_svg]:size-5" />
                      {s.name}
                    </NavigationMenuLink>
                  ))}
                  <div className="col-span-2 mt-2 flex items-center justify-between gap-3 border-t pt-4">
                    <p className="text-sm text-muted-foreground">{hero.personalized.title}</p>
                    <NavigationMenuLink render={<Link href="/services" />} className="inline-flex flex-row items-center gap-1.5 font-semibold text-leaf">
                      Explore Our Services <ArrowRightIcon className="size-4" />
                    </NavigationMenuLink>
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

        <div className="ml-auto flex items-center gap-4 lg:ml-0">
          <a href={tel(site.phone)} className="hidden items-center gap-2 font-semibold whitespace-nowrap text-forest-dark lg:inline-flex">
            <PhoneIcon weight="duotone" className="size-[18px] text-leaf" />
            <span className="hidden xl:inline">{site.phone}</span>
            <span className="sr-only xl:hidden">Call {site.phone}</span>
          </a>
          <Link href="/contact#request" className={cn(buttonVariants({ size: "sm" }), "hidden lg:inline-flex")}>{hero.cta}</Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<button type="button" aria-label="Open menu" className={cn(buttonVariants({ variant: "outline", size: "icon" }), "lg:hidden")} />}>
              <ListIcon className="size-[22px]" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full overflow-y-auto bg-background sm:max-w-sm">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Brand />
              </SheetHeader>
              <nav aria-label="Mobile" className="grid px-4 pb-10" onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
                <details className="group border-b">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-medium [&::-webkit-details-marker]:hidden">
                    Services <CaretDownIcon className="size-[18px] transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="grid pb-3 pl-3">
                    <li><Link href="/services" className="block py-2.5 text-ink-2">Explore Our Services</Link></li>
                    {services.map((s) => (
                      <li key={s.slug}><Link href={`/services/${s.slug}`} className="flex items-center gap-3 py-2 text-ink-2"><ServiceIcon slug={s.slug} className="size-8 rounded-lg [&_svg]:size-[18px]" />{s.name}</Link></li>
                    ))}
                  </ul>
                </details>
                {[...nav, ["/contact", "Contact"] as const].map(([href, label]) => (
                  <Link key={href} href={href} className="border-b py-4 text-lg font-medium">{label}</Link>
                ))}
                <div className="mt-6 grid gap-3">
                  <Link href="/contact#request" className={buttonVariants()}>{hero.cta}</Link>
                  <a href={tel(site.phone)} className={buttonVariants({ variant: "outline" })}>
                    <PhoneIcon weight="duotone" /> Call {site.phone}
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
