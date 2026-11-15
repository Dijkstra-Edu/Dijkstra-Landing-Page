"use client";

import type React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Shared heading for home-page sections: eyebrow, title and description with
 * one consistent type scale and spacing on light and dark backgrounds.
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={cn(
        "mb-12 max-w-2xl md:mb-16",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-sm font-semibold uppercase tracking-widest",
            tone === "dark" ? "text-green-500" : "text-green-700",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          "text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl",
          tone === "dark" ? "text-white" : "text-gray-900",
        )}
      >
        {title}
      </h2>
      {description && (
        <div
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-gray-400" : "text-gray-600",
          )}
        >
          {description}
        </div>
      )}
    </motion.div>
  );
}
