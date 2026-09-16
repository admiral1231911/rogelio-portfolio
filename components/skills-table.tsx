const GROUPS: { category: string; tools: string[] }[] = [
  {
    category: "Test Automation & Frameworks",
    tools: [
      "Java",
      "Selenium WebDriver",
      "Playwright",
      "TestNG",
      "JUnit",
      "Infor TaaS Studio (Xtend)",
      "AWS Oxford Framework",
      "Kubernetes",
    ],
  },
  {
    category: "AI-Driven Testing & Tooling",
    tools: [
      "AIDLC with Kiro (agentic AI)",
      "Amazon Q Pro",
      "MCP servers",
      "VS Code extensions",
      "Prompt design & AI code review",
      "AWS",
      "Azure",
    ],
  },
  {
    category: "API & Testing Types",
    tools: ["API validation", "Functional", "Regression", "Integration", "End-to-end", "Postman", "RestAssured"],
  },
  {
    category: "Languages & Platforms",
    tools: ["TypeScript / JavaScript", "Node.js", "Python", "Bash / Shell Scripting", "Docker", "SQL / Database Testing"],
  },
  {
    category: "QA Practices & Collaboration",
    tools: [
      "Agile / Scrum",
      "Root Cause Analysis (RCA)",
      "Test Planning & Execution",
      "Mobile App Testing",
      "Mentoring & Knowledge Transfer",
      "Internal Tooling & Process Automation",
    ],
  },
  {
    category: "Version Control & CI/CD",
    tools: ["Git", "GitHub", "GitLab", "Bitbucket", "SourceTree", "Jenkins", "GitHub Actions"],
  },
  {
    category: "Project & Test Management",
    tools: ["Jira", "Zephyr", "Asana", "Trello"],
  },
  {
    category: "IDEs & Development Tools",
    tools: ["IntelliJ IDEA", "Eclipse", "Visual Studio Code", "TaaS Studio"],
  },
  {
    category: "Documentation & Productivity",
    tools: ["Confluence", "Microsoft Office", "Power Automate", "Adobe Acrobat / Creative Cloud"],
  },
];

export function SkillsTable() {
  return (
    <div className="panel reveal overflow-hidden rounded-xl">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-subtle text-xs font-medium uppercase tracking-wide text-muted">
            <th className="w-1/3 px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Tools</th>
          </tr>
        </thead>
        <tbody>
          {GROUPS.map((group) => (
            <tr key={group.category} className="border-b border-border last:border-0">
              <td className="px-4 py-3.5 align-top font-medium text-foreground">{group.category}</td>
              <td className="px-4 py-3.5 align-top">
                <div className="flex flex-wrap gap-1.5">
                  {group.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md bg-surface-subtle px-2 py-0.5 font-mono text-xs text-muted-strong transition-all duration-150 hover:-translate-y-0.5 hover:bg-accent-soft hover:text-accent"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
