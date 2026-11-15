/**
 * Central site configuration.
 *
 * Every external URL used by the landing page lives here so that links are
 * never hard-coded inside components, and so that missing environment
 * variables degrade to sensible production defaults instead of producing
 * broken links such as `undefined/login`.
 */

const trimTrailingSlash = (url: string) => url.replace(/\/+$/, "");

export const siteConfig = {
  name: "Dijkstra",
  tagline: "For Students, By Students",
  description:
    "Dijkstra is an open-source, student-run platform that helps aspiring software engineers prepare for â€” and land â€” jobs in tech through visible proof of work.",
  url: trimTrailingSlash(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://dijkstra.org.in",
  ),
  /** The Dijkstra Web student platform (separate Next.js app). */
  platformUrl: trimTrailingSlash(
    process.env.NEXT_PUBLIC_DIJKSTRA_PLATFORM_URL ??
      "https://platform.dijkstra.org.in",
  ),
  docsUrl: "https://docs.dijkstra.org.in",
  blogUrl: "https://blogs.dijkstra.org.in",
  githubOrg: "Dijkstra-Edu",
  links: {
    github: "https://github.com/Dijkstra-Edu",
    discord: "https://discord.gg/Ct82yF3KAU",
    linkedin: "https://www.linkedin.com/company/dijkstra-edu/",
  },
} as const;

/** Deep links into the Dijkstra Web platform. */
export const platformLinks = {
  login: `${siteConfig.platformUrl}/login`,
  onboarding: `${siteConfig.platformUrl}/onboarding`,
  dashboard: `${siteConfig.platformUrl}/dashboard`,
} as const;
