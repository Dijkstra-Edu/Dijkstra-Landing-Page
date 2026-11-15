import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { LinkCard } from "@/components/site/link-card";
import { CtaBand } from "@/components/site/cta-band";
import { StatusBadge } from "@/components/features/status-badge";
import {
  allFeatures,
  statusLabel,
  type Feature,
  type FeatureStatus,
} from "@/content/features";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Every Dijkstra feature â€” proof-of-work dashboard, Helios ranking, Dijkstra GPT, resume builder, opportunities, blog, teams and more â€” with an honest status for each.",
};

const groups: { title: string; description: string; slugs: string[] }[] = [
  {
    title: "Track & grow",
    description: "See where you stand and what to do next.",
    slugs: ["dashboard", "ranking", "dijkstra-gpt"],
  },
  {
    title: "Build & get hired",
    description: "Turn your work into documents, posts and opportunities.",
    slugs: ["resume-builder", "opportunities", "blog", "teams"],
  },
  {
    title: "Foundations",
    description: "The support around it all.",
    slugs: [
      "onboarding",
      "mentorship",
      "open-source",
      "certificates",
      "learning-hub",
      "mobile",
    ],
  },
];

const legend: { status: FeatureStatus; text: string }[] = [
  { status: "live", text: "Available on the platform today." },
  {
    status: "beta",
    text: "Usable, still being wired to every backend service.",
  },
  {
    status: "in-development",
    text: "Being built by a Dijkstra team right now.",
  },
  { status: "planned", text: "On the roadmap, not started yet." },
];

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <LinkCard
      href={feature.href}
      icon={
        <span
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl bg-white/5",
            feature.accent,
          )}
        >
          <feature.icon className="h-5 w-5" />
        </span>
      }
      title={feature.name}
      description={feature.description}
      meta={
        <span className="flex flex-wrap items-center gap-2">
          <StatusBadge status={feature.status} />
          <span>{feature.services.join(" Â· ")}</span>
        </span>
      }
    />
  );
}

export default function FeaturesPage() {
  const bySlug = new Map(allFeatures.map((f) => [f.slug, f]));
  return (
    <PageShell>
      <PageHero
        eyebrow="Features"
        title="Everything your preparation needs"
        description="Dijkstra brings tracking, ranking, mentoring, documents and opportunities together â€” and gives you a real team to grow in. Every feature carries an honest status, because it is built in the open by students."
      >
        <ul className="grid gap-2 sm:grid-cols-2">
          {legend.map((item) => (
            <li
              key={item.status}
              className="flex items-center gap-3 text-sm text-neutral-400"
            >
              <StatusBadge status={item.status} />
              <span>
                <span className="sr-only">{statusLabel[item.status]}: </span>
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </PageHero>

      {groups.map((group) => (
        <Section
          key={group.title}
          title={group.title}
          description={group.description}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.slugs.map((slug) => {
              const feature = bySlug.get(slug);
              return feature ? (
                <FeatureCard key={slug} feature={feature} />
              ) : null;
            })}
          </div>
        </Section>
      ))}

      <CtaBand />
    </PageShell>
  );
}
