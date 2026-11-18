"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  AwardIcon,
  BarChartIcon,
  BookmarkIcon,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ClockIcon,
  CodeIcon,
  DollarSignIcon,
  ExternalLinkIcon,
  EyeIcon,
  GitForkIcon,
  GraduationCapIcon,
  StarIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";
import {
  IconBrandDjango,
  IconBrandReact,
  IconBrandVscode,
  IconSteeringWheel,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { fellowships, projects, type DemoProject } from "../data";
import { useTimeline } from "../use-timeline";
import { useCanvasSize } from "../scaled-canvas";
import {
  WBadge,
  WButton,
  WCard,
  WCardContent,
  WCardHeader,
  WCardTitle,
} from "../web-ui";

/** featured-project-slider.tsx â†’ getHighlightDetails */
const highlight = {
  new: { Icon: StarIcon, label: "New", color: "bg-blue-100 text-blue-800" },
  trending: {
    Icon: TrendingUpIcon,
    label: "Trending",
    color: "bg-purple-100 text-purple-800",
  },
  popular: {
    Icon: UsersIcon,
    label: "Popular",
    color: "bg-amber-100 text-amber-800",
  },
  "good-first-issue": {
    Icon: BarChartIcon,
    label: "Good First Issue",
    color: "bg-green-100 text-green-800",
  },
} as const;

const difficultyColor = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-yellow-100 text-yellow-800",
  advanced: "bg-red-100 text-red-800",
} as const;

/** Organisation logos (the app loads remote SVGs; brand icons stand in). */
function ProjectLogo({ logo }: { logo: DemoProject["logo"] }) {
  switch (logo) {
    case "react":
      return <IconBrandReact className="h-8 w-8 text-[#149eca]" />;
    case "k8s":
      return <IconSteeringWheel className="h-8 w-8 text-[#326CE5]" />;
    case "vscode":
      return <IconBrandVscode className="h-8 w-8 text-[#007ACC]" />;
    case "django":
      return <IconBrandDjango className="h-8 w-8 text-[#0C4B33]" />;
    case "tf":
      return (
        <span className="text-lg font-black tracking-tight text-[#FF6F00]">
          TF
        </span>
      );
    default:
      return <CodeIcon className="h-6 w-6 text-gray-500" />;
  }
}

function HighlightBadge({ kind }: { kind: keyof typeof highlight }) {
  const h = highlight[kind];
  return (
    <WBadge variant="secondary" className={cn("gap-1", h.color)}>
      <h.Icon className="!size-4" />
      {h.label}
    </WBadge>
  );
}

function ProjectCard({ project }: { project: DemoProject }) {
  return (
    <WCard className="h-full">
      <WCardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-md border border-gray-200 bg-white">
            <ProjectLogo logo={project.logo} />
          </div>
          <HighlightBadge kind={project.highlight} />
        </div>
        <div className="mt-3">
          <WCardTitle>{project.title}</WCardTitle>
          <div className="mt-1 flex items-center gap-1">
            <CodeIcon className="h-3.5 w-3.5 text-gray-500" />
            <span className="truncate text-sm text-gray-500">
              {project.org}
            </span>
          </div>
        </div>
      </WCardHeader>
      <WCardContent className="flex flex-grow flex-col gap-3">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <StarIcon className="h-4 w-4 text-gray-500" />
            <span>{project.stars} stars</span>
            <WBadge className="ml-auto">{project.language}</WBadge>
          </div>
          <div className="flex items-center gap-2">
            <GitForkIcon className="h-4 w-4 text-gray-500" />
            <span>{project.forks} forks</span>
            <WBadge
              className={cn("ml-auto", difficultyColor[project.difficulty])}
            >
              {project.difficulty}
            </WBadge>
          </div>
          <div className="flex items-center gap-2">
            <EyeIcon className="h-4 w-4 text-gray-500" />
            <span>{project.issues} issues</span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 text-gray-500" />
            <span>Updated {project.updated}</span>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">{project.description}</p>
        <div className="mt-auto">
          <p className="mb-1.5 text-xs font-medium text-gray-500">Topics:</p>
          <div className="flex flex-wrap gap-1.5">
            {project.topics.slice(0, 3).map((t) => (
              <WBadge key={t} variant="secondary">
                {t}
              </WBadge>
            ))}
            {project.topics.length > 3 && (
              <WBadge>+{project.topics.length - 3} more</WBadge>
            )}
          </div>
        </div>
      </WCardContent>
      <div className="flex gap-3 px-6 pt-2">
        <WButton variant="outline" size="sm" className="w-1/2">
          <BookmarkIcon className="mr-1 h-4 w-4" /> Star
        </WButton>
        <WButton size="sm" className="w-1/2">
          <ExternalLinkIcon className="mr-1 h-4 w-4" /> View Code
        </WButton>
      </div>
    </WCard>
  );
}

function FellowshipCard({ f }: { f: (typeof fellowships)[number] }) {
  return (
    <WCard className="h-full">
      <WCardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-md border border-gray-200 bg-white">
            <GraduationCapIcon className="h-6 w-6 text-gray-500" />
          </div>
          <HighlightBadge kind={f.highlight} />
        </div>
        <div className="mt-3">
          <WCardTitle>{f.title}</WCardTitle>
          <div className="mt-1 flex items-center gap-1">
            <GraduationCapIcon className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-sm text-gray-500">{f.org}</span>
          </div>
        </div>
      </WCardHeader>
      <WCardContent className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4 text-gray-500" />
          <span>{f.duration}</span>
          <WBadge className="ml-auto">{f.location}</WBadge>
        </div>
        <div className="flex items-center gap-2">
          <DollarSignIcon className="h-4 w-4 text-gray-500" />
          <span>{f.stipend}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-gray-500" />
          <span>Deadline: {f.deadline}</span>
        </div>
        <div className="flex items-center gap-2">
          <AwardIcon className="h-4 w-4 text-gray-500" />
          <span>Mentorship Â· Stipend Â· Certificate</span>
        </div>
      </WCardContent>
    </WCard>
  );
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-gray-500">{description}</p>
      </div>
      <div className="hidden items-center gap-2 @3xl/app:flex">
        <WButton variant="outline" size="icon" className="h-9 w-9">
          <ChevronLeft className="h-4 w-4" />
        </WButton>
        <WButton variant="outline" size="icon" className="h-9 w-9">
          <ChevronRight className="h-4 w-4" />
        </WButton>
        <WButton variant="ghost" className="rounded-2xl">
          View All
        </WButton>
      </div>
    </div>
  );
}

/** Card widths per design size (the app uses viewport breakpoints). */
const basis =
  "basis-[85%] @3xl/app:basis-1/3 @7xl/app:basis-1/4 shrink-0 grow-0 pl-4";

/**
 * Opportunities hub (Dijkstra-Web components/opportunities/*): promo banner,
 * then carousels of featured open-source projects and fellowships.
 * Storyline: the project carousel advances one card, then the page scrolls
 * to the fellowship programmes.
 */
export function OpportunitiesFrame() {
  const reduceMotion = useReducedMotion();
  const step = useTimeline([2600, 4800]);
  const canvas = useCanvasSize();
  const shift = { phone: "-85%", tablet: "-33.333%", desktop: "-25%" }[
    canvas.name
  ];

  return (
    <motion.div
      className="min-h-full bg-white px-4 @5xl/app:px-6"
      initial={false}
      animate={{ y: reduceMotion ? 0 : step >= 2 ? -430 : 0 }}
      transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Promo banner */}
      <div className="px-4 py-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-8 text-white">
          <div className="flex flex-col gap-6 @5xl/app:flex-row @5xl/app:items-center @5xl/app:justify-between">
            <div className="space-y-4">
              <span className="inline-flex rounded-xl bg-white/20 px-2 py-0.5 text-xs font-medium">
                Now Hiring
              </span>
              <h2 className="text-3xl font-bold">
                Welcome to Career Opportunities Hub
              </h2>
              <p className="max-w-[600px] text-white/80">
                Discover amazing career opportunities with top companies. From
                startups to Fortune 500, find the perfect role that matches your
                skills and ambitions.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "Browse All Jobs",
                  "View Fellowships",
                  "Explore Projects",
                ].map((label) => (
                  <span
                    key={label}
                    className="inline-flex h-9 items-center rounded-2xl bg-white px-4 text-sm font-medium text-indigo-700"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="hidden @7xl/app:block">
              <motion.div
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="relative h-40 w-40"
              >
                <div className="absolute inset-0 rounded-full bg-white/10" />
                <div className="absolute inset-4 rounded-full bg-white/20" />
                <div className="absolute inset-8 rounded-full bg-white/30" />
                <div className="absolute inset-12 rounded-full bg-white/40" />
                <div className="absolute inset-16 rounded-full bg-white/50" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured projects */}
      <section className="space-y-4 px-4 py-8">
        <SectionHeader
          title="Featured Open Source Projects"
          description="Contribute to popular open source projects and make an impact in the developer community."
        />
        <div className="overflow-hidden">
          <motion.div
            className="-ml-4 flex"
            initial={false}
            animate={{ x: reduceMotion ? 0 : step >= 1 ? shift : "0%" }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            {projects.map((p) => (
              <div key={p.title} className={basis}>
                <ProjectCard project={p} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured fellowships */}
      <section className="-mx-4 bg-gray-100/30 @5xl/app:-mx-6">
        <div className="space-y-4 px-8 py-8 @5xl/app:px-10">
          <SectionHeader
            title="Featured Fellowship Programs"
            description="Apply to prestigious fellowship programs like GSoC, MLH Fellowship, and more."
          />
          <div className="-ml-4 flex overflow-hidden">
            {fellowships.map((f) => (
              <div key={f.title} className={basis}>
                <FellowshipCard f={f} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
