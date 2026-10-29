"use client";

import { Tabs } from "@base-ui/react/tabs";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Panels are rendered on the server and kept mounted, so all tab content is in the static HTML.
// Tabs are drawn as the site's buttons: the active one filled green, the rest the pale bordered style.
export function PanelTabs({ tabs, className }: { tabs: { value: string; label: string; panel: React.ReactNode }[]; className?: string }) {
  return (
    <Tabs.Root defaultValue={tabs[0].value} className={cn("flex flex-col gap-8", className)}>
      <Tabs.List className="flex scrollbar-none gap-2 overflow-x-auto px-1 py-1.5 sm:flex-wrap sm:justify-center sm:overflow-visible">
        {tabs.map((t) => (
          <Tabs.Tab
            key={t.value}
            value={t.value}
            className={(state) => cn(buttonVariants({ variant: state.active ? "default" : "outline", size: "sm" }), "shrink-0")}
          >
            {t.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {tabs.map((t) => (
        <Tabs.Panel key={t.value} value={t.value} keepMounted className="text-base outline-none data-hidden:hidden">
          {t.panel}
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}
