"use client";

import { CalendarDays, FolderKanban, UserCheck, Users } from "lucide-react";
import { CardLabel, ContributionHeatmap, CountUp, MockCard } from "../widgets";
import { demoUser, heatmap } from "../data";

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Python",
  "PostgreSQL",
  "Git",
];

/** Mirrors the profile side-card + portfolio view of Dijkstra Web. */
export function PortfolioFrame() {
  return (
    <div className="grid h-full gap-3 p-3 @2xl:grid-cols-[minmax(0,15rem)_1fr] @2xl:p-4">
      {/* Profile card */}
      <MockCard className="items-center text-center">
        <img
          src={demoUser.avatar}
          alt=""
          className="h-14 w-14 rounded-full object-cover ring-2 ring-green-600/30 @2xl:h-20 @2xl:w-20"
        />
        <p className="mt-2 text-sm font-semibold @2xl:text-base">
          {demoUser.name}
        </p>
        <p className="text-[11px] text-neutral-500">@{demoUser.handle}</p>
        <div className="mt-3 grid w-full grid-cols-3 text-center">
          {[
            ["Followers", demoUser.followers],
            ["Following", demoUser.following],
            ["Repos", demoUser.repos],
          ].map(([label, value]) => (
            <div key={label as string}>
              <CountUp
                value={value as number}
                className="text-sm font-semibold"
              />
              <p className="text-[10px] text-neutral-500">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 hidden w-full grid-cols-3 gap-1.5 @2xl:grid">
          <div className="flex flex-col items-center rounded-lg bg-neutral-50 p-1.5">
            <img src="/ranks/GOLD_1.png" alt="Gold I" className="h-9 w-9" />
            <span className="text-[10px] font-semibold text-amber-600">
              GOLD 1
            </span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-neutral-50 p-1.5">
            <img src="/ranks/streak-fire.png" alt="" className="h-9 w-9" />
            <span className="text-[10px] font-semibold">
              {demoUser.streak} days
            </span>
          </div>
          <div className="flex flex-col items-center rounded-lg border border-fuchsia-400 bg-fuchsia-50/50 p-1.5">
            <img
              src={demoUser.specialization.icon}
              alt={demoUser.specialization.label}
              className="h-9 w-9"
            />
            <span className="text-[10px] font-semibold text-fuchsia-700">
              {demoUser.specialization.short}
            </span>
          </div>
        </div>
      </MockCard>

      <div className="flex min-h-0 flex-col gap-3">
        <MockCard delay={0.1}>
          <div className="flex items-center justify-between">
            <CardLabel>Contributions</CardLabel>
            <span className="text-[11px] text-neutral-500">
              <CountUp value={1284} /> in the last 20 weeks
            </span>
          </div>
          <div className="mt-2">
            <ContributionHeatmap weeks={heatmap} />
          </div>
        </MockCard>

        <div className="grid min-h-0 flex-1 gap-3 @3xl:grid-cols-2">
          <MockCard delay={0.2}>
            <CardLabel>Current project &amp; team</CardLabel>
            <ul className="mt-2 space-y-1.5 text-[11px] @2xl:text-xs">
              <li className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-green-600" />
                <span className="text-neutral-500">Team:</span>
                <span className="truncate font-medium">Frontend (FE)</span>
              </li>
              <li className="flex items-center gap-2">
                <FolderKanban className="h-3.5 w-3.5 text-blue-600" />
                <span className="text-neutral-500">Project:</span>
                <span className="truncate font-medium">{demoUser.team}</span>
              </li>
              <li className="flex items-center gap-2">
                <UserCheck className="h-3.5 w-3.5 text-amber-600" />
                <span className="text-neutral-500">Role:</span>
                <span className="truncate font-medium">{demoUser.role}</span>
              </li>
              <li className="hidden items-center gap-2 @xl:flex">
                <CalendarDays className="h-3.5 w-3.5 text-fuchsia-600" />
                <span className="text-neutral-500">Member since:</span>
                <span className="font-medium">March 2026</span>
              </li>
            </ul>
          </MockCard>
          <MockCard delay={0.3} className="hidden @3xl:flex">
            <CardLabel>Verified skills</CardLabel>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-neutral-200 bg-white px-2 py-0.5 text-[11px] text-neutral-700"
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-auto pt-2 text-[10px] text-neutral-500">
              Parsed from your projects and work experience
            </p>
          </MockCard>
        </div>
      </div>
    </div>
  );
}
