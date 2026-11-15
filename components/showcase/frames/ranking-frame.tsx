"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedBar, CardLabel, CountUp, MockCard } from "../widgets";
import { currentRankIndex, rankLadder, xp, xpBreakdown } from "../data";

/**
 * Helios â€” Dijkstra's ranking service â€” turns proof of work into XP and a
 * tier. The ladder mirrors the ranking slide in Dijkstra Web.
 */
export function RankingFrame() {
  const reduceMotion = useReducedMotion();
  const current = rankLadder[currentRankIndex];

  return (
    <div className="flex h-full flex-col gap-3 p-3 @2xl:p-4">
      <div className="grid gap-3 @2xl:grid-cols-5">
        <MockCard className="@2xl:col-span-2">
          <CardLabel>Current tier</CardLabel>
          <div className="flex items-center gap-3 pt-1">
            <motion.img
              src={`/ranks/${current.key}.png`}
              alt={`${current.label} rank badge`}
              className="h-14 w-14 object-contain @2xl:h-20 @2xl:w-20"
              initial={
                reduceMotion ? false : { scale: 0.4, rotate: -20, opacity: 0 }
              }
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
            />
            <div className="min-w-0">
              <p className="text-xl font-bold @2xl:text-2xl">{current.label}</p>
              <p className="text-xs text-neutral-500">
                <CountUp value={xp.current} /> XP
              </p>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <AnimatedBar
              value={xp.current}
              max={xp.nextTier}
              delay={0.3}
              barClassName="bg-gradient-to-r from-amber-400 to-green-600"
              className="h-2"
            />
            <p className="text-[11px] text-neutral-500">
              {(xp.nextTier - xp.current).toLocaleString("en-US")} XP to{" "}
              <span className="font-medium text-neutral-800">
                {xp.nextTierLabel}
              </span>
            </p>
          </div>
        </MockCard>

        <MockCard className="hidden @md:flex @2xl:col-span-3" delay={0.12}>
          <CardLabel>Proof-of-work signals</CardLabel>
          <div className="mt-2 space-y-2">
            {xpBreakdown.map((s, i) => (
              <div
                key={s.label}
                className="grid grid-cols-[7.5rem_1fr_2rem] items-center gap-2"
              >
                <span className="truncate text-[11px] text-neutral-600">
                  {s.label}
                </span>
                <AnimatedBar value={s.value} delay={0.2 + i * 0.1} />
                <span className="text-right text-[11px] tabular-nums text-neutral-500">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </MockCard>
      </div>

      <MockCard className="min-h-0 flex-1" delay={0.2}>
        <div className="flex items-center justify-between">
          <CardLabel>The ladder</CardLabel>
          <span className="text-[10px] text-neutral-500">
            Merit-based Â· fair progression
          </span>
        </div>
        <div className="flex min-h-[150px] flex-1 items-stretch gap-1 pt-2 @2xl:gap-2">
          {rankLadder.map((rank, index) => {
            // Exponential growth, expressed as a % of the available height
            // so the ladder fills the card at every size.
            const heightPct =
              12 + Math.pow(index / (rankLadder.length - 1), 1.7) * 70;
            const isCurrent = index === currentRankIndex;
            const isLocked = index > currentRankIndex;
            return (
              <div
                key={rank.key}
                className={cn(
                  "flex min-w-0 flex-1 flex-col items-center justify-end",
                  index % 2 === 1 && !isCurrent && "hidden @lg:flex",
                )}
              >
                <img
                  src={`/ranks/${rank.key}.png`}
                  alt={rank.label}
                  title={rank.label}
                  className={cn(
                    "mb-1 h-7 w-7 object-contain @2xl:h-9 @2xl:w-9",
                    isLocked && "opacity-40 grayscale",
                    isCurrent && "drop-shadow-[0_0_8px_rgba(245,197,24,0.9)]",
                  )}
                />
                <motion.div
                  className={cn(
                    "w-full rounded-t-md",
                    isCurrent && "ring-2 ring-green-600 ring-offset-1",
                  )}
                  style={{
                    backgroundColor: rank.color,
                    opacity: isLocked ? 0.35 : 0.95,
                  }}
                  initial={
                    reduceMotion
                      ? { height: `${heightPct}%` }
                      : { height: "0%" }
                  }
                  animate={{ height: `${heightPct}%` }}
                  transition={{ duration: 0.6, delay: 0.25 + index * 0.06 }}
                />
                <span
                  className={cn(
                    "mt-1 hidden truncate text-[9px] @3xl:block",
                    isCurrent
                      ? "font-semibold text-green-700"
                      : "text-neutral-500",
                  )}
                >
                  {rank.label}
                </span>
              </div>
            );
          })}
        </div>
      </MockCard>
    </div>
  );
}
