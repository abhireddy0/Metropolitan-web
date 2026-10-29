"use client";

import { useState } from "react";
import { HandshakeIcon, HeartIcon, LightbulbIcon, SealCheckIcon, ShieldCheckIcon, UsersFourIcon } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import type { Pair } from "@/lib/content";
import { cn } from "@/lib/utils";

// In content order: Compassion, Team Integrity, Inclusion, Trust, Innovation, Compliance.
const icons: Icon[] = [HeartIcon, HandshakeIcon, UsersFourIcon, ShieldCheckIcon, LightbulbIcon, SealCheckIcon];
const num = (i: number) => String(i + 1).padStart(2, "0");

// Expanding panels: one value is open (wide, deep green, full text); the others are narrow strips
// with the title running upward. Hover, focus or click opens a strip. Below lg it is a stacked list.
// All text stays in the HTML; closed panels only hide it visually.
export function ValuePanels({ items }: { items: Pair[] }) {
  const [active, setActive] = useState(0);

  return (
    <ul className="flex flex-col gap-3 lg:h-[460px] lg:flex-row">
      {items.map(([title, body], i) => {
        const Glyph = icons[i % icons.length];
        const open = i === active;
        return (
          <li
            key={title}
            onMouseEnter={() => setActive(i)}
            className={cn(
              "relative overflow-hidden rounded-3xl border transition-[flex-grow,background-color,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:min-w-0 lg:basis-0",
              open ? "border-cta bg-linear-to-b from-[#4a9a46] to-cta text-white lg:grow-[5]" : "border-line-strong/70 bg-sand hover:bg-sage lg:grow"
            )}
          >
            <Glyph aria-hidden weight="duotone" className={cn("pointer-events-none absolute -top-6 -right-6 hidden size-56 text-white/[0.12] transition-opacity duration-700 lg:block", open ? "opacity-100" : "opacity-0")} />
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="flex w-full items-center gap-4 p-6 text-left lg:h-full lg:flex-col lg:items-start lg:justify-between lg:p-7"
            >
              {/* Phones: icon, title, number in one row (contents lets them join the button's flex row). */}
              <span className="contents lg:flex lg:w-full lg:flex-col lg:items-start">
                <span className={cn("grid size-12 shrink-0 place-items-center rounded-xl transition-colors", open ? "bg-white/15 text-white" : "bg-background text-leaf")}>
                  <Glyph weight="duotone" className="size-7" />
                </span>
                <span className={cn("order-last text-sm font-semibold tracking-[0.1em] tabular-nums lg:hidden", open ? "text-white/80" : "text-leaf")}>{num(i)}</span>
              </span>
              {/* Closed strips on desktop: number and title running upward. */}
              <span aria-hidden={open} className={cn("hidden items-center gap-3 whitespace-nowrap [writing-mode:vertical-rl] rotate-180", !open && "lg:flex")}>
                <span className="text-sm font-semibold tracking-[0.1em] text-leaf tabular-nums">{num(i)}</span>
                <span className="text-lg font-semibold tracking-[-0.01em]">{title}</span>
              </span>
              <h3 className={cn("flex-1 text-title leading-tight font-semibold tracking-[-0.02em] lg:sr-only", open && "text-white")}>{title}</h3>
            </button>

            {/* Open panel content. On desktop it fades in once the panel has widened. */}
            <div
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 lg:absolute lg:inset-x-0 lg:bottom-0 lg:block lg:p-9",
                open ? "grid-rows-[1fr] opacity-100 lg:delay-300" : "grid-rows-[0fr] opacity-0 lg:pointer-events-none lg:delay-0"
              )}
            >
              {/* Padding lives on the inner wrapper so a closed row collapses to zero height. */}
              <div className="min-h-0 overflow-hidden lg:max-w-[560px] lg:overflow-visible">
                <div className="px-6 pb-7 lg:p-0">
                  <span className="mb-3 hidden text-sm font-semibold tracking-[0.1em] text-white/80 tabular-nums lg:block">{num(i)}</span>
                  <p aria-hidden className="mb-4 hidden text-h3 leading-tight font-semibold tracking-[-0.025em] text-white lg:block">{title}</p>
                  <p className="text-base leading-relaxed text-white/90">{body}</p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
