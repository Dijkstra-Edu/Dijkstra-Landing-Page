"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Code,
  Flame,
  MessageCircle,
  PlayCircle,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/motion/count-up";
import { demoUser, leaderboard, schedule } from "../data";
import {
  WBadge,
  WButton,
  WCard,
  WCardContent,
  WCardHeader,
  WCardTitle,
} from "../web-ui";

function Bar({
  value,
  color,
  delay = 0,
}: {
  value: number;
  color: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
      <motion.div
        className={cn("h-full rounded-full", color)}
        initial={{ width: reduceMotion ? `${value}%` : 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
      />
    </div>
  );
}

function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/** Left column: profile, rank, streak and XP (homepage.tsx "Left sidebar"). */
function ProfileColumn() {
  const xpPct = (demoUser.xp.current / demoUser.xp.next) * 100;
  return (
    <WCard gradient className="py-0">
      <div className="p-4">
        <div className="mb-6 flex flex-col items-center">
          <img
            src={demoUser.avatar}
            alt=""
            className="mb-3 h-24 w-24 rounded-full object-cover"
          />
          <h2 className="text-center text-lg font-semibold">{demoUser.name}</h2>
          <p className="text-sm text-gray-500">
            @
            <span className="border-b-2 border-gray-200">
              {demoUser.handle}
            </span>
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src={`/ranks/${demoUser.rank.key}.png`}
            alt=""
            className="h-[100px] w-[100px] object-contain"
          />
        </div>
        <h2 className="mb-6 text-center text-lg font-bold text-yellow-500">
          {demoUser.rank.label}
        </h2>
        <div className="mb-2 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Trophy className="h-4 w-4 shrink-0 text-yellow-400" />
          <span>
            <b>{ordinal(demoUser.position.rank)}</b> of{" "}
            <b>{demoUser.position.total}</b>
          </span>
        </div>
        <div className="mb-6 flex items-center justify-center gap-2 text-sm font-semibold text-gray-500">
          <Flame className="h-4 w-4 text-orange-500" />
          <span>{demoUser.streak} Day Streak</span>
        </div>
        <div className="relative mb-8 w-full">
          <Bar value={xpPct} color="bg-yellow-400" delay={0.3} />
          <span className="absolute left-0 top-3 text-xs text-gray-500">
            XP
          </span>
          <span className="absolute right-0 top-3 text-xs tabular-nums text-gray-500">
            <CountUp value={demoUser.xp.current} format={(n) => String(n)} />/
            {demoUser.xp.next}
          </span>
        </div>
        <nav className="mt-8 space-y-2 border-t border-gray-200 pt-6">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide">
            Quick Links
          </div>
          {(
            [
              [Target, "Home"],
              [Code, "Resumes"],
              [BookOpen, "Projects"],
              [Trophy, "Contests"],
              [Users, "Community"],
              [MessageCircle, "Discuss"],
            ] as const
          ).map(([NavIcon, label], i) => (
            <span
              key={label}
              className={cn(
                "flex h-9 items-center gap-2 rounded-md px-4 text-sm font-medium",
                i === 0 ? "bg-neutral-800 text-white" : "text-gray-500",
              )}
            >
              <NavIcon className="h-4 w-4" /> {label}
            </span>
          ))}
        </nav>
      </div>
    </WCard>
  );
}

function QuickStat({
  title,
  value,
  subtitle,
  icon: StatIcon,
  tone,
  bar,
  progress,
  delay,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: typeof Clock;
  tone: string;
  bar: string;
  progress: number;
  delay: number;
}) {
  return (
    <WCard gradient className="py-0">
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className={cn("rounded-lg bg-gray-100 p-2", tone)}>
            <StatIcon className="h-5 w-5" />
          </div>
          <div className="text-right">
            <div className="whitespace-nowrap text-2xl font-semibold">
              {value}
            </div>
            <div className="text-xs text-gray-500">{subtitle}</div>
          </div>
        </div>
        <div className="mb-2 text-sm font-medium">{title}</div>
        <Bar value={progress} color={bar} delay={delay} />
      </div>
    </WCard>
  );
}

/**
 * Home (Dijkstra-Web components/homepage.tsx): profile + rank + XP on the
 * left, the welcome banner and daily stats in the middle, the daily
 * challenge, study schedule and weekly leaderboard on the right.
 */
export function HomeFrame() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="h-full overflow-hidden px-4 @5xl/app:px-6">
      <div className="grid grid-cols-12 gap-6 p-4">
        <div className="hidden min-w-0 @7xl/app:col-span-2 @7xl/app:block">
          <ProfileColumn />
        </div>
        <div className="col-span-12 min-w-0 @3xl/app:col-span-8 @7xl/app:col-span-7">
          <div className="grid grid-cols-1 gap-6">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white"
            >
              <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-white/10" />
              <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-white/10" />
              <div className="relative">
                <h1 className="mb-2 text-3xl font-bold">
                  Welcome back, {demoUser.handle}! ðŸ‘‹
                </h1>
                <p className="mb-6 text-blue-100">
                  Ready to level up your coding skills today?
                </p>
                <div className="flex flex-wrap gap-4">
                  <WButton className="bg-white text-blue-600">
                    <PlayCircle className="mr-2 h-4 w-4" /> Continue Learning
                  </WButton>
                  <WButton className="border border-white bg-transparent text-white">
                    <Target className="mr-2 h-4 w-4" /> Daily Challenge
                  </WButton>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 @3xl/app:grid-cols-3">
              <QuickStat
                title="Today's Progress"
                value="3/5"
                subtitle="Problems completed"
                icon={CheckCircle}
                tone="text-green-400"
                bar="bg-green-500"
                progress={60}
                delay={0.2}
              />
              <QuickStat
                title="Study Time"
                value="2h 34m"
                subtitle="This week"
                icon={Clock}
                tone="text-blue-400"
                bar="bg-blue-500"
                progress={75}
                delay={0.35}
              />
              <QuickStat
                title="Accuracy Rate"
                value="87%"
                subtitle="Last 30 problems"
                icon={Target}
                tone="text-purple-400"
                bar="bg-purple-500"
                progress={87}
                delay={0.5}
              />
            </div>

            <WCard gradient>
              <WCardHeader>
                <WCardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-purple-400" />
                  Learning Paths
                </WCardTitle>
              </WCardHeader>
              <WCardContent className="space-y-3">
                {(
                  [
                    [
                      "Dynamic Programming",
                      "Master the art of DP",
                      65,
                      "Medium",
                      "2 weeks",
                    ],
                    [
                      "Graph Algorithms",
                      "BFS, DFS, shortest paths",
                      40,
                      "Hard",
                      "3 weeks",
                    ],
                  ] as const
                ).map(([title, description, progress, level, time], i) => (
                  <div
                    key={title}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="rounded-lg bg-gray-100 p-2">
                        <Code className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{title}</h4>
                        <p className="text-sm text-gray-500">{description}</p>
                      </div>
                    </div>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <WBadge
                          variant="secondary"
                          className={
                            level === "Hard"
                              ? "text-red-400"
                              : "text-yellow-500"
                          }
                        >
                          {level}
                        </WBadge>
                        <span className="text-xs text-gray-500">{time}</span>
                      </div>
                      <span className="text-sm font-medium">{progress}%</span>
                    </div>
                    <Bar
                      value={progress}
                      color="bg-blue-500"
                      delay={0.6 + i * 0.15}
                    />
                  </div>
                ))}
              </WCardContent>
            </WCard>

            <WCard gradient>
              <WCardHeader>
                <WCardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-yellow-500" />
                  Recent Activity
                </WCardTitle>
              </WCardHeader>
              <WCardContent className="divide-y divide-gray-100">
                {(
                  [
                    [
                      "Solved",
                      "text-green-500",
                      "Merge k Sorted Lists",
                      "2h ago",
                      "Hard",
                      50,
                    ],
                    [
                      "Completed",
                      "text-blue-500",
                      "Graphs: Topological Sort",
                      "5h ago",
                      "Medium",
                      30,
                    ],
                    [
                      "Attempted",
                      "text-yellow-500",
                      "LRU Cache",
                      "Yesterday",
                      "Medium",
                      0,
                    ],
                  ] as const
                ).map(([action, color, item, time, level, points]) => (
                  <div
                    key={item}
                    className="flex items-center justify-between py-2"
                  >
                    <div>
                      <div className="text-sm">
                        <span className={cn("font-medium", color)}>
                          {action}
                        </span>
                        <span className="ml-1">{item}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs text-gray-500">{time}</span>
                        <WBadge className="text-gray-500">{level}</WBadge>
                      </div>
                    </div>
                    {points > 0 && (
                      <div className="text-sm font-medium text-green-500">
                        +{points} XP
                      </div>
                    )}
                  </div>
                ))}
              </WCardContent>
            </WCard>
          </div>
        </div>

        <div className="hidden min-w-0 @3xl/app:col-span-4 @3xl/app:block @7xl/app:col-span-3">
          <div className="grid grid-cols-1 gap-6">
            <div className="rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 p-6 text-white">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Daily Challenge</h3>
                  <p className="text-sm text-orange-100">Earn bonus XP!</p>
                </div>
                <Trophy className="h-8 w-8 text-yellow-300" />
              </div>
              <div className="mb-4">
                <h4 className="mb-1 font-semibold">Merge Intervals</h4>
                <div className="flex items-center gap-2 text-sm">
                  <span className="rounded-md border border-white/30 bg-white/20 px-2 py-0.5 text-xs font-medium">
                    Medium
                  </span>
                  <span className="text-orange-100">+50 XP</span>
                </div>
              </div>
              <span className="flex h-9 w-full items-center justify-center rounded-md bg-white text-sm font-medium text-orange-600">
                Start Challenge
              </span>
            </div>

            <WCard gradient>
              <WCardHeader>
                <WCardTitle className="flex items-center text-base">
                  <Calendar className="mr-2 h-5 w-5 text-purple-400" />
                  Study Schedule
                </WCardTitle>
              </WCardHeader>
              <WCardContent className="space-y-3">
                {schedule.map((item) => (
                  <div
                    key={item.time}
                    className={cn(
                      "flex items-center gap-3 rounded-lg p-2",
                      item.current && "border border-blue-800 bg-blue-900/10",
                    )}
                  >
                    <div className="w-12 font-mono text-sm text-gray-500">
                      {item.time}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4
                          className={cn(
                            "truncate text-sm font-medium",
                            item.done && "text-gray-500 line-through",
                          )}
                        >
                          {item.title}
                        </h4>
                        {item.done && (
                          <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
                        )}
                        {item.current && (
                          <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-blue-500" />
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {item.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </WCardContent>
            </WCard>

            <WCard gradient>
              <WCardHeader>
                <WCardTitle className="flex items-center text-base">
                  <TrendingUp className="mr-2 h-5 w-5 text-purple-400" />
                  Weekly Leaderboard
                </WCardTitle>
              </WCardHeader>
              <WCardContent className="space-y-3">
                {leaderboard.map((row, i) => (
                  <motion.div
                    key={row.rank}
                    initial={reduceMotion ? false : { opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                    className={cn(
                      "flex items-center gap-3 rounded-lg p-2",
                      row.you && "bg-gray-100",
                    )}
                  >
                    <span className="w-5 text-sm font-semibold text-gray-500">
                      {row.rank}
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-medium">
                      {row.name
                        .split(" ")
                        .map((p) => p[0])
                        .join("")}
                    </span>
                    <span className="flex-1 truncate text-sm font-medium">
                      {row.name}
                    </span>
                    <span className="text-sm tabular-nums text-gray-500">
                      {row.points}
                    </span>
                  </motion.div>
                ))}
              </WCardContent>
            </WCard>
          </div>
        </div>
      </div>
    </div>
  );
}
