import type { Metadata } from "next";
import {
  Boxes,
  Building2,
  FolderGit2,
  Layers,
  MessageSquare,
  Rocket,
  Ticket,
  Users,
} from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import {
  TeamExplorer,
  TeamsSourceBadge,
} from "@/components/teams/team-explorer";
import { PeopleWall } from "@/components/teams/people-wall";
import { getTeamsSnapshot } from "@/lib/teams";
import { docsLinks, platformLinks, siteConfig } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Teams",
  description:
    "How Dijkstra is organised: departments, groups, teams and projects â€” and the people in them, straight from the Dijkstra-Edu GitHub organisation.",
};

const levels = [
  {
    icon: Building2,
    name: "Department",
    example: "Engineering & Technical Teams",
    text: "The broadest split: engineering, non-engineering, mentors and the organisation team.",
  },
  {
    icon: Layers,
    name: "Group / Sub-group",
    example: "AI & ML Engineering",
    text: "A discipline inside a department, such as software infrastructure or design.",
  },
  {
    icon: Users,
    name: "Team",
    example: "Frontend (FE)",
    text: "A track you grow in. Teams mirror the career paths you pick on Dijkstra Web.",
  },
  {
    icon: FolderGit2,
    name: "Project",
    example: "Resume and CV Builder",
    text: "The smallest unit, where the actual work ships â€” usually one service or feature.",
  },
];

const joinSteps = [
  {
    icon: Rocket,
    title: "Complete onboarding",
    text: "Set up GitHub, Git, VS Code, Discord, LeetCode and LinkedIn on Dijkstra Web.",
    href: platformLinks.onboarding,
    cta: "Start onboarding",
  },
  {
    icon: MessageSquare,
    title: "Say hi on Discord",
    text: "Introduce yourself and tell us which track you are interested in.",
    href: siteConfig.links.discord,
    cta: "Join Discord",
  },
  {
    icon: Boxes,
    title: "Pick a team",
    text: "Choose a team above â€” open teams are a great place to make an impact early.",
    href: docsLinks.joinDijkstra,
    cta: "Joining guide",
  },
  {
    icon: Ticket,
    title: "Ship your first issue",
    text: "A mentor points you to a good first issue and reviews your pull request.",
    href: docsLinks.contributing,
    cta: "Contribution guidelines",
  },
];

export default async function TeamPage() {
  const teams = await getTeamsSnapshot();
  const { stats } = teams;
  const figures: [string, number][] = [
    ["Departments", stats.departments],
    ["Groups", stats.groups],
    ["Teams", stats.teams],
    ["Projects", stats.projects],
    ...(stats.people !== null
      ? ([["People", stats.people]] as [string, number][])
      : []),
    ["Open teams", stats.openTeams],
  ];

  return (
    <PageShell>
      <PageHero
        eyebrow="Teams"
        title="How Dijkstra is organised"
        description={
          <>
            Dijkstra works like a real engineering organisation, run by
            students. Every team below is a GitHub team in the{" "}
            <a
              href={siteConfig.links.github}
              className="text-green-400 underline-offset-4 hover:underline"
            >
              {teams.org}
            </a>{" "}
            organisation, so membership here is the same membership that grants
            access to repositories, project boards and reviews.
          </>
        }
      >
        <TeamsSourceBadge snapshot={teams} />
      </PageHero>

      <div className="container mx-auto space-y-20 px-4 pb-24 md:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {figures.map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <dt className="text-xs text-neutral-500">{label}</dt>
              <dd className="mt-1 text-3xl font-semibold tabular-nums">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <section aria-labelledby="levels-heading">
          <h2
            id="levels-heading"
            className="mb-6 text-2xl font-bold sm:text-3xl"
          >
            From department to project
          </h2>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {levels.map((level, i) => (
              <li
                key={level.name}
                className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <span className="absolute right-4 top-4 font-mono text-xs text-neutral-600">
                  0{i + 1}
                </span>
                <level.icon className="h-6 w-6 text-green-500" />
                <h3 className="mt-4 font-semibold">{level.name}</h3>
                <p className="mt-1 text-xs text-neutral-500">
                  e.g. {level.example}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                  {level.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="explorer-heading">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2
              id="explorer-heading"
              className="text-2xl font-bold sm:text-3xl"
            >
              Explore every team
            </h2>
            <p className="text-sm text-neutral-500">
              Use the arrow keys to move through the tree.
            </p>
          </div>
          <TeamExplorer snapshot={teams} variant="full" />
        </section>

        {teams.people.length > 0 && (
          <section aria-label="People">
            <PeopleWall snapshot={teams} />
          </section>
        )}

        <section
          aria-labelledby="join-heading"
          className="rounded-3xl border border-green-500/20 bg-gradient-to-br from-green-950/60 via-black to-black p-6 sm:p-10"
        >
          <h2 id="join-heading" className="text-2xl font-bold sm:text-3xl">
            Join a team
          </h2>
          <p className="mt-2 max-w-2xl text-neutral-400">
            Anyone can join. You learn by shipping real features with code
            review and mentors â€” and everything you build becomes public proof
            of work.
          </p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {joinSteps.map((step, i) => (
              <li
                key={step.title}
                className="flex flex-col rounded-2xl border border-white/10 bg-black/40 p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm font-semibold">
                    {i + 1}
                  </span>
                  <step.icon className="h-5 w-5 text-green-400" />
                </div>
                <h3 className="mt-4 font-semibold">{step.title}</h3>
                <p className="mt-2 flex-1 text-sm text-neutral-400">
                  {step.text}
                </p>
                <a
                  href={step.href}
                  className="mt-4 text-sm font-medium text-green-400 hover:text-green-300"
                >
                  {step.cta} â†’
                </a>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </PageShell>
  );
}
