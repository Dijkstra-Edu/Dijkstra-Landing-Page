"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { streamedFeatures, type Feature } from "@/content/features";
import {
  StreamSequence,
  StreamStatus,
} from "@/components/streaming/stream-sequence";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { StatusBadge } from "./status-badge";
import { streams } from "./streams";

/** How long a finished stream stays on screen before auto-advancing. */
const HOLD_MS = 3200;

function FeatureDetails({ feature }: { feature: Feature }) {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-neutral-300">
        {feature.description}
      </p>
      <ul className="space-y-2">
        {feature.bullets.map((b) => (
          <li key={b} className="flex gap-2 text-sm text-neutral-300">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
            {b}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <Link
          href={feature.href}
          className="inline-flex items-center gap-1 text-sm font-medium text-white hover:text-green-300"
        >
          Learn more <ArrowRight className="h-4 w-4" />
        </Link>
        {feature.platformPath && (
          <a
            href={`${siteConfig.platformUrl}${feature.platformPath}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-green-400 hover:text-green-300"
          >
            Open in Dijkstra Web <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}

/**
 * Interactive feature showcase. Each feature "streams" a small piece of the
 * product into the panel (generative-UI style). Auto-advances once a stream
 * has finished, until the visitor picks a feature themselves.
 */
export function FeatureStream() {
  const reduceMotion = useSafeReducedMotion();
  // Observe the stream panel itself: the whole grid can be much taller than a
  // phone viewport, which would make an "amount" threshold unreliable.
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { amount: 0.35 });
  const [active, setActive] = useState(0);
  const [run, setRun] = useState(0);
  const [done, setDone] = useState(false);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [autoplay, setAutoplay] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const startedAt = useRef<number | null>(null);
  const tablistRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  const feature = streamedFeatures[active];
  const stream = streams[feature.slug];
  const streaming = inView && !tabHidden;

  useEffect(() => {
    if (reduceMotion) setAutoplay(false);
  }, [reduceMotion]);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // On small screens the feature list is a horizontal scroller: keep the
  // active chip visible without scrolling the page vertically.
  useEffect(() => {
    const list = tablistRef.current;
    if (!list || list.scrollWidth <= list.clientWidth) return;
    const chip = list.children[active] as HTMLElement | undefined;
    if (!chip) return;
    list.scrollTo({ left: chip.offsetLeft - 16, behavior: "smooth" });
  }, [active]);

  // Reset bookkeeping for every new run.
  useEffect(() => {
    setDone(false);
    setElapsed(null);
    startedAt.current = null;
  }, [active, run]);

  useEffect(() => {
    if (streaming && startedAt.current === null) startedAt.current = Date.now();
  }, [streaming, active, run]);

  // Auto-advance after a finished stream has been on screen for a while.
  useEffect(() => {
    if (!done || !autoplay || hovered || !streaming) return;
    const t = window.setTimeout(() => {
      setActive((i) => (i + 1) % streamedFeatures.length);
    }, HOLD_MS);
    return () => window.clearTimeout(t);
  }, [done, autoplay, hovered, streaming]);

  const select = (index: number) => {
    setAutoplay(false);
    setActive(index);
    setRun((r) => r + 1);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const delta =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? -1
          : 0;
    if (!delta) return;
    e.preventDefault();
    const next =
      (active + delta + streamedFeatures.length) % streamedFeatures.length;
    select(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <div
      className="grid gap-6 lg:grid-cols-12 lg:gap-10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Feature list */}
      <div className="min-w-0 lg:col-span-5">
        <div
          ref={tablistRef}
          role="tablist"
          aria-label="Dijkstra features"
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="relative -mx-4 flex snap-x scroll-px-4 gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {streamedFeatures.map((f, i) => {
            const selected = i === active;
            return (
              <div key={f.slug} className="shrink-0 snap-start lg:shrink">
                <button
                  id={`${baseId}-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors lg:px-4 lg:py-3",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500",
                    selected
                      ? "border-white/20 bg-white/[0.04]"
                      : "border-transparent hover:bg-white/[0.03]",
                  )}
                >
                  <f.icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      selected ? "text-green-500" : "text-neutral-500",
                    )}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span
                        className={cn(
                          "whitespace-nowrap text-sm font-semibold",
                          selected ? "text-white" : "text-neutral-300",
                        )}
                      >
                        {f.name}
                      </span>
                      <StatusBadge
                        status={f.status}
                        className="hidden xl:inline-flex"
                      />
                    </span>
                    <span className="hidden truncate text-xs text-neutral-500 lg:block">
                      {f.tagline}
                    </span>
                  </span>
                </button>
                {/* Expanded details (desktop) */}
                <AnimatePresence initial={false}>
                  {selected && (
                    <motion.div
                      key="details"
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="hidden overflow-hidden lg:block"
                    >
                      <div className="px-4 pb-2 pt-3">
                        <FeatureDetails feature={f} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Details (mobile / tablet) */}
        <div className="mt-4 lg:hidden">
          <div className="mb-2 flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white">{feature.name}</h3>
            <StatusBadge status={feature.status} />
          </div>
          <FeatureDetails feature={feature} />
        </div>
      </div>

      {/* Stream panel */}
      <div className="min-w-0 lg:col-span-7">
        <div className="lg:sticky lg:top-28">
          <div
            ref={panelRef}
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-label={`${feature.name} demo`}
            className="overflow-hidden rounded-xl border border-white/10 bg-black"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <div className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <code className="min-w-0 flex-1 truncate font-mono text-xs text-neutral-400">
                <span className="text-green-500">dijkstra</span>{" "}
                {stream.command}
              </code>
              <StreamStatus
                done={done}
                label={
                  done && elapsed !== null
                    ? `done Â· ${(elapsed / 1000).toFixed(1)}s`
                    : undefined
                }
              />
              <button
                type="button"
                onClick={() => setRun((r) => r + 1)}
                aria-label="Replay this demo"
                className="rounded-md p-1 text-neutral-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="min-h-[380px] p-4 sm:min-h-[420px] sm:p-5">
              <StreamSequence
                key={`${feature.slug}-${run}`}
                steps={stream.steps}
                active={streaming}
                runKey={`${feature.slug}-${run}`}
                onComplete={() => {
                  setDone(true);
                  if (startedAt.current !== null)
                    setElapsed(Date.now() - startedAt.current);
                }}
              />
            </div>
          </div>
          {autoplay && !reduceMotion && (
            <p className="mt-3 text-center text-xs text-neutral-500 lg:text-left">
              Auto-playing Â· pick a feature to explore it yourself
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
