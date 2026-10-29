"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const STAGGER = 90; // ms between siblings in the same group

// Blocks inside every section except the page's first (its hero): the container's children,
// or a grid's items when the child is a multi-column grid (or marked data-reveal-items), so card rows stagger in.
function targets(): HTMLElement[] {
  const sections = Array.from(document.querySelectorAll<HTMLElement>("main section")).filter(
    (s) => s !== document.querySelector("main section") && !s.parentElement?.closest("main section")
  );
  return sections.flatMap((section) => {
    const container = section.querySelector<HTMLElement>(":scope > div") ?? section;
    // Dialogs (the gallery lightbox) are never revealed: a closed one has no box to intersect.
    return Array.from(container.children as HTMLCollectionOf<HTMLElement>).filter((child) => child.tagName !== "DIALOG").flatMap((child) =>
      (child.classList.contains("grid") || child.hasAttribute("data-reveal-items")) && child.children.length > 1 ? Array.from(child.children as HTMLCollectionOf<HTMLElement>) : [child]
    );
  });
}

// Grow-style entrance: blocks rise, fade and un-blur as they scroll into view, once.
// Only blocks still below the fold are hidden, so nothing flashes and nothing stays hidden without JS.
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    const done = (el: HTMLElement) => {
      el.classList.remove("reveal", "reveal-in");
      el.style.removeProperty("--reveal-delay");
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          io.unobserve(el);
          el.classList.add("reveal-in");
          // Children's own transitions bubble up, so only react to the block itself.
          const end = (ev: TransitionEvent) => {
            if (ev.target !== el) return;
            el.removeEventListener("transitionend", end);
            done(el);
          };
          el.addEventListener("transitionend", end);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    const fold = window.innerHeight;
    const order = new Map<Element, number>();
    const els = targets().filter((el) => el.getBoundingClientRect().top > fold);
    for (const el of els) {
      const i = order.get(el.parentElement!) ?? 0;
      order.set(el.parentElement!, i + 1);
      el.style.setProperty("--reveal-delay", `${Math.min(i, 5) * STAGGER}ms`);
      el.classList.add("reveal");
      io.observe(el);
    }

    return () => {
      io.disconnect();
      els.forEach(done);
    };
  }, [pathname]);

  return null;
}
