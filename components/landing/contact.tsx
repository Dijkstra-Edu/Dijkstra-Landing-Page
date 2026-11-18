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
  },
  {
    title: "FAQ",
    desc: "Answers to the questions we get asked most.",
    icon: MessageSquare,
    href: "/faq",
  },
  {
    title: "Developer APIs",
    desc: "Architecture, services and the public Teams API.",
    icon: Wrench,
    href: "/developers",
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      data-nav-tone="light"
      className="relative overflow-hidden border-t border-neutral-200 bg-neutral-50 py-20 md:py-28"
    >
      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <h2
              id="contact-heading"
              className="mb-6 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl xl:text-[3.5rem] xl:leading-[1.05]"
            >
              Building Incredible Software <br className="hidden sm:block" />
              For Students, <br className="hidden sm:block" />
              By Students.
            </h2>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-neutral-600">
              Kickstart your journey with{" "}
              <span className="font-semibold text-green-700">Dijkstra</span> â€”
              changing the future of CS education in India. Ready to get
              started?
            </p>

            <div className="mb-12 flex flex-col gap-3 sm:flex-row">
              <Button
                className="h-11 rounded-lg bg-green-700 px-6 font-medium text-white hover:bg-green-800"
                asChild
              >
                <a href={platformLinks.onboarding}>Get Started</a>
              </Button>
              <Button
                variant="outline"
                className="h-11 rounded-lg border-neutral-300 bg-white px-6 font-medium text-neutral-900 hover:bg-neutral-100"
                asChild
              >
                <a href={platformLinks.dashboard}>Go to Dashboard</a>
              </Button>
            </div>

            <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
              {resources.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-4 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                  >
                    <item.icon
                      className="h-5 w-5 shrink-0 text-neutral-400"
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-neutral-900">
                        {item.title}
                      </span>
                      <span className="block text-sm text-neutral-500">
                        {item.desc}
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-neutral-900" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="min-w-0"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
