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

export function Principles() {
  return (
    <section
      id="what-is-dijkstra"
      aria-labelledby="what-is-dijkstra-heading"
      className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20 md:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.08),transparent_60%)]" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
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

        <div className="grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {[
            {
              icon: <Eye className="h-6 w-6 text-purple-500" />,
              title: "Visibility",
              description:
                "Track your progress across platforms like GitHub, LinkedIn, Leetcode, Codeforces, and more. See yourself level up through validated Proof of Work.",
            },
            {
              icon: <BrainCircuit className="h-6 w-6 text-blue-500" />,
              title: "Develop Skills",
              description:
                "Sharpen your DSA, Software Engineering, and Systems Design with tasks like code pushes, articles, mentoring, and leading projects.",
            },
            {
              icon: <CheckCircle className="h-6 w-6 text-green-500" />,
              title: "Proof of Work",
              description:
                "Your growth is visible across multiple platforms. Dijkstra helps gamify this journey, guiding you to plan and execute effectively.",
            },
            {
              icon: <Target className="h-6 w-6 text-red-500" />,
              title: "Efficiency",
              description:
                "A project can double up as a research paper or portfolio piece. Dijkstra helps you align efforts to maximize output.",
            },
            {
              icon: <Users className="h-6 w-6 text-yellow-500" />,
              title: "Community",
              description:
                "Give back by writing, coding, mentoring, and contributing. Build credibility and grow with the global tech community.",
            },
            {
              icon: <Workflow className="h-6 w-6 text-gray-500" />,
              title: "Growth Mindset",
              description:
                "Everything leads to something bigger â€” internships, articles, or research. Dijkstra helps connect the dots for your career.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8">
                <div className="mb-6 flex items-center justify-center w-14 h-14 rounded-xl bg-gray-100">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
