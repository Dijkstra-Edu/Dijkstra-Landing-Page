import type { Metadata } from "next";
import {
  BrainCircuit,
  CheckCircle,
  Eye,
  Github,
  Scale,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { LinkCard } from "@/components/site/link-card";
import { CtaBand } from "@/components/site/cta-band";
import { getTeamsSnapshot } from "@/lib/teams";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Dijkstra is an open-source, student-run organisation helping aspiring software engineers get industry-ready through proof of work.",
};

const principles = [
  {
    icon: Eye,
    title: "Visibility",
    text: "Progress across GitHub, LinkedIn, LeetCode and more, validated as proof of work.",
  },
  {
    icon: BrainCircuit,
    title: "Develop skills",
    text: "DSA, software engineering and systems design through real tasks.",
  },
  {
    icon: CheckCircle,
    title: "Proof of work",
    text: "Growth that is visible â€” and verifiable â€” across platforms.",
  },
  {
    icon: Target,
    title: "Efficiency",
    text: "One project can be a portfolio piece, an article and a research idea.",
  },
  {
    icon: Users,
    title: "Community",
    text: "Give back by writing, coding and mentoring.",
  },
  {
    icon: Workflow,
    title: "Growth mindset",
    text: "Everything leads to something bigger: internships, articles, research.",
  },
];

export default async function AboutPage() {
  const teams = await getTeamsSnapshot();
  const { stats } = teams;
  return (
    <PageShell>
      <PageHero
        eyebrow="About us"
        title="For students, by students"
        description="Dijkstra is an open-source organisation that helps students â€” especially those without strong placement support â€” become industry-ready. Founded in 2023, it is built and run by the students who use it."
      />

      <Section title="What we do">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 text-lg leading-relaxed text-neutral-300">
            <p>
              Dijkstra is a one-stop platform for aspiring software engineers:
              it tracks your progress across platforms, ranks your proof of
              work, mentors you with Dijkstra GPT and connects you to
              opportunities.
            </p>
            <p>
              It is also an apprenticeship. Members join real teams â€” frontend,
              backend, ML, DevOps, security, design and more â€” and build
              Dijkstra itself, with code review and mentors, the way engineers
              work in industry.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-3">
            {[
              ["Departments", stats.departments],
              ["Groups", stats.groups],
              ["Teams", stats.teams],
              ["Projects", stats.projects],
            ].map(([label, value]) => (
              <div
                key={label as string}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <dt className="text-sm text-neutral-500">{label}</dt>
                <dd className="mt-1 text-4xl font-semibold tabular-nums">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section title="Our principles">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <p.icon className="h-6 w-6 text-green-500" />
              <h3 className="mt-4 font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="How we are run">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <Scale className="h-6 w-6 text-green-500" />
            <h3 className="mt-4 font-semibold">Founder-led, maintainer-run</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
              Dijkstra follows a founder-led maintainer model. The Core Systems
              Design Team reviews contributions, manages releases and provides
              technical stewardship.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <Users className="h-6 w-6 text-green-500" />
            <h3 className="mt-4 font-semibold">Decisions in public</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
              Proposals and decisions happen in public channels, and anyone can
              contribute through issues, discussions, documentation, design
              feedback and pull requests.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <Github className="h-6 w-6 text-green-500" />
            <h3 className="mt-4 font-semibold">Open source</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
              The platform&apos;s repositories are public under the Apache
              License 2.0, so every contribution is verifiable proof of work.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Learn more">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <LinkCard
            href="/mission"
            title="Our mission"
            description="Why Dijkstra exists and the problems it solves."
          />
          <LinkCard
            href="/team"
            title="The team"
            description="Every team and member, live from GitHub."
          />
          <LinkCard
            href="/careers"
            title="Careers"
            description="Grow with us through open source."
          />
          <LinkCard
            href={`${siteConfig.docsUrl}/community/governance/`}
            title="Governance"
            description="The full governance document."
          />
        </div>
      </Section>

      <CtaBand />
    </PageShell>
  );
}
