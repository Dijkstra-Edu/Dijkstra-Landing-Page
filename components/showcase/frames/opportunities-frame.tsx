"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, FolderGit2, GraduationCap, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedBar } from "../widgets";
import { opportunities, xp, type DemoOpportunity } from "../data";

const platinumLocked = opportunities.filter(
  (o) => o.unlocksAt === "Platinum",
).length;

const kindIcon: Record<DemoOpportunity["kind"], typeof Briefcase> = {
  Project: FolderGit2,
  Fellowship: GraduationCap,
  Internship: Briefcase,
};

const filters = ["All", "Projects", "Fellowships", "Jobs"];

/**
 * Mirrors the Opportunities board: opportunities unlock as the student's
 * rank grows ("stronger opportunities unlock the faster you progress").
 */
export function OpportunitiesFrame() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="flex h-full flex-col gap-3 p-3 text-neutral-900 @2xl:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold @2xl:text-base">
            Opportunities for you
          </p>
          <p className="text-[11px] text-neutral-500">
            Matched to your rank, skills and career path
          </p>
        </div>
        <div className="hidden gap-1 @xl:flex">
          {filters.map((f, i) => (
            <span
              key={f}
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-[11px]",
                i === 0
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-200 text-neutral-600",
              )}
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      <div className="grid min-h-0 flex-1 auto-rows-min gap-2.5 @md:grid-cols-2 @4xl:grid-cols-3">
        {opportunities.map((op, i) => {
          const Icon = kindIcon[op.kind];
          const isLocked = Boolean(op.unlocksAt);
          return (
            <motion.div
              key={op.title}
              initial={
                reduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.08 + i * 0.09 }}
              className={cn(
                "relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-3 shadow-xs",
                i >= 3 && "@max-md:hidden",
              )}
            >
              <div className="flex items-start gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold @2xl:text-sm">
                    {op.title}
                  </p>
                  <p className="truncate text-[11px] text-neutral-500">
                    {op.org} Â· {op.kind}
                  </p>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold tabular-nums",
                    op.match >= 80
                      ? "bg-green-100 text-green-800"
                      : op.match >= 65
                        ? "bg-amber-100 text-amber-800"
                        : "bg-neutral-100 text-neutral-700",
                  )}
                >
                  {op.match}% match
                </span>
              </div>
              <p className="mt-2 line-clamp-1 text-[11px] text-neutral-600">
                {op.summary}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {op.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] text-neutral-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[2px]">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-700 shadow-xs">
                    <Lock className="h-3 w-3" /> Unlocks at {op.unlocksAt}
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="hidden items-center gap-3 rounded-xl border border-green-200 bg-green-50/70 p-3 @lg:flex"
      >
        <img src="/ranks/PLATINUM_1.png" alt="" className="h-9 w-9 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-neutral-900">
            {platinumLocked} more opportunities unlock at Platinum
          </p>
          <AnimatedBar
            value={xp.current}
            max={xp.nextTier}
            delay={0.9}
            className="mt-1.5"
          />
        </div>
        <span className="shrink-0 text-[11px] font-medium text-green-800">
          {(xp.nextTier - xp.current).toLocaleString("en-US")} XP to go
        </span>
      </motion.div>
    </div>
  );
}
