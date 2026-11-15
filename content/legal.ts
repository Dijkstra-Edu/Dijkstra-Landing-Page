/**
 * Legal pages. The authoritative Terms of Service, Privacy Policy, licence
 * and CLA live in the Dijkstra docs (Community section); these pages
 * summarise them in plain language and link to the full text, so the two can
 * never drift apart.
 */
import { siteConfig } from "@/lib/site";

const docs = (path: string) => `${siteConfig.docsUrl}/community/${path}/`;

export type LegalDoc = {
  slug: string;
  title: string;
  description: string;
  canonical?: { label: string; href: string };
  note?: string;
  sections: { heading: string; paragraphs?: string[]; bullets?: string[] }[];
};

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy",
    description:
      "How Dijkstra collects, uses and protects your data â€” in plain language.",
    canonical: {
      label: "Read the full Privacy Policy",
      href: docs("privacy-policy"),
    },
    note: "This is a summary of Dijkstra's Privacy Policy (effective 18 January 2026). If anything here differs from the full policy, the full policy applies.",
    sections: [
      {
        heading: "What we collect",
        bullets: [
          "Identification and verification documents you upload (for example a student ID).",
          "Contact and login data: name, email, phone number and institution.",
          "Academic records you choose to provide, such as results and transcripts.",
          "Profile and professional data: LinkedIn and GitHub links, repositories, portfolios, resumes, projects and skills.",
          "Usage data such as device, browser, pages viewed and interactions.",
        ],
      },
      {
        heading: "How we use it",
        bullets: [
          "To verify your eligibility and build your profile.",
          "To match you with opportunities such as internships, projects and events.",
          "To operate, secure and improve the platform, and to communicate with you.",
        ],
        paragraphs: [
          "We do not sell your personal data and do not use it for third-party advertising.",
        ],
      },
      {
        heading: "When we share it",
        bullets: [
          "With your consent â€” for example, when you apply to an opportunity.",
          "With service providers (such as hosting) under confidentiality obligations.",
          "When required by law, or to protect the safety and rights of users and Dijkstra.",
        ],
        paragraphs: [
          "Your data is never published in public repositories, open-source code or issue trackers.",
        ],
      },
      {
        heading: "Your rights",
        bullets: [
          "Access the data we hold about you and get a portable copy.",
          "Correct inaccurate data.",
          "Request deletion, subject to legal limits.",
          "Object to or restrict certain processing, and withdraw consent.",
        ],
      },
      {
        heading: "This website",
        paragraphs: [
          "This marketing site does not require an account, does not run analytics or advertising trackers and does not set tracking cookies. Team member avatars are loaded from GitHub. Messages sent through the contact form are used only to reply to you.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms",
    description: "The rules for using Dijkstra, summarised.",
    canonical: {
      label: "Read the full Terms of Service",
      href: docs("terms-of-service"),
    },
    note: "This is a summary of Dijkstra's Terms of Service (v1.0). The full terms are binding; this page is not.",
    sections: [
      {
        heading: "Using Dijkstra",
        bullets: [
          "Dijkstra is for students, recent graduates and other eligible users who meet the minimum legal age (or have guardian consent).",
          "Keep your account information accurate and your credentials private.",
          "Do not provide false documents, impersonate others, misuse the platform or scrape it.",
        ],
      },
      {
        heading: "No guaranteed outcomes",
        paragraphs: [
          "Dijkstra connects students with opportunities, but hiring and admission decisions are made by third parties. Dijkstra does not guarantee any job, internship or admission.",
        ],
      },
      {
        heading: "Your content",
        paragraphs: [
          "You own what you upload â€” projects, resumes and profiles. You grant Dijkstra a licence to host and display it to operate the platform and match you with opportunities.",
        ],
      },
      {
        heading: "Open source",
        paragraphs: [
          "Dijkstra's source code is open source under the Apache License 2.0; the licence governs your use of the code. The terms govern your use of the hosted service, its name and its brand.",
        ],
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookies",
    description: "Which cookies Dijkstra's websites use, and why.",
    sections: [
      {
        heading: "This website",
        paragraphs: [
          "dijkstra.org.in does not set cookies for analytics, advertising or tracking, and it does not need cookies to work.",
        ],
      },
      {
        heading: "The Dijkstra platform",
        paragraphs: [
          "Dijkstra Web uses strictly necessary cookies to keep you signed in (a session cookie issued after GitHub sign-in) and, on test environments, to remember that you passed the access check. These cookies are required for the service to work and are not used for tracking.",
        ],
      },
      {
        heading: "Third parties",
        paragraphs: [
          "When you follow links to GitHub, Discord, LinkedIn or other services, their own cookie policies apply.",
        ],
      },
    ],
  },
  {
    slug: "licenses",
    title: "Licenses",
    description:
      "How Dijkstra is licensed, and the open-source software this site is built on.",
    canonical: {
      label: "Read the Apache License 2.0 in the docs",
      href: docs("license"),
    },
    sections: [
      {
        heading: "Dijkstra",
        paragraphs: [
          "Dijkstra's repositories are released under the Apache License 2.0. Contributions are accepted under the Dijkstra Contributor License Agreement. The Helios ranking service is not open source.",
        ],
        bullets: [
          `Source code: ${siteConfig.links.github}`,
          `Contributor License Agreement: ${docs("contributor-agreements")}`,
        ],
      },
      {
        heading: "Open-source software used by this site",
        bullets: [
          "Next.js and React â€” MIT License",
          "Tailwind CSS â€” MIT License",
          "Radix UI and shadcn/ui components â€” MIT License",
          "framer-motion â€” MIT License",
          "Recharts â€” MIT License",
          "Lucide icons â€” ISC License; Tabler icons â€” MIT License",
          "date-fns â€” MIT License",
          "Geist font â€” SIL Open Font License 1.1",
        ],
      },
      {
        heading: "Trademarks",
        paragraphs: [
          'Company logos shown in the "where our members have gone" strip are trademarks of their respective owners and indicate where members have worked, not partnerships or endorsements.',
        ],
      },
    ],
  },
];

export const getLegalDoc = (slug: string) =>
  legalDocs.find((d) => d.slug === slug);
