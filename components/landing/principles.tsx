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

export function Principles() {
  return (
    <section
      id="what-is-dijkstra"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.08),transparent_60%)]" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
              So what's Dijkstra?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Dijkstra is a one-stop, open-source platform for aspiring Software
              Engineers to prepare and crack jobs in todayâ€™s competitive
              landscape.
              <br /> <br />
              At its core, Dijkstra works on the following principles:
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
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
              <div className="h-full bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
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
