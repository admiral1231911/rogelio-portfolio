"use client";

import { useEffect, useRef, useState } from "react";
import { StatusChip } from "@/components/status-chip";

export const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "awards", label: "Awards" },
  { id: "remote-work", label: "Remote Work" },
  { id: "contact", label: "Contact" },
];

/**
 * A plain IntersectionObserver band is unreliable once sections vary a lot in
 * height (a short "Contact" section at the very end never fully occupies a
 * narrow middle band). Instead: on scroll, find the last section whose top
 * has crossed a fixed line near the top of the viewport — and special-case
 * "scrolled to the bottom of the page" so the final section always wins,
 * even if its remaining space is shorter than the trigger line.
 */
export function useActiveSection() {
  const [activeId, setActiveId] = useState(NAV_ITEMS[0].id);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const TRIGGER_LINE = 140;

    let raf = 0;
    const update = () => {
      raf = 0;
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActiveId(sections[sections.length - 1].id);
        return;
      }
      let current = sections[0].id;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= TRIGGER_LINE) current = el.id;
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return activeId;
}

export function SidebarNav() {
  const activeId = useActiveSection();
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const [indicator, setIndicator] = useState({ top: 0, height: 0, ready: false });

  useEffect(() => {
    const el = itemRefs.current[activeId];
    const list = listRef.current;
    if (!el || !list) return;
    const listRect = list.getBoundingClientRect();
    const itemRect = el.getBoundingClientRect();
    setIndicator({ top: itemRect.top - listRect.top, height: itemRect.height, ready: true });
  }, [activeId]);

  return (
    <nav className="flex h-full flex-col justify-between py-8 pl-6 pr-4">
      <div>
        <a href="#overview" className="text-sm font-semibold tracking-tight">
          RJI
        </a>
        <ul ref={listRef} className="relative mt-10 space-y-1 text-sm">
          <li
            className="nav-indicator pointer-events-none absolute inset-x-0 rounded bg-accent-soft"
            style={{
              top: 0,
              height: indicator.height,
              transform: `translateY(${indicator.top}px)`,
              opacity: indicator.ready ? 1 : 0,
            }}
            aria-hidden="true"
          />
          {NAV_ITEMS.map((item) => (
            <li key={item.id} ref={(el) => { itemRefs.current[item.id] = el; }} className="relative">
              <a
                href={`#${item.id}`}
                aria-current={activeId === item.id ? "true" : undefined}
                className={`block rounded px-2 py-1.5 transition-colors duration-200 ${
                  activeId === item.id
                    ? "font-medium text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <StatusChip status="live" label="Available for new opportunities" />
    </nav>
  );
}
