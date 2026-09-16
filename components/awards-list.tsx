"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Award {
  year: string;
  name: string;
  kind: "Awardee" | "Nominee" | "Recognition";
  detail: string;
  image?: string;
  /** Used when no photo exists yet — a drawn icon standing in, never a stock photo. */
  icon?: "energizer";
}

const AWARDS: Award[] = [
  {
    year: "2025",
    name: "AI Whisperer",
    kind: "Awardee",
    detail:
      "Awarded at the M3QA team-building event as the team's resident “Father of AI Tools” — recognized as one of the team's AI pioneers and point of contact for AI-assisted automation.",
    image: "/images/awards/ai-whisperer.jpg",
  },
  {
    year: "2025",
    name: "Ace Innovator",
    kind: "Awardee",
    detail: "Awarded for introducing innovative QA automation solutions — AI-driven scripting and internal tooling.",
    image: "/images/awards/ace-innovator.jpg",
  },
  {
    year: "2025",
    name: "Ace Breakthrough",
    kind: "Awardee",
    detail: "Awarded for a breakthrough contribution to the team's principles and success.",
    image: "/images/awards/ace-breakthrough.jpg",
  },
  {
    year: "2025",
    name: "Traveling Trophy",
    kind: "Recognition",
    detail:
      "A rotating recognition passed between M3CSQA members who manifest Infor's core values in pursuit of the team's goals — currently held.",
    image: "/images/awards/traveling-trophy.jpg",
  },
  {
    year: "2025",
    name: "The Mighty Bond",
    kind: "Recognition",
    detail: "“Mighty fast, mighty strong” — the team member who always accomplishes tasks on the mark in a flash.",
    image: "/images/awards/mighty-bond.jpg",
  },
  {
    year: "2025",
    name: "The Energizer",
    kind: "Recognition",
    detail: "Recognized for collaboration, delivery impact, and consistent follow-through.",
    icon: "energizer",
  },
  {
    year: "2024",
    name: "Ace Motivator",
    kind: "Recognition",
    detail:
      "“Has the capability to transform the mundane into something bright and positive” — ACE Community Builders Award nomination.",
    image: "/images/awards/ace-motivator.jpg",
  },
  {
    year: "Dec 2025",
    name: "Sinagtala “Haribon”",
    kind: "Nominee",
    detail: "Individual Contributor of the Year nomination, alongside multiple peer “Raves” for dependable cross-team support.",
    image: "/images/awards/sinagtala-haribon.jpg",
  },
];

/** A lightning bolt inside a ring — the Energizer's motif, drawn in the same
 * stroke language as the site's other icons, standing in until a photo exists. */
function EnergizerIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 text-accent" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="19" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M26 13 16 26h7l-2 9 11-14h-7l1-8z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const KIND_CLASS: Record<Award["kind"], string> = {
  Awardee: "text-live bg-live-soft",
  Nominee: "text-pending bg-pending-soft",
  Recognition: "text-accent bg-accent-soft",
};

export function AwardsList() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <>
      <ul className="reveal-group grid gap-3 sm:grid-cols-2">
        {AWARDS.map((award) => (
          <li
            key={award.name}
            className="panel reveal overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-raised"
          >
            {award.image ? (
              <button
                type="button"
                onClick={() => setLightbox({ src: award.image!, alt: `${award.name} award proof` })}
                className="group relative block aspect-[4/3] w-full overflow-hidden bg-surface-subtle"
              >
                <Image
                  src={award.image}
                  alt={`${award.name} award proof`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-foreground/0 text-xs font-medium text-transparent transition-colors duration-200 group-hover:bg-foreground/40 group-hover:text-white">
                  View photo
                </span>
              </button>
            ) : award.icon === "energizer" ? (
              <div className="flex aspect-[4/3] w-full items-center justify-center bg-surface-subtle">
                <EnergizerIcon />
              </div>
            ) : null}
            <div className="p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="tabular text-xs font-medium text-muted">{award.year}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${KIND_CLASS[award.kind]}`}>
                  {award.kind}
                </span>
              </div>
              <h3 className="mt-1.5 text-sm font-semibold text-foreground">{award.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-strong">{award.detail}</p>
            </div>
          </li>
        ))}
      </ul>

      {lightbox ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 p-6 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute right-5 top-5 rounded-full bg-surface/90 p-2 text-foreground shadow-raised"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element -- unknown intrinsic size at click time; a lightbox for a handful of local photos doesn't warrant next/image's optimization pipeline */}
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-raised"
          />
        </div>
      ) : null}
    </>
  );
}
