"use client";

import { useEffect, useRef, useState } from "react";
import { CaretLeftIcon, CaretRightIcon, QuotesIcon } from "@phosphor-icons/react";
import { Container, Eyebrow } from "@/components/shared/section";
import type { Testimonial } from "@/lib/collections";
import { stories } from "@/lib/content";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Stock portraits (Unsplash) in public/images/avatars, named after the person; they are models, so the section carries a disclosure.
const avatar = (name: string) => `/images/avatars/${name.toLowerCase().replace(/\s+/g, "-")}.webp`;

// The quote's first sentence becomes the card headline; the rest is the body.
const split = (quote: string) => {
  const m = quote.match(/^(.+?[.!?])\s+(.*)$/);
  return m ? [m[1], m[2]] : [quote, ""];
};

const INTERVAL = 5000;

// One large card at a time: person on the left, story on the right, dots and arrows below.
// Autoplays; pauses on hover/focus or when the tab is hidden, and stays still for reduced motion.
export function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false);
  const start = useRef<{ x: number; y: number; width: number } | null>(null);
  const count = items.length;
  const go = (i: number) => setIndex((i + count) % count);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setStill(mq.matches);
    update();
    mq.addEventListener("change", update);
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      mq.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (paused || still || drag !== 0 || count < 2) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => window.clearTimeout(t);
  }, [index, paused, still, drag, count]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") return;
    start.current = { x: e.clientX, y: e.clientY, width: e.currentTarget.offsetWidth };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    if (Math.abs(dx) > Math.abs(e.clientY - start.current.y)) setDrag(dx / start.current.width);
  };
  const onPointerEnd = () => {
    if (!start.current) return;
    if (drag < -0.15) go(index + 1);
    else if (drag > 0.15) go(index - 1);
    start.current = null;
    setDrag(0);
  };

  const arrow = buttonVariants({ variant: "outline", size: "icon" });

  return (
    <section id="testimonials" aria-labelledby="stories-title" className="scroll-mt-20 bg-linear-to-b from-card to-sand">
      <Container className="py-16 md:py-28">
        <div className="mx-auto mb-10 grid max-w-2xl justify-items-center gap-4 text-center md:mb-14">
          <Eyebrow>{stories.eyebrow}</Eyebrow>
          <h2 id="stories-title" className="text-h2 leading-[1.15]">{stories.title}</h2>
          <p className="text-lg text-ink-2">{stories.sub}</p>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Patient stories"
          className="mx-auto max-w-[60rem]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPaused(false)}
        >
          <div className="overflow-hidden rounded-[1.25rem] bg-card shadow-[0_0_30px_0_rgb(0_0_0/0.12)]">
            <div
              className={cn("flex touch-pan-y", drag === 0 && "transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]")}
              style={{ transform: `translateX(${(-index + drag) * 100}%)` }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerEnd}
              onPointerCancel={onPointerEnd}
            >
              {items.map((t, i) => {
                const [title, body] = split(t.quote);
                return (
                  <figure
                    key={t.name}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${count}`}
                    aria-hidden={i !== index}
                    inert={i !== index}
                    className="m-0 flex w-full shrink-0 flex-col p-6 pb-8 select-none md:flex-row md:items-center md:px-10 md:pt-15 md:pb-12"
                  >
                    <figcaption className="flex items-center gap-4 md:w-[30%] md:flex-col md:justify-center md:text-center">
                      <img src={avatar(t.name)} alt="" aria-hidden width={120} height={120} decoding="async" draggable={false} className="size-14 shrink-0 rounded-full bg-sage object-cover ring-4 ring-sage-2/60 md:mb-2 md:size-30" />
                      <span>
                        <strong className="block text-lg font-semibold">{t.name}</strong>
                        <span className="block text-sm text-muted-foreground">{t.role}</span>
                        <span className="block text-sm text-muted-foreground">{t.location}</span>
                      </span>
                    </figcaption>
                    <blockquote className="mt-6 border-t border-foreground/15 pt-6 md:mt-0 md:w-[70%] md:border-t-0 md:border-l md:pt-0 md:pl-15">
                      <QuotesIcon weight="fill" className="mb-5 size-8 text-sage-2" />
                      <p className="mb-4 text-lg leading-relaxed font-semibold md:text-title md:leading-[1.875rem]">{title}</p>
                      {body && <p className="text-small leading-relaxed text-ink-2 md:text-base">{body}</p>}
                    </blockquote>
                  </figure>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            <button type="button" className={arrow} onClick={() => go(index - 1)} aria-label="Previous story"><CaretLeftIcon className="size-[18px]" /></button>
            <div className="flex items-center gap-2">
              {items.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  aria-label={`Show story ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => go(i)}
                  className={cn("h-2 rounded-full transition-all duration-500", i === index ? "w-7 bg-cta" : "w-2 bg-line-strong hover:bg-leaf/50")}
                />
              ))}
            </div>
            <button type="button" className={arrow} onClick={() => go(index + 1)} aria-label="Next story"><CaretRightIcon className="size-[18px]" /></button>
          </div>
          <p className="mt-5 text-center text-xs text-muted-foreground">Photos are of models and are for illustration only.</p>
          <p aria-live={paused ? "polite" : "off"} className="sr-only">{`Story ${index + 1} of ${count}: ${items[index].name}`}</p>
        </div>
      </Container>
    </section>
  );
}
