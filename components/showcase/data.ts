/**
 * Demo data for the product showcase.
 *
 * Shapes mirror the real Dijkstra Web components (see Dijkstra-Web:
 * components/section-cards.tsx, chart-area-interactive.tsx,
 * login/slides/ranking-system-slide.tsx, data/career-paths.ts) so the frames
 * look like the product, but every value here is illustrative.
 */
import { mulberry32 } from "@/lib/seeded-random";

export const demoUser = {
  name: "Aarav Mehta",
  handle: "aarav-dev",
  avatar: "/placeholder-user.jpg",
  role: "SDE-1 (Frontend Engineer)",
  team: "Resume and CV Builder",
  specialization: {
    label: "Frontend Engineer",
    short: "F.E",
    icon: "/specializations/Developers/FRONTEND.png",
  },
  streak: 12,
  followers: 48,
  following: 61,
  repos: 27,
};

/** "Tasks for the day" radar (Dijkstra-Web: SectionCards â†’ chartData3). */
export const taskRadar = [
  { item: "GitHub", completed: 4, target: 5 },
  { item: "LeetCode", completed: 2, target: 2 },
  { item: "LinkedIn", completed: 3, target: 4 },
  { item: "Resume", completed: 1, target: 2 },
  { item: "Project", completed: 2, target: 3 },
  { item: "Learning", completed: 2, target: 2 },
];

/** LeetCode solved split (radial gauge). */
export const leetcode = { easy: 112, medium: 86, hard: 22 };

export type ActivityPoint = {
  day: string;
  GitHub: number;
  LeetCode: number;
  Projects: number;
  LinkedIn: number;
};

/**
 * Six weeks of stacked activity (Dijkstra-Web: ChartAreaInteractive).
 * Generated with a seeded PRNG so it is stable between renders.
 */
export const activity: ActivityPoint[] = (() => {
  const random = mulberry32(42);
  const months = ["Apr", "May", "Jun"];
  return Array.from({ length: 42 }, (_, i) => {
    const wave = Math.sin(i / 3.2) * 0.35 + 0.65;
    return {
      day: `${months[Math.floor(i / 15)]} ${(i % 15) * 2 + 1}`,
      GitHub: Math.round((120 + random() * 260) * wave),
      LeetCode: Math.round((90 + random() * 220) * wave),
      Projects: Math.round((30 + random() * 110) * wave),
      LinkedIn: Math.round(2 + random() * 8),
    };
  });
})();

/** GitHub-style contribution heatmap: 20 weeks Ã— 7 days, levels 0â€“4. */
export const heatmap: number[][] = (() => {
  const random = mulberry32(7);
  return Array.from({ length: 20 }, (_, week) =>
    Array.from({ length: 7 }, (_, day) => {
      const bias = week / 20 + (day > 0 && day < 6 ? 0.15 : -0.1);
      const r = random() + bias * 0.6;
      if (r < 0.35) return 0;
      if (r < 0.6) return 1;
      if (r < 0.8) return 2;
      if (r < 1.0) return 3;
      return 4;
    }),
  );
})();

/** The rank ladder shown in Dijkstra Web's ranking slide. */
export const rankLadder = [
  { key: "IRON_3", label: "Iron", color: "#929292" },
  { key: "BRONZE_3", label: "Bronze", color: "#cd7f32" },
  { key: "SILVER_3", label: "Silver", color: "#c9c9c9" },
  { key: "GOLD_3", label: "Gold", color: "#f5c518" },
  { key: "PLATINUM_3", label: "Platinum", color: "#7e9bbf" },
  { key: "DIAMOND_3", label: "Diamond", color: "#8fd8ec" },
  { key: "EMERALD_3", label: "Emerald", color: "#50c878" },
  { key: "LAPIS_3", label: "Lapis", color: "#c77df3" },
  { key: "QUARTZ_3", label: "Quartz", color: "#e8c95a" },
  { key: "SAPHIRE_3", label: "Amethyst", color: "#e3480b" },
  { key: "OBSIDIAN", label: "Obsidian", color: "#6a5acd" },
] as const;

/** Index into `rankLadder` of the demo user's current tier. */
export const currentRankIndex = 3;

/** Helios scores proof of work across these signals. */
export const xpBreakdown = [
  { label: "Open source", value: 78 },
  { label: "Projects", value: 64 },
  { label: "DSA / LeetCode", value: 71 },
  { label: "Work experience", value: 35 },
  { label: "Academics", value: 82 },
];

export const xp = { current: 5120, nextTier: 6000, nextTierLabel: "Platinum" };

export type DemoOpportunity = {
  title: string;
  org: string;
  kind: "Project" | "Fellowship" | "Internship";
  summary: string;
  tags: string[];
  match: number;
  unlocksAt?: string;
};

export const opportunities: DemoOpportunity[] = [
  {
    title: "Google Summer of Code",
    org: "Open-source orgs",
    kind: "Fellowship",
    summary: "Paid, mentored summer contributions to open source.",
    tags: ["Open source", "Stipend"],
    match: 92,
  },
  {
    title: "Kubernetes â€” good first issues",
    org: "CNCF",
    kind: "Project",
    summary: "Curated starter issues matched to your Go experience.",
    tags: ["Go", "Cloud"],
    match: 84,
  },
  {
    title: "Frontend Engineer Intern",
    org: "Partner company",
    kind: "Internship",
    summary: "Build product UI with a partner engineering team.",
    tags: ["React", "TypeScript"],
    match: 71,
    unlocksAt: "Platinum",
  },
  {
    title: "LFX Mentorship",
    org: "Linux Foundation",
    kind: "Fellowship",
    summary: "Structured mentorship on Linux Foundation projects.",
    tags: ["Mentored", "Remote"],
    match: 78,
  },
  {
    title: "MLH Fellowship",
    org: "Major League Hacking",
    kind: "Fellowship",
    summary: "Remote, team-based software engineering fellowship.",
    tags: ["Teams", "Stipend"],
    match: 66,
    unlocksAt: "Platinum",
  },
  {
    title: "Backend Engineer (New grad)",
    org: "Partner company",
    kind: "Internship",
    summary: "APIs and data services for a partner platform.",
    tags: ["Python", "APIs"],
    match: 58,
    unlocksAt: "Diamond",
  },
];

export const gptConversation = {
  question: "I'm Gold right now. What should I focus on to reach Platinum?",
  tool: "get_user_metrics",
  answer:
    "Based on your metrics, your DSA and academics are strong â€” the gap is proof of work you can show. This week: 1) ship the open PR on the Resume builder and get it reviewed, 2) solve 2 medium LeetCode problems a day and write one up as a blog post, 3) add measurable impact to your work-experience entry. That alone should close most of the 880 XP gap.",
  followUps: [
    "Which LeetCode topics am I weakest in?",
    "Review my resume bullet points",
    "Which Dijkstra team should I join next?",
  ],
};

export const sidebarItems = [
  "Home",
  "Dijkstra GPT",
  "Dashboard",
  "Learning Hub",
  "Blogs and Articles",
  "Join a Team",
  "Project Planner",
];

export const sidebarOpportunities = [
  "Projects Hub",
  "Fellowships",
  "Job Board",
];
