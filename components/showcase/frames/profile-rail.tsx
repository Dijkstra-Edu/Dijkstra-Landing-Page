"use client";

import {
  Award,
  Calendar,
  Download,
  FileDown,
  FileText,
  FolderGit2,
  GraduationCap,
  Pencil,
  UserCheck,
  Users,
} from "lucide-react";
import {
  IconBrandLeetcode,
  IconBrandLinkedin,
  IconWorldWww,
} from "@tabler/icons-react";
import { CountUp } from "@/components/motion/count-up";
import { demoUser } from "../data";
import { WButton, WSeparator } from "../web-ui";

/**
 * Right-hand profile rail of the dashboard (Dijkstra-Web:
 * components/profile-data.tsx): avatar, GitHub stats, rank / streak /
 * specialization tiles, quick links, current project & team, documents.
 */
export function ProfileRail() {
  return (
    <div className="pr-2">
      <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
        <div className="flex flex-col items-center space-y-4 text-center">
          <img
            src={demoUser.avatar}
            alt=""
            className="h-36 w-36 rounded-full object-cover"
          />
          <h2 className="mt-4 text-lg font-semibold">{demoUser.name}</h2>
          <p className="text-sm text-gray-500">
            @
            <span className="border-b-2 border-gray-200">
              {demoUser.handle}
            </span>
          </p>
          <p className="mt-2 text-sm text-gray-500">{demoUser.bio}</p>
          <WButton variant="outline" size="sm" className="mt-3">
            <Pencil className="mr-2 h-4 w-4" /> Edit Profile
          </WButton>
          <div className="mt-4 flex justify-center gap-8 text-sm">
            {(
              [
                ["Followers", demoUser.followers],
                ["Following", demoUser.following],
                ["Repos", demoUser.repos],
              ] as const
            ).map(([label, value]) => (
              <div key={label} className="text-center">
                <p className="font-semibold">
                  <CountUp value={value} duration={900} />
                </p>
                <p className="text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="flex min-h-[180px] flex-col items-center justify-center rounded-lg bg-gray-100/30 p-3">
            <img
              src={`/ranks/${demoUser.rank.key}.png`}
              alt=""
              width={80}
              height={80}
              className="mb-2 h-20 w-20 object-contain"
            />
            <span className="text-center text-sm font-bold text-yellow-500">
              {demoUser.rank.label}
            </span>
            <span className="mt-1 text-xs text-gray-500">Rank</span>
          </div>
          <div className="flex min-h-[180px] flex-col items-center justify-center rounded-lg bg-gray-100/30 p-3">
            <div className="relative mb-2">
              <img
                src="/ranks/streak-fire.png"
                alt=""
                className="h-[100px] w-[100px] object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center pt-2">
                <span className="text-xl font-bold text-white drop-shadow-lg">
                  {demoUser.streak}
                </span>
              </div>
            </div>
            <span className="mt-1 text-xs text-gray-500">Day Streak</span>
          </div>
          <div className="flex min-h-[180px] flex-col items-center justify-center rounded-lg bg-gray-100/30 p-3">
            <div className="h-36 w-28 rounded-xl border-2 border-white/20 bg-gradient-to-br from-blue-500 to-cyan-500 p-3 shadow-xl">
              <div className="flex h-full flex-col justify-between text-center">
                <div>
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 bg-white/30 p-1.5 shadow-lg">
                    <img
                      src={demoUser.specialization.icon}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <h4 className="break-words px-1 text-[10px] font-medium leading-tight text-white">
                    {demoUser.specialization.label}
                  </h4>
                </div>
                <div className="mt-auto flex justify-center">
                  <span className="rounded-md border border-white/70 bg-white/50 px-1.5 py-0.5 text-[9px] font-semibold text-white shadow-lg">
                    â­ Primary
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-2 pt-3">
          {[IconBrandLinkedin, IconBrandLeetcode, IconWorldWww].map(
            (LinkIcon, i) => (
              <WButton key={i} className="w-1/3">
                <LinkIcon className="h-4 w-4 text-white" />
              </WButton>
            ),
          )}
        </div>

        <WSeparator className="my-1" />

        <div className="flex flex-col gap-6 rounded-xl bg-[#f0f5f0] py-6 text-gray-900 shadow-md">
          <div className="space-y-4 px-6 py-2">
            <div className="text-center">
              <h3 className="text-lg font-bold">Current Project &amp; Team</h3>
              <p className="mt-1 text-sm text-gray-500">
                Your current assignment and role
              </p>
            </div>
            <div className="space-y-3">
              {(
                [
                  [Users, "text-green-600", "Team", demoUser.team],
                  [FolderGit2, "text-blue-600", "Project", demoUser.project],
                  [UserCheck, "text-yellow-600", "Role", demoUser.role],
                  [
                    Calendar,
                    "text-pink-600",
                    "Member Since",
                    demoUser.memberSince,
                  ],
                ] as const
              ).map(([RowIcon, color, label, value]) => (
                <div key={label} className="flex items-center gap-3">
                  <RowIcon className={`h-5 w-5 shrink-0 ${color}`} />
                  <div className="min-w-0 text-left">
                    <span className="text-xs text-gray-500">{label}: </span>
                    <span className="text-sm font-medium text-gray-900">
                      {value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <WSeparator className="my-1" />

        <div className="space-y-2">
          {(
            [
              [FileText, "View Resume"],
              [GraduationCap, "View CV"],
              [FileDown, "View Dijkstra Transcript"],
              [Award, "View Dijkstra Certificate"],
            ] as const
          ).map(([DocIcon, label]) => (
            <div key={label} className="flex items-center gap-2">
              <WButton variant="outline" className="flex-1">
                <DocIcon className="mr-2 h-4 w-4" /> {label}
              </WButton>
              <WButton size="icon" className="h-10 w-10">
                <Download className="h-4 w-4" />
              </WButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
