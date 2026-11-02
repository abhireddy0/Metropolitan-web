"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRightIcon, CheckCircleIcon, MapPinIcon, StethoscopeIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { careOptions, counties, services } from "@/lib/content";
import { cn } from "@/lib/utils";

const selectArrow =
  "appearance-none bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%235f6561' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")] bg-[right_4px_center] bg-no-repeat";

const popular = ["skilled-nursing", "physical-therapy", "health-aide"].map((slug) => services.find((s) => s.slug === slug)!);

/** Hero search bar: pick a service and a county. A picked county shows whether we serve it and how soon the first
 *  visit is; the button opens the request form with the service already selected. */
export function FindCare() {
  const router = useRouter();
  const [service, setService] = useState("");
  const [county, setCounty] = useState("");
  const area = counties.find((c) => c.name === county);

  // One labelled field of the bar: icon, small label, and a borderless select.
  const field = (id: string, label: string, Glyph: typeof MapPinIcon, select: React.ReactNode) => (
    <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-2.5 sm:px-5">
      <Glyph weight="duotone" aria-hidden className="size-5.5 shrink-0 text-primary" />
      <div className="min-w-0 flex-1">
        <label htmlFor={id} className="block text-xs font-semibold text-muted-foreground">{label}</label>
        {select}
      </div>
    </div>
  );
  const selectClass = cn("w-full cursor-pointer truncate bg-transparent pr-6 text-base font-semibold outline-none", selectArrow);

  return (
    <div className="w-full max-w-[860px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push(service ? `/contact?service=${encodeURIComponent(service)}#request` : "/contact#request");
        }}
        className="flex flex-col gap-1 rounded-3xl bg-card p-2 text-left shadow-[0_30px_70px_-34px_rgb(18_48_29/0.45)] ring-1 ring-foreground/8 sm:flex-row sm:items-center sm:rounded-full sm:p-2"
      >
        {field(
          "find-service",
          "Care needed",
          StethoscopeIcon,
          <select id="find-service" value={service} onChange={(e) => setService(e.target.value)} className={selectClass}>
            <option value="">Any service</option>
            {careOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        )}
        <span aria-hidden className="mx-4 h-px bg-border sm:mx-0 sm:h-9 sm:w-px" />
        {field(
          "find-county",
          "Your county",
          MapPinIcon,
          <select id="find-county" value={county} onChange={(e) => setCounty(e.target.value)} className={selectClass}>
            <option value="">Choose a county</option>
            {counties.map((c) => <option key={c.name}>{c.name}</option>)}
          </select>
        )}
        <Button type="submit" size="lg" className="h-13 shrink-0 rounded-2xl px-7 text-base sm:rounded-full">Get Care Now <ArrowRightIcon /></Button>
      </form>

      {/* Under the bar: the county check once one is picked, otherwise shortcuts to the most-asked-for services. */}
      <div aria-live="polite" className="mt-4 flex min-h-8 flex-wrap items-center justify-center gap-2 text-sm">
        {area ? (
          <span className="inline-flex animate-in items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 font-semibold text-primary fade-in">
            <CheckCircleIcon weight="fill" className="size-4.5" /> We serve {area.name}. First visit {area.response.replace("<", "within")}.
          </span>
        ) : (
          <>
            <span className="text-muted-foreground">Popular:</span>
            {popular.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-full bg-card px-3 py-1 font-medium ring-1 ring-foreground/10 transition-colors hover:text-primary hover:ring-primary/40">
                {s.name}
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
