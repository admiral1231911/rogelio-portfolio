"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@/components/icons";

type Theme = "light" | "dark";

/** Dark is the site default; light only applies when explicitly chosen. */
function getInitialTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

/** A pill switch, not a bare icon button — the toggle should look worth touching. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // Reads document/localStorage state that doesn't exist during SSR;
    // deferring to an effect (rather than a lazy initializer) is what
    // avoids a hydration mismatch here, not an anti-pattern to fix.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(getInitialTheme());
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private-mode storage can throw; the toggle still works for this visit.
    }
  }

  // Reserve the same footprint before hydration so nothing shifts on mount.
  if (!theme) {
    return <div className={`h-9 w-[72px] flex-none ${className}`} aria-hidden="true" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className={`group relative inline-flex h-9 w-[72px] flex-none items-center rounded-full bg-accent shadow-panel transition-all duration-200 hover:shadow-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
    >
      <SunIcon
        className={`absolute left-[9px] h-4 w-4 text-accent-foreground transition-opacity duration-200 ${
          isDark ? "opacity-50" : "opacity-100"
        }`}
      />
      <MoonIcon
        className={`absolute right-[9px] h-4 w-4 text-accent-foreground transition-opacity duration-200 ${
          isDark ? "opacity-100" : "opacity-50"
        }`}
      />
      <span
        className="absolute top-[3px] left-[3px] h-[30px] w-[30px] rounded-full bg-surface shadow-raised transition-transform duration-300 ease-out group-hover:scale-105"
        style={{ transform: isDark ? "translateX(34px)" : "translateX(0px)" }}
        aria-hidden="true"
      >
        {isDark ? (
          <MoonIcon className="absolute inset-0 m-auto h-4 w-4 text-accent" />
        ) : (
          <SunIcon className="absolute inset-0 m-auto h-4 w-4 text-accent" />
        )}
      </span>
    </button>
  );
}
