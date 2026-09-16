"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { NAV_ITEMS, useActiveSection } from "@/components/sidebar-nav";
import { StatusChip } from "@/components/status-chip";
import { ThemeToggle } from "@/components/theme-toggle";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection();

  return (
    <div className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
      <a href="#overview" className="text-sm font-semibold tracking-tight">
        RJI
      </a>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Drawer.Root open={open} onOpenChange={setOpen} direction="top">
          <Drawer.Trigger className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-strong">
            Menu
          </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-50 bg-foreground/20" />
          <Drawer.Content className="fixed inset-x-0 top-0 z-50 rounded-b-xl bg-surface p-6 outline-none">
            <Drawer.Title className="sr-only">Navigation</Drawer.Title>
            <ul className="space-y-1 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={activeId === item.id ? "true" : undefined}
                    className={`block rounded px-2 py-2 ${
                      activeId === item.id ? "bg-accent-soft font-medium text-accent" : "text-muted-strong"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <StatusChip status="live" label="Available for new opportunities" />
            </div>
          </Drawer.Content>
        </Drawer.Portal>
        </Drawer.Root>
      </div>
    </div>
  );
}
