"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  IconBrandOpenai,
  IconDashboard,
  IconDatabase,
  IconListDetails,
  IconUserCircle,
  type Icon,
} from "@tabler/icons-react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell, type NavKey } from "./app-shell";
import { ScaledCanvas } from "./scaled-canvas";
import { DashboardFrame } from "./frames/dashboard-frame";
import { PortfolioFrame } from "./frames/portfolio-frame";
import { OpportunitiesFrame } from "./frames/opportunities-frame";
import { GptFrame } from "./frames/gpt-frame";
import { HomeFrame } from "./frames/home-frame";

type Frame = {
  id: string;
  /** Label of the selector tab under the preview. */
  label: string;
  /** Page title shown in Dijkstra Web's header. */
  title: string;
  /** Sidebar entry highlighted while this frame is active. */
  nav: NavKey;
  icon: Icon;
  durationMs: number;
  Component: () => JSX.Element;
};

export const showcaseFrames: Frame[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    title: "Dashboard",
    nav: "Dashboard",
    icon: IconDashboard,
    durationMs: 7000,
    Component: DashboardFrame,
  },
  {
    id: "portfolio",
    label: "Portfolio",
    title: "Dashboard",
    nav: "Dashboard",
    icon: IconUserCircle,
    durationMs: 7000,
    Component: PortfolioFrame,
  },
  {
    id: "opportunities",
    label: "Opportunities",
    title: "Opportunities",
    nav: "Projects Hub",
    icon: IconDatabase,
    durationMs: 7000,
    Component: OpportunitiesFrame,
  },
  {
    id: "gpt",
    label: "Dijkstra GPT",
    title: "Dijkstra GPT",
    nav: "Dijkstra GPT",
    icon: IconBrandOpenai,
    durationMs: 9500,
    Component: GptFrame,
  },
  {
    id: "home",
    label: "Home",
    title: "Home",
    nav: "Home",
    icon: IconListDetails,
    durationMs: 6000,
    Component: HomeFrame,
  },
];

/**
 * Animated product preview for the hero: Dijkstra Web itself â€” its sidebar,
 * header pins, dashboard cards, charts, portfolio, opportunities hub and
 * Dijkstra GPT â€” rendered live at real size and scaled to fit (see
 * ScaledCanvas), cycling through a few short storylines.
 *
 * Auto-advances; pauses on hover/focus, when scrolled out of view, when the
 * tab is hidden, or via the pause button. Honours `prefers-reduced-motion`
 * (no auto-advance, frames render in their final state).
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
        className="overflow-hidden rounded-xl border border-white/10 bg-black"
      >
        {/* The preview is a picture of the product: hide it from assistive
            tech (the tab labels describe each frame) and from pointer input. */}
        <div aria-hidden className="pointer-events-none select-none">
          <ScaledCanvas>
            {() => (
              <AppShell title={frame.title} active={frame.nav}>
                <AnimatePresence initial={false}>
                  <motion.div
                    key={frame.id}
                    className="absolute inset-0 bg-white"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <frame.Component />
                  </motion.div>
                </AnimatePresence>
              </AppShell>
            )}
          </ScaledCanvas>
        </div>
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
                    ? "border-white/25 bg-white/[0.06] text-white"
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
      <p className="mt-3 text-center text-xs text-neutral-500 sm:text-right">
        Dijkstra Web, rendered live Â· sample data
      </p>
    </div>
  );
}
