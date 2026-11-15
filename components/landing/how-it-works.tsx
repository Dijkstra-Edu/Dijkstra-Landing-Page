"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    <div className="flex flex-col items-center mr-4">
      <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary bg-background">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      {!isLast && <div className="w-0.5 h-full bg-primary mt-2"></div>}
    </div>
    <div className="flex-1 mb-6">
      <Card className="mb-2">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
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
        <Card key={index} className="ml-8 mt-2 border-dashed">
          <CardHeader>
            <CardTitle className="text-sm">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>{item.content}</CardContent>
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
      <h2 className="text-xl font-semibold mt-6 mb-4 text-black">
        Path 1: Absolute Beginners
      </h2>
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
      <h2 className="text-xl font-semibold mt-6 mb-4 text-black">
        Path 2: For University and Experienced Students
      </h2>
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
      className="py-12 bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(5, 177, 5,0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
              So how does this work?
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Dijkstra helps you track progress and prepare towards CS roles.
              This is mainly aimed towards aspiring Software Engineers still in
              University. It can still be used by anyone who would like to break
              into tech!
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center mb-6">
          <div>
            <label
              htmlFor="start-date"
              className="block text-sm font-medium text-gray-700 mb-2 text-center"
            >
              On starting Today:
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
              className="w-full max-w-xs text-gray-700"
            />
          </div>
        </div>

        {/* Timeline Path Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              onClick={() => setSelectedTimelinePath("beginners")}
              className={cn(
                "px-6 py-2 rounded-md text-sm font-medium transition-all duration-200",
                selectedTimelinePath === "beginners"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900",
              )}
            >
              Absolute Beginners
            </button>
            <button
              onClick={() => setSelectedTimelinePath("university")}
              className={cn(
                "px-6 py-2 rounded-md text-sm font-medium transition-all duration-200",
                selectedTimelinePath === "university"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900",
              )}
            >
              University Students
            </button>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="xl:grid xl:grid-cols-2 xl:gap-8">
            <div
              className={cn(
                "space-y-4",
                selectedTimelinePath !== "beginners" && "xl:block hidden",
              )}
            >
              {renderAbsoluteBeginners()}
            </div>
            <div
              className={cn(
                "space-y-4",
                selectedTimelinePath !== "university" && "xl:block hidden",
              )}
            >
              {renderUniversityandExperienced()}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-center text-gray-600 text-sm uppercase mb-6 tracking-wider">
            Our Members have gone on to work in the following companies:
          </h3>
          <ScrollingLogos logos={logos} />
        </div>
      </div>
    </section>
  );
}
