/**
 * Single source of truth for Dijkstra's features.
 *
 * `status` is deliberately honest and mirrors the state of the codebase and
 * the roadmap (see Evaluation.MD at the monorepo root):
 *   - live            â†’ available on the platform today
 *   - beta            â†’ usable, still being wired to every backend service
 *   - in-development  â†’ being built by a Dijkstra team right now
 *   - planned         â†’ on the roadmap, not started
 */
import type { LucideIcon } from "lucide-react";
import {
  Award,
  BookOpen,
  Bot,
  Compass,
  FileText,
  Gauge,
  Github,
  Handshake,
  Newspaper,
  Rocket,
  Smartphone,
  Trophy,
  Users,
} from "lucide-react";

export type FeatureStatus = "live" | "beta" | "in-development" | "planned";

export const statusLabel: Record<FeatureStatus, string> = {
  live: "Live",
  beta: "Beta",
  "in-development": "In development",
  planned: "Planned",
};

export type Feature = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  bullets: string[];
  status: FeatureStatus;
  icon: LucideIcon;
  /** Tailwind text colour used for the icon accent. */
  accent: string;
  /** Path inside Dijkstra Web, if the feature has a page there. */
  platformPath?: string;
  /** Backend services involved (see Evaluation.MD Â§3). */
  services: string[];
};

/** Features demoed in the streaming showcase, in display order. */
export const streamedFeatures: Feature[] = [
  {
    slug: "dashboard",
    name: "Proof-of-work dashboard",
    tagline: "GitHub, LeetCode and LinkedIn in one place",
    description:
      "Dijkstra aggregates your activity across platforms into a single dashboard, then turns it into a daily task list so you always know what to do next.",
    bullets: [
      "Commit, problem-solving and profile activity side by side",
      "Daily tasks and streaks that keep preparation consistent",
      "Contribution heatmaps and trends you can share",
    ],
    status: "beta",
    icon: Gauge,
    accent: "text-emerald-400",
    platformPath: "/dashboard",
    services: ["Dijkstra Web", "Dataforge", "GitRipper"],
  },
  {
    slug: "ranking",
    name: "Helios ranking",
    tagline: "Your proof of work, turned into a rank",
    description:
      "Helios scores verified signals â€” open source, projects, DSA, experience and academics â€” into XP and a tier, so you know exactly where you stand and what moves you up.",
    bullets: [
      "Eleven tiers from Iron to Obsidian",
      "Transparent signals instead of a black-box score",
      "Stronger opportunities unlock as you climb",
    ],
    status: "beta",
    icon: Trophy,
    accent: "text-amber-400",
    platformPath: "/dashboard",
    services: ["Helios", "helios-ai", "GitRipper"],
  },
  {
    slug: "dijkstra-gpt",
    name: "Dijkstra GPT",
    tagline: "A CS mentor that knows your progress",
    description:
      "An AI assistant scoped to computer science and careers. It remembers your conversations and can read your own metrics to give advice that is specific to you.",
    bullets: [
      "Answers DSA, system design and career questions",
      "Uses your rank and metrics through secure, user-scoped tools",
      "Persistent conversation history",
    ],
    status: "beta",
    icon: Bot,
    accent: "text-sky-400",
    platformPath: "/dijkstra-gpt",
    services: ["Dijkstra Intelligence", "Helios"],
  },
  {
    slug: "resume-builder",
    name: "Resume & CV builder",
    tagline: "Your profile, compiled into a resume",
    description:
      "Fill in your profile once. Dijkstra reuses it to generate resumes and CVs, with a LaTeX preview and export, so your documents always match your latest work.",
    bullets: [
      "Profile data flows straight into the resume",
      "LaTeX preview and PDF export",
      "Multiple resumes per target role",
    ],
    status: "beta",
    icon: FileText,
    accent: "text-rose-400",
    platformPath: "/dashboard",
    services: ["Dijkstra Web", "Dataforge"],
  },
  {
    slug: "opportunities",
    name: "Opportunities board",
    tagline: "Projects, fellowships and jobs that match you",
    description:
      "Browse open-source projects, fellowships and jobs matched to your skills and career path. The better your proof of work, the stronger the opportunities you unlock.",
    bullets: [
      "Projects hub, fellowships & programs, job board",
      "Match scores based on skills and rank",
      "Shortlist a dream role and plan towards it",
    ],
    status: "beta",
    icon: Compass,
    accent: "text-violet-400",
    platformPath: "/opportunities",
    services: ["Dijkstra Web", "Dataforge", "HQ"],
  },
  {
    slug: "blog",
    name: "Blogs & posts",
    tagline: "Your solutions, published automatically",
    description:
      "Write articles, share posts, and have your LeetCode solutions turned into blog posts automatically â€” building a public record of how you think.",
    bullets: [
      "Public blog with authors, tags and search",
      "LeetCode solutions â†’ blog posts (automation in progress)",
      "Posts and a home feed inside the platform",
    ],
    status: "in-development",
    icon: Newspaper,
    accent: "text-blue-400",
    platformPath: "/blog",
    services: ["Blog", "Archivist"],
  },
  {
    slug: "teams",
    name: "Teams & projects",
    tagline: "Work like an engineer before you are one",
    description:
      "Join a real Dijkstra team â€” frontend, backend, ML, DevOps, design and more â€” and ship the platform itself. It is an apprenticeship, with mentors and code review.",
    bullets: [
      "60+ GitHub teams across engineering and non-engineering tracks",
      "Mentored projects with real code review",
      "Designations that grow with your work",
    ],
    status: "in-development",
    icon: Users,
    accent: "text-lime-400",
    platformPath: "/teams",
    services: ["GitHub Teams", "Discord", "Dijkstra Web"],
  },
];

/** Smaller features shown in the bento grid below the showcase. */
export const moreFeatures: Feature[] = [
  {
    slug: "onboarding",
    name: "Guided onboarding",
    tagline: "GitHub, Git, VS Code, Discord, LeetCode, LinkedIn",
    description:
      "A step-by-step setup of every tool a working engineer uses, with guides for each.",
    bullets: [],
    status: "live",
    icon: Rocket,
    accent: "text-emerald-400",
    platformPath: "/onboarding",
    services: ["Dijkstra Web", "Dataforge"],
  },
  {
    slug: "mentorship",
    name: "Mentorship & community",
    tagline: "Learn, then teach",
    description:
      "Mentors, weekly team meetings and an active Discord. Members who land jobs come back to mentor the next cohort.",
    bullets: [],
    status: "live",
    icon: Handshake,
    accent: "text-amber-400",
    services: ["Discord"],
  },
  {
    slug: "open-source",
    name: "Open source by default",
    tagline: "Every line is public",
    description:
      "The platform is built in the open by its own students, so your contributions are verifiable proof of work.",
    bullets: [],
    status: "live",
    icon: Github,
    accent: "text-neutral-300",
    services: ["GitHub"],
  },
  {
    slug: "certificates",
    name: "Certificates & transcripts",
    tagline: "Backed by proof of work",
    description:
      "Certificates and transcripts generated from what you actually built, with a public, QR-linked profile.",
    bullets: [],
    status: "in-development",
    icon: Award,
    accent: "text-rose-400",
    services: ["Dataforge"],
  },
  {
    slug: "learning-hub",
    name: "Learning Hub",
    tagline: "CS from the ground up",
    description:
      "Structured learning paths for fundamentals, development and theory, with quizzes to skip what you already know.",
    bullets: [],
    status: "planned",
    icon: BookOpen,
    accent: "text-sky-400",
    platformPath: "/learning-hub",
    services: ["Dijkstra Web"],
  },
  {
    slug: "mobile",
    name: "Mobile apps",
    tagline: "Android and iOS, built by the community",
    description:
      "Track tasks and streaks on the go with community-built mobile apps.",
    bullets: [],
    status: "in-development",
    icon: Smartphone,
    accent: "text-violet-400",
    services: ["Android", "iOS"],
  },
];

export const allFeatures: Feature[] = [...streamedFeatures, ...moreFeatures];
