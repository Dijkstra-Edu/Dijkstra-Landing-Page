import { docsLinks, siteConfig } from "@/lib/site";

export type Faq = {
  q: string;
  a: string;
  link?: { label: string; href: string };
};

export const faqGroups: { title: string; items: Faq[] }[] = [
  {
    title: "General",
    items: [
      {
        q: "What is Dijkstra?",
        a: "An open-source, student-run platform that helps aspiring software engineers prepare for â€” and land â€” jobs in tech. It tracks your progress across GitHub, LeetCode and LinkedIn, ranks your proof of work, and gives you real team experience by building Dijkstra itself.",
      },
      {
        q: "Who is it for?",
        a: "Mainly university students preparing for software roles, especially those without strong placement support. Anyone who wants to break into tech can use it â€” complete beginners can start with the beginners' path.",
      },
      {
        q: "Is Dijkstra free?",
        a: "Yes. The platform is free for students and its code is open source. Paid tiers are being considered to fund the project; see Plans & Pricing for what is planned.",
        link: { label: "Plans & Pricing", href: "/pricing" },
      },
      {
        q: "Do I need prior experience?",
        a: "No. Onboarding sets you up with every tool, and the beginners' path starts with learning to code before moving on to projects and DSA.",
      },
    ],
  },
  {
    title: "Using the platform",
    items: [
      {
        q: "How does the ranking work?",
        a: "Helios scores verified signals â€” open source, projects, problem solving, experience and academics â€” into XP and one of eleven tiers from Iron to Obsidian.",
        link: { label: "Helios ranking", href: "/products/ranking" },
      },
      {
        q: "What data do you access from GitHub?",
        a: "Sign-in asks for your public profile, email and public repositories. Private repositories are never requested.",
      },
      {
        q: "Is Dijkstra GPT free?",
        a: "Dijkstra GPT is available on the platform in beta. Planned tiers may add higher usage limits in the future.",
        link: { label: "Dijkstra GPT", href: "/products/dijkstra-gpt" },
      },
      {
        q: "How is my data protected?",
        a: "Your personal data is not sold or shown publicly by default, and is only shared with your consent. The full privacy policy explains what is collected and your rights.",
        link: { label: "Privacy", href: "/legal/privacy" },
      },
    ],
  },
  {
    title: "Community & contributing",
    items: [
      {
        q: "How do I join a team?",
        a: "Complete onboarding, introduce yourself on Discord, pick a team and ship a first issue with a mentor reviewing your pull request.",
        link: { label: "Explore teams", href: "/team" },
      },
      {
        q: "How can I contribute code?",
        a: "Every Dijkstra service is on GitHub. Read the contribution guidelines, pick an issue and open a pull request.",
        link: {
          label: "Contribution guidelines",
          href: docsLinks.contributing,
        },
      },
      {
        q: "Can universities and companies partner with Dijkstra?",
        a: "Yes â€” university and company dashboards are being built. Get in touch to join early.",
        link: { label: "Partners", href: "/partners" },
      },
      {
        q: "Where do I ask for help?",
        a: "The Discord server is the fastest place to get help from mentors and other members.",
        link: { label: "Join Discord", href: siteConfig.links.discord },
      },
    ],
  },
];
