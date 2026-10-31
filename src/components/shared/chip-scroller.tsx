"use client";

import { useEffect, useRef, useState } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/utils";

const FADE = "48px";

/** One horizontal row of chips: scrolls sideways when it overflows, with faded edges and arrow buttons
 *  that only show while there is more to see. A clicked chip slides into the middle of the row. */
export function ChipScroller({ className, style, children }: { className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setEdges({ left: el.scrollLeft > 2, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 2 });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, []);

  const nudge = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.6, behavior: "smooth" });

  const mask = `linear-gradient(to right, ${edges.left ? "transparent" : "black"}, black ${FADE}, black calc(100% - ${FADE}), ${edges.right ? "transparent" : "black"})`;

  const arrow = "absolute top-1/2 z-10 hidden size-9 -translate-y-1/2 place-items-center rounded-full border bg-card text-foreground shadow-sm transition-colors hover:border-primary hover:text-primary md:grid";

  return (
    <div className={cn("relative w-full", className)} style={style}>
      <div
        ref={ref}
        onClick={(e) => (e.target as HTMLElement).closest("button")?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })}
        className="scrollbar-none overflow-x-auto py-1"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      >
        {children}
      </div>
      {edges.left && (
        <button type="button" aria-label="Scroll left" onClick={() => nudge(-1)} className={cn(arrow, "left-0")}>
          <CaretLeftIcon weight="bold" className="size-4" />
        </button>
      )}
      {edges.right && (
        <button type="button" aria-label="Scroll right" onClick={() => nudge(1)} className={cn(arrow, "right-0")}>
          <CaretRightIcon weight="bold" className="size-4" />
        </button>
      )}
    </div>
  );
}
