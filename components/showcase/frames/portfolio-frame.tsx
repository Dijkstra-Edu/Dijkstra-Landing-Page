"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Code2,
  Edit,
  Github,
  Linkedin,
  Mail,
  MapPin,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  contributionTotal,
  contributionYear,
  demoUser,
  skills,
  workExperience,
} from "../data";
import { useTimeline } from "../use-timeline";
import {
  WBadge,
  WButton,
  WCard,
  WCardContent,
  WCardHeader,
  WCardTitle,
  WSeparator,
  WTabs,
} from "../web-ui";
import { DASHBOARD_TABS } from "./dashboard-frame";
import { ProfileRail } from "./profile-rail";

/** GitHub's contribution palette, as used by Dijkstra Web's heatmap. */
const LEVELS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function ContributionCard({ reveal }: { reveal: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <WCard>
      <WCardHeader>
        <div className="flex items-center justify-between">
          <WCardTitle>Contribution Activity</WCardTitle>
          <h3 className="text-lg font-semibold">2025</h3>
          <WBadge variant="secondary">
            {contributionTotal} contributions in 2025
          </WBadge>
        </div>
      </WCardHeader>
      <WCardContent>
        <div className="flex gap-1 text-[10px] text-gray-500">
          <div className="grid shrink-0 grid-rows-[12px_repeat(7,1fr)] gap-[3px] pr-1">
            <span />
            {WEEKDAYS.map((d, i) => (
              <span key={i} className="leading-none">
                {i % 2 === 1 ? d : ""}
              </span>
            ))}
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-[3px] grid h-3 grid-cols-12 leading-none">
              {MONTHS.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
            <div className="grid grid-flow-col grid-cols-[repeat(53,minmax(0,1fr))] grid-rows-7 gap-[3px]">
              {contributionYear.map((week, w) =>
                week.map((level, d) => (
                  <span
                    key={`${w}-${d}`}
                    className="aspect-square rounded-[2px]"
                    style={{
                      backgroundColor:
                        reveal || reduceMotion ? LEVELS[level] : LEVELS[0],
                      transition: reduceMotion
                        ? undefined
                        : `background-color 250ms ease-out ${w * 22}ms`,
                    }}
                  />
                )),
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <WButton variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" /> 2024
          </WButton>
          <div className="flex items-center gap-1">
            {LEVELS.map((c) => (
              <span
                key={c}
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <WButton variant="outline" size="sm" className="opacity-50">
            2026 <ChevronRight className="h-4 w-4" />
          </WButton>
        </div>
      </WCardContent>
    </WCard>
  );
}

function SectionCard({
  icon: SectionIcon,
  title,
  children,
}: {
  icon: typeof User;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <WCard>
      <WCardHeader>
        <div className="flex items-center justify-between">
          <WCardTitle className="flex items-center gap-2">
            <SectionIcon className="h-5 w-5" /> {title}
          </WCardTitle>
          <WButton variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" /> Edit
          </WButton>
        </div>
      </WCardHeader>
      <WCardContent>{children}</WCardContent>
    </WCard>
  );
}

/**
 * Dashboard â†’ "Portfolio" tab (Dijkstra-Web components/student-dashboard.tsx):
 * the contribution heatmap fills in week by week, then the page scrolls to
 * the profile sections (Personal Details, Work Experience, Skills).
 */
export function PortfolioFrame() {
  const reduceMotion = useReducedMotion();
  const step = useTimeline([150, 2700, 4700]);
  const offset = step >= 3 ? -760 : step >= 2 ? -390 : 0;

  return (
    <div className="h-full overflow-hidden px-4 @5xl/app:px-6">
      <div className="flex flex-row gap-6 py-4">
        <motion.div
          className="flex min-w-0 flex-[3] flex-col gap-4"
          initial={false}
          animate={{ y: reduceMotion ? 0 : offset }}
          transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
        >
          <WTabs
            tabs={DASHBOARD_TABS}
            active="Portfolio"
            disabled={["Achievements"]}
          />
          <div className="space-y-4">
            <ContributionCard reveal={step >= 1} />

            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <h1 className="text-4xl font-bold">Profile</h1>
                <p className="text-gray-500">
                  Manage your professional profile and showcase your
                  achievements
                </p>
              </div>

              <SectionCard icon={User} title="Personal Details">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold">{demoUser.name}</h3>
                    <WBadge variant="secondary" className="mt-1">
                      Computer Science Student
                    </WBadge>
                  </div>
                  <p className="text-gray-500">{demoUser.bio}</p>
                  <div className="grid grid-cols-1 gap-4 text-sm @3xl/app:grid-cols-2">
                    {(
                      [
                        [MapPin, "Bengaluru, Karnataka, India"],
                        [Mail, `${demoUser.email} (Linked to GitHub)`],
                        [Github, `github.com/${demoUser.handle}`],
                        [Linkedin, `linkedin.com/in/${demoUser.handle}`],
                      ] as const
                    ).map(([RowIcon, text]) => (
                      <div key={text} className="flex items-center gap-2">
                        <RowIcon className="h-4 w-4 shrink-0 text-gray-500" />
                        <span className="truncate">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionCard>

              <SectionCard icon={Briefcase} title="Work Experience">
                <div className="space-y-6">
                  {workExperience.map((job) => (
                    <div
                      key={job.title}
                      className="relative border-l-2 border-gray-200 pb-6 pl-6 last:pb-0"
                    >
                      <div className="absolute -left-2 top-1.5 h-3 w-3 rounded-full bg-gray-900" />
                      <div className="flex items-start gap-4">
                        {job.logo ? (
                          <img
                            src={job.logo}
                            alt=""
                            className="h-16 w-16 shrink-0 rounded-lg border border-gray-200 bg-white object-contain p-1"
                          />
                        ) : (
                          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-lg font-semibold text-gray-500">
                            CS
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <h4 className="text-lg font-semibold">{job.title}</h4>
                          <p className="font-medium text-gray-900">
                            {job.company}
                          </p>
                          <div className="mt-1 flex items-center gap-2">
                            <p className="text-sm text-gray-500">
                              {job.start} - {job.end}
                            </p>
                            {job.current && (
                              <WBadge variant="secondary">Current</WBadge>
                            )}
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-500">
                            {job.duration} experience
                          </p>
                        </div>
                        <div className="hidden shrink-0 flex-col items-end gap-2 @3xl/app:flex">
                          <WBadge>{job.location}</WBadge>
                          <div className="flex gap-1">
                            <WBadge variant="secondary">
                              {job.locationType}
                            </WBadge>
                            <WBadge variant="secondary">
                              {job.employment}
                            </WBadge>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 leading-relaxed text-gray-500">
                        {job.description}
                      </p>
                      <div className="mt-3 space-y-2">
                        <h5 className="text-sm font-medium text-gray-500">
                          Tools &amp; Technologies
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {job.tools.map((tool) => (
                            <WBadge key={tool}>{tool}</WBadge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard icon={Code2} title="Skills">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <WBadge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </WBadge>
                  ))}
                </div>
                <WSeparator className="my-4" />
                <p className="text-sm text-gray-500">
                  Skills are matched against projects and fellowships in the
                  Opportunities hub.
                </p>
              </SectionCard>
            </div>
          </div>
        </motion.div>
        <div className={cn("hidden min-w-0 flex-[1] flex-col @7xl/app:flex")}>
          <ProfileRail />
        </div>
      </div>
    </div>
  );
}
