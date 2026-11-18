"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, MessageSquare } from "lucide-react";
import {
  IconMicrophone,
  IconPaperclip,
  IconPhoto,
  IconSparkles,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useStreamingText } from "@/hooks/use-streaming-text";
import { gptConversation, gptExamples } from "../data";
import { useTimeline } from "../use-timeline";

function InputArea({
  value,
  sending,
  compact,
}: {
  value: string;
  sending: boolean;
  compact?: boolean;
}) {
  return (
    <div className="relative mx-auto w-full max-w-4xl">
      <div className="overflow-hidden rounded-3xl border border-gray-200/50 bg-white shadow-lg shadow-black/5">
        <div
          className={cn(
            "px-4 pt-4 text-sm",
            compact ? "min-h-[44px]" : "min-h-[64px]",
            value ? "text-gray-950" : "text-gray-500/70",
          )}
        >
          {value || "Describe what you want to build..."}
          {value && !sending && (
            <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-gray-950" />
          )}
        </div>
        <div className="flex items-center justify-between px-3 pb-3">
          <div className="flex items-center gap-1 text-gray-500">
            {[IconMicrophone, IconPaperclip, IconPhoto, IconSparkles].map(
              (ToolIcon, i) => (
                <span
                  key={i}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl"
                >
                  <ToolIcon className="h-4 w-4" />
                </span>
              ),
            )}
          </div>
          <span
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-xl px-4 text-sm font-medium text-white transition-colors duration-300",
              value ? "bg-gray-950" : "bg-gray-950/50",
            )}
          >
            <ArrowUp className="h-4 w-4" /> Send
          </span>
        </div>
      </div>
      {!compact && (
        <p className="mt-3 text-center text-xs text-gray-500">
          Press{" "}
          <kbd className="rounded border border-gray-200/50 bg-gray-100/80 px-1.5 py-0.5 font-mono">
            âŒ˜ Enter
          </kbd>{" "}
          to send
        </p>
      )}
    </div>
  );
}

/** Renders "- item" lines as a list, like Dijkstra GPT's message renderer. */
function MessageBody({ text }: { text: string }) {
  return (
    <div className="space-y-1 text-sm leading-relaxed">
      {text.split("\n").map((line, i) =>
        line.trim().startsWith("- ") ? (
          <li key={i} className="ml-4 list-disc">
            {line.replace(/^-\s+/, "")}
          </li>
        ) : (
          <p key={i}>{line}</p>
        ),
      )}
    </div>
  );
}

/**
 * Dijkstra GPT (Dijkstra-Web components/dijkstra-gpt.tsx): the empty state
 * with example prompts, a question being typed and sent, a "Thinkingâ€¦"
 * indicator, then the answer streaming in token by token.
 */
export function GptFrame() {
  const reduceMotion = useReducedMotion();
  const step = useTimeline([700, 2600, 3500]);
  const typing = step >= 1;
  const sent = step >= 2;
  const answering = step >= 3;

  const question = gptConversation.question;
  const typed = useStreamingText(question, { active: typing, interval: 55 });
  const answer = useStreamingText(gptConversation.answer, {
    active: answering,
    interval: 40,
  });

  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-br from-white via-white to-gray-100/20">
      <AnimatePresence mode="wait" initial={false}>
        {!sent ? (
          <motion.div
            key="empty"
            className="flex-1 overflow-hidden px-4"
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center space-y-2 pb-6 pt-10 text-center">
              <img src="/icon.png" alt="" className="h-[120px] w-[120px]" />
              <h2 className="text-2xl font-semibold">
                Your Personal CS Prep Assistant
              </h2>
              <p className="max-w-3xl text-center text-gray-500">
                This model has been trained on a wide range of computer science
                topics, tips and tricks, resources, and more to help you on your
                journey towards becoming a Computer Science Engineer. It is also
                context aware of what you do within GitHub and Leetcode. Happy
                coding :)
              </p>
            </div>
            <div className="mx-auto max-w-[560px] pb-8 pt-4">
              <InputArea value={typed.text} sending={false} />
            </div>
            <div className="mx-auto w-full max-w-[560px] space-y-6">
              <div className="text-center">
                <h2 className="mb-2 text-lg font-semibold text-gray-950/90">
                  Get started with these examples
                </h2>
                <p className="text-sm text-gray-500">
                  Click any prompt to try it out
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 @3xl/app:grid-cols-2">
                {gptExamples.map((example) => (
                  <div
                    key={example}
                    className="rounded-2xl border border-gray-200/50 bg-white p-4 text-left"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-black/10 to-green-800/10">
                        <MessageSquare className="h-4 w-4 text-green-800" />
                      </div>
                      <span className="text-sm font-medium leading-relaxed text-gray-950/80">
                        {example}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            className="flex min-h-0 flex-1 flex-col"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="min-h-0 flex-1 overflow-hidden p-6">
              <div className="mx-auto max-w-4xl">
                <motion.div
                  className="mb-6 flex justify-end"
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="max-w-[80%] rounded-2xl bg-gray-950 p-4 text-sm text-white shadow-lg">
                    {question}
                  </div>
                </motion.div>
                {!answering ? (
                  <div className="mb-6 flex justify-start">
                    <div className="rounded-2xl border border-gray-200/50 bg-white p-4 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {[0, 0.1, 0.2].map((d) => (
                            <div
                              key={d}
                              className="h-2 w-2 animate-bounce rounded-full bg-gray-950"
                              style={{ animationDelay: `${d}s` }}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-500">Thinking...</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 flex justify-start">
                    <div className="max-w-[80%] rounded-2xl border border-gray-200/50 bg-white p-4 shadow-lg">
                      <MessageBody text={answer.text} />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="shrink-0 border-t border-gray-200/50 p-6">
              <InputArea value="" sending compact />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
