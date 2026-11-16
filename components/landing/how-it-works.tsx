"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { addWeeks, format } from "date-fns";
import { ArrowRight } from "lucide-react";
import ScrollingLogos from "@/components/scrolling-logos";
import { cn } from "@/lib/utils";
import { platformLinks } from "@/lib/site";
import { SectionHeading } from "./section-heading";

const logos = [
  "/logos/CERN.png",
  "/logos/microsoft.png",
  "/logos/apple.png",
  "/logos/amazon.png",
  "/logos/hsbc.png",
  "/logos/hyperface.png",
  "/logos/balkan.jpeg",
  "/logos/HP.png",
  "/logos/phillips.png",
  "/logos/pwc.png",
  "/logos/signify.png",
  "/logos/tcs.png",
];

type Step = {
  title: string;
  detail: string;
  /** How long the step usually takes (from Dijkstra's onboarding guide). */
  duration: string;
  /** Week (from the start date) the step usually begins. */
  startWeek: number;
  points?: string[];
};

type Path = {
  id: "beginners" | "university";
  label: string;
  title: string;
  summary: string;
  /** Week by which most students are applying to S-tier roles. */
  readyWeek: number;
  steps: Step[];
};

const onboarding: Step = {
  title: "Onboard with Dijkstra",
  detail:
    "Set up GitHub, Git, VS Code, Discord, LeetCode and LinkedIn with our guides.",
  duration: "30 min â€“ 3 h",
  startWeek: 0,
};

const applyStep = (startWeek: number): Step => ({
  title: "Apply to S-tier opportunities",
  detail:
    "Top industry roles, research positions and partner companies â€” while you keep practising.",
  duration: "Ongoing",
  startWeek,
  points: [
    "Company-specific LeetCode",
    "Resume, CV and your story in order",
    "Mock interviews with the community",
  ],
});

const paths: Path[] = [
  {
    id: "beginners",
    label: "Absolute beginners",
    title: "Starting from zero",
    summary:
      "Learn to code, then turn it into projects and problem-solving you can show.",
    readyWeek: 14,
    steps: [
      onboarding,
      {
        title: "Learn to code",
        detail:
          "Fundamentals first â€” enough for both projects and technical interviews.",
        duration: "4â€“8 weeks",
        startWeek: 0,
      },
      {
        title: "Build projects and start DSA",
        detail:
          "Ship several small projects while working through DSA on LeetCode.",
        duration: "1â€“2 months",
        startWeek: 6,
        points: ["Projects: a few hours to a week each", "DSA: about a month"],
      },
      applyStep(14),
    ],
  },
  {
    id: "university",
    label: "University students",
    title: "Already coding",
    summary:
      "Sharpen DSA, reshape your profile and earn proof of work in open source.",
    readyWeek: 18,
    steps: [
      onboarding,
      {
        title: "LeetCode, two problems a day",
        detail: "Build DSA consistency alongside everything else.",
        duration: "Ongoing",
        startWeek: 0,
      },
      {
        title: "Refactor your projects and profiles",
        detail:
          "Revamp portfolio, profiles and resume so they reflect your real work.",
        duration: "2â€“4 weeks",
        startWeek: 2,
      },
      {
        title: "Open source with Dijkstra and partners",
        detail: "Put it all to use on real projects with mentors.",
        duration: "1â€“2 months",
        startWeek: 6,
      },
      {
        title: "Apply to open-source fellowships",
        detail: "GSoC, LFX, Outreachy, MLH Fellowship and more.",
        duration: "3â€“6 months",
        startWeek: 12,
      },
      applyStep(18),
    ],
  },
];

/**
 * "So how does this work?" â€” one path at a time, as a compact stepper with
 * durations and dates estimated from a start date you pick.
 */
export function HowItWorks() {
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const [pathId, setPathId] = useState<Path["id"]>("beginners");
  // The start date is only known on the client; rendering `new Date()` on
  // the server would produce different markup and a hydration error.
  const [startDate, setStartDate] = useState<Date | null>(null);
  useEffect(() => setStartDate(new Date()), []);

  const path = paths.find((p) => p.id === pathId)!;
  const dateAt = (weeks: number) =>
    startDate ? format(addWeeks(startDate, weeks), "d MMM yyyy") : "â€”";

  return (
    <section
      id="how-it-works"
      data-nav-tone="light"
      aria-labelledby="how-it-works-heading"
      className="relative overflow-hidden border-t border-neutral-200 bg-neutral-50 py-20 md:py-28"
    >
      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          id="how-it-works-heading"
          tone="light"
          eyebrow="Your path"
          title="So how does this work?"
          description="Pick where you are today. Dijkstra lays out the steps, how long each usually takes, and when you could be applying."
        />

        <div className="mx-auto max-w-5xl">
          {/* Controls */}
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div
              role="radiogroup"
              aria-label="Choose a path"
              className="inline-flex w-full rounded-lg border border-neutral-200 bg-white p-1 sm:w-auto"
            >
              {paths.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={pathId === p.id}
                  onClick={() => setPathId(p.id)}
                  className={cn(
                    "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors sm:flex-none",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600",
                    pathId === p.id
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-600 hover:text-neutral-900",
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <label
              htmlFor="start-date"
              className="flex items-center justify-between gap-3 text-sm text-neutral-600 sm:justify-start"
            >
              Starting
              <input
                type="date"
                id="start-date"
                value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
                onChange={(e) => {
                  // Ignore cleared/partial input: `new Date("")` is an
                  // Invalid Date and would make date-fns' format() throw.
                  const next = new Date(`${e.target.value}T00:00:00`);
                  if (!Number.isNaN(next.getTime())) setStartDate(next);
                }}
                className="h-9 rounded-md border border-neutral-200 bg-white px-2.5 text-sm text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
              />
            </label>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-10">
            {/* Summary */}
            <aside className="h-fit rounded-xl border border-neutral-200 bg-white p-6 lg:sticky lg:top-28">
              <p className="text-sm font-medium text-green-700">{path.label}</p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight text-neutral-900">
                {path.title}
              </h3>
              <p className="mt-2 text-neutral-600">{path.summary}</p>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-neutral-200 pt-5 text-sm">
                <div>
                  <dt className="text-neutral-500">Steps</dt>
                  <dd className="mt-0.5 text-lg font-semibold tabular-nums text-neutral-900">
                    {path.steps.length}
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Applying from</dt>
                  <dd
                    className="mt-0.5 text-lg font-semibold tabular-nums text-neutral-900"
                    suppressHydrationWarning
                  >
                    {dateAt(path.readyWeek)}
                  </dd>
                </div>
              </dl>
              <a
                href={platformLinks.onboarding}
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 underline-offset-4 hover:underline"
              >
                Start onboarding
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </aside>

            {/* Steps */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.ol
                key={path.id}
                aria-labelledby={`${baseId}-steps`}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <span id={`${baseId}-steps`} className="sr-only">
                  {path.label}: steps
                </span>
                {path.steps.map((step, i) => {
                  const last = i === path.steps.length - 1;
                  return (
                    <li
                      key={step.title}
                      className="relative flex gap-4 pb-8 last:pb-0"
                    >
                      {!last && (
                        <span
                          aria-hidden
                          className="absolute left-[13px] top-8 h-[calc(100%-2rem)] w-px bg-neutral-200"
                        />
                      )}
                      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-white font-mono text-xs text-neutral-700">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                          <h3 className="font-semibold text-neutral-900">
                            {step.title}
                          </h3>
                          <p
                            className="shrink-0 text-sm tabular-nums text-neutral-500"
                            suppressHydrationWarning
                          >
                            {step.duration} Â· from {dateAt(step.startWeek)}
                          </p>
                        </div>
                        <p className="mt-1 text-neutral-600">{step.detail}</p>
                        {step.points && (
                          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-500">
                            {step.points.map((point) => (
                              <li
                                key={point}
                                className="flex items-center gap-1.5"
                              >
                                <span className="h-1 w-1 rounded-full bg-neutral-400" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  );
                })}
                <li className="mt-8 rounded-lg border border-dashed border-neutral-300 p-4 text-sm text-neutral-600">
                  <span className="font-medium text-neutral-900">
                    After the offer:
                  </span>{" "}
                  hand over your work and document it for the next cohort â€” then
                  stay on as a mentor or tech lead, or as a lifelong member of
                  the community.
                </li>
              </motion.ol>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="mb-6 text-center text-sm font-medium text-neutral-500">
            Our members have gone on to work at
          </h3>
          <ScrollingLogos logos={logos} />
        </div>
      </div>
    </section>
  );
}
