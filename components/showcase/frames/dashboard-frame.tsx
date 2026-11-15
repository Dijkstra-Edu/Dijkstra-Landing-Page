"use client";

import {
  CardLabel,
  CountUp,
  LeetCodeGauge,
  MockCard,
  ActivityArea,
  Sparkline,
  TaskRadar,
  TrendBadge,
} from "../widgets";
import { activity, demoUser, leetcode, taskRadar } from "../data";

const tabs = ["Stats", "Portfolio", "Readme", "Resume", "CV"];

/** Mirrors the "Stats" tab of the Dijkstra Web dashboard. */
export function DashboardFrame() {
  const completed = taskRadar.reduce((s, t) => s + t.completed, 0);
  const target = taskRadar.reduce((s, t) => s + t.target, 0);

  return (
    <div className="flex h-full flex-col gap-3 p-3 @2xl:p-4">
      <div className="flex w-fit gap-1 rounded-lg bg-neutral-100 p-1 text-[11px] font-medium">
        {tabs.map((tab, i) => (
          <span
            key={tab}
            className={
              i === 0
                ? "rounded-md bg-white px-2 py-0.5 text-neutral-900 shadow-xs"
                : "hidden px-2 py-0.5 text-neutral-500 @sm:inline"
            }
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-2 content-start gap-3 @4xl:grid-cols-4 @4xl:grid-rows-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)] @4xl:content-stretch">
        {/* Tasks for the day */}
        <MockCard className="col-span-2 @4xl:row-span-2">
          <CardLabel>Tasks for the day</CardLabel>
          <p className="text-lg font-semibold @2xl:text-2xl">
            <CountUp value={completed} duration={900} />/{target} Completed
          </p>
          <div className="h-[120px] @xl:h-auto @xl:min-h-[120px] @xl:flex-1">
            <TaskRadar data={taskRadar} />
          </div>
        </MockCard>

        {/* Rank */}
        <MockCard delay={0.1}>
          <div className="flex items-start justify-between gap-2">
            <CardLabel>Rank</CardLabel>
            <TrendBadge value="+4.5%" />
          </div>
          <div className="flex flex-1 items-center justify-between gap-2">
            <p className="text-lg font-semibold @2xl:text-2xl">Top 12%</p>
            <img
              src="/ranks/GOLD_1.png"
              alt="Gold I rank badge"
              className="h-11 w-11 object-contain @2xl:h-14 @2xl:w-14"
            />
          </div>
        </MockCard>

        {/* LeetCode */}
        <MockCard delay={0.18}>
          <CardLabel>LeetCode work</CardLabel>
          <div className="flex flex-1 items-end pt-1">
            <LeetCodeGauge {...leetcode} />
          </div>
          <div className="mt-1 hidden justify-between text-[10px] @4xl:flex">
            <span className="text-teal-600">Easy {leetcode.easy}</span>
            <span className="text-amber-600">Med {leetcode.medium}</span>
            <span className="text-red-600">Hard {leetcode.hard}</span>
          </div>
        </MockCard>

        {/* GitHub activity */}
        <MockCard delay={0.26} className="hidden @xl:flex">
          <div className="flex items-start justify-between gap-2">
            <CardLabel>GitHub activity</CardLabel>
            <TrendBadge value="+18%" />
          </div>
          <p className="text-lg font-semibold @2xl:text-2xl">
            <CountUp value={342} /> commits
          </p>
          <div className="mt-auto h-10">
            <Sparkline data={activity} dataKey="GitHub" />
          </div>
        </MockCard>

        {/* Streak */}
        <MockCard delay={0.34} className="hidden @xl:flex">
          <div className="flex items-start justify-between gap-2">
            <CardLabel>Daily streak</CardLabel>
            <TrendBadge value="best" />
          </div>
          <div className="flex flex-1 items-center gap-2">
            <img
              src="/ranks/streak-fire.png"
              alt=""
              className="h-10 w-10 @2xl:h-12 @2xl:w-12"
            />
            <p className="text-lg font-semibold @2xl:text-2xl">
              <CountUp value={demoUser.streak} duration={800} /> days
            </p>
          </div>
        </MockCard>

        {/* All activity */}
        <MockCard delay={0.42} className="col-span-2 @4xl:col-span-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <CardLabel>All activity</CardLabel>
              <p className="text-sm font-semibold">Last 6 weeks</p>
            </div>
            <div className="hidden gap-3 text-[10px] text-neutral-500 @lg:flex">
              <span className="flex items-center gap-1">
                <i className="h-2 w-2 rounded-full bg-[#14532d]" /> LeetCode
              </span>
              <span className="flex items-center gap-1">
                <i className="h-2 w-2 rounded-full bg-[#15803d]" /> GitHub
              </span>
              <span className="flex items-center gap-1">
                <i className="h-2 w-2 rounded-full bg-[#4ade80]" /> Projects
              </span>
            </div>
          </div>
          <div className="h-[64px] @xl:h-auto @xl:min-h-[90px] @xl:flex-1">
            <ActivityArea data={activity} />
          </div>
        </MockCard>
      </div>
    </div>
  );
}
