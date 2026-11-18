/**
 * Product pages (/products/[slug]). Copy is grounded in the codebase and the
 * Dijkstra docs; statuses come from content/features.ts where possible.
 */
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Award,
  BarChart3,
  BookOpen,
  Bot,
  Brain,
  Briefcase,
  Building2,
  CalendarCheck,
  Compass,
  FileCode2,
  FileText,
  Flame,
  GitBranch,
  GraduationCap,
  History,
  Layers,
  Lock,
  MessageSquare,
  Newspaper,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Trophy,
  Users,
  Wrench,
} from "lucide-react";
import { siteConfig } from "@/lib/site";
import type { FeatureStatus } from "./features";

const gh = (repo: string) => `${siteConfig.links.github}/${repo}`;

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  status: FeatureStatus;
  icon: LucideIcon;
  summary: string;
  audience: "Students" | "Organisations";
  cta: { label: string; href: string };
  visual:
    | { kind: "stream"; stream: string }
    | { kind: "image"; src: string; alt: string }
    | { kind: "phones"; shots: { src: string; alt: string }[] };
  highlights: { icon: LucideIcon; title: string; text: string }[];
  steps: { title: string; text: string }[];
  underTheHood: { name: string; role: string; stack: string; repo?: string }[];
  builtBy: string[];
  faqs: { q: string; a: string }[];
  related: string[];
};

const platform = (path: string) => `${siteConfig.platformUrl}${path}`;

export const products: Product[] = [
  {
    slug: "dashboard",
    name: "Proof-of-work dashboard",
    tagline: "GitHub, LeetCode and LinkedIn in one place",
    status: "beta",
    icon: BarChart3,
    audience: "Students",
    summary:
      "Preparation for software roles is scattered across a dozen sites. The dashboard brings your coding activity, problem solving and profile together, and turns it into a short list of things to do today.",
    cta: { label: "Open your dashboard", href: platform("/dashboard") },
    visual: { kind: "stream", stream: "dashboard" },
    highlights: [
      {
        icon: Activity,
        title: "All activity, one view",
        text: "Commits, solved problems and profile updates side by side, over days, weeks and months.",
      },
      {
        icon: CalendarCheck,
        title: "Daily tasks",
        text: "A task list across GitHub, LeetCode, projects and learning keeps preparation consistent.",
      },
      {
        icon: Flame,
        title: "Streaks",
        text: "Keep your daily streak alive (streak reminders are on the way).",
      },
      {
        icon: Trophy,
        title: "Rank at a glance",
        text: "Your Helios tier and XP sit next to the activity that earned them.",
      },
    ],
    steps: [
      {
        title: "Connect your accounts",
        text: "GitHub sign-in, plus LeetCode and LinkedIn during onboarding.",
      },
      {
        title: "We sync your history",
        text: "GitRipper imports your commit history and keeps it up to date with webhooks.",
      },
      {
        title: "Get today's tasks",
        text: "The dashboard highlights gaps and proposes what to do next.",
      },
    ],
    underTheHood: [
      {
        name: "Dijkstra Web",
        role: "Dashboard UI",
        stack: "Next.js, TanStack Query",
        repo: gh("Dijkstra-Web"),
      },
      {
        name: "Dataforge",
        role: "Profiles and platform data",
        stack: "Python, FastAPI, PostgreSQL",
        repo: gh("Dataforge"),
      },
      {
        name: "GitRipper",
        role: "GitHub statistics aggregation",
        stack: "Java, Spring Boot, Temporal, Kafka",
        repo: gh("Gitripper"),
      },
    ],
    builtBy: ["Frontend (FE)", "Backend (BE)", "GitRipper - Github Statistics"],
    faqs: [
      {
        q: "Which platforms are supported?",
        a: "GitHub, LeetCode and LinkedIn today. More sources can be added as integrations.",
      },
      {
        q: "Do you read private repositories?",
        a: "No. Sign-in requests public repository access only.",
      },
    ],
    related: ["ranking", "dijkstra-gpt", "resume-builder"],
  },
  {
    slug: "ranking",
    name: "Helios ranking",
    tagline: "Your proof of work, turned into a rank",
    status: "beta",
    icon: Trophy,
    audience: "Students",
    summary:
      "Helios is Dijkstra's ranking service. It scores verified signals â€” open source, projects, problem solving, experience and academics â€” into XP and a tier, so you always know where you stand and what moves you up.",
    cta: { label: "See your rank", href: platform("/dashboard") },
    visual: { kind: "stream", stream: "ranking" },
    highlights: [
      {
        icon: Layers,
        title: "Eleven tiers",
        text: "From Iron to Obsidian, inspired by competitive gaming: merit-based, fair progression.",
      },
      {
        icon: Target,
        title: "Signals, not vibes",
        text: "XP comes from work you can point to: merged PRs, projects, problems and experience.",
      },
      {
        icon: Sparkles,
        title: "AI project review",
        text: "Projects can be analysed by helios-ai for scope, effectiveness and code quality.",
      },
      {
        icon: Lock,
        title: "Unlocks opportunities",
        text: "Stronger opportunities on the board unlock as your tier grows.",
      },
    ],
    steps: [
      {
        title: "Signals arrive",
        text: "GitHub statistics and profile data stream in from GitRipper and Dataforge.",
      },
      {
        title: "Helios scores them",
        text: "Each signal is scored and combined into XP.",
      },
      {
        title: "You get a tier",
        text: "Your tier, XP and the fastest path to the next tier appear on your dashboard.",
      },
    ],
    underTheHood: [
      {
        name: "Helios",
        role: "Ranking and XP service",
        stack: "Rust, Axum, SeaORM, Kafka",
      },
      {
        name: "helios-ai",
        role: "AI repository analysis",
        stack: "Python, LangGraph, tree-sitter",
      },
    ],
    builtBy: ["Helios - Ranking Algo"],
    faqs: [
      {
        q: "Is the ranking algorithm open source?",
        a: "Helios is kept closed source: it funds Dijkstra's open-source work. Everything else on the platform is open source.",
      },
      {
        q: "Can I game the rank?",
        a: "XP is derived from verifiable work, and the algorithm keeps evolving to reward depth over volume.",
      },
    ],
    related: ["dashboard", "opportunities", "companies"],
  },
  {
    slug: "dijkstra-gpt",
    name: "Dijkstra GPT",
    tagline: "A CS mentor that knows your progress",
    status: "beta",
    icon: Bot,
    audience: "Students",
    summary:
      "Dijkstra GPT is an AI assistant scoped to computer science and careers. Think of it as the senior in university who can advise you on a thing or two â€” one who can also look at your rank and metrics before answering.",
    cta: { label: "Try Dijkstra GPT", href: platform("/dijkstra-gpt") },
    visual: { kind: "stream", stream: "dijkstra-gpt" },
    highlights: [
      {
        icon: Brain,
        title: "CS-first",
        text: "Algorithms, system design, debugging, projects, interviews and career planning.",
      },
      {
        icon: ShieldCheck,
        title: "User-scoped tools",
        text: "It reads your metrics through tools bound to your account â€” never anyone else's.",
      },
      {
        icon: History,
        title: "Conversations that persist",
        text: "Pick up where you left off; regenerate answers when you want another take.",
      },
      {
        icon: MessageSquare,
        title: "Streaming answers",
        text: "Responses stream in as they are generated.",
      },
    ],
    steps: [
      {
        title: "Ask anything technical",
        text: "From heaps vs. BSTs to how to structure your first project.",
      },
      {
        title: "It checks your context",
        text: "When useful, it fetches your metrics from Helios before answering.",
      },
      {
        title: "Get specific next steps",
        text: "Advice tailored to your rank, skills and goals.",
      },
    ],
    underTheHood: [
      {
        name: "Dijkstra Intelligence",
        role: "Chat service and agent",
        stack: "Python, FastAPI, LangGraph, Gemini, PostgreSQL",
      },
      { name: "Helios", role: "Metrics tool", stack: "Rust, Axum" },
    ],
    builtBy: ["Dijkstra GPT", "ML Engineering"],
    faqs: [
      {
        q: "What will it refuse to answer?",
        a: "Requests unrelated to learning, software or careers are politely declined.",
      },
      {
        q: "Is my chat history private?",
        a: "Conversations are stored per user and only used to continue your own conversations.",
      },
      {
        q: "What's next?",
        a: "Deeper context awareness and retrieval over Dijkstra's learning content.",
      },
    ],
    related: ["dashboard", "ranking", "resume-builder"],
  },
  {
    slug: "resume-builder",
    name: "Resume & CV builder",
    tagline: "Your profile, compiled into a resume",
    status: "beta",
    icon: FileText,
    audience: "Students",
    summary:
      "Fill in your profile once â€” education, experience, projects, skills, certifications and publications â€” and reuse it to generate resumes and CVs that always match your latest work.",
    cta: { label: "Build your resume", href: platform("/dashboard") },
    visual: { kind: "stream", stream: "resume-builder" },
    highlights: [
      {
        icon: Users,
        title: "One profile",
        text: "Nine profile sections feed every document you generate.",
      },
      {
        icon: FileCode2,
        title: "LaTeX preview",
        text: "A clean, ATS-friendly template with a live preview.",
      },
      {
        icon: Layers,
        title: "Multiple versions",
        text: "Keep a resume per target role and a longer academic CV.",
      },
      {
        icon: Sparkles,
        title: "Optimisation (coming soon)",
        text: "Suggestions to add measurable impact to your bullet points.",
      },
    ],
    steps: [
      {
        title: "Complete your profile",
        text: "Add experience, projects and skills on Dijkstra Web.",
      },
      { title: "Pick a template", text: "Choose a resume or CV layout." },
      { title: "Export", text: "Download a PDF or copy the LaTeX source." },
    ],
    underTheHood: [
      {
        name: "Dijkstra Web",
        role: "Builder and preview",
        stack: "Next.js, LaTeX generation",
        repo: gh("Dijkstra-Web"),
      },
      {
        name: "Dataforge",
        role: "Profile and documents API",
        stack: "Python, FastAPI",
        repo: gh("Dataforge"),
      },
    ],
    builtBy: ["Resume and CV Builder"],
    faqs: [
      {
        q: "Can I import an existing resume?",
        a: "Not yet â€” profile data is entered manually today; importing is on the roadmap.",
      },
    ],
    related: ["dashboard", "opportunities", "dijkstra-gpt"],
  },
  {
    slug: "opportunities",
    name: "Opportunities board",
    tagline: "Projects, fellowships and jobs that match you",
    status: "beta",
    icon: Compass,
    audience: "Students",
    summary:
      "A projects hub, fellowships & programs and a job board in one place, matched to your skills and career path. The stronger your proof of work, the stronger the opportunities you unlock.",
    cta: { label: "Browse opportunities", href: platform("/opportunities") },
    visual: { kind: "stream", stream: "opportunities" },
    highlights: [
      {
        icon: GitBranch,
        title: "Projects hub",
        text: "Open-source projects and good first issues to build experience.",
      },
      {
        icon: GraduationCap,
        title: "Fellowships & programs",
        text: "Programs such as GSoC, LFX Mentorship, Outreachy and the MLH Fellowship.",
      },
      {
        icon: Briefcase,
        title: "Job board",
        text: "Internships and roles from partner organisations as they join.",
      },
      {
        icon: Lock,
        title: "Rank-gated",
        text: "Shortlist a dream opportunity and plan towards the tier that unlocks it.",
      },
    ],
    steps: [
      {
        title: "Set your path",
        text: "Pick a primary and secondary specialisations during onboarding.",
      },
      {
        title: "See your matches",
        text: "Opportunities are ranked by skills, path and tier.",
      },
      {
        title: "Unlock more",
        text: "Climbing tiers reveals stronger opportunities.",
      },
    ],
    underTheHood: [
      {
        name: "Dijkstra Web",
        role: "Board UI",
        stack: "Next.js",
        repo: gh("Dijkstra-Web"),
      },
      {
        name: "Dataforge",
        role: "Jobs, fellowships, projects APIs",
        stack: "Python, FastAPI",
        repo: gh("Dataforge"),
      },
      { name: "HQ", role: "Admin posting", stack: "Next.js", repo: gh("HQ") },
    ],
    builtBy: ["Frontend (FE)", "Backend (BE)"],
    faqs: [
      {
        q: "Who can post opportunities?",
        a: "Dijkstra admins today; partner companies and universities are being onboarded through their own dashboards.",
      },
    ],
    related: ["ranking", "companies", "resume-builder"],
  },
  {
    slug: "blog",
    name: "Dijkstra Blog",
    tagline: "Your solutions, published automatically",
    status: "in-development",
    icon: Newspaper,
    audience: "Students",
    summary:
      "A public blog where students share what they learn â€” from data-structure problems to system design. LeetCode solutions contributed to Dijkstra's solutions repository are being turned into posts automatically.",
    cta: { label: "Read the blog", href: siteConfig.blogUrl },
    visual: { kind: "image", src: "/blog.png", alt: "Dijkstra Blog home page" },
    highlights: [
      {
        icon: Newspaper,
        title: "A real publication",
        text: "Authors, tags, search and a clean reading experience with code highlighting and maths.",
      },
      {
        icon: GitBranch,
        title: "Solutions â†’ posts",
        text: "Merged LeetCode solutions become blog posts (automation in progress).",
      },
      {
        icon: Users,
        title: "Posts & feed",
        text: "Short posts and a home feed inside Dijkstra Web.",
      },
      {
        icon: Search,
        title: "Built for discovery",
        text: "Full-text search across every article.",
      },
    ],
    steps: [
      {
        title: "Solve and commit",
        text: "Add your solution to the LeetCode solutions repository.",
      },
      {
        title: "Archivist generates the post",
        text: "The blog service turns it into an article under your name.",
      },
      { title: "Share it", text: "It shows up on the blog and in your feed." },
    ],
    underTheHood: [
      { name: "Blog", role: "Public site", stack: "Astro", repo: gh("Blog") },
      {
        name: "Archivist",
        role: "Blog and posts service",
        stack: "Go, Gin, MongoDB",
        repo: gh("Archivist"),
      },
    ],
    builtBy: ["Blog Mechanism and Site"],
    faqs: [
      {
        q: "Can I write regular articles too?",
        a: "Yes â€” the editor inside Dijkstra Web supports Markdown articles and posts.",
      },
    ],
    related: ["dashboard", "dijkstra-gpt", "learning-hub"],
  },
  {
    slug: "learning-hub",
    name: "Learning Hub",
    tagline: "Computer science from the ground up",
    status: "planned",
    icon: BookOpen,
    audience: "Students",
    summary:
      "Structured, organic learning paths for fundamentals (DSA), development and theory, with quizzes that let you skip what you already know.",
    cta: { label: "Join the Learning Hub team", href: "/team" },
    visual: { kind: "stream", stream: "dijkstra-gpt" },
    highlights: [
      {
        icon: BookOpen,
        title: "Three tracks",
        text: "Fundamentals â†’ DSA, development â†’ building, theory â†’ academia.",
      },
      {
        icon: Target,
        title: "Placement quizzes",
        text: "Estimate where you stand and skip ahead.",
      },
      {
        icon: Bot,
        title: "GPT-assisted",
        text: "Dijkstra GPT will be able to answer from Learning Hub content.",
      },
      {
        icon: Award,
        title: "Proof of learning",
        text: "Completed paths count towards your profile.",
      },
    ],
    steps: [
      { title: "Take a quiz", text: "Find your starting point." },
      {
        title: "Follow a path",
        text: "Learn by building, one step at a time.",
      },
      { title: "Prove it", text: "Ship a project that uses what you learned." },
    ],
    underTheHood: [
      {
        name: "Dijkstra Web",
        role: "Learning UI",
        stack: "Next.js",
        repo: gh("Dijkstra-Web"),
      },
    ],
    builtBy: ["Learning Hub"],
    faqs: [
      {
        q: "When does it launch?",
        a: "It is on the roadmap after the core platform; follow the roadmap for updates.",
      },
    ],
    related: ["dijkstra-gpt", "blog", "dashboard"],
  },
  {
    slug: "mobile",
    name: "Dijkstra Mobile",
    tagline: "Android and iOS apps, built by the community",
    status: "in-development",
    icon: Smartphone,
    audience: "Students",
    summary:
      "Take your tasks, streaks and feed with you. Dijkstra's mobile teams are building Android, iOS and cross-platform apps that mirror the web platform.",
    cta: { label: "Meet the mobile teams", href: "/team" },
    visual: {
      kind: "phones",
      shots: [
        { src: "/mobile1.png", alt: "Dijkstra mobile splash screen" },
        { src: "/mobile2.jpeg", alt: "Dijkstra mobile featured posts" },
        { src: "/mobile3.jpeg", alt: "Dijkstra mobile about screen" },
      ],
    },
    highlights: [
      {
        icon: CalendarCheck,
        title: "Tasks on the go",
        text: "Check today's tasks and keep your streak alive.",
      },
      {
        icon: Newspaper,
        title: "Featured posts",
        text: "Read the latest posts and the LeetCode daily.",
      },
      {
        icon: Smartphone,
        title: "Native and cross-platform",
        text: "Android, iOS and Flutter / React Native teams.",
      },
      {
        icon: Users,
        title: "Same account",
        text: "One Dijkstra account across web and mobile.",
      },
    ],
    steps: [
      { title: "Sign in", text: "Use the same GitHub account as on the web." },
      { title: "Stay on track", text: "Tasks and streaks in your pocket." },
      { title: "Stay in sync", text: "Everything updates across devices." },
    ],
    underTheHood: [
      {
        name: "Mobile apps",
        role: "Clients",
        stack: "Android, iOS, Flutter / React Native",
      },
    ],
    builtBy: [
      "Android Mobile Dev",
      "IOS Mobile Dev",
      "Cross Platform Mobile App Development",
    ],
    faqs: [
      {
        q: "Where can I download it?",
        a: "The apps are in development; they will be announced on the blog and Discord.",
      },
    ],
    related: ["dashboard", "blog", "dijkstra-gpt"],
  },
  {
    slug: "universities",
    name: "Dijkstra for Universities",
    tagline: "See how ready your students really are",
    status: "in-development",
    icon: GraduationCap,
    audience: "Organisations",
    summary:
      "A dashboard for placement cells and faculty: visibility into every student's verified progress, and a structured, proof-of-work path to placements that does not depend on generic training.",
    cta: { label: "Talk to us", href: "/contact?topic=universities" },
    visual: { kind: "stream", stream: "dashboard" },
    highlights: [
      {
        icon: BarChart3,
        title: "Student monitoring",
        text: "Progress, rank distribution and activity across your cohorts.",
      },
      {
        icon: Briefcase,
        title: "Placement readiness",
        text: "Spot who is ready for which roles â€” and who needs help.",
      },
      {
        icon: Compass,
        title: "Post opportunities",
        text: "Share internships and programs with your students.",
      },
      {
        icon: Users,
        title: "Real experience",
        text: "Students contribute to Dijkstra's open-source projects as an apprenticeship.",
      },
    ],
    steps: [
      { title: "Partner with us", text: "We set up your university space." },
      {
        title: "Students onboard",
        text: "They join Dijkstra and start building proof of work.",
      },
      {
        title: "Track outcomes",
        text: "Follow progress and placements from your dashboard.",
      },
    ],
    underTheHood: [
      {
        name: "University Dashboard",
        role: "University portal",
        stack: "Next.js",
        repo: gh("Dijkstra-University-Dashboard"),
      },
      {
        name: "Dataforge",
        role: "Student data APIs",
        stack: "Python, FastAPI",
        repo: gh("Dataforge"),
      },
    ],
    builtBy: ["Full Stack Software Dev (FE+BE)"],
    faqs: [
      {
        q: "Is student data shared with us?",
        a: "Only with the student's consent, in line with Dijkstra's privacy policy.",
      },
    ],
    related: ["companies", "dashboard", "ranking"],
  },
  {
    slug: "companies",
    name: "Dijkstra for Companies",
    tagline: "Hire from proof of work",
    status: "in-development",
    icon: Building2,
    audience: "Organisations",
    summary:
      "Access a pool of students whose skills are visible in public work â€” ranked, verified and aligned with what you need â€” instead of relying on interviews alone.",
    cta: { label: "Talk to us", href: "/contact?topic=companies" },
    visual: { kind: "stream", stream: "ranking" },
    highlights: [
      {
        icon: Trophy,
        title: "Ranked talent",
        text: "Filter candidates by tier, skills and career path.",
      },
      {
        icon: GitBranch,
        title: "Verifiable work",
        text: "Every claim links back to code, reviews and projects.",
      },
      {
        icon: Target,
        title: "Better alignment",
        text: "Match students who actually want the role you offer.",
      },
      {
        icon: Wrench,
        title: "Role-ready",
        text: "Candidates have worked in real teams with code review.",
      },
    ],
    steps: [
      {
        title: "Describe your needs",
        text: "Tell us about roles, skills and locations.",
      },
      {
        title: "Browse the talent pool",
        text: "Filter by rank, skills and proof of work.",
      },
      { title: "Hire", text: "Engage candidates through Dijkstra." },
    ],
    underTheHood: [
      {
        name: "Company Dashboard",
        role: "Recruiter portal",
        stack: "Next.js",
        repo: gh("Dijkstra-Company-Dashboard"),
      },
      { name: "Helios", role: "Ranking", stack: "Rust" },
    ],
    builtBy: ["Full Stack Software Dev (FE+BE)", "Business Analysts"],
    faqs: [
      {
        q: "Can we post jobs today?",
        a: "Company dashboards are being built; contact us to join the pilot.",
      },
    ],
    related: ["ranking", "universities", "opportunities"],
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
