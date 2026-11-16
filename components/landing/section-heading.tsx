"use client";

import type React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Shared heading for home-page sections: eyebrow, title and description with
 * one consistent type scale and spacing on light and dark backgrounds.
 *
 * Deliberately quiet: a sentence-case eyebrow (no letter-spaced capitals),
 * semibold titles and a short, subtle reveal.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  tone = "dark",
  align = "center",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  tone?: "dark" | "light";
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "mb-12 max-w-2xl md:mb-16",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-sm font-medium",
            tone === "dark" ? "text-green-500" : "text-green-700",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          "text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]",
          tone === "dark" ? "text-white" : "text-gray-900",
        )}
      >
        {title}
      </h2>
      {description && (
        <div
          className={cn(
            "mt-4 text-pretty text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-neutral-400" : "text-neutral-600",
          )}
        >
          {description}
        </div>
      )}
    </motion.div>
  );
}
