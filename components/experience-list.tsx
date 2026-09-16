import Image from "next/image";

interface Role {
  range: string;
  title: string;
  org: string;
  logo?: string;
  location: string;
  status: "live" | "planned";
  bullets: string[];
}

const ROLES: Role[] = [
  {
    range: "Nov 2022 — Present",
    title: "Software Quality Assurance Analyst (SDET)",
    org: "Infor",
    logo: "/images/logos/infor.png",
    location: "Bonifacio Global City, Philippines · Hybrid",
    status: "live",
    bullets: [
      "Point of contact for the team's AI-Driven Development Lifecycle (AIDLC) using Kiro (agentic AI) — built the workflow from zero setup across design review, script development, code review, and merge-request creation with cherry-picking, reducing development time by up to 68%.",
      "Built internal AI-powered tools, including enhancements to PPV script generation and monitoring.",
      "Developed a VS Code extension that switches profiles across GitLab repositories and AWS configurations for multi-repo, multi-account workflows.",
      "Created an MCP server that automates script stabilization across tenants and environments.",
      "Currently evaluating and migrating the automation suite from Selenium to Playwright.",
      "Pioneered the team's first AI-assisted automation with Amazon Q Pro (~40% faster script delivery) as an early adopter, before advancing to Kiro.",
      "Developed, maintained, and stabilized ~1,200 team-owned Java + Selenium regression scripts, with root-cause analysis and reliability fixes.",
      "Led the automation framework migration from Java Xtend to Java Selenium.",
      "Acted as PPV point of contact — intake, prioritization, stakeholder communication, and escalations, supporting ~30 PPV orders per quarter with 1–2 day turnaround.",
    ],
  },
  {
    range: "Aug 2022 — Jan 2025",
    title: "Software Quality Assurance Analyst",
    org: "Griffin Hill",
    logo: "/images/logos/griffin-hill.png",
    location: "Pleasant Grove, UT, USA · Remote",
    status: "planned",
    bullets: [
      "Built a test automation framework from scratch and delivered 100+ automation scripts, improving regression coverage for company websites and products.",
      "Created and executed test plans for feature releases; maintained and upgraded test cases to prevent regressions.",
      "Managed and tracked defects and enhancements via ticket CRUD; validated fixes and reported clear, actionable issues for web and mobile apps.",
      "Collaborated in a fully remote, international team to deliver QA work on schedule.",
    ],
  },
  {
    range: "Aug 2021 — Oct 2021",
    title: "Software Quality Assurance Analyst (Intern)",
    org: "Wela School Systems",
    logo: "/images/logos/wela.png",
    location: "Cagayan de Oro, Philippines · Remote",
    status: "planned",
    bullets: [
      "Performed functional testing and supported maintenance of a Learning Management System used by multiple client schools.",
      "Executed test cases, logged detailed bug reports with clear reproduction steps, and provided technical troubleshooting support.",
      "Documented test results and collaborated with developers to verify fixes against expected requirements.",
    ],
  },
];

export function LogoTile({ src, alt, size = 56 }: { src: string; alt: string; size?: number }) {
  return (
    <div
      className="flex flex-none items-center justify-center rounded-md border border-border bg-white p-1.5"
      style={{ width: size, height: size }}
    >
      <Image src={src} alt={alt} width={size - 12} height={size - 12} className="h-full w-full object-contain" />
    </div>
  );
}

export function ExperienceList() {
  return (
    <ol className="reveal-group relative space-y-10 pl-6">
      <li className="absolute -left-[25px] top-0 h-full w-0.5 bg-border-strong" aria-hidden="true" />
      <li className="timeline-rail-progress" aria-hidden="true" />
      <li className="timeline-scrubber" aria-hidden="true" />
      {ROLES.map((role) => (
        <li key={role.org} className="relative reveal">
          <span
            className={`absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-background ${
              role.status === "live" ? "pulse-ring bg-live" : "bg-border-strong"
            }`}
            aria-hidden="true"
          />
          <p className="tabular text-xs font-medium text-muted">{role.range}</p>
          <div className="mt-2 flex items-start gap-3">
            {role.logo ? <LogoTile src={role.logo} alt={`${role.org} logo`} /> : null}
            <div>
              <h3 className="text-base font-semibold text-foreground">{role.title}</h3>
              <p className="text-sm text-muted-strong">
                {role.org} · {role.location}
              </p>
            </div>
          </div>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted-strong">
            {role.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2">
                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-border-strong" aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
