/**
 * Posts for /blog. Long-form community writing (LeetCode solutions, tutorials)
 * lives on the Dijkstra Blog (blogs.dijkstra.org.in); this is the project's
 * own announcements and explainers.
 */
import { platformLinks, siteConfig } from "@/lib/site";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "cta"; label: string; href: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Announcement" | "Engineering" | "Community" | "Guide";
  cover: string;
  coverAlt: string;
  featured?: boolean;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "dijkstra-blog-is-live",
    title: "Dijkstra Blog is live!",
    excerpt:
      "Discover how students are sharing what they've learnt through the Dijkstra blog â€” and how your LeetCode solutions will soon publish themselves.",
    category: "Announcement",
    cover: "/blog.png",
    coverAlt: "The Dijkstra Blog home page",
    featured: true,
    body: [
      {
        type: "p",
        text: "Learning in public is one of the fastest ways to get better â€” and one of the best ways to show employers how you think. That is why Dijkstra now has its own blog at blogs.dijkstra.org.in.",
      },
      { type: "h2", text: "What you will find there" },
      {
        type: "ul",
        items: [
          "Solution write-ups for LeetCode problems, from Plus One to Max Product Subarray, explained step by step.",
          "Articles on projects, system design and the things members learn while building Dijkstra.",
          "Author pages, tags and full-text search, so the right article is always a few keystrokes away.",
        ],
      },
      { type: "h2", text: "Solutions that publish themselves" },
      {
        type: "p",
        text: "Members contribute solutions to Dijkstra's LeetCode solutions repository. Archivist, our Go blog service, is being extended to watch that repository and turn every merged solution into a post under its author's name. Solve a problem, open a pull request â€” and your write-up appears on the blog and in your feed.",
      },
      {
        type: "quote",
        text: "Kill two birds with one stone: every problem you solve becomes public proof of how you think.",
      },
      { type: "h2", text: "Write with us" },
      {
        type: "p",
        text: "Anyone on Dijkstra can write. Articles and short posts can be drafted in Markdown from Dijkstra Web, and the Blog Mechanism team is always looking for contributors for the site itself.",
      },
      { type: "cta", label: "Read the blog", href: siteConfig.blogUrl },
    ],
  },
  {
    slug: "meet-dijkstra-gpt",
    title: "Meet Dijkstra GPT",
    excerpt:
      "A CS mentor that stays on topic, remembers your conversations and can look at your own metrics before it answers.",
    category: "Engineering",
    cover: "/dijkstra-gpt.png",
    coverAlt: "The Dijkstra GPT chat interface",
    body: [
      {
        type: "p",
        text: "General-purpose chatbots are great at everything and specific about nothing. Dijkstra GPT is built the other way around: it only answers questions about computer science, software engineering and careers â€” and it knows where you stand.",
      },
      { type: "h2", text: "What it can do today" },
      {
        type: "ul",
        items: [
          "Explain algorithms, data structures, debugging and system design with examples.",
          "Help you plan projects, interviews and your path into a role.",
          "Stream answers as they are generated, keep separate conversations and let you regenerate a reply.",
        ],
      },
      { type: "h2", text: "How it knows you" },
      {
        type: "p",
        text: "Dijkstra Intelligence, the service behind Dijkstra GPT, runs an agent with tools that are bound to your account on the server. When a question is about your progress, the agent fetches your metrics â€” experience, projects, problem solving, academics and open source â€” from Helios. The user id is fixed by the server, so the model can never ask for someone else's data.",
      },
      { type: "h2", text: "Staying on topic" },
      {
        type: "p",
        text: "A scoped system prompt keeps the assistant focused on learning and careers, declines unrelated requests and never invents metrics: if data is unavailable, it says so.",
      },
      { type: "h2", text: "What's next" },
      {
        type: "p",
        text: "The next stage adds deeper context awareness and retrieval over Dijkstra's learning content, so answers can point you to the exact article or path you need.",
      },
      {
        type: "cta",
        label: "Try Dijkstra GPT",
        href: `${siteConfig.platformUrl}/dijkstra-gpt`,
      },
    ],
  },
  {
    slug: "how-helios-ranks-proof-of-work",
    title: "How Helios turns proof of work into a rank",
    excerpt:
      "Why Dijkstra ranks students at all, which signals count, and how eleven tiers from Iron to Obsidian are meant to feel fair.",
    category: "Engineering",
    cover: "/dashboard.png",
    coverAlt: "The Dijkstra dashboard showing a Gold rank",
    body: [
      {
        type: "p",
        text: "Students rarely know how close they are to being hireable. Grades say little about engineering ability, and a pile of certificates says even less. Helios, Dijkstra's ranking service, exists to answer one question honestly: given the work you have actually done, where do you stand?",
      },
      { type: "h2", text: "Signals, not vibes" },
      {
        type: "p",
        text: "Helios scores signals that can be verified: open-source contributions, projects, problem solving, work experience and academics. GitHub activity arrives from GitRipper, which syncs commit history and listens to webhooks; profile data comes from Dataforge.",
      },
      { type: "h2", text: "Projects, reviewed by AI" },
      {
        type: "p",
        text: "A project's value is more than its line count. helios-ai builds a code graph of a repository and has an agent assess its scope, effectiveness and code quality, so well-built projects are recognised for what they are.",
      },
      { type: "h2", text: "Tiers that mean something" },
      {
        type: "p",
        text: "XP maps to tiers inspired by competitive games â€” Iron, Bronze, Silver, Gold, Platinum and beyond, up to Obsidian. Tiers unlock stronger opportunities on the board, which turns the rank from a vanity number into a plan.",
      },
      { type: "h2", text: "Why Helios is closed source" },
      {
        type: "p",
        text: "Everything else at Dijkstra is open source. Helios is the exception: it is the part of the platform that can sustain Dijkstra financially, and keeping it closed makes the rank harder to game.",
      },
      {
        type: "cta",
        label: "Learn about Helios ranking",
        href: "/products/ranking",
      },
    ],
  },
  {
    slug: "how-teams-work-at-dijkstra",
    title: "How teams work at Dijkstra",
    excerpt:
      "Departments, groups, teams and projects: how a student-run open-source organisation is structured, and how you can join.",
    category: "Community",
    cover: "/splash-icon.png",
    coverAlt: "The Dijkstra logo",
    body: [
      {
        type: "p",
        text: "Dijkstra is built to feel like a real engineering company. You do not just learn about software teams â€” you join one, ship features with code review, and grow into more responsibility.",
      },
      { type: "h2", text: "From department to project" },
      {
        type: "ul",
        items: [
          "Departments: Engineering & Technical Teams, Non-Engineering Teams, Mentors and the Organisation team.",
          "Groups: disciplines such as AI & ML Engineering, Software Development Engineering, Software Infrastructure, Software Security, Testing and QA, Design, Product and Outreach.",
          "Teams: tracks you grow in â€” Frontend, Backend, DevOps, ML Research, Android, Compilers and dozens more.",
          "Projects: where work ships, like Dijkstra GPT, the Resume and CV Builder, GitRipper or the QA Gate.",
        ],
      },
      {
        type: "p",
        text: "All of these are GitHub teams in the Dijkstra-Edu organisation, so joining a team is what gives you access to the right repositories and project boards. You can explore every team â€” and who is in it â€” on the Teams page.",
      },
      { type: "h2", text: "Growing through designations" },
      {
        type: "p",
        text: "Everyone starts as an intern. Based on your work, your rank and your mentor's sign-off you progress through SDE-1, SDE-2 and SDE-3 towards leading a team â€” the same ladder you will meet in industry.",
      },
      { type: "h2", text: "How to join" },
      {
        type: "ol",
        items: [
          "Complete onboarding on Dijkstra Web.",
          "Introduce yourself on Discord.",
          "Pick a team â€” open teams are a great place to make an impact early.",
          "Ship your first issue with a mentor reviewing your pull request.",
        ],
      },
      { type: "cta", label: "Explore the teams", href: "/team" },
    ],
  },
  {
    slug: "gsoc-2026-project-ideas",
    title: "Dijkstra's project ideas for GSoC 2026",
    excerpt:
      "Dijkstra aims to take part in Google Summer of Code as a mentoring organisation. Here are the projects we would love help with.",
    category: "Community",
    cover: "/splash-icon.png",
    coverAlt: "The Dijkstra logo",
    body: [
      {
        type: "p",
        text: "Google Summer of Code pays students to contribute to open source under the guidance of mentors â€” exactly what Dijkstra is about. In 2026 Dijkstra aims to participate as a mentoring organisation, and we have published a list of project ideas.",
      },
      { type: "h2", text: "The idea list" },
      {
        type: "ul",
        items: [
          "Android and iOS mobile apps for Dijkstra.",
          "The blog system and its automation.",
          "A browser extension for autofilling profile data.",
          "Dijkstra Intelligence: context-aware AI mentoring.",
          "Dijkstra Jira: personal goals and task management.",
          "The Dijkstra Team Planner: team discovery, management and a graph view.",
          "The Learning Hub and its learning content.",
          "The student dashboard and certificate generator.",
          "A testing setup across the application suite.",
          "Community improvements.",
        ],
      },
      { type: "h2", text: "How to apply" },
      {
        type: "ol",
        items: [
          "Read the project ideas and pick one project.",
          "Complete the Dijkstra onboarding flow, including joining the GitHub organisation and the LeetCode task.",
          "Solve one or two small issues in the project you are interested in.",
          "Email your draft proposal, the issues you solved and your completed tasks to gsoc@dijkstra.org.in.",
        ],
      },
      {
        type: "p",
        text: "Regardless of the outcome, we encourage applicants to contribute to other organisations too â€” and to keep building with us.",
      },
      {
        type: "cta",
        label: "See the GSoC 2026 docs",
        href: `${siteConfig.docsUrl}/gsoc-2026/overview/`,
      },
    ],
  },
  {
    slug: "your-first-week-on-dijkstra",
    title: "Your first week on Dijkstra",
    excerpt:
      "A practical onboarding checklist: the tools to set up, the tour to take and the first proof of work to ship.",
    category: "Guide",
    cover: "/dashboard.png",
    coverAlt: "The Dijkstra dashboard",
    body: [
      {
        type: "p",
        text: "New to Dijkstra? Here is how to make your first week count.",
      },
      { type: "h2", text: "Day 1: set up like an engineer" },
      {
        type: "p",
        text: "Onboarding walks you through GitHub, Git, VS Code, Discord, LeetCode and LinkedIn â€” the same tools working engineers use every day. Each step has a guide in the docs if you get stuck.",
      },
      { type: "h2", text: "Day 2: tell us about yourself" },
      {
        type: "p",
        text: "Fill in your profile: education, experience, projects and skills. Choose a primary specialisation and up to three secondary ones. Your profile feeds your resume, your rank and your opportunity matches.",
      },
      { type: "h2", text: "Days 3â€“5: start your proof of work" },
      {
        type: "ul",
        items: [
          "Look at your current rank and today's tasks on the dashboard.",
          "Ask Dijkstra GPT what to focus on first.",
          "Solve a LeetCode problem and contribute the solution â€” it can become your first blog post.",
          "Join a team and pick up a good first issue.",
        ],
      },
      { type: "h2", text: "Days 6â€“7: look ahead" },
      {
        type: "p",
        text: "Browse the opportunities board and shortlist a dream opportunity. Stronger opportunities unlock as you progress: learn skills, build projects, work on Dijkstra projects, then intern or apply to open-source programs.",
      },
      {
        type: "cta",
        label: "Start onboarding",
        href: platformLinks.onboarding,
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** Posts to surface on each product page (by product slug). */
const productPosts: Record<string, string[]> = {
  dashboard: ["your-first-week-on-dijkstra", "how-helios-ranks-proof-of-work"],
  ranking: ["how-helios-ranks-proof-of-work", "your-first-week-on-dijkstra"],
  "dijkstra-gpt": ["meet-dijkstra-gpt"],
  blog: ["dijkstra-blog-is-live", "how-teams-work-at-dijkstra"],
  opportunities: ["gsoc-2026-project-ideas"],
  "learning-hub": ["your-first-week-on-dijkstra"],
};

export function postsForProduct(productSlug: string): Post[] {
  return (productPosts[productSlug] ?? [])
    .map((slug) => getPost(slug))
    .filter((p): p is Post => Boolean(p));
}

/** Rough reading time at 220 words per minute. */
export function readingTime(post: Post): number {
  const words = post.body
    .map((b) =>
      "text" in b
        ? b.text
        : "items" in b
          ? b.items.join(" ")
          : "label" in b
            ? b.label
            : "",
    )
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 220));
}
