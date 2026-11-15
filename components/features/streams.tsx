"use client";

import type React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Check,
  CheckCircle2,
  Circle,
  Code2,
  Download,
  FileCode2,
  GitMerge,
  Github,
  Heart,
  Linkedin,
  Lock,
  MessageSquare,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/motion/count-up";
import { SvgSparkline } from "@/components/motion/svg-sparkline";
import { activity } from "@/components/showcase/data";
import {
  Shimmer,
  StreamingText,
  type StreamStep,
} from "@/components/streaming/stream-sequence";

/* -------------------------------------------------------------------------- */
/* Dark building blocks                                                       */
/* -------------------------------------------------------------------------- */

function Block({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-neutral-200 sm:p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

function SourceRow({
  icon: Icon,
  name,
  detail,
  iconClass,
}: {
  icon: typeof Github;
  name: string;
  detail: string;
  iconClass?: string;
}) {
  return (
    <Block className="flex items-center gap-3">
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5",
          iconClass,
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-white">{name}</p>
        <p className="truncate text-xs text-neutral-400">{detail}</p>
      </div>
      <span className="inline-flex items-center gap-1 text-xs text-green-400">
        <Check className="h-3.5 w-3.5" /> synced
      </span>
    </Block>
  );
}

function DarkBar({ value, delay = 0 }: { value: number; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-green-600 to-emerald-400"
        initial={{ width: reduceMotion ? `${value}%` : 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.9, delay, ease: "easeOut" }}
      />
    </div>
  );
}

function TierReveal() {
  const reduceMotion = useReducedMotion();
  return (
    <Block className="flex items-center gap-4">
      <div className="relative h-14 w-14 shrink-0">
        <motion.img
          src="/ranks/UNRANKED.png"
          alt=""
          className="absolute inset-0 h-14 w-14"
          initial={{ opacity: reduceMotion ? 0 : 1 }}
          animate={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        />
        <motion.img
          src="/ranks/GOLD_3.png"
          alt="Gold tier badge"
          className="absolute inset-0 h-14 w-14 drop-shadow-[0_0_14px_rgba(245,197,24,0.55)]"
          initial={
            reduceMotion ? false : { opacity: 0, scale: 0.3, rotate: -25 }
          }
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 170,
            damping: 13,
            delay: 0.45,
          }}
        />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-neutral-500">
          Tier assigned
        </p>
        <p className="text-lg font-semibold text-white">Gold Â· Top 12%</p>
      </div>
    </Block>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-neutral-300">
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Streams                                                                    */
/* -------------------------------------------------------------------------- */

const tasks = [
  { label: "Solve 2 medium LeetCode problems", done: true },
  { label: "Push a commit to your current project", done: true },
  { label: "Review one open PR on your team", done: false },
];

const gptAnswer =
  "Use a heap when you only ever need the smallest (or largest) element fast â€” O(1) peek, O(log n) push/pop â€” e.g. top-k or Dijkstra's algorithm. Use a balanced BST when you need ordered traversal, range queries or deleting arbitrary keys.";

const resumeBullets = [
  "Built the resume export flow for the Dijkstra student platform (Next.js, TypeScript).",
  "Cut profile API latency by 38% by batching Dataforge requests with TanStack Query.",
];

const teamPath = [
  { kind: "Dept", label: "Engineering & Technical Teams" },
  { kind: "Group", label: "Software Development Engineering" },
  { kind: "Team", label: "Full Stack Software Dev (FE+BE)" },
  { kind: "Team", label: "Frontend (FE)" },
  { kind: "Project", label: "Resume and CV Builder" },
];

const kindColor: Record<string, string> = {
  Dept: "text-emerald-400",
  Group: "text-sky-400",
  Team: "text-amber-400",
  Project: "text-fuchsia-400",
};

export const streams: Record<string, { command: string; steps: StreamStep[] }> =
  {
    dashboard: {
      command: "aggregate --sources github,leetcode,linkedin",
      steps: [
        {
          id: "github",
          delayMs: 450,
          render: () => (
            <SourceRow
              icon={Github}
              name="GitHub"
              detail="342 commits Â· 27 repositories Â· 9 PRs merged"
            />
          ),
        },
        {
          id: "leetcode",
          delayMs: 500,
          render: () => (
            <SourceRow
              icon={Code2}
              name="LeetCode"
              detail="220 solved Â· 112 easy Â· 86 medium Â· 22 hard"
              iconClass="text-amber-400"
            />
          ),
        },
        {
          id: "linkedin",
          delayMs: 450,
          render: () => (
            <SourceRow
              icon={Linkedin}
              name="LinkedIn"
              detail="Profile synced Â· experience & education imported"
              iconClass="text-sky-400"
            />
          ),
        },
        {
          id: "chart",
          delayMs: 650,
          skeleton: <Shimmer className="h-24 w-full" />,
          render: () => (
            <Block>
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Activity Â· last 6 weeks</span>
                <span className="text-green-400">+18%</span>
              </div>
              <div className="mt-2 h-16">
                <SvgSparkline
                  values={activity.map((d) => d.LeetCode + d.GitHub)}
                  className="h-full w-full"
                />
              </div>
            </Block>
          ),
        },
        {
          id: "tasks",
          delayMs: 600,
          render: () => (
            <Block>
              <p className="mb-2 text-xs text-neutral-400">
                Today&apos;s tasks
              </p>
              <ul className="space-y-1.5">
                {tasks.map((t) => (
                  <li key={t.label} className="flex items-center gap-2">
                    {t.done ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Circle className="h-4 w-4 text-neutral-600" />
                    )}
                    <span
                      className={t.done ? "text-neutral-400 line-through" : ""}
                    >
                      {t.label}
                    </span>
                  </li>
                ))}
              </ul>
            </Block>
          ),
        },
      ],
    },

    ranking: {
      command: "helios score --user aarav-dev",
      steps: [
        {
          id: "signals",
          delayMs: 450,
          skeleton: <Shimmer className="h-32 w-full" />,
          render: () => (
            <Block>
              <p className="mb-3 text-xs text-neutral-400">
                Scoring proof-of-work signals
              </p>
              <div className="space-y-2.5">
                {[
                  ["Open source", 78],
                  ["Projects", 64],
                  ["DSA / LeetCode", 71],
                  ["Work experience", 35],
                  ["Academics", 82],
                ].map(([label, value], i) => (
                  <div
                    key={label as string}
                    className="grid grid-cols-[7rem_1fr_2rem] items-center gap-3 text-xs"
                  >
                    <span className="text-neutral-300">{label}</span>
                    <DarkBar value={value as number} delay={i * 0.12} />
                    <span className="text-right tabular-nums text-neutral-400">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </Block>
          ),
        },
        {
          id: "xp",
          delayMs: 1100,
          render: () => (
            <Block className="flex items-baseline justify-between">
              <span className="text-xs text-neutral-400">Total XP</span>
              <span className="text-2xl font-bold text-white">
                <CountUp value={5120} duration={900} /> XP
              </span>
            </Block>
          ),
        },
        { id: "tier", delayMs: 700, render: () => <TierReveal /> },
        {
          id: "next",
          delayMs: 1000,
          render: () => (
            <Block className="text-xs text-neutral-300">
              <span className="font-medium text-white">Next: Platinum</span> â€”
              880 XP to go. Fastest path: merge 2 PRs and solve 10 medium
              problems.
            </Block>
          ),
        },
      ],
    },

    "dijkstra-gpt": {
      command: "gpt chat --context metrics",
      steps: [
        {
          id: "prompt",
          delayMs: 350,
          render: () => (
            <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-tr-sm bg-white px-3 py-2 text-sm text-neutral-900">
              When should I use a heap instead of a BST?
            </div>
          ),
        },
        {
          id: "answer",
          delayMs: 600,
          render: () => (
            <Block className="leading-relaxed">
              <StreamingText text={gptAnswer} interval={26} />
            </Block>
          ),
        },
        {
          id: "code",
          delayMs: 2300,
          skeleton: <Shimmer className="h-20 w-full" />,
          render: () => (
            <pre className="overflow-x-auto rounded-xl border border-white/10 bg-black p-3 font-mono text-[12px] leading-relaxed text-neutral-300">
              <span className="text-fuchsia-400">import</span> heapq{"\n"}
              <span className="text-neutral-500">
                # top-3 largest in O(n log k)
              </span>
              {"\n"}heapq.<span className="text-sky-400">nlargest</span>(3,
              scores)
            </pre>
          ),
        },
        {
          id: "followups",
          delayMs: 500,
          render: () => (
            <div className="flex flex-wrap gap-2">
              <Chip>
                <Sparkles className="h-3 w-3 text-green-400" /> Show a
                Dijkstra&apos;s algorithm walkthrough
              </Chip>
              <Chip>
                <Sparkles className="h-3 w-3 text-green-400" /> Give me 3 heap
                problems
              </Chip>
            </div>
          ),
        },
      ],
    },

    "resume-builder": {
      command: "resume build --from profile --template ats",
      steps: [
        {
          id: "source",
          delayMs: 400,
          render: () => (
            <Block className="flex flex-wrap gap-2 text-xs">
              <Chip>2 projects</Chip>
              <Chip>1 internship</Chip>
              <Chip>6 verified skills</Chip>
              <Chip>B.Tech CSE Â· 2027</Chip>
            </Block>
          ),
        },
        {
          id: "doc",
          delayMs: 600,
          skeleton: <Shimmer className="h-40 w-full" />,
          render: () => (
            <div className="rounded-xl bg-white p-4 font-serif text-neutral-900 shadow-lg">
              <p className="text-center text-base font-bold tracking-wide">
                AARAV MEHTA
              </p>
              <p className="text-center text-[11px] text-neutral-500">
                github.com/aarav-dev Â· linkedin.com/in/aarav Â· aarav@example.com
              </p>
              <p className="mt-3 border-b border-neutral-300 text-xs font-bold uppercase tracking-wider">
                Experience
              </p>
              <p className="mt-1.5 text-xs font-semibold">
                Frontend Engineer (SDE-1), Dijkstra â€” Open source
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-4 text-[11px] leading-snug">
                {resumeBullets.map((b, i) => (
                  <li key={b}>
                    <StreamingText text={b} interval={22} delay={i * 1300} />
                  </li>
                ))}
              </ul>
            </div>
          ),
        },
        {
          id: "export",
          delayMs: 2900,
          render: () => (
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-neutral-900">
                <Download className="h-3.5 w-3.5" /> Export PDF
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-neutral-200">
                <FileCode2 className="h-3.5 w-3.5" /> Copy LaTeX
              </span>
              <Chip>
                <Check className="h-3 w-3 text-green-400" /> ATS-friendly
              </Chip>
            </div>
          ),
        },
      ],
    },

    opportunities: {
      command: "opportunities match --rank gold --path frontend",
      steps: [
        ...[
          ["Google Summer of Code", "Fellowship Â· open source", 92],
          ["Kubernetes â€” good first issues", "Project Â· Go, cloud", 84],
          ["LFX Mentorship", "Fellowship Â· mentored", 78],
        ].map(([title, meta, match], i) => ({
          id: `op-${i}`,
          delayMs: i === 0 ? 450 : 380,
          skeleton: <Shimmer className="h-14 w-full" />,
          render: () => (
            <Block className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-white">{title}</p>
                <p className="text-xs text-neutral-400">{meta}</p>
              </div>
              <span className="rounded-md bg-green-500/15 px-2 py-0.5 text-xs font-semibold text-green-400">
                {match}% match
              </span>
            </Block>
          ),
        })),
        {
          id: "locked",
          delayMs: 450,
          render: () => (
            <Block className="flex items-center gap-3 border-dashed opacity-80">
              <Lock className="h-4 w-4 shrink-0 text-neutral-500" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-neutral-300">
                  Frontend Engineer Intern â€” partner company
                </p>
                <p className="text-xs text-neutral-500">Unlocks at Platinum</p>
              </div>
            </Block>
          ),
        },
        {
          id: "summary",
          delayMs: 500,
          render: () => (
            <p className="text-xs text-neutral-400">
              <span className="text-white">12 new matches</span> this week Â· 3
              unlock at your next tier
            </p>
          ),
        },
      ],
    },

    blog: {
      command: "archivist watch Dijkstra-Edu/LeetCode-Solutions",
      steps: [
        {
          id: "pr",
          delayMs: 400,
          render: () => (
            <Block className="flex items-center gap-3">
              <GitMerge className="h-5 w-5 shrink-0 text-violet-400" />
              <div className="min-w-0">
                <p className="truncate font-medium text-white">
                  Add solution: 66. Plus One (Easy)
                </p>
                <p className="text-xs text-neutral-400">
                  Merged into Dijkstra-Edu/LeetCode-Solutions
                </p>
              </div>
            </Block>
          ),
        },
        {
          id: "generate",
          delayMs: 600,
          render: () => (
            <p className="font-mono text-xs text-neutral-400">
              â†’ Archivist: generating post from solutionâ€¦{" "}
              <span className="text-green-400">ok</span>
            </p>
          ),
        },
        {
          id: "card",
          delayMs: 900,
          skeleton: <Shimmer className="h-28 w-full" />,
          render: () => (
            <Block>
              <div className="mb-2 flex flex-wrap gap-1.5">
                {["Arrays", "Math", "Easy"].map((t) => (
                  <span
                    key={t}
                    className="rounded bg-white/10 px-1.5 py-0.5 text-[11px] text-neutral-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-base font-semibold text-white">
                LeetCode #66 â€” Plus One
              </p>
              <p className="mt-1 text-xs text-neutral-400">
                Why carrying from the last digit makes this O(n) with O(1) extra
                space.
              </p>
              <p className="mt-3 text-xs text-neutral-500">
                @aarav-dev Â· 4 min read Â· blogs.dijkstra.org.in
              </p>
            </Block>
          ),
        },
        {
          id: "feed",
          delayMs: 600,
          render: () => (
            <div className="flex gap-4 text-xs text-neutral-400">
              <span className="inline-flex items-center gap-1">
                <Heart className="h-3.5 w-3.5 text-rose-400" /> 14
              </span>
              <span className="inline-flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" /> 3
              </span>
              <span>Shared to your home feed</span>
            </div>
          ),
        },
      ],
    },

    teams: {
      command: "teams join --track frontend",
      steps: [
        ...teamPath.map((node, i) => ({
          id: `node-${i}`,
          delayMs: i === 0 ? 400 : 320,
          skeleton: <Shimmer className="h-5 w-3/5" />,
          render: () => (
            <div
              className="flex items-center gap-2 font-mono text-[13px]"
              style={{ paddingLeft: `${i * 14}px` }}
            >
              <span className="text-neutral-600">{i === 0 ? "â—" : "â””"}</span>
              <span className={cn("text-[11px]", kindColor[node.kind])}>
                [{node.kind}]
              </span>
              <span className="truncate text-neutral-200">{node.label}</span>
            </div>
          ),
        })),
        {
          id: "joined",
          delayMs: 600,
          render: () => (
            <Block className="flex items-center gap-3">
              <UserPlus className="h-5 w-5 shrink-0 text-green-400" />
              <p className="text-xs text-neutral-300">
                <span className="font-medium text-white">
                  You joined Frontend (FE).
                </span>{" "}
                Mentor assigned Â· first issue ready for review.
              </p>
            </Block>
          ),
        },
      ],
    },
  };
