import type { Metadata } from "next";
import { Download } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { PostCard } from "@/components/blog/post-card";
import { posts } from "@/content/blog";
import { getTeamsSnapshot } from "@/lib/teams";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Press",
  description:
    "Press kit for Dijkstra: boilerplate, facts, brand assets and media contacts.",
};

const assets = [
  { name: "Logo mark (PNG, 500Ã—500)", src: "/icon.png", preview: "bg-black" },
  {
    name: "Logo mark, splash (PNG)",
    src: "/splash-icon.png",
    preview: "bg-black",
  },
  {
    name: "Product screenshot: dashboard",
    src: "/dashboard.png",
    preview: "bg-neutral-900",
  },
  {
    name: "Product screenshot: Dijkstra GPT",
    src: "/dijkstra-gpt.png",
    preview: "bg-neutral-900",
  },
];

export default async function PressPage() {
  const { stats } = await getTeamsSnapshot();
  const facts = [
    ["Founded", "2023"],
    ["Model", "Open source, student-run"],
    ["Licence", "Apache License 2.0"],
    [
      "Teams",
      `${stats.departments} departments Â· ${stats.groups + stats.teams} groups and teams Â· ${stats.projects} projects`,
    ],
    ["Focus", "Industry readiness for CS students through proof of work"],
    ["Website", siteConfig.url.replace(/^https?:\/\//, "")],
  ];
  return (
    <PageShell>
      <PageHero
        eyebrow="Press"
        title="Press kit"
        description="Everything you need to write about Dijkstra. For interviews and questions, contact us and choose â€œPressâ€."
      >
        <a
          href="/contact?topic=press"
          className="inline-flex items-center rounded-lg bg-green-700 px-5 py-2.5 font-medium text-white hover:bg-green-600"
        >
          Contact the team
        </a>
      </PageHero>

      <Section title="About Dijkstra">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-sm font-medium text-neutral-400">Short</h3>
            <p className="mt-3 leading-relaxed text-neutral-200">
              Dijkstra is an open-source, student-run platform that helps
              aspiring software engineers prepare for jobs in tech through
              visible proof of work.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-sm font-medium text-neutral-400">Long</h3>
            <p className="mt-3 leading-relaxed text-neutral-200">
              Dijkstra is an open-source organisation built by and for students.
              Its platform aggregates a student&apos;s activity across GitHub,
              LeetCode and LinkedIn, ranks it with the Helios ranking service,
              mentors students with Dijkstra GPT and connects them with
              projects, fellowships and jobs. Members also join real engineering
              and non-engineering teams to build Dijkstra itself â€” an
              apprenticeship that gives students from Tier-2 and Tier-3 colleges
              the experience and visibility usually reserved for premier
              institutes.
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="news"
        title="Recent news"
        description="Announcements and explainers from the Dijkstra blog."
      >
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post.slug} post={post} tone="dark" />
          ))}
        </div>
      </Section>

      <Section title="Facts">
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map(([k, v]) => (
            <div
              key={k}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <dt className="text-xs uppercase tracking-wider text-neutral-500">
                {k}
              </dt>
              <dd className="mt-1 font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        title="Brand assets"
        description="Use the mark on dark backgrounds. Please do not alter, recolour or stretch it."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {assets.map((a) => (
            <a
              key={a.src}
              href={a.src}
              download
              className="group overflow-hidden rounded-2xl border border-white/10 transition-colors hover:border-white/25"
            >
              <div
                className={`flex aspect-video items-center justify-center ${a.preview}`}
              >
                <img
                  src={a.src}
                  alt=""
                  className="max-h-[70%] max-w-[80%] object-contain"
                />
              </div>
              <div className="flex items-center justify-between gap-2 p-4 text-sm">
                <span className="text-neutral-300">{a.name}</span>
                <Download className="h-4 w-4 shrink-0 text-neutral-500 group-hover:text-green-400" />
              </div>
            </a>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {[
            ["Dijkstra green", "#048304"],
            ["Black", "#000000"],
            ["White", "#FFFFFF"],
          ].map(([name, hex]) => (
            <div
              key={hex}
              className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-2"
            >
              <span
                className="h-6 w-6 rounded-md border border-white/20"
                style={{ backgroundColor: hex }}
              />
              <span className="text-sm">
                {name} <span className="font-mono text-neutral-500">{hex}</span>
              </span>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
