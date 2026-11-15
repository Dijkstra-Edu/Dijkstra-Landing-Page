"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { RotateCcw } from "lucide-react";
import {
  StreamSequence,
  StreamStatus,
} from "@/components/streaming/stream-sequence";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { streams } from "./streams";

/** A single feature's streaming demo that replays on a loop while visible. */
export function StreamDemo({ stream: key }: { stream: string }) {
  const stream = streams[key];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduceMotion = useSafeReducedMotion();
  const [run, setRun] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => setDone(false), [run]);

  useEffect(() => {
    if (!done || !inView || reduceMotion) return;
    const t = window.setTimeout(() => setRun((r) => r + 1), 4500);
    return () => window.clearTimeout(t);
  }, [done, inView, reduceMotion]);

  if (!stream) return null;
  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl shadow-green-950/30"
    >
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <code className="min-w-0 flex-1 truncate font-mono text-xs text-neutral-400">
          <span className="text-green-500">dijkstra</span> {stream.command}
        </code>
        <StreamStatus done={done} />
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          aria-label="Replay demo"
          className="rounded-md p-1 text-neutral-400 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="min-h-[360px] p-4 sm:p-5">
        <StreamSequence
          key={run}
          steps={stream.steps}
          active={inView}
          runKey={run}
          onComplete={() => setDone(true)}
        />
      </div>
    </div>
  );
}
