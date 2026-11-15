/**
 * Navigation for the header (mega menus), the mobile menu and the footer.
 * Every entry points to a real page or a real external destination.
 */
import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Building2,
  Compass,
  FileText,
  Gauge,
  GraduationCap,
  Newspaper,
  Smartphone,
  Trophy,
  Users,
} from "lucide-react";
import { platformLinks, siteConfig } from "@/lib/site";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  /** Tailwind classes for the icon tile. */
  tone?: string;
  external?: boolean;
};

export type MegaMenu = {
  id: string;
  label: string;
  intro: { title: string; description: string; cta: NavLink };
  columns: { title: string; links: NavLink[] }[];
  aside:
    | { kind: "links"; title: string; links: NavLink[] }
    | {
        kind: "featured";
        title: string;
        article: {
          title: string;
          excerpt: string;
          href: string;
          image: string;
        };
      };
};

export type NavItem =
  | { type: "mega"; menu: MegaMenu }
  | { type: "link"; link: NavLink };

export const resourceLinks: NavLink[] = [
  { label: "Documentation", href: siteConfig.docsUrl, external: true },
  { label: "Knowledge base", href: "/knowledge-base" },
  { label: "API reference", href: "/developers" },
  { label: "Changelog", href: "/changelog" },
  { label: "FAQ", href: "/faq" },
  { label: "Community", href: siteConfig.links.discord, external: true },
];

export const mainNav: NavItem[] = [
  {
    type: "mega",
    menu: {
      id: "features",
      label: "Features",
      intro: {
        title: "Features",
        description:
          "Everything your preparation needs â€” tracked, ranked and explained.",
        cta: { label: "All features", href: "/features" },
      },
      columns: [
        {
          title: "Track & grow",
          links: [
            {
              label: "Proof-of-work dashboard",
              href: "/products/dashboard",
              description: "GitHub, LeetCode and LinkedIn in one place",
              icon: Gauge,
              tone: "bg-emerald-500/10 text-emerald-400",
            },
            {
              label: "Helios ranking",
              href: "/products/ranking",
              description: "Your proof of work, turned into a rank",
              icon: Trophy,
              tone: "bg-amber-500/10 text-amber-400",
            },
            {
              label: "Dijkstra GPT",
              href: "/products/dijkstra-gpt",
              description: "A CS mentor that knows your progress",
              icon: Bot,
              tone: "bg-sky-500/10 text-sky-400",
            },
          ],
        },
        {
          title: "Build & get hired",
          links: [
            {
              label: "Resume & CV builder",
              href: "/products/resume-builder",
              description: "Your profile, compiled into a resume",
              icon: FileText,
              tone: "bg-rose-500/10 text-rose-400",
            },
            {
              label: "Opportunities board",
              href: "/products/opportunities",
              description: "Projects, fellowships and jobs that fit",
              icon: Compass,
              tone: "bg-violet-500/10 text-violet-400",
            },
            {
              label: "Teams & projects",
              href: "/team",
              description: "Ship real software with mentors",
              icon: Users,
              tone: "bg-lime-500/10 text-lime-400",
            },
          ],
        },
      ],
      aside: { kind: "links", title: "Resources", links: resourceLinks },
    },
  },
  {
    type: "mega",
    menu: {
      id: "products",
      label: "Products",
      intro: {
        title: "Products",
        description:
          "The Dijkstra platform suite, built in the open by students.",
        cta: { label: "All products", href: "/products" },
      },
      columns: [
        {
          title: "For students",
          links: [
            {
              label: "Dijkstra GPT",
              href: "/products/dijkstra-gpt",
              description: "AI mentor for CS and careers",
              icon: Bot,
              tone: "bg-green-500/10 text-green-400",
            },
            {
              label: "Resume Builder",
              href: "/products/resume-builder",
              description: "Resumes and CVs from your profile",
              icon: FileText,
              tone: "bg-red-500/10 text-red-400",
            },
            {
              label: "Ranking Algorithm",
              href: "/products/ranking",
              description: "Helios: XP and tiers from real work",
              icon: Trophy,
              tone: "bg-yellow-500/10 text-yellow-400",
            },
            {
              label: "Dijkstra Blog",
              href: "/products/blog",
              description: "Articles and auto-published solutions",
              icon: Newspaper,
              tone: "bg-blue-500/10 text-blue-400",
            },
          ],
        },
        {
          title: "For organisations",
          links: [
            {
              label: "Universities",
              href: "/products/universities",
              description: "Student progress and placement readiness",
              icon: GraduationCap,
              tone: "bg-sky-500/10 text-sky-400",
            },
            {
              label: "Companies",
              href: "/products/companies",
              description: "Hire from proof of work",
              icon: Building2,
              tone: "bg-fuchsia-500/10 text-fuchsia-400",
            },
            {
              label: "Dijkstra Mobile",
              href: "/products/mobile",
              description: "Community-built Android & iOS apps",
              icon: Smartphone,
              tone: "bg-violet-500/10 text-violet-400",
            },
          ],
        },
      ],
      aside: {
        kind: "links",
        title: "Explore further",
        links: [
          { label: "Plans & Pricing", href: "/pricing" },
          { label: "Product Roadmap", href: "/roadmap" },
          { label: "Integrations", href: "/integrations" },
          { label: "Comparisons", href: "/compare" },
          { label: "Case Studies", href: "/case-studies" },
        ],
      },
    },
  },
  {
    type: "mega",
    menu: {
      id: "about",
      label: "About",
      intro: {
        title: "About",
        description: "Who we are, why we exist and the people behind Dijkstra.",
        cta: { label: "About us", href: "/about" },
      },
      columns: [
        {
          title: "Dijkstra",
          links: [
            {
              label: "Our Mission",
              href: "/mission",
              description: "Preparing actively, not passively",
            },
            {
              label: "Team",
              href: "/team",
              description: "Every team, live from GitHub",
            },
            {
              label: "Careers",
              href: "/careers",
              description: "Grow with us through open source",
            },
            {
              label: "Contact Us",
              href: "/contact",
              description: "Get in touch with the team",
            },
          ],
        },
      ],
      aside: {
        kind: "featured",
        title: "Featured article",
        article: {
          title: "Dijkstra Blog is live!",
          excerpt:
            "Discover how students are sharing what they've learnt through the Dijkstra blogâ€¦",
          href: "/blog/dijkstra-blog-is-live",
          image: "/blog.png",
        },
      },
    },
  },
  { type: "link", link: { label: "Blog", href: "/blog" } },
  { type: "link", link: { label: "Testimonials", href: "/#testimonials" } },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Get Started",
    links: [
      { label: "Onboarding", href: platformLinks.onboarding, external: true },
      { label: "Dashboard", href: platformLinks.dashboard, external: true },
      { label: "Opportunities", href: "/products/opportunities" },
      { label: "API", href: "/developers" },
      { label: "Documentation", href: siteConfig.docsUrl, external: true },
    ],
  },
  {
    title: "Organization",
    links: [
      { label: "Mission", href: "/mission" },
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Press", href: "/press" },
      { label: "Partners", href: "/partners" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Features", href: "/features" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "Knowledge base", href: "/knowledge-base" },
      { label: "FAQ", href: "/faq" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/legal/terms" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Cookies", href: "/legal/cookies" },
      { label: "Licenses", href: "/legal/licenses" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Cookies", href: "/legal/cookies" },
];
