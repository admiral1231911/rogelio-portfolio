"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Certification {
  date: string;
  title: string;
  issuer: string;
  credentialId: string;
  verifyUrl: string;
  image: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    date: "Sep 2026",
    title: "Quality Assurance (QA) — Techniques and Methodologies",
    issuer: "Alison · CPD Certified",
    credentialId: "5801-60896547",
    verifyUrl: "https://alison.com/verify/453e8c4eb4",
    image: "/images/awards/qa-certificate-alison.png",
  },
];

export function CertificationsList() {
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
        {CERTIFICATIONS.map((cert) => (
          <li
            key={cert.credentialId}
            className="panel reveal overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-raised"
          >
            <button
              type="button"
              onClick={() => setLightbox({ src: cert.image, alt: `${cert.title} certificate` })}
              className="group relative block aspect-[4/3] w-full overflow-hidden bg-white"
            >
              <Image
                src={cert.image}
                alt={`${cert.title} certificate`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-foreground/0 text-xs font-medium text-transparent transition-colors duration-200 group-hover:bg-foreground/40 group-hover:text-white">
                View certificate
              </span>
            </button>
            <div className="p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="tabular text-xs font-medium text-muted">{cert.date}</span>
                <span className="rounded-full bg-live-soft px-2 py-0.5 text-xs font-medium text-live">
                  Verified
                </span>
              </div>
              <h3 className="mt-1.5 text-sm font-semibold text-foreground">{cert.title}</h3>
              <p className="mt-1 text-sm text-muted-strong">{cert.issuer}</p>
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="mt-2 inline-block font-mono text-xs text-accent hover:text-accent-hover"
              >
                Verify · {cert.credentialId}
              </a>
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
          {/* eslint-disable-next-line @next/next/no-img-element -- unknown intrinsic size at click time; a lightbox for a handful of local images doesn't warrant next/image's optimization pipeline */}
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
