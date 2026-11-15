"use client";

import type React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Area,
  AreaChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/motion/count-up";
import type { ActivityPoint } from "./data";

export { CountUp };

/* -------------------------------------------------------------------------- */
/* Layout primitives                                                          */
/* -------------------------------------------------------------------------- */

export function MockCard({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      className={cn(
        "flex min-w-0 flex-col rounded-xl border border-neutral-200 bg-gradient-to-t from-neutral-100/70 to-white p-3 text-neutral-900 shadow-xs @2xl:p-4",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

export function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium text-neutral-500 @2xl:text-xs">
      {children}
    </p>
  );
}

export function TrendBadge({
  value,
  down = false,
}: {
  value: string;
  down?: boolean;
}) {
  const Icon = down ? TrendingDown : TrendingUp;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-medium",
        down
          ? "border-red-200 text-red-600"
          : "border-emerald-200 text-emerald-700",
      )}
    >
      <Icon className="h-3 w-3" />
      {value}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Charts                                                                     */
/* -------------------------------------------------------------------------- */

const GREEN = "#16a34a";
const GREEN_DARK = "#048304";

export function TaskRadar({
  data,
}: {
  data: { item: string; completed: number; target: number }[];
}) {
  const reduceMotion = useReducedMotion();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data} outerRadius="68%" margin={{ top: 4, bottom: 4 }}>
        <PolarGrid stroke="#d4d4d4" />
        <PolarAngleAxis
          dataKey="item"
          tick={{ fill: "#525252", fontSize: 10, fontWeight: 500 }}
        />
        <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 5]} />
        <Radar
          dataKey="target"
          stroke="#a3a3a3"
          fill="#e5e5e5"
          fillOpacity={0.6}
          isAnimationActive={!reduceMotion}
        />
        <Radar
          dataKey="completed"
          stroke={GREEN_DARK}
          fill={GREEN}
          fillOpacity={0.55}
          isAnimationActive={!reduceMotion}
          animationBegin={250}
          animationDuration={1100}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function LeetCodeGauge({
  easy,
  medium,
  hard,
}: {
  easy: number;
  medium: number;
  hard: number;
}) {
  const reduceMotion = useReducedMotion();
  const total = easy + medium + hard;
  // Three concentric half-rings (outer â†’ inner), like Dijkstra Web's gauge.
  const rings = [
    { value: easy, color: "#14b8a6", r: 50 },
    { value: medium, color: "#f59e0b", r: 41 },
    { value: hard, color: "#ef4444", r: 32 },
  ];
  return (
    <div className="relative mx-auto w-full max-w-[180px]">
      <svg viewBox="0 0 120 66" className="w-full" aria-hidden>
        {rings.map((ring, i) => {
          const d = `M ${60 - ring.r} 60 A ${ring.r} ${ring.r} 0 0 1 ${60 + ring.r} 60`;
          return (
            <g key={ring.color}>
              <path
                d={d}
                fill="none"
                stroke="#ececec"
                strokeWidth={6}
                strokeLinecap="round"
              />
              <motion.path
                d={d}
                fill="none"
                stroke={ring.color}
                strokeWidth={6}
                strokeLinecap="round"
                initial={{ pathLength: reduceMotion ? ring.value / total : 0 }}
                animate={{ pathLength: ring.value / total }}
                transition={{
                  duration: 1.1,
                  delay: 0.2 + i * 0.15,
                  ease: "easeOut",
                }}
              />
            </g>
          );
        })}
      </svg>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 text-center">
        <CountUp
          value={total}
          className="block text-base font-bold leading-none @2xl:text-xl"
        />
        <span className="text-[9px] text-neutral-500 @2xl:text-[10px]">
          Problems
        </span>
      </div>
    </div>
  );
}

export function ActivityArea({
  data,
  compact = false,
}: {
  data: ActivityPoint[];
  compact?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const series: { key: keyof ActivityPoint; color: string }[] = [
    { key: "LeetCode", color: "#14532d" },
    { key: "GitHub", color: "#15803d" },
    { key: "Projects", color: "#4ade80" },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <defs>
          {series.map((s) => (
            <linearGradient
              key={s.key}
              id={`fill-${s.key}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={s.color} stopOpacity={0.55} />
              <stop offset="95%" stopColor={s.color} stopOpacity={0.05} />
            </linearGradient>
          ))}
        </defs>
        {!compact && (
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            interval={6}
            tick={{ fontSize: 9, fill: "#737373" }}
          />
        )}
        {series.map((s, i) => (
          <Area
            key={s.key}
            type="natural"
            dataKey={s.key}
            stackId="a"
            stroke={s.color}
            strokeWidth={1.2}
            fill={`url(#fill-${s.key})`}
            isAnimationActive={!reduceMotion}
            animationBegin={i * 200}
            animationDuration={1300}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function Sparkline({
  data,
  dataKey,
  color = GREEN,
}: {
  data: ActivityPoint[];
  dataKey: keyof ActivityPoint;
  color?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={1.5}
          fill={color}
          fillOpacity={0.12}
          isAnimationActive={!reduceMotion}
          animationDuration={1200}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* -------------------------------------------------------------------------- */
/* Contribution heatmap                                                       */
/* -------------------------------------------------------------------------- */

const HEAT_LEVELS = [
  "bg-neutral-200",
  "bg-green-200",
  "bg-green-400",
  "bg-green-600",
  "bg-green-800",
];

export function ContributionHeatmap({ weeks }: { weeks: number[][] }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="flex gap-[3px]" aria-hidden>
      {weeks.map((days, w) => (
        <div key={w} className="flex flex-1 flex-col gap-[3px]">
          {days.map((level, d) => (
            <motion.div
              key={d}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + w * 0.035, duration: 0.25 }}
              className={cn("aspect-square rounded-[2px]", HEAT_LEVELS[level])}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Progress bar                                                               */
/* -------------------------------------------------------------------------- */

export function AnimatedBar({
  value,
  max = 100,
  delay = 0,
  className,
  barClassName = "bg-green-600",
}: {
  value: number;
  max?: number;
  delay?: number;
  className?: string;
  barClassName?: string;
}) {
  const reduceMotion = useReducedMotion();
  const pct = `${Math.min(100, (value / max) * 100)}%`;
  return (
    <div
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full bg-neutral-200",
        className,
      )}
    >
      <motion.div
        className={cn("h-full rounded-full", barClassName)}
        initial={reduceMotion ? { width: pct } : { width: 0 }}
        animate={{ width: pct }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
      />
    </div>
  );
}
