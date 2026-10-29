"use client";

import { useEffect, useRef, useState } from "react";
import { CaretLeftIcon, CaretRightIcon, XIcon } from "@phosphor-icons/react";

export type GalleryItem = { slot: string; caption: string };

// Row spans for a 3-column grid: tall tiles take 3 rows, wide ones 2. In this order every column
// sums to 5 rows (col 1: 3+2, col 2: 2+3, col 3: 2+3), so the wall ends on one straight line.
const spans = ["row-span-3", "row-span-2", "row-span-2", "row-span-3", "row-span-3", "row-span-2"];

const src = (slot: string) => `/images/${slot}.webp`;
const srcSet = (slot: string) => `/images/${slot}-640.webp 640w, /images/${slot}.webp 1200w`;

// Masonry photo wall: tiles rise in with the site's scroll reveal (data-reveal-items), zoom on hover
// with the caption sliding up, and open in a lightbox (arrow buttons, arrow keys, Esc or backdrop click to close).
export function MasonryGallery({ items }: { items: GalleryItem[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const count = items.length;

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open === null) {
      if (d.open) d.close();
      return;
    }
    if (!d.open) d.showModal();
  }, [open]);

  const step = (dir: number) => setOpen((i) => (i === null ? i : (i + dir + count) % count));

  const control = "grid size-11 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/25 focus-visible:outline-white";

  return (
    <>
      <ul data-reveal-items className="grid auto-rows-[112px] grid-cols-1 gap-4 sm:auto-rows-[130px] sm:grid-cols-2 sm:gap-5 lg:auto-rows-[160px] lg:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.slot} className={spans[i % spans.length]}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`View photo: ${item.caption}`}
              className="group relative block size-full overflow-hidden rounded-2xl bg-sage text-left shadow-[0_1px_2px_rgb(29_42_34/0.06)] transition-shadow duration-500 hover:shadow-[0_24px_44px_-24px_rgb(18_48_29/0.45)] focus-visible:outline-offset-3"
            >
              <img
                src={src(item.slot)}
                srcSet={srcSet(item.slot)}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                width={1200}
                height={900}
                alt={item.caption}
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform duration-900 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.06]"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-forest-dark/80 via-forest-dark/30 to-transparent px-5 pt-14 pb-4 text-white transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:translate-y-0 [@media(hover:hover)]:group-focus-visible:opacity-100">
                <span className="block text-[1.02rem] leading-snug font-semibold">{item.caption}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label="Photo viewer"
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-forest-dark/90 backdrop:backdrop-blur-sm"
      >
        {open !== null && (
          <figure className="m-0 flex w-[min(92vw,1100px)] flex-col items-center gap-4">
            <img src={src(items[open].slot)} width={1200} height={900} alt={items[open].caption} className="max-h-[78vh] w-full rounded-2xl object-contain" />
            <figcaption className="flex w-full items-center justify-between gap-4 text-white">
              <span className="font-semibold">{items[open].caption}</span>
              <span className="text-sm text-white/70 tabular-nums">{open + 1} / {count}</span>
            </figcaption>
          </figure>
        )}
        <div className="fixed top-4 right-4 flex gap-2">
          <button type="button" aria-label="Previous photo" onClick={() => step(-1)} className={control}><CaretLeftIcon className="size-5" /></button>
          <button type="button" aria-label="Next photo" onClick={() => step(1)} className={control}><CaretRightIcon className="size-5" /></button>
          <button type="button" aria-label="Close" onClick={() => setOpen(null)} className={control}><XIcon className="size-5" /></button>
        </div>
      </dialog>
    </>
  );
}
