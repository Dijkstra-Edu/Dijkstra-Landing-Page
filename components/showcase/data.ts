/**
 * Demo data for the hero product showcase.
 *
 * Every shape mirrors a real Dijkstra Web component so the frames look like
 * the product (sources in the Dijkstra-Web app):
 *   - sidebar / header ........ components/app-sidebar.tsx, site-header.tsx,
 *                               lib/Zustand/settings-store.ts (header pins)
 *   - dashboard "Stats" tab ... components/section-cards.tsx,
 *                               chart-area-interactive.tsx, profile-data.tsx
 *   - "Portfolio" tab ......... components/contribution-heatmap.tsx,
 *                               profile/profile-container.tsx + sections/*
 *   - opportunities ........... components/opportunities/*, data/project-data.ts,
 *                               data/fellowship-data.ts
 *   - Dijkstra GPT ............ components/dijkstra-gpt.tsx
 *   - home .................... components/homepage.tsx
 *
 * The person is fictional and all numbers are illustrative.
 */
import { mulberry32 } from "@/lib/seeded-random";

export const demoUser = {
  name: "Jonathan Samuel",
  handle: "JRS296",
  email: "aarav.mehta@example.com",
  avatar: "/new pfp.jpg",
  bio: "CS undergrad. Working on @Dijkstra-Edu's Resume and CV Builder. Into React, TypeScript and compilers.",
  role: "SDE-1 (Frontend Engineer)",
  team: "Resume and CV Builder",
  project: "Dijkstra Statistics & Aggregation",
  memberSince: "24th March, 2025",
  rank: { key: "GOLD_1", label: "GOLD 1" },
  specialization: {
    label: "Frontend Engineer (F.E)",
    icon: "/specializations/Developers/FRONTEND.png",
  },
  streak: 12,
  followers: 48,
  following: 61,
  repos: 27,
  xp: { current: 5435, next: 10000 },
  position: { rank: 42, total: 318 },
};

/** "Tasks For the Day" radar â€” Dijkstra-Web: SectionCards â†’ chartData3. */
export const taskRadar = [
  { item: "GitHub", todo: 2, completed: 5 },
  { item: "Leetcode", todo: 1, completed: 2 },
  { item: "LinkedIn", todo: 10, completed: 10 },
  { item: "Resume", todo: 0, completed: 0 },
  { item: "Project", todo: 2, completed: 2 },
  { item: "Learning", todo: 2, completed: 2 },
];

/** LeetCode split shown in the "Leetcode Work" gauge (220 problems). */
export const leetcode = { easy: 112, medium: 86, hard: 22 };

export type ActivityPoint = {
  day: string;
  GitHub: number;
  LeetCode: number;
  Projects: number;
  LinkedIn: number;
};

/**
 * Three months of stacked activity (Dijkstra-Web: ChartAreaInteractive,
 * "All Activity â€” Total for the last 3 months"). Seeded, so it is stable.
 */
export const activity: ActivityPoint[] = (() => {
  const random = mulberry32(42);
  const start = Date.UTC(2025, 3, 1);
  return Array.from({ length: 91 }, (_, i) => {
    const d = new Date(start + i * 86_400_000);
    const wave = Math.sin(i / 2.6) * 0.3 + Math.sin(i / 7.3) * 0.2 + 0.6;
    return {
      day: d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }),
      GitHub: Math.round((110 + random() * 300) * wave),
      LeetCode: Math.round((100 + random() * 280) * wave),
      Projects: Math.round((30 + random() * 120) * wave),
      LinkedIn: Math.round(2 + random() * 8),
    };
  });
})();

/**
 * A full year of GitHub-style contributions (53 weeks Ã— 7 days, levels
 * 0â€“4) for the Portfolio tab's Contribution Activity card.
 */
export const contributionYear: number[][] = (() => {
  const random = mulberry32(7);
  return Array.from({ length: 53 }, (_, week) =>
    Array.from({ length: 7 }, (_, day) => {
      const season = Math.sin((week / 53) * Math.PI * 2 - 1) * 0.18;
      const weekday = day > 0 && day < 6 ? 0.12 : -0.12;
      const r = random() + season + weekday + week / 160;
      if (r < 0.42) return 0;
      if (r < 0.66) return 1;
      if (r < 0.84) return 2;
      if (r < 1.0) return 3;
      return 4;
    }),
  );
})();

export const contributionTotal = contributionYear
  .flat()
  .reduce((sum, level) => sum + (level === 0 ? 0 : level * 2 - 1), 0);

/** Portfolio â†’ Work Experience timeline entries. */
export const workExperience = [
  {
    title: "Frontend Engineer",
    company: "Dijkstra",
    logo: "/icon.png",
    start: "Mar 2025",
    end: "Present",
    current: true,
    duration: "8 mos",
    location: "Remote",
    locationType: "Remote",
    employment: "Open source",
    description:
      "Building the Resume and CV Builder: compiling a student's profile into LaTeX-quality resumes, with live preview and export.",
    tools: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Teaching Assistant â€” Data Structures",
    company: "University CS Department",
    logo: null,
    start: "Aug 2024",
    end: "Dec 2024",
    current: false,
    duration: "5 mos",
    location: "Bengaluru",
    locationType: "On-site",
    employment: "Part-time",
    description:
      "Ran weekly lab sessions on trees, graphs and dynamic programming for 60 second-year students.",
    tools: ["C++", "Python"],
  },
];

export const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "C++",
  "PostgreSQL",
  "Docker",
  "Git",
  "Data Structures",
];

/** Opportunities â†’ "Featured Open Source Projects" (data/project-data.ts). */
export type DemoProject = {
  title: string;
  org: string;
  logo: "react" | "k8s" | "tf" | "vscode" | "django" | "node";
  stars: string;
  forks: string;
  issues: string;
  updated: string;
  language: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  highlight: "popular" | "trending" | "new" | "good-first-issue";
  description: string;
  topics: string[];
};

export const projects: DemoProject[] = [
  {
    title: "React",
    org: "Facebook",
    logo: "react",
    stars: "220.0k",
    forks: "45.0k",
    issues: "850",
    updated: "2 days ago",
    language: "JavaScript",
    difficulty: "intermediate",
    highlight: "popular",
    description:
      "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    topics: ["javascript", "react", "frontend", "ui", "library"],
  },
  {
    title: "Kubernetes",
    org: "Kubernetes",
    logo: "k8s",
    stars: "105.0k",
    forks: "38.0k",
    issues: "2500",
    updated: "3 days ago",
    language: "Go",
    difficulty: "advanced",
    highlight: "trending",
    description:
      "Production-grade container scheduling and management for containerized applications.",
    topics: ["go", "kubernetes", "containers", "orchestration"],
  },
  {
    title: "TensorFlow",
    org: "Google",
    logo: "tf",
    stars: "180.0k",
    forks: "88.0k",
    issues: "1800",
    updated: "4 days ago",
    language: "C++",
    difficulty: "advanced",
    highlight: "popular",
    description:
      "An open source machine learning framework for everyone â€” a comprehensive platform for ML.",
    topics: ["machine-learning", "deep-learning", "python", "ai"],
  },
  {
    title: "Visual Studio Code",
    org: "Microsoft",
    logo: "vscode",
    stars: "155.0k",
    forks: "27.0k",
    issues: "6000",
    updated: "1 day ago",
    language: "TypeScript",
    difficulty: "intermediate",
    highlight: "trending",
    description:
      "A lightweight but powerful source code editor for Windows, macOS and Linux.",
    topics: ["typescript", "editor", "electron", "ide"],
  },
  {
    title: "Django",
    org: "Django Software Foundation",
    logo: "django",
    stars: "75.0k",
    forks: "31.0k",
    issues: "280",
    updated: "5 days ago",
    language: "Python",
    difficulty: "intermediate",
    highlight: "good-first-issue",
    description:
      "The web framework for perfectionists with deadlines â€” batteries included.",
    topics: ["python", "django", "web-framework", "backend", "mvc"],
  },
];

/** Opportunities â†’ "Featured Fellowship Programs" (data/fellowship-data.ts). */
export const fellowships = [
  {
    title: "Google Summer of Code",
    org: "Google",
    duration: "12 weeks",
    location: "Remote",
    stipend: "$1,500 - $6,600",
    deadline: "18 days left",
    highlight: "popular" as const,
  },
  {
    title: "MLH Fellowship",
    org: "Major League Hacking",
    duration: "12 weeks",
    location: "Remote",
    stipend: "$5,000",
    deadline: "25 days left",
    highlight: "trending" as const,
  },
  {
    title: "LF Mentorship Program",
    org: "Linux Foundation",
    duration: "12 weeks",
    location: "Remote",
    stipend: "$3,000 - $6,600",
    deadline: "31 days left",
    highlight: "new" as const,
  },
  {
    title: "Season of Docs",
    org: "Google",
    duration: "3-5 months",
    location: "Remote",
    stipend: "$2,400 - $15,000",
    deadline: "40 days left",
    highlight: "new" as const,
  },
];

/** Dijkstra GPT â†’ example prompts (components/dijkstra-gpt.tsx). */
export const gptExamples = [
  "I'm lost. How do I get started with coding to get a job in tech?",
  "What are the steps I can take to become a Computer Science Engineer?",
  "How do I approach a coding interview?",
  "What are some good resources for learning algorithms?",
  "How can I leverage AI in my coding projects?",
  "How do I improve my resume for tech jobs?",
];

export const gptConversation = {
  question: "I'm Gold 1 right now. What should I focus on to reach Platinum?",
  answer:
    "Looking at your GitHub and LeetCode activity, your consistency is great â€” a 12-day streak and 220 problems solved. The gap to Platinum is proof of work you can show. This week:\n- Get your open PR on the Resume builder reviewed and merged\n- Solve 2 medium problems a day, and write one up as a blog post\n- Add measurable impact to your Frontend Engineer experience",
};

/** Home â†’ Weekly Leaderboard (components/homepage.tsx). */
export const leaderboard = [
  { rank: 1, name: "Alex Chen", points: 1250 },
  { rank: 2, name: "Sarah Kim", points: 1180 },
  { rank: 3, name: "You", points: 1050, you: true },
  { rank: 4, name: "Mike Johnson", points: 980 },
];

export const schedule = [
  {
    time: "09:00",
    title: "Dynamic Programming",
    duration: "45 min",
    done: true,
  },
  {
    time: "14:30",
    title: "System Design Reading",
    duration: "30 min",
    current: true,
  },
  { time: "19:00", title: "Mock Interview", duration: "60 min" },
];
