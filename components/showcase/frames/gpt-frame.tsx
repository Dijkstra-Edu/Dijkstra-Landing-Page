"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUp,
  Check,
  Loader2,
  Paperclip,
  Sparkles,
  Wrench,
} from "lucide-react";
import { useStreamingText } from "@/hooks/use-streaming-text";
import { demoUser, gptConversation } from "../data";

type Phase = "asking" | "tool" | "answering";

/**
 * Mirrors Dijkstra GPT: the agent (Dijkstra-Intelligence) calls a
 * user-scoped tool that reads the student's metrics from Helios, then streams
 * its answer token by token.
 */
export function GptFrame() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(
    reduceMotion ? "answering" : "asking",
  );

  useEffect(() => {
    if (reduceMotion) return;
    const t1 = window.setTimeout(() => setPhase("tool"), 700);
    const t2 = window.setTimeout(() => setPhase("answering"), 1700);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [reduceMotion]);

  const { text, done } = useStreamingText(gptConversation.answer, {
    active: phase === "answering",
    interval: 28,
  });

  return (
    <div className="flex h-full flex-col bg-white text-neutral-900">
      <div className="min-h-0 flex-1 space-y-3 overflow-hidden px-3 pt-3 @2xl:px-8 @2xl:pt-5 @4xl:px-16">
        <div className="hidden items-center gap-2 @lg:flex">
          <img src="/icon.png" alt="" className="h-7 w-7" />
          <div>
            <p className="text-sm font-semibold">
              Your personal CS prep assistant
            </p>
            <p className="text-[11px] text-neutral-500">
              Context-aware of your GitHub, LeetCode and rank
            </p>
          </div>
        </div>

        {/* User message */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="ml-auto flex max-w-[85%] items-start gap-2"
        >
          <p className="rounded-2xl rounded-tr-sm bg-neutral-900 px-3 py-2 text-xs text-white @2xl:text-sm">
            {gptConversation.question}
          </p>
          <img
            src={demoUser.avatar}
            alt=""
            className="hidden h-7 w-7 shrink-0 rounded-full @md:block"
          />
        </motion.div>

        {/* Assistant */}
        {phase !== "asking" && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex max-w-[92%] items-start gap-2"
          >
            <span className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-50 ring-1 ring-green-200 @md:flex">
              <img src="/icon.png" alt="" className="h-5 w-5" />
            </span>
            <div className="min-w-0 space-y-2">
              <div className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 font-mono text-[10px] text-neutral-600 @2xl:text-[11px]">
                <Wrench className="h-3 w-3" />
                <span>
                  {gptConversation.tool}
                  <span className="text-neutral-400">(user)</span>
                </span>
                <span className="text-neutral-400">â†’ Helios</span>
                {phase === "tool" ? (
                  <Loader2 className="h-3 w-3 animate-spin text-green-600" />
                ) : (
                  <Check className="h-3 w-3 text-green-600" />
                )}
              </div>
              {phase === "answering" && (
                <p className="text-xs leading-relaxed text-neutral-800 @2xl:text-sm">
                  {text}
                  {!done && (
                    <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse rounded-sm bg-green-600" />
                  )}
                </p>
              )}
              {done && (
                <div className="hidden flex-wrap gap-1.5 pt-1 @xl:flex">
                  {gptConversation.followUps.map((q, i) => (
                    <motion.span
                      key={q}
                      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.12 }}
                      className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1 text-[11px] text-neutral-700 shadow-xs"
                    >
                      <Sparkles className="h-3 w-3 text-green-600" />
                      {q}
                    </motion.span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Composer */}
      <div className="border-t border-neutral-100 p-3 @2xl:px-8 @4xl:px-16">
        <div className="rounded-xl border border-neutral-200 bg-white shadow-xs">
          <p className="px-3 pt-2.5 text-xs text-neutral-400">
            Ask about DSA, projects, resumes or your rankâ€¦
          </p>
          <div className="flex items-center justify-between px-2 pb-2 pt-3">
            <div className="flex gap-1 text-neutral-400">
              <Paperclip className="h-4 w-4" />
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="inline-flex items-center gap-1 rounded-lg bg-neutral-900 px-2.5 py-1 text-[11px] font-medium text-white">
              <ArrowUp className="h-3 w-3" /> Send
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
