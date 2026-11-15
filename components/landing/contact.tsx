"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  ChevronRight,
  MessageSquare,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/contact-form";
import { platformLinks } from "@/lib/site";

const resources = [
  {
    title: "Knowledge base",
    desc: "Guides for onboarding, contributing and every service.",
    icon: BrainCircuit,
    href: "/knowledge-base",
    color: "text-rose-500 bg-rose-50",
  },
  {
    title: "FAQ",
    desc: "Answers to the questions we get asked most.",
    icon: MessageSquare,
    href: "/faq",
    color: "text-amber-500 bg-amber-50",
  },
  {
    title: "Developer APIs",
    desc: "Architecture, services and the public Teams API.",
    icon: Wrench,
    href: "/developers",
    color: "text-green-600 bg-green-50",
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2
              id="contact-heading"
              className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl"
            >
              Building Incredible Software <br className="hidden sm:block" />
              For Students, <br className="hidden sm:block" />
              By Students.
            </h2>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-600">
              Kickstart your journey with{" "}
              <span className="font-semibold text-green-700">Dijkstra</span> â€”
              changing the future of CS education in India. Ready to get
              started?
            </p>

            <div className="mb-12 flex flex-col gap-3 sm:flex-row">
              <Button
                className="h-11 rounded-xl bg-green-700 px-8 font-semibold text-white shadow-lg shadow-green-700/20 hover:bg-green-800"
                asChild
              >
                <a href={platformLinks.onboarding}>Get Started</a>
              </Button>
              <Button
                variant="outline"
                className="h-11 rounded-xl border-gray-300 bg-white px-8 font-medium text-gray-900 hover:bg-gray-100"
                asChild
              >
                <a href={platformLinks.dashboard}>Go to Dashboard</a>
              </Button>
            </div>

            <ul className="grid gap-3">
              {resources.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                    >
                      <item.icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-gray-900">
                        {item.title}
                      </span>
                      <span className="block text-sm text-gray-600">
                        {item.desc}
                      </span>
                    </span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-green-600" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="min-w-0"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
