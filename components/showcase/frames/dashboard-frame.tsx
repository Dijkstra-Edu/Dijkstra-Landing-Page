"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/motion/count-up";
import { activity, leetcode, taskRadar } from "../data";
import { useTimeline } from "../use-timeline";
import {
  WBadge,
  WCard,
  WCardContent,
  WCardDescription,
  WCardFooter,
  WCardHeader,
  WCardTitle,
  WTabs,
} from "../web-ui";
import { ProfileRail } from "./profile-rail";

export const DASHBOARD_TABS = [
  "Stats",
  "Portfolio",
  "Readme",
  "Resume",
  "CV",
  "Achievements",
];

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/** "Tasks For the Day" â€” radar with todo/completed per area. */
function TasksCard() {
  const reduceMotion = useReducedMotion();
  return (
    <WCard gradient className="h-full">
      <WCardHeader>
        <WCardDescription>Tasks For the Day</WCardDescription>
        <WCardTitle className="text-3xl font-semibold tabular-nums">
          <CountUp value={17} duration={900} />
          /21 Completed
        </WCardTitle>
      </WCardHeader>
      <WCardContent className="flex-1 pb-0">
        <div className="mx-auto aspect-[1.2] max-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              data={taskRadar}
              margin={{ top: 10, right: 34, bottom: 10, left: 34 }}
            >
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis
                dataKey="item"
                tick={({ x, y, textAnchor, index }) => {
                  const d = taskRadar[index];
                  const ty = typeof y === "number" ? y : 0;
                  return (
                    <text
                      x={x}
                      y={index === 0 ? ty - 10 : ty}
                      textAnchor={textAnchor}
                      fontSize={13}
                      fontWeight={500}
                      fill="#030712"
                    >
                      <tspan>{d.todo}</tspan>
                      <tspan fill="#6a7282">/</tspan>
                      <tspan>{d.completed}</tspan>
                      <tspan x={x} dy="1rem" fontSize={12} fill="#6a7282">
                        {d.item}
                      </tspan>
                    </text>
                  );
                }}
              />
              <Radar
                dataKey="todo"
                fill="#030712"
                fillOpacity={0.6}
                isAnimationActive={!reduceMotion}
                animationDuration={1000}
              />
              <Radar
                dataKey="completed"
                fill="#030712"
                isAnimationActive={!reduceMotion}
                animationBegin={200}
                animationDuration={1100}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </WCardContent>
      <WCardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="flex gap-2 font-medium">
          Trending up this month <IconTrendingUp className="size-4" />
        </div>
        <div className="text-gray-500">Visitors for the last 6 months</div>
      </WCardFooter>
    </WCard>
  );
}

function TrendBadge({ value, down }: { value: string; down?: boolean }) {
  const TrendIcon = down ? IconTrendingDown : IconTrendingUp;
  return (
    <WBadge>
      <TrendIcon /> {value}
    </WBadge>
  );
}

function StatCard({
  label,
  value,
  badge,
  down,
  line,
  sub,
  children,
}: {
  label: string;
  value: React.ReactNode;
  badge: string;
  down?: boolean;
  line: string;
  sub: string;
  children?: React.ReactNode;
}) {
  const TrendIcon = down ? IconTrendingDown : IconTrendingUp;
  return (
    <WCard gradient className="h-full">
      <WCardHeader action={<TrendBadge value={badge} down={down} />}>
        <WCardDescription>{label}</WCardDescription>
        <WCardTitle className="whitespace-nowrap text-3xl font-semibold tabular-nums">
          {value}
        </WCardTitle>
        {children}
      </WCardHeader>
      <WCardFooter className="mt-auto flex-col items-start gap-1.5 text-sm">
        <div className="flex gap-2 font-medium">
          {line} <TrendIcon className="size-4" />
        </div>
        <div className="text-gray-500">{sub}</div>
      </WCardFooter>
    </WCard>
  );
}

/** "Leetcode Work" â€” three half rings (easy / medium / hard). */
function LeetcodeCard() {
  const reduceMotion = useReducedMotion();
  const total = leetcode.easy + leetcode.medium + leetcode.hard;
  const max = Math.max(90, leetcode.easy, leetcode.medium, leetcode.hard);
  const rings = [
    { value: 90, color: "#EF4743", r: 104 },
    { value: 70, color: "#FFC01E", r: 90 },
    { value: 60, color: "#00AF9B", r: 76 },
  ];
  return (
    <WCard gradient className="h-full">
      <WCardHeader className="pb-0">
        <WCardTitle>Leetcode Work</WCardTitle>
        <WCardDescription>January - June 2025</WCardDescription>
      </WCardHeader>
      <WCardContent className="flex flex-1 items-center pb-0">
        <div className="relative mx-auto w-full max-w-[250px]">
          <svg viewBox="0 0 250 140" className="w-full" aria-hidden>
            {rings.map((ring, i) => {
              const d = `M ${125 - ring.r} 128 A ${ring.r} ${ring.r} 0 0 1 ${125 + ring.r} 128`;
              return (
                <motion.path
                  key={ring.color}
                  d={d}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth={10}
                  strokeLinecap="round"
                  initial={{ pathLength: reduceMotion ? ring.value / max : 0 }}
                  animate={{ pathLength: ring.value / max }}
                  transition={{ duration: 1.1, delay: 0.2 + i * 0.15 }}
                />
              );
            })}
          </svg>
          <div className="absolute inset-x-0 bottom-1 text-center">
            <CountUp
              value={total}
              className="block text-2xl font-bold leading-none"
            />
            <span className="text-sm text-gray-500">Problems</span>
          </div>
        </div>
      </WCardContent>
      <WCardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-center leading-none text-gray-500">
          Showing total problems for the last 6 months
        </div>
      </WCardFooter>
    </WCard>
  );
}

const RANGES = [
  { key: "90d", label: "Last 3 months", days: 91 },
  { key: "30d", label: "Last 30 days", days: 30 },
  { key: "7d", label: "Last 7 days", days: 7 },
] as const;

/** "All Activity" â€” stacked natural areas + the interactive range toggle. */
function ActivityCard({
  range,
  showTooltip,
}: {
  range: (typeof RANGES)[number]["key"];
  showTooltip: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const days = RANGES.find((r) => r.key === range)!.days;
  const data = useMemo(() => activity.slice(-days), [days]);
  const tipIndex = Math.min(10, data.length - 1);
  const tip = data[tipIndex];
  const series = [
    { key: "LeetCode", fill: "#d1d5dc" },
    { key: "GitHub", fill: "#99a1af" },
    { key: "LinkedIn", fill: "#6a7282" },
    { key: "Projects", fill: "#364153" },
  ] as const;

  return (
    <WCard className="@container/card">
      <WCardHeader
        action={
          <div className="hidden items-center rounded-md border border-gray-200 shadow-xs @[560px]/card:flex">
            {RANGES.map((r, i) => (
              <span
                key={r.key}
                className={cn(
                  "h-9 px-4 text-sm font-medium leading-9 transition-colors duration-300",
                  i > 0 && "border-l border-gray-200",
                  range === r.key ? "bg-gray-100" : "bg-white",
                )}
              >
                {r.label}
              </span>
            ))}
          </div>
        }
      >
        <WCardTitle>All Activity</WCardTitle>
        <WCardDescription>
          Total for the{" "}
          {RANGES.find((r) => r.key === range)!.label.toLowerCase()}
        </WCardDescription>
      </WCardHeader>
      <WCardContent className="relative px-2 pt-4 @[560px]/card:px-6 @[560px]/card:pt-6">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                {series.map((s) => (
                  <linearGradient
                    key={s.key}
                    id={`wd-fill-${s.key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={s.fill} stopOpacity={0.95} />
                    <stop offset="95%" stopColor={s.fill} stopOpacity={0.1} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid vertical={false} stroke="#f3f4f6" />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tick={{ fontSize: 12, fill: "#6a7282" }}
              />
              {series.map((s, i) => (
                <Area
                  key={s.key}
                  dataKey={s.key}
                  type="natural"
                  stackId="a"
                  stroke={s.fill}
                  fill={`url(#wd-fill-${s.key})`}
                  isAnimationActive={!reduceMotion}
                  animationBegin={i * 120}
                  animationDuration={900}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* Tooltip, as shown when hovering the chart in Dijkstra Web */}
        <motion.div
          aria-hidden
          initial={false}
          animate={{ opacity: showTooltip ? 1 : 0, y: showTooltip ? 0 : 4 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-none absolute top-10 grid min-w-[8rem] gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs shadow-xl"
          style={{
            left: `${(tipIndex / Math.max(1, data.length - 1)) * 88 + 8}%`,
          }}
        >
          <div className="font-medium">{tip.day}</div>
          {(
            [
              ["Leetcode", tip.LeetCode],
              ["Github", tip.GitHub],
              ["LinkedIn", tip.LinkedIn],
              ["Projects", tip.Projects],
            ] as const
          ).map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between gap-4"
            >
              <span className="flex items-center gap-1.5 text-gray-500">
                <span className="h-2 w-2 rounded-[2px] bg-gray-900" />
                {label}
              </span>
              <span className="font-mono font-medium tabular-nums text-gray-950">
                {value}
              </span>
            </div>
          ))}
        </motion.div>
      </WCardContent>
    </WCard>
  );
}

/**
 * Dashboard â†’ "Stats" tab (Dijkstra-Web app/dashboard/page.tsx):
 * SectionCards + ChartAreaInteractive on the left, ProfileData on the right.
 * Storyline: cards and charts animate in, the chart tooltip appears, then
 * the range toggle switches to "Last 30 days".
 */
export function DashboardFrame() {
  const step = useTimeline([1800, 3900]);
  const range = step >= 2 ? "30d" : "90d";

  return (
    <div className="h-full overflow-hidden px-4 @5xl/app:px-6">
      <div className="flex flex-row gap-6 py-4">
        <div className="flex min-w-0 flex-[3] flex-col gap-4">
          <WTabs
            tabs={DASHBOARD_TABS}
            active="Stats"
            disabled={["Achievements"]}
          />
          <div className="grid grid-cols-1 gap-4 @3xl/app:grid-cols-2 @7xl/app:grid-cols-4">
            <Reveal className="@3xl/app:col-span-2 @7xl/app:row-span-2">
              <TasksCard />
            </Reveal>
            <Reveal delay={0.08}>
              <StatCard
                label="Rank"
                value={<>Top 4.5%</>}
                badge="+4.5%"
                line="Steady performance increase"
                sub="Meets growth projections"
              >
                <div className="flex w-full justify-center">
                  <img
                    src="/ranks/GOLD_1.png"
                    alt=""
                    className="mt-6 h-[88px] w-[88px] object-contain"
                  />
                </div>
              </StatCard>
            </Reveal>
            <Reveal delay={0.14}>
              <LeetcodeCard />
            </Reveal>
            <Reveal delay={0.2}>
              <StatCard
                label="GitHub Activity"
                value={
                  <>
                    <CountUp value={45} format={(n) => (n / 10).toFixed(1)} />%
                  </>
                }
                badge="+4.5%"
                line="Steady performance increase"
                sub="Meets growth projections"
              />
            </Reveal>
            <Reveal delay={0.26}>
              <StatCard
                label="LinkedIn Activity"
                value={<CountUp value={1234} />}
                badge="-20%"
                down
                line="Down 20% this period"
                sub="Acquisition needs attention"
              />
            </Reveal>
          </div>
          <Reveal delay={0.3}>
            <ActivityCard range={range} showTooltip={step === 1} />
          </Reveal>
        </div>
        <div className="hidden min-w-0 flex-[1] flex-col @7xl/app:flex">
          <Reveal delay={0.1}>
            <ProfileRail />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
