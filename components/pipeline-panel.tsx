"use client";

import { useEffect, useRef, useState } from "react";

interface Stage {
  id: string;
  detail: string;
}

const STAGES: Stage[] = [
  {
    id: "design-review",
    detail:
      "Reviews test design before scripting starts — part of the AIDLC workflow I built from zero setup at Infor.",
  },
  {
    id: "script-development",
    detail:
      "Java + Selenium script generation, augmented by Kiro (agentic AI) and, earlier, Amazon Q Pro (~40% faster delivery as an early adopter).",
  },
  {
    id: "code-review",
    detail: "Automated review pass before merge, across ~1,200 team-owned regression scripts.",
  },
  {
    id: "merge-request",
    detail: "Merge-request creation and merge, with cherry-picking supported.",
  },
];

const BOOT_STEP_MS = 320;

/**
 * Signature interaction: on mount the pipeline "runs" line by line, each
 * stage flipping from pending to automated in sequence, ending with the
 * headline stat counting up. After boot, hovering or focusing a stage line
 * reveals its real detail inline, doc-style.
 */
function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function PipelinePanel() {
  const [bootedCount, setBootedCount] = useState(() => (prefersReducedMotion() ? STAGES.length : 0));
  const [reduction, setReduction] = useState(() => (prefersReducedMotion() ? 68 : 0));
  const [activeId, setActiveId] = useState<string | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);
  const booted = bootedCount >= STAGES.length;
  const active = STAGES.find((s) => s.id === activeId) ?? null;

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    STAGES.forEach((_, i) => {
      timers.push(setTimeout(() => setBootedCount(i + 1), (i + 1) * BOOT_STEP_MS));
    });

    const countStart = (STAGES.length + 1) * BOOT_STEP_MS;
    const countDuration = 700;
    const countFrom = performance.now() + countStart;
    let raf: number;
    const tick = () => {
      const progress = Math.min(1, Math.max(0, (performance.now() - countFrom) / countDuration));
      setReduction(Math.round(progress * 68));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    timers.push(setTimeout(() => (raf = requestAnimationFrame(tick)), countStart));

    return () => {
      timers.forEach(clearTimeout);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -3, y: px * 3 });
  }

  return (
    <div className="relative" style={{ perspective: "1200px" }}>
      <div
        className="glow-breathe absolute -inset-6 -z-10 rounded-[2rem] bg-accent opacity-60 blur-3xl"
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="panel anim-rise overflow-hidden rounded-xl transition-transform duration-200 ease-out will-change-transform"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <div className="flex items-center justify-between border-b border-border bg-surface-subtle px-4 py-2.5">
          <span className="text-xs font-medium text-muted">aidlc.pipeline.yaml</span>
          <span className="text-xs text-muted">Kiro (agentic AI)</span>
        </div>
        <div className="doc-scroll overflow-x-auto p-4 font-mono text-sm leading-7">
          <p className="text-muted"># AIDLC — AI-Driven Development Lifecycle</p>
          {STAGES.map((stage, i) => {
            const isBooted = i < bootedCount;
            const isBooting = i === bootedCount;
            return (
              <button
                key={stage.id}
                type="button"
                disabled={!isBooted}
                onMouseEnter={() => isBooted && setActiveId(stage.id)}
                onMouseLeave={() => setActiveId((id) => (id === stage.id ? null : id))}
                onFocus={() => isBooted && setActiveId(stage.id)}
                onBlur={() => setActiveId((id) => (id === stage.id ? null : id))}
                className={`block w-full rounded px-1.5 -mx-1.5 text-left transition-colors ${
                  activeId === stage.id ? "bg-accent-soft" : isBooted ? "hover:bg-surface-subtle" : ""
                }`}
              >
                <span className="text-muted">{String(i + 1).padStart(2, "0")}</span>{" "}
                <span className={isBooted || isBooting ? "text-foreground" : "text-muted"}>{stage.id}:</span>{" "}
                {isBooted ? (
                  <span className="text-live">automated</span>
                ) : isBooting ? (
                  <span className="text-pending">
                    pending<span className="caret">▍</span>
                  </span>
                ) : (
                  <span className="text-muted">queued</span>
                )}
              </button>
            );
          })}
          <p className="mt-2 text-muted">---</p>
          <p className={`transition-opacity duration-300 ${booted ? "opacity-100" : "opacity-0"}`}>
            <span className="text-muted">dev-time reduction:</span>{" "}
            <span className="tabular font-semibold text-accent">{reduction}%</span>
          </p>
        </div>
        <div
          className="grid transition-[grid-template-rows] duration-200 ease-out"
          style={{ gridTemplateRows: active ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <p className="border-t border-border bg-accent-soft px-4 py-3 text-sm text-muted-strong">
              {active?.detail ?? ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
