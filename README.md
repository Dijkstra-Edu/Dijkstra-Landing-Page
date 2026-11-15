<p align="center">
  <img src="public/icon.png" alt="Dijkstra" width="96" />
</p>

<h1 align="center">Dijkstra â€” Landing Page</h1>

<p align="center">
  The public marketing site for <a href="https://github.com/Dijkstra-Edu">Dijkstra</a>,
  the open-source, student-run platform that helps aspiring software engineers
  land jobs in tech through visible proof of work.
</p>

<p align="center">
  <a href="https://platform.dijkstra.org.in">Platform</a> â€¢
  <a href="https://docs.dijkstra.org.in">Docs</a> â€¢
  <a href="https://blogs.dijkstra.org.in">Blog</a> â€¢
  <a href="https://discord.gg/Ct82yF3KAU">Discord</a> â€¢
  <a href="https://www.linkedin.com/company/dijkstra-edu/">LinkedIn</a>
</p>

---

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| UI | React 18, Tailwind CSS v4, shadcn/ui (Radix) |
| Motion | framer-motion (respecting `prefers-reduced-motion`) |
| Fonts | Geist (bundled via the `geist` package â€” no network needed at build time) |

## Getting started

Requirements: **Node.js â‰¥ 18** and **npm â‰¥ 9**.

```bash
npm ci
cp .env.example .env.local   # optional â€” every variable has a sensible default
npm run dev                  # http://localhost:3000
```

Production build:

```bash
npm run build && npm run start
```

## Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_DIJKSTRA_PLATFORM_URL` | `https://platform.dijkstra.org.in` | Base URL of Dijkstra Web (login / onboarding / dashboard links). |
| `NEXT_PUBLIC_SITE_URL` | `https://dijkstra.org.in` | Canonical URL of this site (used for metadata / Open Graph). |
| `GITHUB_TEAMS_TOKEN` / `GITHUB_TOKEN` | â€” | **Server-only** token with `read:org` (classic) or *Members: read* (fine-grained). Enables live team members. |
| `GITHUB_ORG` (or `ORG`) | `Dijkstra-Edu` | Organisation whose teams are shown. |
| `TEAMS_PUBLIC_MEMBERS_ONLY` | `false` | Only show people who made their org membership public (counts still include everyone). |
| `TEAMS_REVALIDATE_SECONDS` | `3600` | Cache lifetime for team data. |
| `GITHUB_API_URL` | `https://api.github.com` | Only for GitHub Enterprise Server or tests. |
| `CONTACT_WEBHOOK_URL` | â€” | Where contact-form messages go: a Discord channel webhook or any JSON endpoint. Without it the form points people to Discord/LinkedIn. |

## Pages and content

Every link in the header, mega menus and footer resolves to a real page or a
real external destination. Navigation lives in `lib/navigation.ts`; page copy
lives in typed files under `content/` so non-developers can edit it:

| Route | Content source |
|---|---|
| `/features`, home showcase | `content/features.ts` |
| `/products`, `/products/[slug]` | `content/products.ts` (each product reuses its streaming demo) |
| `/blog`, `/blog/[slug]` | `content/blog.ts` |
| `/faq` | `content/faq.ts` |
| `/legal/[slug]` (terms, privacy, cookies, licenses) | `content/legal.ts` â€” plain-language summaries that link to the authoritative documents in the Docs |
| `/pricing`, `/roadmap`, `/integrations`, `/compare`, `/case-studies`, `/about`, `/mission`, `/careers`, `/contact`, `/press`, `/partners`, `/knowledge-base`, `/developers`, `/changelog` | the page files in `app/` |

`app/sitemap.ts` lists every route; `/api/*` is excluded in `app/robots.ts`.

## Teams (GitHub integration)

The "Current members" section and the [`/team`](app/team/page.tsx) page mirror the
teams of the `Dijkstra-Edu` GitHub organisation. Team names follow the
`[Kind] Name` convention â€” `[Dept]`, `[Group]`, `[Sub-Group]`, `[Team]`,
`[Projects]`, `[Project]` â€” e.g. `[Team] Data Engineering` â†’ slug
`team-data-engineering` (the same slugs Dijkstra Web's QA gate checks).

| Mode | When | What is shown |
|---|---|---|
| **Live** (`source: "github"`) | a token is configured | Hierarchy rebuilt from GitHub's `parentTeam`, **direct** members with avatars, team leads (maintainers), open teams |
| **Public members** (`source: "public-members"`) | no token | Snapshot hierarchy + counts, plus the org's public members |
| **Snapshot** (`source: "snapshot"`) | no token and GitHub unreachable, or the live call failed | Bundled hierarchy and member counts from `lib/teams/seed.ts` |

Live data is fetched server-side with a single GraphQL query (REST fallback),
cached for `TEAMS_REVALIDATE_SECONDS`, and the pages are regenerated hourly (ISR).
The token never reaches the browser.

### API

| Endpoint | Description |
|---|---|
| `GET /api/teams` | Full hierarchy, stats and people (`TeamsSnapshot`, see `lib/teams/types.ts`). |
| `GET /api/teams/:slug` | One team queried directly from GitHub: direct members, sub-teams and its path. |
| `GET /api/teams/:slug?member=<login>` | Same, plus whether `<login>` is in the team (`active` / `pending` / `none`; `unknown` without a token). Includes membership through sub-teams, like GitHub. Never cached publicly. |

```bash
curl https://dijkstra.org.in/api/teams/team-data-engineering?member=octocat
```

## Project structure

```
app/                      Next.js routes
  layout.tsx              Root layout, fonts, metadata
  page.tsx                Home page (ISR, hourly)
  team/                   /team â€” every team and its members
  api/teams/              /api/teams and /api/teams/:slug
components/
  landing-page.tsx        Composes the home page from sections
  landing/                One file per home-page section (hero, principles, â€¦)
  site/                   Shared chrome: header (mega menu + mobile menu), footer,
                          page shell/hero, section, CTA band, link card, prose renderer
  showcase/               Animated product preview used in the hero (live-rendered
                          Dijkstra Web frames: dashboard, GPT, ranking, â€¦)
  features/               Streaming feature showcase (+ per-feature stream scripts)
  streaming/              Streaming-UI primitives: StreamSequence, StreamingText, Shimmer
  motion/                 Lightweight motion helpers (CountUp, SVG sparkline)
content/                  Typed site content (features.ts is the single source of truth
                          for feature names, descriptions and Live/Beta/â€¦ status)
hooks/                    use-count-up, use-streaming-text, use-safe-reduced-motion, â€¦
  teams/                  Team explorer (tree + details) and people wall
  ui/                     shadcn/ui primitives
lib/
  site.ts                 Single source of truth for URLs and external links
  navigation.ts           Header mega menus, mobile menu and footer links
  contact.ts              Contact form schema (shared by client and API)
  seeded-random.ts        Deterministic PRNG for SSR-safe decorative randomness
  teams/                  GitHub teams: client (GraphQL + REST), tree builder, snapshot seed
public/                   Static assets (ranks/ and specializations/ come from Dijkstra Web)
```

### Conventions

- **No hard-coded URLs in components.** Add them to `lib/site.ts`.
- **No `Math.random()` / `new Date()` during render.** Anything rendered on the
  server must produce the same markup on the client; use `lib/seeded-random.ts`
  or compute client-only values inside `useEffect`.
- **Motion must be optional.** Auto-playing UI pauses on hover/focus, when
  off-screen and when the tab is hidden, offers a pause button, and respects
  `prefers-reduced-motion` (see `components/showcase/hero-showcase.tsx`).
- **Keep chart libraries out of the main bundle.** `recharts` is only used by the
  lazily-loaded hero showcase; elsewhere use `components/motion/*`.
- **Be honest about status.** Every feature carries a status (`live`, `beta`,
  `in-development`, `planned`) in `content/features.ts`; update it as work lands.
- **Links are links.** Use `<a>` / `<Link>` (optionally via `<Button asChild>`)
  instead of `onClick={() => window.location.href = â€¦}` so that middle-click,
  "open in new tab" and crawlers work.

## Contributing

1. Fork and clone the repository, then create a branch: `git checkout -b feat/my-change`.
2. Run `npm run build` before opening a PR â€” it type-checks the project.
3. Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `refactor:` â€¦).
4. Open a PR against `main` and link the related issue.

Join the conversation on [Discord](https://discord.gg/Ct82yF3KAU) if you need help.

## License

Licensed under the [Apache License 2.0](LICENSE).
