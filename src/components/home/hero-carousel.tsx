"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export type HeroSlide = { slot: string; alt: string; title: string; text: string; position?: string };

const INTERVAL = 2000;

// Hero photo slider: autoplays, pauses on hover/focus or when the tab is hidden, swipes on touch, and stays still for reduced motion.
export function HeroCarousel({ slides, className }: { slides: HeroSlide[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false);
  const [drag, setDrag] = useState(0);
  const start = useRef<{ x: number; y: number; width: number } | null>(null);
  const count = slides.length;

  const go = useCallback((i: number) => setIndex((i + count) % count), [count]);

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
    if (paused || still || count < 2) return;
    const t = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [index, paused, still, count, go]);

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

  const control = "grid size-10 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/30 focus-visible:outline-white";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Metropolitan care at home"
      className={cn("group relative overflow-hidden rounded-2xl bg-forest-dark", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPaused(false)}
    >
      <div
        className={cn("flex touch-pan-y", drag === 0 && "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]")}
        style={{ transform: `translateX(${(-index + drag) * 100}%)` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        {slides.map((s, i) => (
          <figure
            key={s.slot}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i !== index}
            inert={i !== index}
            className="relative m-0 w-full shrink-0"
          >
            <img
              src={`/images/${s.slot}.webp`}
              srcSet={`/images/${s.slot}-640.webp 640w, /images/${s.slot}.webp 1200w`}
              sizes="(max-width: 1024px) 100vw, 58vw"
              width={1200}
              height={960}
              alt={s.alt}
              draggable={false}
              decoding="async"
              fetchPriority={i === 0 ? "high" : "low"}
              className={cn(
                "aspect-4/3 w-full object-cover transition-transform duration-[7000ms] ease-out select-none lg:aspect-[6/5.2]",
                s.position,
                i === index && !still ? "scale-105" : "scale-100"
              )}
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-forest-dark/90 via-forest-dark/45 to-transparent px-6 pt-20 pr-32 pb-6 text-white sm:px-7 sm:pr-56 sm:pb-7">
              <strong className="block text-lg leading-snug font-semibold">{s.title}</strong>
              <span className="text-small text-white/85">{s.text}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {count > 1 && (
        <div className="absolute right-5 bottom-6 flex items-center gap-3 sm:right-6 sm:bottom-7">
          <div className="hidden items-center gap-1.5 sm:flex">
            {slides.map((s, i) => (
              <button
                key={s.slot}
                type="button"
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => go(i)}
                className={cn("h-1.5 rounded-full bg-white/45 transition-all duration-500 hover:bg-white/80", i === index ? "w-6 bg-white" : "w-1.5")}
              />
            ))}
          </div>
          <button type="button" aria-label="Previous slide" onClick={() => go(index - 1)} className={control}>
            <CaretLeftIcon className="size-4" />
          </button>
          <button type="button" aria-label="Next slide" onClick={() => go(index + 1)} className={control}>
            <CaretRightIcon className="size-4" />
          </button>
        </div>
      )}
      <p aria-live={paused ? "polite" : "off"} className="sr-only">{`Slide ${index + 1} of ${count}: ${slides[index].title}`}</p>
    </div>
  );
}
