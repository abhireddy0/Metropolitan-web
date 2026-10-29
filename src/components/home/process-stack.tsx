"use client";

import { useEffect, useRef } from "react";
import { ChalkboardTeacherIcon, ClipboardTextIcon, HandHeartIcon, ListChecksIcon } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import type { Pair } from "@/lib/content";

const icons: Icon[] = [ClipboardTextIcon, ListChecksIcon, ChalkboardTeacherIcon, HandHeartIcon];

const TOP = 120; // below the sticky header
const OFFSET = 20; // each card pins a little lower, so the edges of earlier cards peek out
const SHRINK = 0.05; // how much a card shrinks once the next one has covered it

// Desktop: each card pins below the header and the next one slides over it while it shrinks back.
// Phones and reduced motion: a plain list.
export function ProcessStack({ items }: { items: Pair[] }) {
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const cards = Array.from(list.current?.children ?? []) as HTMLElement[];
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const on = desktop.matches && !reduced.matches;
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!on || !next) {
          card.style.transform = "";
          card.style.filter = "";
          return;
        }
        const pinned = TOP + i * OFFSET;
        const covered = Math.min(Math.max((pinned + card.offsetHeight - next.getBoundingClientRect().top) / card.offsetHeight, 0), 1);
        card.style.transform = `scale(${1 - SHRINK * covered})`;
        card.style.filter = `brightness(${1 - 0.04 * covered})`;
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    desktop.addEventListener("change", schedule);
    reduced.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <ol ref={list} className="grid gap-5 lg:gap-14">
      {items.map(([title, body], i) => {
        const Glyph = icons[i % icons.length];
        return (
          <li
            key={title}
            style={{ "--pin": `${TOP + i * OFFSET}px` } as React.CSSProperties}
            className="origin-top rounded-2xl border bg-card p-7 shadow-[0_18px_40px_-24px_rgb(18_48_29/0.35)] will-change-transform md:p-9 lg:sticky lg:top-(--pin) lg:min-h-[300px]"
          >
            <div className="mb-8 flex items-start justify-between gap-4">
              <span className="grid size-16 place-items-center rounded-2xl bg-sage text-forest">
                <Glyph weight="duotone" className="size-9" />
              </span>
              <span className="text-[2.75rem] leading-none font-semibold tracking-[-0.04em] text-sage-2 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mb-3 text-[1.6rem] leading-tight font-semibold tracking-[-0.02em]">{title}</h3>
            <p className="max-w-[460px] text-lg text-ink-2">{body}</p>
          </li>
        );
      })}
    </ol>
  );
}
