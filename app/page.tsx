import { SidebarNav } from "@/components/sidebar-nav";
import { MobileNav } from "@/components/mobile-nav";
import { PipelinePanel } from "@/components/pipeline-panel";
import { Readout } from "@/components/readout";
import { ExperienceList } from "@/components/experience-list";
import { SkillsTable } from "@/components/skills-table";
import { CertificationsList } from "@/components/certifications-list";
import { AwardsList } from "@/components/awards-list";
import { RemoteWorkPanel } from "@/components/remote-work-panel";
import { ContactDrawer } from "@/components/contact-drawer";
import { MailIcon, PhoneIcon, LinkedInIcon, LocationIcon } from "@/components/icons";

function SectionHeading({ title }: { title: string }) {
  return <h2 className="border-b border-border pb-3 text-xl font-semibold text-foreground">{title}</h2>;
}

export default function Home() {
  return (
    <>
      <MobileNav />

      <div className="mx-auto flex min-h-screen max-w-6xl lg:px-6">
        <aside className="hidden w-56 flex-none lg:block">
          <div className="sticky top-0 h-screen">
            <SidebarNav />
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-10 sm:px-8 lg:py-16">
        {/* Overview */}
        <section id="overview" className="anim-stagger scroll-mt-20">
          <p className="text-sm font-medium text-accent">Rogelio Jr Ibacarra</p>
          <h1 className="mt-2 max-w-xl text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            SDET / Test Automation Engineer (Java)
            <span className="mt-1 block text-2xl font-medium text-muted-strong sm:text-3xl">
              AI-Driven Quality Engineering
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-strong">
            I don&apos;t just use GenAI tools for testing — I build the agentic AI workflows, MCP servers, and
            developer tooling that let a QA team ship faster. Based in Cagayan de Oro City, Philippines; currently
            hybrid out of Bonifacio Global City at Infor.
          </p>

          <div className="mt-8 max-w-xl">
            <PipelinePanel />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Readout value={68} max={100} display="68%" label="Dev-time reduction (AIDLC rollout)" />
            <Readout value={40} max={100} display="~40%" label="Faster script delivery (Amazon Q Pro)" />
            <Readout value={1200} max={1500} display="~1,200" label="Java + Selenium scripts maintained" />
            <Readout value={30} max={40} display="~30" label="PPV orders / quarter, 1–2 day turnaround" />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <ContactDrawer>
              <button className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground shadow-panel transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-raised">
                Get in touch
              </button>
            </ContactDrawer>
            <a
              href="https://www.linkedin.com/in/rogeliojr-ibacarra"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border-strong px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface-subtle hover:shadow-panel"
            >
              <LinkedInIcon className="h-4 w-4" />
              View LinkedIn
            </a>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="mt-20 scroll-mt-20">
          <SectionHeading title="Experience" />
          <div className="mt-8">
            <ExperienceList />
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mt-20 scroll-mt-20">
          <SectionHeading title="Skills" />
          <div className="mt-8">
            <SkillsTable />
          </div>
        </section>

        {/* Certifications */}
        <section id="certifications" className="mt-20 scroll-mt-20">
          <SectionHeading title="Certifications" />
          <p className="mt-3 max-w-xl text-sm text-muted-strong">External, verifiable credentials.</p>
          <div className="mt-8">
            <CertificationsList />
          </div>
        </section>

        {/* Awards */}
        <section id="awards" className="mt-20 scroll-mt-20">
          <SectionHeading title="Awards & Recognition" />
          <p className="mt-3 max-w-xl text-sm text-muted-strong">Internal recognitions at Infor, 2024–2025.</p>
          <div className="mt-8">
            <AwardsList />
          </div>
        </section>

        {/* Remote Work */}
        <section id="remote-work" className="mt-20 scroll-mt-20">
          <SectionHeading title="Remote Work Experience" />
          <div className="mt-8">
            <RemoteWorkPanel />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mt-20 scroll-mt-20 pb-24">
          <SectionHeading title="Contact" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="mailto:ibacarrajr.rogelio@gmail.com"
              className="panel flex items-start gap-3 rounded-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-raised"
            >
              <MailIcon className="mt-0.5 h-5 w-5 flex-none text-accent" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">Email</p>
                <p className="mt-1.5 break-all text-sm font-medium text-foreground">
                  ibacarrajr.rogelio@gmail.com
                </p>
              </div>
            </a>
            <a
              href="tel:+639754680829"
              className="panel flex items-start gap-3 rounded-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-raised"
            >
              <PhoneIcon className="mt-0.5 h-5 w-5 flex-none text-accent" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">Phone</p>
                <p className="mt-1.5 text-sm font-medium text-foreground">0975 468 0829</p>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/rogeliojr-ibacarra"
              target="_blank"
              rel="noreferrer"
              className="panel flex items-start gap-3 rounded-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-raised"
            >
              <LinkedInIcon className="mt-0.5 h-5 w-5 flex-none text-accent" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">LinkedIn</p>
                <p className="mt-1.5 truncate text-sm font-medium text-foreground">@rogeliojr-ibacarra</p>
              </div>
            </a>
            <div className="panel flex items-start gap-3 rounded-lg p-4">
              <LocationIcon className="mt-0.5 h-5 w-5 flex-none text-accent" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">Location</p>
                <p className="mt-1.5 text-sm font-medium text-foreground">Cagayan de Oro City, Philippines</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <ContactDrawer>
              <button className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground shadow-panel transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-raised">
                Send a message
              </button>
            </ContactDrawer>
          </div>
        </section>
        </main>
      </div>
    </>
  );
}
