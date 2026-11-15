"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { moreFeatures } from "@/content/features";
import { FeatureStream } from "@/components/features/feature-stream";
import { StatusBadge } from "@/components/features/status-badge";

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
      className="relative overflow-hidden py-24"
      aria-labelledby="features-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.12),transparent_60%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-500">
            Features
          </p>
          <h2
            id="features-heading"
            className="mb-5 text-4xl font-extrabold text-white md:text-5xl"
          >
            Everything your preparation needs, in one place
          </h2>
          <p className="text-lg leading-relaxed text-gray-400">
            Watch each part of Dijkstra stream in â€” the same building blocks you
            will use every day on the platform.
          </p>
        </motion.div>

        <FeatureStream />

        <div className="mt-20">
          <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-neutral-500">
            And there is more
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {moreFeatures.map((feature, i) => (
              <motion.div
                key={feature.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.05]",
                  bentoSpan[i],
                )}
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl bg-white/5",
                      feature.accent,
                    )}
                  >
                    <feature.icon className="h-5 w-5" />
                  </span>
                  <StatusBadge status={feature.status} />
                </div>
                <h4 className="text-lg font-semibold text-white">
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
                  className="mt-4 inline-flex text-sm font-medium text-green-400 after:absolute after:inset-0 hover:text-green-300"
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
