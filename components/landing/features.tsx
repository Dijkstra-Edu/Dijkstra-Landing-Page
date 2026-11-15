"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  FolderKanban,
  Github,
  Handshake,
  Trophy,
} from "lucide-react";

export function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.12),transparent_60%)]" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
              Features
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Our platform provides a suite of powerful tools designed to
              enhance productivity and streamline your workflow.
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              icon: <Brain className="h-6 w-6 text-purple-500" />,
              title: "Dijkstra GPT",
              description:
                "Integrate seamlessly with our API â€” developer-friendly with full documentation and examples.",
            },
            {
              icon: <Trophy className="h-6 w-6 text-blue-500" />,
              title: "Ranking & Tracking",
              description:
                "Track performance globally with lightning-fast metrics and uptime reliability.",
            },
            {
              icon: <BookOpen className="h-6 w-6 text-green-500" />,
              title: "Learning Center",
              description:
                "Expand knowledge through structured resources backed by enterprise-grade security.",
            },
            {
              icon: <FolderKanban className="h-6 w-6 text-red-500" />,
              title: "Projects Hub",
              description:
                "Collaborate on open-source projects and leverage AI-powered insights for growth.",
            },
            {
              icon: <Handshake className="h-6 w-6 text-yellow-500" />,
              title: "Mentorship",
              description:
                "Connect with experienced mentors and build credibility through guided learning.",
            },
            {
              icon: <Github className="h-6 w-6 text-gray-300" />,
              title: "Open Source",
              description:
                "Join our growing open-source ecosystem and contribute to community-driven tools.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:shadow-2xl hover:shadow-green-500/10 hover:scale-[1.02] transition-all duration-300">
                <div className="mb-6 flex items-center justify-center w-14 h-14 rounded-xl bg-white/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
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
