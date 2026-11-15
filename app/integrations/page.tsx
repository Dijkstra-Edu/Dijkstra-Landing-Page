import type React from "react";
import type { Metadata } from "next";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandMedium,
  IconBrandVscode,
} from "@tabler/icons-react";
import { Code2, GitBranch, Sparkles } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { CtaBand } from "@/components/site/cta-band";
import { StatusBadge } from "@/components/features/status-badge";
import type { FeatureStatus } from "@/content/features";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "The tools Dijkstra connects to: GitHub, LeetCode, LinkedIn, Discord, Git, VS Code, Google Gemini and more.",
};

const guide = (tool: string) =>
  `${siteConfig.docsUrl}/getting-started/onboarding/guides/${tool}/`;

const integrations: {
  name: string;
  icon: React.ReactNode;
  status: FeatureStatus;
  description: string;
  uses: string[];
  href: string;
}[] = [
  {
    name: "GitHub",
    icon: <IconBrandGithub className="h-6 w-6" />,
    status: "live",
    description:
      "Sign in with GitHub. Your public activity powers your dashboard and rank, and Dijkstra teams are GitHub teams.",
    uses: [
      "Sign-in",
      "Commit history & repository stats",
      "Teams and project access",
    ],
    href: guide("github"),
  },
  {
    name: "LeetCode",
    icon: <Code2 className="h-6 w-6" />,
    status: "live",
    description:
      "Connect your LeetCode username to track problems solved by difficulty and contest performance.",
    uses: ["Problem statistics", "Daily tasks", "Ranking signal"],
    href: guide("leetcode"),
  },
  {
    name: "LinkedIn",
    icon: <IconBrandLinkedin className="h-6 w-6" />,
    status: "beta",
    description:
      "Link your LinkedIn profile to keep your professional presence in sync with your progress.",
    uses: ["Profile linking", "Experience & education", "Visibility"],
    href: guide("linkedin"),
  },
  {
    name: "Discord",
    icon: <IconBrandDiscord className="h-6 w-6" />,
    status: "live",
    description:
      "The community lives on Discord: team channels, help, events and mentorship.",
    uses: ["Community & help", "Team channels", "Role sync (planned)"],
    href: guide("discord"),
  },
  {
    name: "Git",
    icon: <GitBranch className="h-6 w-6" />,
    status: "live",
    description:
      "Onboarding makes sure you can branch, commit and open pull requests like a working engineer.",
    uses: ["Onboarding guide", "Contribution workflow"],
    href: guide("git"),
  },
  {
    name: "VS Code",
    icon: <IconBrandVscode className="h-6 w-6" />,
    status: "live",
    description:
      "A recommended editor setup so every contributor starts from the same baseline.",
    uses: ["Onboarding guide", "Recommended setup"],
    href: guide("vscode"),
  },
  {
    name: "Google Gemini",
    icon: <Sparkles className="h-6 w-6" />,
    status: "beta",
    description:
      "The language model behind Dijkstra GPT and the AI project analysis in Helios.",
    uses: ["Dijkstra GPT", "AI project review"],
    href: "/products/dijkstra-gpt",
  },
  {
    name: "Medium",
    icon: <IconBrandMedium className="h-6 w-6" />,
    status: "planned",
    description:
      "Cross-posting articles from the Dijkstra Blog to Medium for wider reach.",
    uses: ["Blog cross-posting"],
    href: "/products/blog",
  },
];

export default function IntegrationsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Integrations"
        title="Works with the tools you already use"
        description="Dijkstra does not replace GitHub, LeetCode or LinkedIn â€” it connects them, so your work in each one counts towards the same goal."
      />
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {integrations.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-neutral-200">
                  {item.icon}
                </span>
                <StatusBadge status={item.status} />
              </div>
              <h2 className="mt-4 font-semibold group-hover:text-green-300">
                {item.name}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-400">
                {item.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {item.uses.map((u) => (
                  <li
                    key={u}
                    className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-neutral-400"
                  >
                    {u}
                  </li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </Section>
      <CtaBand
        title="Missing an integration?"
        description="Integrations are built by Dijkstra's teams. Suggest one on Discord, or build it with us."
        primary={{ label: "Explore the teams", href: "/team" }}
      />
    </PageShell>
  );
}
