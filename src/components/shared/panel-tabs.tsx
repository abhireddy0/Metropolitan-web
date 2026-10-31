"use client";

import { Tabs } from "@base-ui/react/tabs";
import { cn } from "@/lib/utils";

// Panels are rendered on the server and kept mounted, so all tab content is in the static HTML.
// Tabs are drawn as pill chips, like the blog filters: the active one filled green.
export function PanelTabs({ tabs, className }: { tabs: { value: string; label: string; panel: React.ReactNode }[]; className?: string }) {
  return (
    <Tabs.Root defaultValue={tabs[0].value} className={cn("flex flex-col gap-8", className)}>
      <Tabs.List className="flex scrollbar-none gap-2 overflow-x-auto px-1 py-1.5 sm:flex-wrap sm:justify-center sm:overflow-visible">
        {tabs.map((t) => (
          <Tabs.Tab
            key={t.value}
            value={t.value}
            className={(state) =>
              cn(
                "h-9 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors",
                state.active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground/75 hover:border-primary/40 hover:text-primary",
              )
            }
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
