import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Notable changes across the Dijkstra platform and its services.",
};

const entries = [
  {
    title: "Website",
    tag: "Landing page",
    items: [
      "A live product preview replaces the static screenshot in the hero.",
      "Streaming feature showcase with an honest status for every feature.",
      "Teams and members from the Dijkstra-Edu GitHub organisation, with a public Teams API.",
      "Pages for every product, plus pricing, roadmap, blog, press, partners, legal and more.",
      "Faster, offline-safe builds with bundled fonts and no hydration errors.",
    ],
  },
  {
    title: "Platform milestones (roadmap update, May 2026)",
    tag: "Platform",
    items: [
      "Dijkstra Intelligence v1: chat, conversation history and streaming for Dijkstra GPT.",
      "Hodor v1: session authentication and proxying to backend services.",
      "Helios v1: basic scoring, XP and tiers; AI grading of projects.",
      "GitRipper: GitHub data fetching and synchronisation.",
      "Blog: the public blog frontend.",
    ],
  },
  {
    title: "Foundations",
    tag: "Platform",
    items: [
      "Guided onboarding for GitHub, Git, VS Code, Discord, LeetCode and LinkedIn.",
      "Profiles and portfolio with nine editable sections backed by Dataforge.",
      "Resume & CV builder with a LaTeX preview.",
      "Opportunities board for projects, fellowships and jobs.",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Changelog"
        title="What's new"
        description={
          <>
            Notable changes across Dijkstra. Every service publishes its
            detailed history on{" "}
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
      <Section className="pt-0 md:pt-0">
        <ol className="relative max-w-3xl space-y-10 border-l border-white/10 pl-8">
          {entries.map((entry) => (
            <li key={entry.title} className="relative">
              <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-black bg-green-500" />
              <span className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-neutral-400">
                {entry.tag}
              </span>
              <h2 className="mt-2 text-xl font-semibold">{entry.title}</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-300 marker:text-green-500">
                {entry.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>
    </PageShell>
  );
}
