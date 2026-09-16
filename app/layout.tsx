import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

/**
 * Runs before paint to avoid a flash of the wrong theme: an explicit choice
 * in localStorage overrides the system preference the CSS media query would
 * otherwise apply. No stored choice means no attribute — the system
 * preference (via @media prefers-color-scheme) decides, same as before.
 */
const NO_FLASH_THEME_SCRIPT = `
(function () {
  try {
    var t = localStorage.getItem("theme");
    if (t === "light" || t === "dark") {
      document.documentElement.setAttribute("data-theme", t);
    }
  } catch (e) {}
})();
`;

const plexSans = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const NAME = "Rogelio Jr Ibacarra";
const TITLE = "SDET / Test Automation Engineer (Java) — AI-Driven Quality Engineering";

export const metadata: Metadata = {
  title: `${NAME} — ${TITLE}`,
  description:
    "SDET / Test Automation Engineer specializing in AI-driven quality engineering — agentic AI workflows (AIDLC/Kiro), MCP servers, and Java/Selenium test automation at scale.",
  openGraph: {
    title: `${NAME} — ${TITLE}`,
    description:
      "SDET / Test Automation Engineer specializing in AI-driven quality engineering.",
    type: "website",
    images: ["/images/profile.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_THEME_SCRIPT }} />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <div className="grid-backdrop" aria-hidden="true" />
        <div className="fixed right-6 top-6 z-40 hidden lg:block">
          <ThemeToggle />
        </div>
        {children}
      </body>
    </html>
  );
}
