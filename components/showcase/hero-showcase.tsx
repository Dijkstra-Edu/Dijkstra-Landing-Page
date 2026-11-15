"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  Bell,
  BookOpen,
  Bot,
  Briefcase,
  FolderKanban,
  Gauge,
  GraduationCap,
  Home,
  LayoutDashboard,
  Newspaper,
  Pause,
  Play,
  Sun,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardFrame } from "./frames/dashboard-frame";
import { GptFrame } from "./frames/gpt-frame";
import { RankingFrame } from "./frames/ranking-frame";
import { OpportunitiesFrame } from "./frames/opportunities-frame";
import { PortfolioFrame } from "./frames/portfolio-frame";
import { demoUser } from "./data";

type Frame = {
  id: string;
  label: string;
  /** Title shown in the app header. */
  title: string;
  /** Sidebar entry highlighted while this frame is active. */
  nav: string;
  icon: typeof Home;
  durationMs: number;
  Component: () => JSX.Element;
};

export const showcaseFrames: Frame[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    title: "Dashboard",
    nav: "Dashboard",
    icon: LayoutDashboard,
    durationMs: 6000,
    Component: DashboardFrame,
  },
  {
    id: "gpt",
    label: "Dijkstra GPT",
    title: "Dijkstra GPT",
    nav: "Dijkstra GPT",
    icon: Bot,
    durationMs: 7500,
    Component: GptFrame,
  },
  {
    id: "ranking",
    label: "Ranking",
    title: "Rank & XP",
    nav: "Dashboard",
    icon: Trophy,
    durationMs: 5500,
    Component: RankingFrame,
  },
  {
    id: "opportunities",
    label: "Opportunities",
    title: "Opportunities",
    nav: "Projects Hub",
    icon: Briefcase,
    durationMs: 5500,
    Component: OpportunitiesFrame,
  },
  {
    id: "portfolio",
    label: "Portfolio",
    title: "Portfolio",
    nav: "Home",
    icon: UserRound,
    durationMs: 5500,
    Component: PortfolioFrame,
  },
];

const sidebar: { label: string; icon: typeof Home; group?: string }[] = [
  { label: "Home", icon: Home },
  { label: "Dijkstra GPT", icon: Bot },
  { label: "Dashboard", icon: Gauge },
  { label: "Learning Hub", icon: BookOpen },
  { label: "Blogs and Articles", icon: Newspaper },
  { label: "Join a Team", icon: Users },
  { label: "Projects Hub", icon: FolderKanban, group: "Opportunities" },
  { label: "Fellowships", icon: GraduationCap },
  { label: "Job Board", icon: Briefcase },
];

/** Coloured integration buttons shown in Dijkstra Web's header. */
const headerDots = [
  "#ff4500",
  "#5b8def",
  "#f48024",
  "#5865f2",
  "#0a66c2",
  "#ffa116",
];

function AppChrome({
  frame,
  children,
}: {
  frame: Frame;
  children: React.ReactNode;
}) {
  return (
    <div className="@container relative flex h-full w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl shadow-green-950/40">
      {/* Sidebar (Dijkstra Web uses a dark inset sidebar) */}
      <aside className="hidden w-44 shrink-0 flex-col gap-0.5 px-2 py-3 text-white @3xl:flex">
        <div className="mb-3 flex items-center gap-2 px-2">
          <img src="/icon.png" alt="" className="h-6 w-6" />
          <span className="text-sm font-semibold">Dijkstra</span>
        </div>
        {sidebar.map((item) => (
          <div key={item.label}>
            {item.group && (
              <p className="mt-3 px-2 pb-1 text-[10px] uppercase tracking-wider text-neutral-500">
                {item.group}
              </p>
            )}
            <span
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] transition-colors",
                frame.nav === item.label
                  ? "bg-white/10 text-white"
                  : "text-neutral-400",
              )}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </span>
          </div>
        ))}
        <div className="mt-auto flex items-center gap-2 rounded-md px-2 py-1.5">
          <img src={demoUser.avatar} alt="" className="h-6 w-6 rounded-full" />
          <div className="min-w-0">
            <p className="truncate text-[11px] font-medium">{demoUser.name}</p>
            <p className="truncate text-[10px] text-neutral-500">
              @{demoUser.handle}
            </p>
          </div>
        </div>
      </aside>

      {/* Main panel */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-white @3xl:my-2 @3xl:mr-2 @3xl:rounded-xl">
        <header className="flex h-10 shrink-0 items-center gap-2 border-b border-neutral-100 px-3 text-neutral-900">
          <img src="/icon.png" alt="" className="h-5 w-5 @3xl:hidden" />
          <span className="text-xs font-semibold @2xl:text-sm">
            {frame.title}
          </span>
          <div className="ml-auto flex items-center gap-1">
            {headerDots.map((c) => (
              <span
                key={c}
                className="hidden h-5 w-5 rounded-md @2xl:block"
                style={{ backgroundColor: c }}
              />
            ))}
            <Sun className="ml-1 hidden h-4 w-4 text-neutral-400 @md:block" />
            <Bell className="h-4 w-4 text-neutral-400" />
            <span className="ml-1 rounded-md bg-neutral-900 px-2 py-1 text-[10px] font-medium text-white">
              Sign out
            </span>
          </div>
        </header>
        <div className="relative min-h-0 flex-1 overflow-hidden">
          {children}
          {/* Soft fade so clipped content on small screens looks intentional */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent" />
        </div>
      </div>
    </div>
  );
}

/**
 * Animated product preview for the hero: a quick sequence of frames that
 * render the graphs and assets of Dijkstra Web live (instead of a static
 * screenshot). Auto-advances; pauses on hover/focus, when scrolled out of
 * view, when the tab is hidden, or via the pause button. Honours
 * `prefers-reduced-motion` (no auto-advance, no animations).
 */
export function HeroShowcase() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.25 });
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const baseId = useId();

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const autoplay = !reduceMotion && !userPaused;
  const running = autoplay && !hovered && inView && !tabHidden;
  const frame = showcaseFrames[active];
  const next = () => setActive((i) => (i + 1) % showcaseFrames.length);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((i) => (i - 1 + showcaseFrames.length) % showcaseFrames.length);
    }
  };

  return (
    <div
      ref={rootRef}
      className="w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-roledescription="Product preview"
        aria-label={`${frame.label} preview`}
        className="relative h-[540px] md:h-[560px] lg:h-[600px]"
      >
        <AppChrome frame={frame}>
          <AnimatePresence initial={false}>
            <motion.div
              key={frame.id}
              className="absolute inset-0"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <frame.Component />
            </motion.div>
          </AnimatePresence>
        </AppChrome>
      </div>

      {/* Frame selector */}
      <div className="mt-4 flex items-center gap-2">
        <div
          role="tablist"
          aria-label="Product preview frames"
          onKeyDown={onKeyDown}
          className="grid flex-1 grid-cols-5 gap-1.5 sm:gap-2"
        >
          {showcaseFrames.map((f, i) => {
            const selected = i === active;
            return (
              <button
                key={f.id}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "group relative overflow-hidden rounded-lg border px-1.5 py-2 text-left transition-colors sm:px-3",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500",
                  selected
                    ? "border-green-600/60 bg-white/[0.06] text-white"
                    : "border-white/10 text-neutral-400 hover:border-white/25 hover:text-neutral-200",
                )}
              >
                <span className="flex items-center justify-center gap-1.5 sm:justify-start">
                  <f.icon className="h-4 w-4 shrink-0" />
                  <span className="hidden truncate text-xs font-medium sm:inline">
                    {f.label}
                  </span>
                </span>
                <span className="sr-only sm:hidden">{f.label}</span>
                {/* Progress: a CSS animation drives auto-advance, so pausing
                    is just animation-play-state. */}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white/5">
                  {selected && (
                    <span
                      key={`${f.id}-${active}`}
                      className={cn(
                        "block h-full origin-left bg-green-500",
                        autoplay ? "animate-showcase-progress" : "scale-x-100",
                      )}
                      style={{
                        animationDuration: `${f.durationMs}ms`,
                        animationPlayState: running ? "running" : "paused",
                      }}
                      onAnimationEnd={autoplay ? next : undefined}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
        {!reduceMotion && (
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={
              userPaused ? "Play product preview" : "Pause product preview"
            }
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-neutral-300 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
          >
            {userPaused ? (
              <Play className="h-4 w-4" />
            ) : (
              <Pause className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
