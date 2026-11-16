"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  CheckCircle,
  Eye,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import { SectionHeading } from "./section-heading";

const principles = [
  {
    icon: Eye,
    title: "Visibility",
    description:
      "Track your progress across platforms like GitHub, LinkedIn, Leetcode, Codeforces, and more. See yourself level up through validated Proof of Work.",
  },
  {
    icon: BrainCircuit,
    title: "Develop Skills",
    description:
      "Sharpen your DSA, Software Engineering, and Systems Design with tasks like code pushes, articles, mentoring, and leading projects.",
  },
  {
    icon: CheckCircle,
    title: "Proof of Work",
    description:
      "Your growth is visible across multiple platforms. Dijkstra helps gamify this journey, guiding you to plan and execute effectively.",
  },
  {
    icon: Target,
    title: "Efficiency",
    description:
      "A project can double up as a research paper or portfolio piece. Dijkstra helps you align efforts to maximize output.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Give back by writing, coding, mentoring, and contributing. Build credibility and grow with the global tech community.",
  },
  {
    icon: Workflow,
    title: "Growth Mindset",
    description:
      "Everything leads to something bigger â€” internships, articles, or research. Dijkstra helps connect the dots for your career.",
  },
];

/**
 * Six principles as a quiet hairline grid: numbered, one small monochrome
 * icon each, no shadows or hover lifts.
 */
export function Principles() {
  return (
    <section
      id="what-is-dijkstra"
      data-nav-tone="light"
      aria-labelledby="what-is-dijkstra-heading"
      className="bg-white py-20 md:py-28"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          id="what-is-dijkstra-heading"
          tone="light"
          eyebrow="Principles"
          title="So what's Dijkstra?"
          description={
            <>
              Dijkstra is a one-stop, open-source platform for aspiring software
              engineers to prepare for â€” and crack â€” jobs in today&apos;s
              competitive landscape. At its core, it works on six principles.
            </>
          }
        />

        <ol className="grid overflow-hidden rounded-2xl border border-neutral-200 sm:grid-cols-2 lg:grid-cols-3 [&>li]:border-neutral-200 max-sm:[&>li:not(:last-child)]:border-b sm:max-lg:[&>li:nth-child(odd)]:border-r sm:max-lg:[&>li:nth-child(-n+4)]:border-b lg:[&>li:not(:nth-child(3n))]:border-r lg:[&>li:nth-child(-n+3)]:border-b">
          {principles.map((item, index) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
              className="bg-white p-6 sm:p-8"
            >
              <div className="mb-6 flex items-center justify-between text-neutral-400">
                <item.icon className="h-5 w-5 text-green-700" aria-hidden />
                <span className="font-mono text-xs tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                {item.title}
              </h3>
              <p className="leading-relaxed text-neutral-600">
                {item.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
