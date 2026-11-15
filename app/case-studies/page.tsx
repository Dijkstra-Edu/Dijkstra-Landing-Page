import type { Metadata } from "next";
import Image from "next/image";
import { Quote } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { CtaBand } from "@/components/site/cta-band";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Stories from Dijkstra members who learned by building real software in Dijkstra's teams.",
};

const stories = [
  {
    name: "Neha Amin",
    role: "Aspiring Software Engineer",
    image: "/neha.jpg",
    teams: ["Resume and CV Builder", "Blog system", "Dijkstra GPT"],
    before: "Avoided anything to do with APIs or development.",
    after:
      "Integrated backend APIs into the resume builder and worked on guardrails for Dijkstra GPT.",
    quote:
      "As someone who ran away at the first mention of an API call or development, to actually enjoying the process of building your ideas into a software solution â€” Dijkstra has been that experience that helped me overcome my fears.",
  },
  {
    name: "Abdul Wahab",
    role: "Aspiring Software Engineer",
    image: "/abdul.jpg",
    teams: ["Resume and CV Builder", "Blog system"],
    before: "Wanted real backend experience but had no way in.",
    after:
      "Worked on backend integration for the resume builder and joined the blog system team.",
    quote:
      "I always wanted to explore real backend development, and Dijkstra gave me that chance. I not only learned the technical side but also how to approach problems logically. This experience has boosted my confidence to take on bigger backend challenges.",
  },
  {
    name: "Nishita Daryn",
    role: "Aspiring Medical Engineer",
    image: "/nishita.jpg",
    teams: ["Certificate Generator"],
    before: "A non-CS major, intimidated by open source.",
    after:
      "Built frontend pieces of the statistics dashboard for the certificate generator.",
    quote:
      "As a non-CS major, I was initially intimidated by the idea of contributing to an open-source project. However, Dijkstra's supportive community and structured approach made it accessible and enjoyable.",
  },
];

export default function CaseStudiesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Case studies"
        title="Learning by building"
        description="Dijkstra members learn the way engineers do: by shipping real features in a team. Here is what that looks like for some of them."
      />
      <Section>
        <div className="space-y-6">
          {stories.map((story) => (
            <article
              key={story.name}
              className="grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 md:grid-cols-[auto_1fr]"
            >
              <div className="flex items-center gap-4 md:flex-col md:items-start">
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl md:h-28 md:w-28">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{story.name}</h2>
                  <p className="text-sm text-neutral-400">{story.role}</p>
                </div>
              </div>
              <div>
                <blockquote className="relative text-lg leading-relaxed text-neutral-200">
                  <Quote className="mb-2 h-6 w-6 text-green-500" aria-hidden />
                  {story.quote}
                </blockquote>
                <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-neutral-500">
                      Before
                    </dt>
                    <dd className="mt-1 text-sm text-neutral-300">
                      {story.before}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-neutral-500">
                      With Dijkstra
                    </dt>
                    <dd className="mt-1 text-sm text-neutral-300">
                      {story.after}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-neutral-500">
                      Teams
                    </dt>
                    <dd className="mt-1 flex flex-wrap gap-1.5">
                      {story.teams.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-neutral-300"
                        >
                          {t}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand
        title="Write your own story"
        primary={{ label: "Join a team", href: "/team" }}
      />
    </PageShell>
  );
}
