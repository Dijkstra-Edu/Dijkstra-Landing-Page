"use client";

import { useEffect, useState } from "react";
import { addWeeks, format } from "date-fns";
import {
  AlertCircle,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  Code,
  FileSearch,
  Hourglass,
  Lightbulb,
  LogIn,
  Terminal,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ScrollingLogos from "@/components/scrolling-logos";
import { cn } from "@/lib/utils";
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

type TimelineSubItem = {
  title: string;
  content: React.ReactNode;
};

type TimelineItemProps = {
  title: string;
  description: string;
  content: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  isLast?: boolean;
  cumulativeTime?: string;
  date?: Date | null;
  subItems?: TimelineSubItem[];
};

const TimelineItem = ({
  title,
  description,
  content,
  icon: Icon,
  isLast = false,
  cumulativeTime,
  date,
  subItems = [],
}: TimelineItemProps) => (
  <div className="flex">
    <div className="mr-3 flex flex-col items-center sm:mr-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-green-700 bg-white sm:h-10 sm:w-10">
        <Icon className="h-4 w-4 text-green-700 sm:h-5 sm:w-5" />
      </div>
      {!isLast && <div className="mt-2 h-full w-0.5 bg-green-700/30"></div>}
    </div>
    <div className="mb-6 min-w-0 flex-1">
      <Card className="mb-2 gap-0 py-0">
        <CardHeader className="px-4 pb-2 pt-4 sm:px-6 sm:pt-6">
          <CardTitle className="text-base leading-snug sm:text-lg">
            {title}
          </CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-4 text-sm sm:px-6 sm:pb-6 sm:text-base">
          {content}
          {date && (
            <p className="mt-2 text-sm text-muted-foreground">
              <Calendar className="inline mr-2" />
              Estimated date: {format(date, "dd MMM yyyy")}
            </p>
          )}
        </CardContent>
      </Card>
      {subItems.map((item, index) => (
        <Card
          key={index}
          className="ml-3 mt-2 gap-0 border-dashed py-0 sm:ml-8"
        >
          <CardHeader className="px-4 pb-2 pt-4 sm:px-6">
            <CardTitle className="text-sm">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 text-sm sm:px-6">
            {item.content}
          </CardContent>
        </Card>
      ))}
      {cumulativeTime && (
        <div className="mt-2 text-right">
          <span className="bg-muted px-2 py-1 rounded text-sm font-semibold text-black">
            {cumulativeTime}
          </span>
        </div>
      )}
    </div>
  </div>
);

export function HowItWorks() {
  const [selectedTimelinePath, setSelectedTimelinePath] = useState<
    "beginners" | "university"
  >("beginners");
  // The start date is only known on the client. Initialising it during
  // render (`new Date()`) produced different markup on the server and the
  // client, which triggered React hydration errors.
  const [startDate, setStartDate] = useState<Date | null>(null);

  useEffect(() => {
    setStartDate(new Date());
  }, []);

  const calculateDate = (weeks: number) => {
    return startDate ? addWeeks(startDate, weeks) : null;
  };

  const renderAbsoluteBeginners = () => (
    <div className="space-y-4">
      <h3 className="mb-4 mt-6 text-lg font-semibold text-gray-900 sm:text-xl">
        Path 1: Absolute Beginners
      </h3>
      <TimelineItem
        title="0) Onboarding with Dijkstra"
        description="Get started by Setting up everything you need, From important sites to code editors. Time taken depends on your knoweldge of Git (or) other version control systems."
        icon={LogIn}
        content={
          <p>
            <Clock className="inline mr-2" />
            Takes anywhere between 30mins to 3 hours to get up and running.
          </p>
        }
        cumulativeTime="Start"
        date={startDate}
      />
      <TimelineItem
        title="1) Learning to Code"
        description="Get started with the fundamentals of Coding. Start by learning the basics, building up to knowledge for both projects, as well as technical interviews."
        icon={Code}
        content={
          <p>
            <Clock className="inline mr-2" />
            This can take anywhere between 4-8 weeks.
          </p>
        }
        cumulativeTime="6 weeks"
        date={calculateDate(6)}
      />
      <TimelineItem
        title="2) Gaining Value from Learning to Code"
        description="Now the fun begins! Start by building simple projects, while progressing in your understanding of logic through DSA."
        icon={FileSearch}
        content={
          <p>
            <Clock className="inline mr-2" />
            Can take anywhere between 1-2 months.
          </p>
        }
        subItems={[
          {
            title: "Start working on Projects",
            content: (
              <p>
                <Clock className="inline mr-2" />
                Depends on the length of projects. Anywhere from 3 hours to a
                week. The expectation is to complete multiple projects to better
                understand how to use code practically.
              </p>
            ),
          },
          {
            title: "Getting started with DSA and Leetcode",
            content: (
              <p>
                <Clock className="inline mr-2" />
                Understanding DSA goes a long way in being able to code what you
                think in an effective manner! This can take a while, potentially
                a month of serious study
              </p>
            ),
          },
        ]}
        cumulativeTime="8 weeks"
        date={calculateDate(8)}
      />
      {renderFinalSteps(2)}
    </div>
  );

  const renderUniversityandExperienced = () => (
    <div className="space-y-4">
      <h3 className="mb-4 mt-6 text-lg font-semibold text-gray-900 sm:text-xl">
        Path 2: For University and Experienced Students
      </h3>
      <TimelineItem
        title="0) Onboarding with Dijkstra"
        description="Get started by Setting up everything you need, From important sites to code editors. Time taken depends on your knoweldge of Git (or) other version control systems."
        icon={LogIn}
        content={
          <p>
            <Clock className="inline mr-2" />
            Takes anywhere between 30mins to 3 hours to get up and running.
          </p>
        }
        cumulativeTime="Start"
        date={startDate}
      />
      <TimelineItem
        title="1) Getting Started with Leetcode"
        description="Start by improving your DSA skills by practicing 2 problems a day."
        icon={Terminal}
        content={
          <p>
            <Clock className="inline mr-2" />
            Takes anywhere between 30mins to 3 hours to get up and running.
          </p>
        }
        cumulativeTime="6 weeks"
        date={calculateDate(6)}
      />
      <TimelineItem
        title="2) Refactoring Approach to Projects"
        description="Revamping profiles, portfolios and resumes to better reflect your skills and experience."
        icon={Building}
        content={
          <p>
            <Clock className="inline mr-2" />
            Can take anywhere between 2-4 weeks.
          </p>
        }
        cumulativeTime="8 weeks"
        date={calculateDate(8)}
      />
      <TimelineItem
        title="3) Approaching opportunities with Dijkstra and partner organizations"
        description="Putting to use everything you've learned so far, with the help of Dijkstra and our partner organizations."
        icon={CheckCircle}
        content={
          <p>
            <Clock className="inline mr-2" />
            Ideally 1-2 months of work within open source projects.
          </p>
        }
        cumulativeTime="10 weeks"
        date={calculateDate(10)}
      />
      <TimelineItem
        title="4) Start applying to other Open Source Opportunities"
        description="These include fellowships like GSOC, LFX, Outreachy, MLH Fellowship, etc."
        icon={FileSearch}
        content={
          <p>
            <Clock className="inline mr-2" />
            Anywhere between 3-6 months, depending on time of year
          </p>
        }
        cumulativeTime="18 weeks"
        date={calculateDate(18)}
      />
      {renderFinalSteps(0)}
    </div>
  );

  const renderFinalSteps = (previousWeeks: number) => (
    <>
      <TimelineItem
        title="Start Applying to S-tier Opportunities"
        description="These could be top of the line industry opportunities, research positions, or partner companies."
        icon={Lightbulb}
        content={
          <>
            <p className="mb-2">
              <Clock className="inline mr-2" />
              Keep working on Leetcode and DSA, preferrably company specific
              problems.
            </p>
            <p className="mb-2">
              <FileSearch className="inline mr-2" />
              Have your Resume, CV and your story in order.
            </p>
            <p className="mb-2">
              <Clock className="inline mr-2" />
              Mock Interviews with members from the community
            </p>
            <p>
              <AlertCircle className="inline mr-2" />
              Brush up on general knoweldge. Everything on your Resume is fair
              game!
            </p>
            <p className="mt-4 text-sm text-muted-foreground"></p>
          </>
        }
        cumulativeTime={`${previousWeeks + 4} weeks`}
        date={calculateDate(previousWeeks + 4)}
      />
      <TimelineItem
        title="Prepare to Slow down work @Dijkstra"
        description="You've done it! You've achieved a top tier job, hopefully one that's well compensated. All the Hardwork has paid off! Around here you are moved away from development within Dijkstra to focus on your new chapter."
        icon={Hourglass}
        content={
          <p>
            Hand over your responsibilities and document your work so the next
            cohort can pick it up.
          </p>
        }
        cumulativeTime={`${previousWeeks + 4} weeks`}
        date={calculateDate(previousWeeks + 4)}
      />
      <TimelineItem
        title="Mentoring + Management @Dijkstra"
        description="You have the option to continue to work at Dijkstra as a Mentor or as a Technical Lead in Dijkstra's various projects. This could be experience that you can use to leverage better opportunities in your own career. The other option would be to step down into a community member role, a Passive, but lifelong member of the Dijkstra community :)"
        icon={CheckCircle}
        isLast={true}
        content={
          <p>
            Mentor newer members, lead a project, or stay on as a lifelong
            community member.
          </p>
        }
        cumulativeTime={`â™¾ weeks`}
        date={calculateDate(previousWeeks + 54)}
      />
    </>
  );

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="relative overflow-hidden bg-white py-20 md:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(5,177,5,0.08),transparent_50%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          id="how-it-works-heading"
          tone="light"
          eyebrow="Your path"
          title="So how does this work?"
          description="Dijkstra helps you track progress and prepare for CS roles. It is aimed mainly at aspiring software engineers still in university, but anyone who wants to break into tech can use it."
        />

        <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-end">
          <div className="w-full max-w-xs">
            <label
              htmlFor="start-date"
              className="mb-2 block text-center text-sm font-medium text-gray-700 sm:text-left"
            >
              If you start on
            </label>
            <Input
              type="date"
              id="start-date"
              value={startDate ? startDate.toISOString().split("T")[0] : ""}
              onChange={(e) => {
                // Ignore cleared/partial input: `new Date("")` is an Invalid
                // Date and would make date-fns' format() throw.
                const next = new Date(e.target.value);
                if (!Number.isNaN(next.getTime())) setStartDate(next);
              }}
              className="h-10 w-full text-gray-700"
            />
          </div>

          {/* Timeline path toggle (both paths are shown side by side on xl) */}
          <div
            role="group"
            aria-label="Choose a path"
            className="flex w-full max-w-xs rounded-lg bg-gray-100 p-1 sm:w-auto sm:max-w-none xl:hidden"
          >
            {(
              [
                ["beginners", "Absolute beginners"],
                ["university", "University students"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={selectedTimelinePath === value}
                onClick={() => setSelectedTimelinePath(value)}
                className={cn(
                  "flex-1 rounded-md px-3 py-2 text-sm font-medium leading-tight transition-all duration-200 sm:whitespace-nowrap sm:px-4",
                  selectedTimelinePath === value
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline content */}
        <div className="mx-auto max-w-3xl xl:max-w-none xl:px-8">
          <div className="xl:grid xl:grid-cols-2 xl:gap-10">
            <div
              className={cn(
                "space-y-4",
                selectedTimelinePath !== "beginners" && "hidden xl:block",
              )}
            >
              {renderAbsoluteBeginners()}
            </div>
            <div
              className={cn(
                "space-y-4",
                selectedTimelinePath !== "university" && "hidden xl:block",
              )}
            >
              {renderUniversityandExperienced()}
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <h3 className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-gray-500 sm:text-sm">
            Our members have gone on to work at
          </h3>
          <ScrollingLogos logos={logos} />
        </div>
      </div>
    </section>
  );
}
