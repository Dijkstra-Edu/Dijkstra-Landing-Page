"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";

export function Mission() {
  return (
    <section
      id="mission"
      aria-labelledby="mission-heading"
      className="relative overflow-hidden bg-gray-50 pb-10 pt-20 md:pb-14 md:pt-28"
    >
      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          id="mission-heading"
          tone="light"
          eyebrow="Our mission"
          title="Prepare actively, not passively"
          className="mb-8 md:mb-10"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl space-y-5 text-center text-base leading-relaxed text-gray-700 sm:text-lg"
        >
          <p>
            It&apos;s 2025, and entry-level roles have become nothing short of a
            bloodbath: loads of students left without jobs, a natural saturation
            of the field, AI taking over roles â€” quite a lot happening at once.
            We at Dijkstra firmly believe that it is still possible to land
            well-compensated jobs in tech, irrespective of everything happening
            in the world today.
          </p>
          <p className="font-medium text-gray-900">
            We want you to get back to your roots, and to systematically
            approach preparing for software engineering â€” actively, not
            passively.
          </p>
          <Link
            href="/mission"
            className="inline-flex items-center gap-2 pt-2 text-sm font-semibold text-green-700 hover:text-green-600"
          >
            Read our mission â†’
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
