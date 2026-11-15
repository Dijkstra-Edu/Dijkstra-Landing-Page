import type { Metadata } from "next";
import { BookOpen, Code2, LifeBuoy, Rocket, Server, Users } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Knowledge base",
  description:
    "Guides for getting started, contributing, running Dijkstra's services and fixing common issues.",
};

const d = (slug: string) => `${siteConfig.docsUrl}/${slug}/`;

const sections = [
  {
    icon: Rocket,
    title: "Getting started",
    links: [
      ["Start here", d("getting-started/start-here")],
      ["Onboarding steps", d("getting-started/onboarding/onboarding")],
      ["Set up GitHub", d("getting-started/onboarding/guides/github")],
      ["Set up Git", d("getting-started/onboarding/guides/git")],
      ["Set up VS Code", d("getting-started/onboarding/guides/vscode")],
      ["Join Discord", d("getting-started/onboarding/guides/discord")],
      ["Connect LeetCode", d("getting-started/onboarding/guides/leetcode")],
      ["Connect LinkedIn", d("getting-started/onboarding/guides/linkedin")],
      ["Join Dijkstra", d("getting-started/onboarding/join-djikstra")],
    ],
  },
  {
    icon: Code2,
    title: "Contributing",
    links: [
      ["Prerequisites", d("getting-started/contributors/prerequisistes")],
      [
        "Contribution guidelines",
        d("getting-started/contributors/contribution-guidelines"),
      ],
      [
        "Architectural guidelines",
        d("getting-started/contributors/architectural-guidelines"),
      ],
      [
        "Coding conventions",
        d("getting-started/contributors/coding-conventions"),
      ],
      [
        "Stylistic guidelines",
        d("getting-started/contributors/stylistic-guidelines"),
      ],
      ["Process", d("getting-started/contributors/process")],
      [
        "Set up your environment",
        d("getting-started/contributors/examples/how-to-setup-environment"),
      ],
    ],
  },
  {
    icon: Server,
    title: "Platform & services",
    links: [
      [
        "Projects and architecture",
        d("dijkstra-introduction/projects-and-architecture"),
      ],
      ["Dijkstra Web", d("dijkstra-frontends/dijkstra-web/introduction")],
      ["Dataforge", d("dijkstra-backend/dataforge/introduction")],
      ["GitRipper", d("dijkstra-backend/gitripper/introduction")],
      ["Helios", d("dijkstra-backend/helios/introduction")],
      ["Dijkstra Blog", d("dijkstra-frontends/dijkstra-blog/introduction")],
      ["Databases", d("dijkstra-databases/overview")],
    ],
  },
  {
    icon: LifeBuoy,
    title: "Troubleshooting",
    links: [
      ["Common issues", d("faqs/common-issues")],
      ["Typical Git errors", d("faqs/typical-git-errors")],
      ["Links and discussions", d("faqs/links-discussions")],
    ],
  },
  {
    icon: Users,
    title: "Maintainers",
    links: [
      [
        "Maintenance guidelines",
        d("getting-started/maintainers/maintenance-guidelines"),
      ],
      [
        "How to review PRs",
        d("getting-started/maintainers/examples-and-cases/how-to-review-prs"),
      ],
      [
        "Issue management",
        d("getting-started/maintainers/examples-and-cases/issue-management"),
      ],
    ],
  },
  {
    icon: BookOpen,
    title: "Community",
    links: [
      ["Code of conduct", d("community/code-of-conduct")],
      ["Governance", d("community/governance")],
      ["Contributor agreement", d("community/contributor-agreements")],
      ["GSoC 2026", d("gsoc-2026/overview")],
    ],
  },
];

export default function KnowledgeBasePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Knowledge base"
        title="Guides and answers"
        description="The Dijkstra docs cover everything from your first Git commit to running the backend locally. Start with the section that matches what you need."
      />
      <Section className="pt-0 md:pt-0">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <s.icon className="h-6 w-6 text-green-500" />
              <h2 className="mt-4 text-lg font-semibold">{s.title}</h2>
              <ul className="mt-4 space-y-1">
                {s.links.map(([label, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="block rounded-md py-1 text-sm text-neutral-400 hover:text-green-300"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
