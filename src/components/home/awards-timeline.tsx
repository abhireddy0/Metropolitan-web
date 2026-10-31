"use client";

import { useRef, useState } from "react";
import type { Certificate } from "@/lib/content";
import { cn } from "@/lib/utils";

export type Award = { c: Certificate; year: string; label: string };

// Vertical timeline of awards (newest first) beside a large view of the selected certificate.
// Hover, focus or click a year to show its certificate; every image stays in the HTML so switching is instant.
export function AwardsTimeline({ awards, children }: { awards: Award[]; children?: React.ReactNode }) {
  const [active, setActive] = useState(0);
  // Hover switches after a short pause, so sweeping the pointer across the list doesn't flicker through every image.
  const timer = useRef<number | undefined>(undefined);
  const hoverTo = (i: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setActive(i), 120);
  };
  const cancel = () => window.clearTimeout(timer.current);

  return (
    <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14">
      <div>
        {children}
        <ol className={cn("relative", children && "mt-8")}>
          {awards.map(({ year, label }, i) => {
            const on = i === active;
            return (
              <li key={year} className="relative pl-10 not-last:pb-2">
                {/* Line segment down to the next dot. */}
                {i < awards.length - 1 && <span aria-hidden className="absolute top-7 bottom-0 left-[11px] w-0.5 bg-primary/20" />}
                <button
                  type="button"
                  aria-pressed={on}
                  onMouseEnter={() => hoverTo(i)}
                  onMouseLeave={cancel}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-center justify-between gap-4 rounded-lg px-4 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-[18px] left-0 grid size-6 place-items-center rounded-full transition-all duration-300",
                      on ? "bg-primary ring-4 ring-primary/20" : "border-2 border-primary/40 bg-muted",
                    )}
                  >
                    {on && <span className="size-2 rounded-full bg-primary-foreground" />}
                  </span>
                  <span>
                    <span className={cn("block text-xl font-bold transition-colors duration-300", on ? "text-primary" : "text-foreground/60 group-hover:text-foreground")}>{year}</span>
                    <span className="block text-sm text-muted-foreground">{label}</span>
                  </span>
                  {i === 0 && <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">Latest</span>}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="relative">
        <div className="rounded-2xl bg-white p-3 shadow-[0_40px_80px_-40px_rgb(18_48_29/0.5)] ring-1 ring-black/5 sm:p-4">
          <div className="grid">
            {awards.map(({ c, year, label }, i) => (
              <img
                key={year}
                src={`/images/awards/${c.image}`}
                width={c.width}
                height={c.height}
                loading="lazy"
                decoding="async"
                aria-hidden={i !== active}
                alt={`${label} certificate, ${year}, Metropolitan Home Health Care, Inc., Wheeling, IL`}
                className={cn(
                  "col-start-1 row-start-1 aspect-4/3 w-full rounded-lg object-contain transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                  i === active ? "scale-100 opacity-100 blur-0" : "scale-[0.97] opacity-0 blur-[2px]",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
