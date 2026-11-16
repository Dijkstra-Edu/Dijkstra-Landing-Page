"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { moreFeatures } from "@/content/features";
import { FeatureStream } from "@/components/features/feature-stream";
import { StatusBadge } from "@/components/features/status-badge";
import { SectionHeading } from "./section-heading";

/** Bento spans for the six "more features" cards (lg and up). */
const bentoSpan = [
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
];

export function Features() {
  return (
    <section
      id="features"
      data-nav-tone="dark"
      className="relative overflow-hidden bg-neutral-950 py-20 md:py-28"
      aria-labelledby="features-heading"
    >
      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          id="features-heading"
          eyebrow="Features"
          title="Everything your preparation needs, in one place"
          description="Watch each part of Dijkstra stream in â€” the same building blocks you will use every day on the platform."
        />

        <FeatureStream />

        <div className="mt-20">
          <h3 className="mb-6 text-lg font-semibold text-white">
            And there is more
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {moreFeatures.map((feature, i) => (
              <motion.div
                key={feature.slug}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                className={cn(
                  "group relative overflow-hidden rounded-xl border border-white/10 p-6 transition-colors hover:border-white/25",
                  bentoSpan[i],
                )}
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <feature.icon
                    className="h-5 w-5 text-neutral-400"
                    aria-hidden
                  />
                  <StatusBadge status={feature.status} />
                </div>
                <h4 className="text-base font-semibold text-white">
                  {feature.name}
                </h4>
                <p className="mt-1 text-sm text-neutral-500">
                  {feature.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                  {feature.description}
                </p>
                <Link
                  href={feature.href}
                  className="mt-4 inline-flex text-sm font-medium text-neutral-300 after:absolute after:inset-0 group-hover:text-white"
                >
                  Learn more
                  <span className="sr-only"> about {feature.name}</span> â†’
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
