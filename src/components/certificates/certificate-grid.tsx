"use client";

import { useEffect, useRef, useState } from "react";
import { CaretLeftIcon, CaretRightIcon, MagnifyingGlassPlusIcon, XIcon } from "@phosphor-icons/react";
import type { Certificate } from "@/lib/content";

export type CertificateItem = { c: Certificate; year: string; label: string };

const alt = ({ year, label }: CertificateItem) => `${label} certificate, ${year}, Metropolitan Home Health Care, Inc., Wheeling, IL`;

// Framed certificate cards that open in a full-size viewer (arrows, arrow keys, Esc or backdrop click to close),
// built like the home gallery's lightbox.
export function CertificateGrid({ items }: { items: CertificateItem[] }) {
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

  // Keep the page behind the viewer from scrolling while it is open.
  useEffect(() => {
    if (open === null) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [open]);

  const step = (dir: number) => setOpen((i) => (i === null ? i : (i + dir + count) % count));

  const control = "grid size-12 place-items-center rounded-full bg-white/12 text-white ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-white hover:text-[#1d2a22] focus-visible:outline-white";

  return (
    <>
      <ul data-reveal-items className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {items.map((item, i) => (
          <li key={item.year}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`View ${item.label} certificate, ${item.year}`}
              className="group block w-full rounded-2xl bg-card p-2 text-left sm:p-3 ring-1 ring-foreground/10 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_44px_-28px_rgb(18_48_29/0.45)] focus-visible:outline-offset-3"
            >
              <span className="relative block overflow-hidden rounded-xl bg-white p-1.5 sm:p-2">
                <img
                  src={`/images/awards/${item.c.image}`}
                  width={item.c.width}
                  height={item.c.height}
                  loading="lazy"
                  decoding="async"
                  alt={alt(item)}
                  className="aspect-4/3 w-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />
                <span aria-hidden className="absolute inset-0 grid place-items-center bg-pine/0 transition-colors duration-300 group-hover:bg-pine/25">
                  <span className="grid size-11 scale-90 place-items-center rounded-full bg-white text-pine opacity-0 shadow-lg transition duration-300 group-hover:scale-100 group-hover:opacity-100">
                    <MagnifyingGlassPlusIcon weight="bold" className="size-5" />
                  </span>
                </span>
              </span>
              <span className="block px-1.5 pt-3 pb-1 sm:px-2 sm:pt-4">
                <span className="block text-xl font-bold text-primary sm:text-2xl">{item.year}</span>
                <span className="block text-sm text-muted-foreground">{item.label}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label="Certificate viewer"
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto max-h-none max-w-none overflow-visible bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        {open !== null && (
          // The figure shrinks to the certificate, so the caption lines up with its edges.
          <figure className="m-0 flex w-fit flex-col gap-3">
            <img
              src={`/images/awards/${items[open].c.image}`}
              width={items[open].c.width}
              height={items[open].c.height}
              alt={alt(items[open])}
              className="block max-h-[78vh] w-auto max-w-[min(88vw,1000px)] rounded-xl bg-white object-contain p-2 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)] sm:p-3"
            />
            <figcaption className="flex items-center justify-between gap-4 text-white">
              <span className="text-base font-semibold sm:text-lg">{items[open].year} {items[open].label}</span>
              <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-sm text-white/85 tabular-nums">{open + 1} / {count}</span>
            </figcaption>
          </figure>
        )}
        <button type="button" aria-label="Close" onClick={() => setOpen(null)} className={`${control} fixed top-4 right-4 sm:top-6 sm:right-6`}><XIcon className="size-5" /></button>
        <button type="button" aria-label="Previous certificate" onClick={() => step(-1)} className={`${control} fixed bottom-6 left-1/2 -translate-x-[calc(100%+0.375rem)] sm:top-1/2 sm:bottom-auto sm:left-6 sm:translate-x-0 sm:-translate-y-1/2`}><CaretLeftIcon className="size-5" /></button>
        <button type="button" aria-label="Next certificate" onClick={() => step(1)} className={`${control} fixed bottom-6 left-1/2 translate-x-1.5 sm:top-1/2 sm:right-6 sm:bottom-auto sm:left-auto sm:translate-x-0 sm:-translate-y-1/2`}><CaretRightIcon className="size-5" /></button>
      </dialog>
    </>
  );
}
