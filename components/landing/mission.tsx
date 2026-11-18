"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";

export function Mission() {
  return (
    <section
      id="mission"
      aria-labelledby="mission-heading"
      data-nav-tone="light"
      className="relative overflow-hidden border-t border-neutral-200 bg-white py-20 md:py-28"
    >
      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          id="mission-heading"
          tone="light"
          eyebrow="Our mission"
          title="Prepare actively, not passively"
          className="mb-8 md:mb-10"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-3xl space-y-5 text-center text-base leading-relaxed text-neutral-600 sm:text-lg"
        >
          <p>
            It&apos;s 2025, and entry-level roles have become nothing short of a
            bloodbath: loads of students left without jobs, a natural saturation
            of the field, AI taking over roles â€” quite a lot happening at once.
            We at Dijkstra firmly believe that it is still possible to land
            well-compensated jobs in tech, irrespective of everything happening
            in the world today.
          </p>
          <p className="font-medium text-neutral-900">
            We want you to get back to your roots, and to systematically
            approach preparing for software engineering â€” actively, not
            passively.
          </p>
          <Link
            href="/mission"
            className="inline-flex items-center gap-2 pt-2 text-sm font-medium text-green-700 underline-offset-4 hover:underline"
          >
            Read our mission â†’
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
