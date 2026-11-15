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
| Motion | framer-motion, GSAP |
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

## Project structure

```
app/                      Next.js routes
  layout.tsx              Root layout, fonts, metadata
  page.tsx                Home page
components/
  landing-page.tsx        Composes the home page from sections
  landing/                One file per home-page section (hero, principles, â€¦)
  site/                   Shared chrome: header (mega menu + mobile menu), footer
  showcase/               Animated product preview used in the hero (live-rendered
                          Dijkstra Web frames: dashboard, GPT, ranking, â€¦)
  features/               Streaming feature showcase (+ per-feature stream scripts)
  streaming/              Streaming-UI primitives: StreamSequence, StreamingText, Shimmer
  motion/                 Lightweight motion helpers (CountUp, SVG sparkline)
content/                  Typed site content (features.ts is the single source of truth
                          for feature names, descriptions and Live/Beta/â€¦ status)
hooks/                    use-count-up, use-streaming-text, use-safe-reduced-motion, â€¦
  ui/                     shadcn/ui primitives
lib/
  site.ts                 Single source of truth for URLs and external links
  seeded-random.ts        Deterministic PRNG for SSR-safe decorative randomness
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
