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
    <section className="relative overflow-hidden pb-16 pt-28 sm:pt-32 md:pb-24 md:pt-40">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-[#048304]/20" />
        <div className="absolute left-0 right-0 top-0 h-[500px] bg-gradient-to-b from-black via-[#048304]/10 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Your Career in Software
            <br /> Starts Here
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mb-10 max-w-2xl text-base text-gray-300 sm:text-lg md:text-xl"
          >
            Welcome to Dijkstra â€” an open-source platform, free for every
            student, designed to help you crack software engineering jobs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <Button
              className="group rounded-xl bg-green-700 px-8 py-6 text-base font-semibold text-white transition-colors duration-300 hover:bg-green-800"
              asChild
            >
              <a href={platformLinks.onboarding}>
                Get Started Now
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              variant="ghost"
              className="group rounded-xl px-8 py-6 text-base font-medium text-gray-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
              asChild
            >
              <a href={platformLinks.dashboard}>
                Go to Dashboard
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative mx-auto w-full max-w-6xl"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-green-500/20 via-emerald-400/10 to-green-700/20 blur-3xl" />
          <div className="relative">
            <HeroShowcase />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
