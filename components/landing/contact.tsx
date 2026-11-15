"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BrainCircuit, MessageSquare, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/contact-form";
import { platformLinks } from "@/lib/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28 bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
    >
      {/* Background accents */}
      <div className="absolute inset-0">
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.08),transparent_70%)]" /> */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.06),transparent_70%)]" /> */}
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 lg:gap-20 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white">
              Building Incredible Software <br />
              For Students, <br />
              By Students.
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 leading-relaxed max-w-xl">
              Kickstart your journey with{" "}
              <span className="text-green-600 dark:text-green-400 font-semibold">
                Dijkstra
              </span>
              . Changing the future of CS Education in India. So, Ready to Get
              Started?
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              {/* Primary CTA */}
              <Button
                className="relative bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold 
                          px-8 py-3 rounded-xl shadow-lg shadow-green-600/20 cursor-pointer
                          transition-all duration-300 hover:scale-[1.04] hover:shadow-green-500/30"
                asChild
              >
                <a href={platformLinks.onboarding}>Get Started</a>
              </Button>

              {/* Secondary CTA */}
              <Button
                className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white 
                          border border-gray-200 dark:border-gray-800 
                          font-medium px-8 py-3 rounded-xl 
                          transition-colors duration-200 cursor-pointer
                          hover:bg-gray-100 dark:hover:bg-gray-800"
                asChild
              >
                <a href={platformLinks.dashboard}>Go to Dashboard</a>
              </Button>
            </div>

            {/* Resource cards */}
            <div className="grid items-center gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Knowledgebase",
                  desc: "Guides for onboarding, contributing and every service.",
                  icon: BrainCircuit,
                  link: "/knowledge-base",
                  action: "Browse guides",
                  color: "text-red-400 dark:text-green-400",
                },
                {
                  title: "FAQ",
                  desc: "Search our FAQ for answers to anything you might ask.",
                  icon: MessageSquare,
                  link: "/faq",
                  action: "Visit FAQ",
                  color: "text-yellow-400 dark:text-green-400",
                },
                {
                  title: "Developer APIs",
                  desc: "Architecture, services and the public Teams API.",
                  icon: Wrench,
                  link: "/developers",
                  action: "Explore APIs",
                  color: "text-green-600 dark:text-green-400",
                },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  className="group rounded-xl bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm 
                            border border-gray-200/60 dark:border-gray-800/60 shadow-sm p-6 
                            hover:shadow-lg hover:-translate-y-1 transition-all text-center"
                >
                  <item.icon className={item.color + " mx-auto h-10 w-10"} />
                  <div className="mt-5">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {item.desc}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-5 inline-flex items-center gap-x-1 font-medium">
                      {item.action}
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m9 18 6-6-6-6"
                        />
                      </svg>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
          {/* Divider */}
          <div className="hidden lg:block w-px bg-gradient-to-b from-gray-200/70 via-gray-300/40 to-transparent dark:from-gray-700/60 dark:via-gray-700/40 dark:to-transparent mx-auto rounded-full" />

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/10 blur-3xl rounded-full pointer-events-none" />
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
