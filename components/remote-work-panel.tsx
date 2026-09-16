import { LogoTile } from "@/components/experience-list";
import { ArchiveIcon } from "@/components/icons";

interface EarlierRole {
  range: string;
  title: string;
  org: string;
  location: string;
  logo?: string;
  remote: boolean;
  bullets: string[];
}

const EARLIER_ROLES: EarlierRole[] = [
  {
    range: "Aug 2022 — Jan 2025",
    title: "Software Quality Assurance Analyst",
    org: "Griffin Hill",
    location: "Pleasant Grove, UT, USA",
    logo: "/images/logos/griffin-hill.png",
    remote: true,
    bullets: [
      "2.5 years as a full-time QA analyst for a US-based company, working entirely remote.",
      "Coordinated asynchronously across time zones with a fully remote, international team.",
    ],
  },
  {
    range: "Dec 2021 — Mar 2022",
    title: "Appointment Setter (Freelance)",
    org: "Master Service USA",
    location: "Guttenberg, NJ, USA",
    logo: "/images/logos/master-service-usa.png",
    remote: true,
    bullets: [
      "Scheduled and coordinated service appointments for chimney cleaning and repairs.",
      "Managed inbound and outbound calls to ensure efficient communication.",
      "Improved customer satisfaction and service delivery through effective coordination.",
    ],
  },
  {
    range: "Aug 2021 — Oct 2021",
    title: "Software Quality Assurance Analyst (Intern)",
    org: "Wela School Systems",
    location: "Cagayan de Oro, Philippines",
    logo: "/images/logos/wela.png",
    remote: true,
    bullets: [
      "Supported a Learning Management System for multiple client schools, fully remote.",
      "Coordinated with developers and stakeholders online to verify fixes and log clear bug reports.",
    ],
  },
  {
    range: "Aug 2018 — May 2020",
    title: "Data Entry Clerk",
    org: "Xavier Ateneo — Kinaadman Research",
    location: "Cagayan de Oro, Philippines",
    logo: "/images/logos/xavier-ateneo.jpg",
    remote: false,
    bullets: [
      "Maintained accurate, up-to-date student and research records for the university's research office.",
      "Included for reference — professional work experience reaches back to 2018.",
    ],
  },
];

export function RemoteWorkPanel() {
  return (
    <div className="panel reveal rounded-xl p-6">
      <p className="text-sm leading-relaxed text-muted-strong">
        Beyond the QA timeline above: <strong className="text-foreground">3+ years across three roles working
        fully remote</strong>, including 2.5 years as a full-time analyst for a US company — a track record of
        reliable, self-directed delivery independent of a physical office. Professional work experience overall
        reaches back to <strong className="text-foreground">2018</strong>.
      </p>
      <ul className="reveal-group mt-5 space-y-5">
        {EARLIER_ROLES.map((role) => (
          <li key={role.title} className="reveal flex gap-4 border-t border-border pt-5 first:border-0 first:pt-0">
            {role.logo ? (
              <LogoTile src={role.logo} alt={`${role.org} logo`} size={56} />
            ) : (
              <div className="flex h-14 w-14 flex-none items-center justify-center rounded-md border border-border bg-surface-subtle text-muted">
                <ArchiveIcon className="h-6 w-6" />
              </div>
            )}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="tabular text-xs font-medium text-muted">{role.range}</p>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    role.remote ? "bg-live-soft text-live" : "bg-surface-subtle text-muted"
                  }`}
                >
                  {role.remote ? "Remote" : "On-site"}
                </span>
              </div>
              <h4 className="mt-1 text-sm font-semibold text-foreground">{role.title}</h4>
              <p className="text-sm text-muted-strong">
                {role.org} · {role.location}
              </p>
              <ul className="mt-2 space-y-1 text-sm leading-relaxed text-muted-strong">
                {role.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 flex-none rounded-full bg-border-strong" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
