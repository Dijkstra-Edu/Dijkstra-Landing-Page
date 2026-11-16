"use client";

import type React from "react";
import {
  IconArticle,
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandLeetcode,
  IconBrandLinkedin,
  IconBrandOpenai,
  IconBrandReddit,
  IconBrandStackoverflow,
  IconCalendarEvent,
  IconChartBar,
  IconCode,
  IconDashboard,
  IconDatabase,
  IconDots,
  IconDotsVertical,
  IconFidgetSpinner,
  IconFileWord,
  IconHelp,
  IconLayoutDashboard,
  IconLayoutSidebar,
  IconListDetails,
  IconLogout,
  IconQuestionMark,
  IconReport,
  IconSchool,
  IconSearch,
  IconSettings,
  IconSun,
  IconTransformPoint,
  IconUsers,
  IconWorldWww,
  type Icon,
} from "@tabler/icons-react";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { demoUser } from "./data";
import { WSeparator } from "./web-ui";

export type NavKey =
  | "Home"
  | "Dijkstra GPT"
  | "Dashboard"
  | "Learning Hub"
  | "Projects Hub";

/** Dijkstra-Web components/app-sidebar.tsx â†’ data.navMain */
const navMain: { title: string; icon: Icon }[] = [
  { title: "Home", icon: IconListDetails },
  { title: "Dijkstra GPT", icon: IconBrandOpenai },
  { title: "Dashboard", icon: IconDashboard },
  { title: "Learning Hub", icon: IconChartBar },
  { title: "Discussion Forum", icon: IconTransformPoint },
  { title: "Blogs and Articles", icon: IconArticle },
  { title: "Join a Team", icon: IconUsers },
  { title: "Project Planner (Jira)", icon: IconFidgetSpinner },
];

const navGroups: { title: string; items: { name: string; icon: Icon }[] }[] = [
  {
    title: "Challenges",
    items: [
      { name: "Quizzes", icon: IconQuestionMark },
      { name: "Weekly Challenges", icon: IconCalendarEvent },
      { name: "Hackathons", icon: IconCode },
    ],
  },
  {
    title: "Opportunities",
    items: [
      { name: "Projects Hub", icon: IconDatabase },
      { name: "Fellowships and Programs", icon: IconReport },
      { name: "Job Board", icon: IconFileWord },
    ],
  },
];

const navSecondary: { title: string; icon: Icon }[] = [
  { title: "Settings", icon: IconSettings },
  { title: "Get Help", icon: IconHelp },
  { title: "Search", icon: IconSearch },
];

/** Header pins (lib/Zustand/settings-store.ts â†’ defaultPresetPins). */
const pinGroups: { icon: Icon; color?: string }[][] = [
  [
    { icon: IconBrandReddit, color: "#FF4500" },
    { icon: IconSchool, color: "#4285F4" },
    { icon: IconBrandStackoverflow, color: "#F48024" },
  ],
  [
    { icon: IconBrandDiscord, color: "#5865F2" },
    { icon: IconBrandLinkedin, color: "#0A66C2" },
    { icon: IconBrandLeetcode, color: "#FFA116" },
    { icon: IconBrandGithub, color: "#000000" },
  ],
  [{ icon: IconWorldWww }, { icon: IconLayoutDashboard }],
];

function MenuButton({
  icon: IconCmp,
  label,
  active,
  muted,
}: {
  icon: Icon;
  label: string;
  active?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-8 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm transition-colors duration-300",
        active ? "bg-[#1e2939] font-medium text-white" : "text-white",
        muted && "text-white/70",
      )}
    >
      <IconCmp className="size-4 shrink-0" />
      <span className="truncate">{label}</span>
    </div>
  );
}

/** Dijkstra Web's dark inset sidebar (288px, `variant="inset"`). */
function AppSidebar({ active }: { active: NavKey }) {
  return (
    <aside className="hidden w-72 shrink-0 flex-col p-2 text-white @3xl/app:flex">
      {/* SidebarHeader */}
      <div className="flex items-center gap-2 p-2">
        <img src="/icon.png" alt="" className="h-12 w-auto" />
        <span className="text-base font-semibold">Dijkstra</span>
      </div>
      {/* SidebarContent */}
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
        <div className="flex flex-col gap-1 p-2">
          {navMain.map((item) => (
            <MenuButton
              key={item.title}
              icon={item.icon}
              label={item.title}
              active={item.title === active}
            />
          ))}
        </div>
        {navGroups.map((group) => (
          <div key={group.title} className="flex flex-col p-2">
            <div className="flex h-8 items-center px-2 text-xs font-medium text-white/70">
              {group.title}
            </div>
            <div className="flex flex-col gap-1">
              {group.items.map((item) => (
                <MenuButton
                  key={item.name}
                  icon={item.icon}
                  label={item.name}
                  active={item.name === active}
                />
              ))}
              <MenuButton icon={IconDots} label="More" muted />
            </div>
          </div>
        ))}
        <div className="mt-auto flex flex-col gap-1 p-2">
          {navSecondary.map((item) => (
            <MenuButton key={item.title} icon={item.icon} label={item.title} />
          ))}
        </div>
      </div>
      {/* SidebarFooter â†’ NavUser */}
      <div className="p-2">
        <div className="flex h-12 items-center gap-2 rounded-md p-2">
          <img
            src={demoUser.avatar}
            alt=""
            className="h-8 w-8 rounded-lg object-cover"
          />
          <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{demoUser.name}</span>
            <span className="truncate text-xs text-white/60">
              {demoUser.email}
            </span>
          </div>
          <IconDotsVertical className="ml-auto size-4" />
        </div>
      </div>
    </aside>
  );
}

/** Dijkstra Web's SiteHeader: trigger, page title, pins, theme, bell, sign out. */
function AppHeader({ title }: { title: string }) {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b border-gray-200">
      <div className="flex w-full items-center gap-1 px-4 @5xl/app:gap-2 @5xl/app:px-6">
        <span className="-ml-1 inline-flex size-7 items-center justify-center rounded-md">
          <IconLayoutSidebar className="size-4" />
        </span>
        <WSeparator vertical className="mx-2" />
        <h1 className="mr-2 text-base font-medium">{title}</h1>
        <div className="ml-auto flex items-center gap-2">
          {pinGroups.map((group, g) => (
            <div key={g} className="hidden items-center gap-2 @7xl/app:flex">
              {group.map(({ icon: PinIcon, color }, i) => (
                <span
                  key={i}
                  className={cn(
                    "inline-flex h-8 items-center justify-center rounded-md px-3 shadow-xs",
                    !color && "bg-gray-100 text-gray-900",
                  )}
                  style={color ? { backgroundColor: color } : undefined}
                >
                  <PinIcon className={cn("h-4 w-4", color && "text-white")} />
                </span>
              ))}
              <WSeparator vertical className="mx-2" />
            </div>
          ))}
          <span className="hidden h-8 items-center rounded-md bg-gray-100 px-3 text-gray-900 shadow-xs @xl/app:inline-flex">
            <IconSun className="h-5 w-5" />
          </span>
          <span className="relative hidden h-8 items-center rounded-md bg-gray-100 px-3 text-gray-900 shadow-xs @xl/app:inline-flex">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
          </span>
          <WSeparator vertical className="mx-2 hidden @xl/app:block" />
          <span className="inline-flex h-8 items-center gap-1.5 rounded-md bg-gray-900 px-3 text-sm font-medium text-white shadow-xs">
            <IconLogout className="h-4 w-4" /> Sign Out
          </span>
        </div>
      </div>
    </header>
  );
}

/**
 * The Dijkstra Web application chrome â€” black sidebar wrapper, white inset
 * panel with rounded corners, sticky header â€” rendered at real size. Layout
 * adapts with container queries on `@container/app` (the fixed design width
 * chosen by ScaledCanvas), mirroring how the real app responds.
 */
export function AppShell({
  title,
  active,
  children,
}: {
  title: string;
  active: NavKey;
  children: React.ReactNode;
}) {
  return (
    <div className="@container/app flex h-full w-full overflow-hidden bg-black font-sans text-gray-950 antialiased">
      <AppSidebar active={active} />
      <main className="m-2 flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl bg-white shadow-sm @3xl/app:ml-0">
        <AppHeader title={title} />
        <div className="relative min-h-0 flex-1 overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
