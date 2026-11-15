"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStreamingText } from "@/hooks/use-streaming-text";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";

/**
 * Streaming-UI primitives.
 *
 * They reproduce the "generative / streaming UI" pattern (as popularised by
 * AI SDKs and libraries such as streaming-ui): a response is not painted at
 * once â€” blocks arrive one after another, each preceded by a skeleton, and
 * text arrives token by token. Built on framer-motion (already a dependency)
 * so no extra runtime library is needed.
 */

export type StreamStep = {
  id: string;
  /** Time to "generate" this block after the previous one, in ms. */
  delayMs: number;
  render: () => React.ReactNode;
  /** Optional custom skeleton shown while this block is pending. */
  skeleton?: React.ReactNode;
};

export function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-white/[0.06]",
        "before:absolute before:inset-0 before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        className,
      )}
    />
  );
}

function DefaultSkeleton() {
  return (
    <div className="space-y-2">
      <Shimmer className="h-3 w-2/5" />
      <Shimmer className="h-10 w-full" />
    </div>
  );
}

/**
 * Reveals `steps` one after another while `active` is true. Resets whenever
 * `runKey` changes. Calls `onComplete` once every block has streamed in.
 */
export function StreamSequence({
  steps,
  active = true,
  runKey,
  onComplete,
  className,
}: {
  steps: StreamStep[];
  active?: boolean;
  runKey?: string | number;
  onComplete?: () => void;
  className?: string;
}) {
  const reduceMotion = useSafeReducedMotion();
  // Always start at 0 so server and client markup match; reduced-motion
  // users get every block right after mount (effect below).
  const [visible, setVisible] = useState(0);
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;

  // Restart the stream for a new run.
  useEffect(() => {
    setVisible(reduceMotion ? steps.length : 0);
  }, [runKey, reduceMotion, steps.length]);

  useEffect(() => {
    if (!active) return;
    if (visible >= steps.length) {
      completeRef.current?.();
      return;
    }
    const t = window.setTimeout(
      () => setVisible((v) => v + 1),
      steps[visible].delayMs,
    );
    return () => window.clearTimeout(t);
  }, [active, visible, steps]);

  const pending = visible < steps.length ? steps[visible] : null;

  return (
    <div className={cn("space-y-3", className)} aria-live="polite">
      <AnimatePresence initial={false}>
        {steps.slice(0, visible).map((step) => (
          <motion.div
            key={step.id}
            initial={
              reduceMotion ? false : { opacity: 0, y: 10, filter: "blur(4px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {step.render()}
          </motion.div>
        ))}
      </AnimatePresence>
      {pending && active && (
        <div key={`skeleton-${pending.id}`} aria-hidden>
          {pending.skeleton ?? <DefaultSkeleton />}
        </div>
      )}
    </div>
  );
}

/** Token-streamed text with a blinking caret while streaming. */
export function StreamingText({
  text,
  active = true,
  interval = 30,
  delay = 0,
  className,
  onDone,
}: {
  text: string;
  active?: boolean;
  interval?: number;
  delay?: number;
  className?: string;
  onDone?: () => void;
}) {
  const { text: shown, done } = useStreamingText(text, {
    active,
    interval,
    delay,
  });
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  useEffect(() => {
    if (done && active) doneRef.current?.();
  }, [done, active]);

  return (
    <span className={className}>
      {shown}
      {!done && active && (
        <span className="ml-0.5 inline-block h-[1em] w-1.5 translate-y-[0.15em] animate-pulse rounded-sm bg-green-500" />
      )}
    </span>
  );
}

/** "â— streamingâ€¦" / "âœ“ done" pill for the stream panel header. */
export function StreamStatus({
  done,
  label,
}: {
  done: boolean;
  label?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium",
        done
          ? "border-green-500/30 bg-green-500/10 text-green-400"
          : "border-white/10 bg-white/5 text-neutral-300",
      )}
    >
      {done ? (
        <Check className="h-3 w-3" />
      ) : (
        <Loader2 className="h-3 w-3 animate-spin" />
      )}
      {label ?? (done ? "done" : "streaming")}
    </span>
  );
}
