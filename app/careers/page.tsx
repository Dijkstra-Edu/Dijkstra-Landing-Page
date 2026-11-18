import type { Metadata } from "next";
import { ArrowRight, Info } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { LinkCard } from "@/components/site/link-card";
import { CtaBand } from "@/components/site/cta-band";
import { docsLinks, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Grow your career with Dijkstra: join an engineering or non-engineering track, ship real software with mentors and progress from intern to team lead.",
};

const ladder = [
  {
    title: "Intern",
    text: "Everyone starts here: onboarding, first issues, learning the codebase.",
  },
  { title: "SDE-1", text: "Own small features end to end with code review." },
  {
    title: "SDE-2",
    text: "Design and deliver larger pieces; review others' work.",
  },
  { title: "SDE-3", text: "Drive a project's technical direction." },
  { title: "Lead", text: "Lead a team, mentor members and shape the roadmap." },
];

const tracks = [
  {
    title: "Software development",
    text: "Frontend, backend, full stack, mobile, PC apps, game dev and systems.",
  },
  {
    title: "AI & ML",
    text: "ML engineering, research, data engineering and data science.",
  },
  {
    title: "Infrastructure",
    text: "DevOps, cloud, CI/CD, MLOps and site reliability.",
  },
  {
    title: "Security & quality",
    text: "Application and platform security, DevSecOps, QA and test automation.",
  },
  {
    title: "Design & product",
    text: "UI/UX, product design, business analysis and product management.",
  },
  {
    title: "Writing & outreach",
    text: "Technical writing, documentation, content and community.",
  },
];

export default function CareersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Careers"
        title="Grow your career by building Dijkstra"
        description="Dijkstra works like an engineering company. Pick a track, join a team, ship real software with mentors and progress from intern to lead â€” with every step visible as proof of work."
      >
        <p className="inline-flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-neutral-300">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
          Dijkstra is a volunteer-run open-source project: roles are
          contribution-based, not paid employment.
        </p>
      </PageHero>

      <Section
        title="Tracks"
        description="Every track maps to real teams in the Dijkstra-Edu GitHub organisation."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((t) => (
            <div
              key={t.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <h3 className="font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {t.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="How you grow"
        description="Designations reflect your rank and your work; your mentor signs you off for the next level."
      >
        <ol className="grid gap-3 md:grid-cols-5">
          {ladder.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <span className="font-mono text-xs text-green-400">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {step.text}
              </p>
              {i < ladder.length - 1 && (
                <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-neutral-600 md:block" />
              )}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Ways in">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <LinkCard
            href="/team"
            title="Join a team"
            description="Browse every team â€” open teams are looking for their first members."
          />
          <LinkCard
            href={`${siteConfig.docsUrl}/gsoc-2026/overview/`}
            title="Google Summer of Code"
            description="Dijkstra aims to mentor GSoC 2026 contributors. See the project ideas and how to apply."
          />
          <LinkCard
            href={docsLinks.contributing}
            title="Contribute code"
            description="Read the contribution guidelines and pick a good first issue."
          />
        </div>
      </Section>

      <CtaBand
        title="Start as an intern today"
        description="Complete onboarding, say hi on Discord and pick your first issue."
      />
    </PageShell>
  );
}
