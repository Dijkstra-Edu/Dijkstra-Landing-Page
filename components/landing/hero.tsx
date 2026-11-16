"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { platformLinks } from "@/lib/site";

/**
 * The showcase renders charts (recharts) and animations, none of which are
 * useful on the server, so it is loaded client-side only. The skeleton has
 * the exact same footprint to avoid layout shift.
 */
const HeroShowcase = dynamic(
  () =>
    import("@/components/showcase/hero-showcase").then((m) => m.HeroShowcase),
  { ssr: false, loading: () => <ShowcaseSkeleton /> },
);

function ShowcaseSkeleton() {
  return (
    <div aria-hidden>
      <div className="flex h-[540px] overflow-hidden rounded-xl border border-white/10 bg-black md:h-[560px] lg:h-[600px]">
        <div className="hidden w-44 shrink-0 flex-col gap-2 p-4 lg:flex">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-3 rounded bg-white/10" />
          ))}
        </div>
        <div className="m-2 flex-1 animate-pulse rounded-xl bg-white/90" />
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 rounded-lg border border-white/10" />
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      data-nav-tone="dark"
      className="relative overflow-hidden border-b border-white/10 bg-black pb-16 pt-28 sm:pt-32 md:pb-24 md:pt-40"
    >
      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Your career in software starts here
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mb-10 max-w-2xl text-pretty text-base text-neutral-400 sm:text-lg md:text-xl"
          >
            Welcome to Dijkstra â€” an open-source platform, free for every
            student, designed to help you crack software engineering jobs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
          >
            <Button
              className="group h-11 rounded-lg bg-green-700 px-6 text-[15px] font-medium text-white hover:bg-green-600"
              asChild
            >
              <a href={platformLinks.onboarding}>
                Get started now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              className="group h-11 rounded-lg border border-white/15 px-6 text-[15px] font-medium text-neutral-200 hover:border-white/30 hover:bg-white/5 hover:text-white"
              asChild
            >
              <a href={platformLinks.dashboard}>
                Go to dashboard
                <ChevronRight className="h-4 w-4 text-neutral-500 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="relative mx-auto w-full max-w-6xl"
        >
          <HeroShowcase />
        </motion.div>
      </div>
    </section>
  );
}
