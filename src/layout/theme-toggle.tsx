"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react/ssr";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// The theme lives on <html data-theme>, set before paint by the script in app/layout.tsx, so the icons swap
// with CSS alone and nothing here needs state or a hydration pass.
function toggle() {
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  // Switch every colour at once instead of letting each element's own transition fade it.
  root.classList.add("[&_*]:transition-none!");
  root.dataset.theme = next;
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("[&_*]:transition-none!")));
  try {
    localStorage.setItem("theme", next);
  } catch {}
}

export function ThemeToggle({ className }: { className?: string }) {
  return (
    <button type="button" onClick={toggle} aria-label="Switch between light and dark theme" className={cn(buttonVariants({ variant: "outline", size: "icon" }), className)}>
      <MoonIcon weight="duotone" className="size-5 dark:hidden" />
      <SunIcon weight="duotone" className="hidden size-5 dark:block" />
    </button>
  );
}
