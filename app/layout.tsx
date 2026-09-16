import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

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
      <body className="min-h-full bg-background text-foreground">
        <div className="grid-backdrop" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
