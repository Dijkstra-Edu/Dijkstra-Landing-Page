import type { Metadata } from "next";
import { CheckCircle2, CircleDashed, Clock, Sparkles } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { CtaBand } from "@/components/site/cta-band";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Product Roadmap",
  description:
    "What Dijkstra has shipped, what the teams are building now, and what comes next.",
};

type Column = {
  title: string;
  description: string;
  icon: typeof Clock;
  tone: string;
  items: { title: string; text: string; area: string }[];
};

const columns: Column[] = [
  {
    title: "Recently shipped",
    description: "Available in the codebase today.",
    icon: CheckCircle2,
    tone: "text-green-400",
    items: [
      {
        area: "Dijkstra Web",
        title: "Guided onboarding",
        text: "GitHub, Git, VS Code, Discord, LeetCode and LinkedIn setup with guides.",
      },
      {
        area: "Dijkstra Web Â· Dataforge",
        title: "Profiles & portfolio",
        text: "Nine profile sections with full create, edit and delete support.",
      },
      {
        area: "Dijkstra Intelligence",
        title: "Dijkstra GPT v1",
        text: "Scoped chat with streaming, conversation history and metric tools.",
      },
      {
        area: "Helios",
        title: "Ranking v1",
        text: "XP scoring and tiers, plus AI analysis of projects with helios-ai.",
      },
      {
        area: "GitRipper",
        title: "GitHub statistics sync",
        text: "Bulk import on onboarding, webhooks and scheduled syncs with Temporal.",
      },
      {
        area: "Hodor",
        title: "API gateway v1",
        text: "Session authentication and proxying to the backend services.",
      },
      {
        area: "Blog Â· Archivist",
        title: "Blog site & API",
        text: "A public blog and a Go service for blog CRUD and search.",
      },
      {
        area: "Landing page",
        title: "Live teams",
        text: "Every GitHub team and its members on the website.",
      },
    ],
  },
  {
    title: "Now",
    description: "What the teams are building at the moment.",
    icon: Clock,
    tone: "text-amber-300",
    items: [
      {
        area: "Dijkstra Web",
        title: "Live stats & rank on the dashboard",
        text: "Wiring the dashboard to GitRipper statistics and Helios ranks.",
      },
      {
        area: "Dijkstra Intelligence",
        title: "Context-aware GPT",
        text: "Better context handling and routing for personalised answers.",
      },
      {
        area: "Archivist",
        title: "Posts & automatic blogs",
        text: "Posts and a home feed, and LeetCode solutions published as blog posts.",
      },
      {
        area: "HQ Â· Dataforge",
        title: "Opportunities administration",
        text: "Creating jobs, fellowships and projects from HQ, company and university dashboards.",
      },
      {
        area: "Hodor",
        title: "Authorisation & API keys",
        text: "Roles and scopes, service and user API keys.",
      },
      {
        area: "Dijkstra Web",
        title: "Teams & task management",
        text: "A team and project viewer and personal goal tracking.",
      },
    ],
  },
  {
    title: "Next",
    description: "Preparing Dijkstra for open-source programmes such as GSoC.",
    icon: Sparkles,
    tone: "text-sky-300",
    items: [
      {
        area: "Dijkstra Web",
        title: "Challenges",
        text: "Quizzes, weekly challenges, hackathons and bounties.",
      },
      {
        area: "Learning Hub",
        title: "Learning paths",
        text: "Fundamentals, development and theory, with retrieval for Dijkstra GPT.",
      },
      {
        area: "HQ",
        title: "Admin & monitoring",
        text: "An admin dashboard with monitoring for every service.",
      },
      {
        area: "Quality",
        title: "Testing framework",
        text: "Test coverage and QA gates across the application suite.",
      },
      {
        area: "Mobile",
        title: "Android & iOS apps",
        text: "Mobile apps that mirror the web platform.",
      },
    ],
  },
  {
    title: "Later",
    description: "Making Dijkstra sustainable.",
    icon: CircleDashed,
    tone: "text-neutral-400",
    items: [
      {
        area: "Organisations",
        title: "University & company programmes",
        text: "Licensed dashboards and hiring programmes.",
      },
      {
        area: "Platform",
        title: "Verifications engine",
        text: "Verifying contributions and credentials end to end.",
      },
      {
        area: "Dataforge",
        title: "Certificates & transcripts",
        text: "Documents backed by proof of work, with a public QR-linked profile.",
      },
      {
        area: "Extensions",
        title: "Profile autofill extension",
        text: "A browser extension that fills applications from your Dijkstra profile.",
      },
    ],
  },
];

export default function RoadmapPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Roadmap"
        title="What we are building"
        description={
          <>
            Dijkstra ships in the open. This roadmap follows the plan agreed by
            the core team and is updated as work lands; day-to-day progress
            lives on{" "}
            <a
              href={siteConfig.links.github}
              className="text-green-400 hover:underline"
            >
              GitHub
            </a>
            .
          </>
        }
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col">
              <div className="mb-4 flex items-center gap-2">
                <column.icon className={cn("h-5 w-5", column.tone)} />
                <h2 className="text-lg font-semibold">{column.title}</h2>
                <span className="ml-auto rounded-md bg-white/5 px-1.5 text-xs tabular-nums text-neutral-400">
                  {column.items.length}
                </span>
              </div>
              <p className="mb-4 text-sm text-neutral-500">
                {column.description}
              </p>
              <ul className="space-y-3">
                {column.items.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-500">
                      {item.area}
                    </p>
                    <h3 className="mt-1 font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand
        title="Want to build one of these?"
        description="Every item on this roadmap is built by a Dijkstra team. Pick one and help ship it."
        primary={{ label: "Explore the teams", href: "/team" }}
        secondary={{ label: "See the changelog", href: "/changelog" }}
      />
    </PageShell>
  );
}
