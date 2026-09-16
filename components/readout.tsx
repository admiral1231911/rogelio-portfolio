"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A calibrated tick/graticule readout — a measured scale with a marked
 * value — standing in for the generic "big number, small label" stat card.
 * The value counts up once the card scrolls into view.
 */
export function Readout({
  value,
  max,
  display,
  unit,
  label,
  ticks = 4,
}: {
  value: number;
  max: number;
  display: string;
  unit?: string;
  label: string;
  ticks?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [progress, setProgress] = useState(() => (reduceMotion ? 1 : 0));

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;

    let raf: number;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const duration = 900;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          setProgress(1 - Math.pow(1 - t, 3));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  const percent = Math.min(100, Math.max(0, (value / max) * 100)) * progress;
  const animatedDisplay = formatDisplay(display, progress);
  const tickMarks = Array.from({ length: ticks + 1 }, (_, i) => (i / ticks) * 100);

  return (
    <div
      ref={ref}
      className="panel reveal group rounded-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-raised"
    >
      <div className="flex items-baseline gap-1">
        <span className="tabular text-2xl font-semibold text-foreground">{animatedDisplay}</span>
        {unit ? <span className="tabular text-sm text-muted">{unit}</span> : null}
      </div>
      <div className="relative mt-3 h-6">
        <div className="absolute inset-x-0 top-2.5 h-px bg-border-strong" />
        {tickMarks.map((t) => (
          <div
            key={t}
            className="absolute top-1.5 h-2.5 w-px bg-border-strong"
            style={{ left: `${t}%` }}
          />
        ))}
        <div
          className="absolute top-0 h-6 w-0.5 bg-accent transition-[left] duration-300 ease-out"
          style={{ left: `${percent}%` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-2.5 left-0 h-px bg-accent transition-[width] duration-300 ease-out"
          style={{ width: `${percent}%` }}
          aria-hidden="true"
        />
      </div>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </div>
  );
}

/** Scales the numeric portion of a display string ("~1,200" -> "~840") while progress < 1. */
function formatDisplay(display: string, progress: number): string {
  if (progress >= 1) return display;
  const match = display.match(/[\d,]+/);
  if (!match) return display;
  const target = parseInt(match[0].replace(/,/g, ""), 10);
  const current = Math.round(target * progress);
  return display.replace(match[0], current.toLocaleString("en-US"));
}
