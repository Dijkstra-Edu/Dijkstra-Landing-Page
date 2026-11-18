import type { Metadata } from "next";
import { Github, Lock } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { CtaBand } from "@/components/site/cta-band";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Developer APIs",
  description:
    "Dijkstra's architecture, its open-source services and the public Teams API.",
};

const gh = (repo: string) => `${siteConfig.links.github}/${repo}`;

const services = [
  {
    name: "Dijkstra Web",
    kind: "Frontend",
    stack: "Next.js, TypeScript, TanStack Query",
    text: "The student platform.",
    repo: gh("Dijkstra-Web"),
  },
  {
    name: "Dataforge",
    kind: "Backend",
    stack: "Python, FastAPI, PostgreSQL",
    text: "Users, profiles, opportunities and certificates.",
    repo: gh("Dataforge"),
  },
  {
    name: "GitRipper",
    kind: "Backend",
    stack: "Java, Spring Boot, Temporal, Kafka",
    text: "GitHub statistics aggregation.",
    repo: gh("Gitripper"),
  },
  {
    name: "Helios",
    kind: "Backend",
    stack: "Rust, Axum",
    text: "Ranking and XP (closed source).",
    repo: undefined,
  },
  {
    name: "Dijkstra Intelligence",
    kind: "Backend",
    stack: "Python, FastAPI, LangGraph",
    text: "Dijkstra GPT's chat and agent service.",
    repo: undefined,
  },
  {
    name: "Hodor",
    kind: "Gateway",
    stack: "C++, Drogon",
    text: "Authentication server and API gateway.",
    repo: undefined,
  },
  {
    name: "Archivist",
    kind: "Backend",
    stack: "Go, Gin, MongoDB",
    text: "Blog and posts service.",
    repo: gh("Archivist"),
  },
  {
    name: "Blog",
    kind: "Frontend",
    stack: "Astro",
    text: "The public blog.",
    repo: gh("Blog"),
  },
  {
    name: "Docs",
    kind: "Frontend",
    stack: "Astro Starlight",
    text: "docs.dijkstra.org.in.",
    repo: gh("Docs"),
  },
  {
    name: "Landing page",
    kind: "Frontend",
    stack: "Next.js",
    text: "This website.",
    repo: gh("Dijkstra-Landing-Page"),
  },
];

const endpoints = [
  {
    method: "GET",
    path: "/api/teams",
    text: "Every team in the Dijkstra-Edu organisation as a tree, with stats and members.",
  },
  {
    method: "GET",
    path: "/api/teams/:slug",
    text: "One team queried from GitHub: direct members, sub-teams and its path.",
  },
  {
    method: "GET",
    path: "/api/teams/:slug?member=<login>",
    text: "Also checks whether a GitHub user belongs to the team (active, pending, none or unknown).",
  },
];

const example = `curl ${siteConfig.url}/api/teams/team-data-engineering?member=octocat

{
  "source": "github",
  "team": {
    "slug": "team-data-engineering",
    "kind": "Team",
    "label": "Data Engineering",
    "memberCount": 1,
    "members": [{ "login": "â€¦", "role": "member" }],
    "children": []
  },
  "path": [{ "label": "Engineering & Technical Teams" }, { "label": "AI & ML Engineering" }],
  "membership": { "login": "octocat", "state": "none", "role": null }
}`;

export default function DevelopersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Developers"
        title="Build with Dijkstra"
        description="Dijkstra is a set of open-source services in seven languages and frameworks â€” each one a place to learn. Platform APIs are served through the Hodor gateway; public API keys are on the roadmap."
      />

      <Section
        id="teams-api"
        title="Public Teams API"
        description="Served by this website. No key required; responses are cached."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <ul className="space-y-3">
            {endpoints.map((e) => (
              <li
                key={e.path}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <code className="break-all font-mono text-sm">
                  <span className="mr-2 rounded bg-green-500/15 px-1.5 py-0.5 text-xs font-semibold text-green-300">
                    {e.method}
                  </span>
                  {e.path}
                </code>
                <p className="mt-2 text-sm text-neutral-400">{e.text}</p>
              </li>
            ))}
          </ul>
          <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-neutral-950 p-5 font-mono text-xs leading-relaxed text-neutral-300">
            {example}
          </pre>
        </div>
      </Section>

      <Section
        id="services"
        title="Services"
        description="How the platform is split. Each service is owned by a Dijkstra team."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.name}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-500">
                    {s.kind}
                  </p>
                  <h3 className="mt-1 font-semibold">{s.name}</h3>
                </div>
                {s.repo ? (
                  <a
                    href={s.repo}
                    aria-label={`${s.name} repository`}
                    className="text-neutral-500 hover:text-white"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                ) : (
                  <Lock
                    className="h-4 w-4 text-neutral-600"
                    aria-label="Repository not public"
                  />
                )}
              </div>
              <p className="mt-2 flex-1 text-sm text-neutral-400">{s.text}</p>
              <p className="mt-4 font-mono text-xs text-green-300/80">
                {s.stack}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-neutral-500">
          Architecture details, local setup and deployment guides are in the{" "}
          <a
            href={`${siteConfig.docsUrl}/dijkstra-introduction/projects-and-architecture/`}
            className="text-green-400 hover:underline"
          >
            docs
          </a>
          .
        </p>
      </Section>

      <CtaBand
        title="Pick a service and start contributing"
        primary={{ label: "Explore the teams", href: "/team" }}
        secondary={{ label: "Knowledge base", href: "/knowledge-base" }}
      />
    </PageShell>
  );
}
