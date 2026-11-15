"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { platformLinks } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-[#048304]/20" />
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-black via-[#048304]/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5, 177, 5,0.1),transparent_65%)]" />
        {/* Sparkling Stars 
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 6 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>*/}
      </div>

      <div className="container mx-auto px-4 relative min-h-screen py-20 z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white  to-white bg-clip-text text-transparent leading-tight"
          >
            Your Career in Software
            <br /> Starts Here
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Welcome to Dijkstra, an open source free for all platform designed
            to help you crack software engineering jobs with ease.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              className="group bg-green-700 hover:bg-green-800 cursor-pointer text-white px-8 py-6 rounded-xl text-base font-semibold transition-colors duration-300"
              asChild
            >
              <a href={platformLinks.onboarding}>
                <span className="flex items-center gap-2">
                  Get Started Now
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </Button>

            <Button
              variant="ghost"
              className="group px-8 py-6 rounded-xl text-base font-medium cursor-pointer text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
              asChild
            >
              <a href={platformLinks.dashboard}>
                <span className="flex items-center gap-2">
                  Go to Dashboard
                  <svg
                    className="h-5 w-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </a>
            </Button>
          </motion.div>
        </div>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative w-full max-w-5xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg blur-3xl" />
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/dashboard.png"
                alt="Hero Image"
                width={1200}
                height={1200}
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
