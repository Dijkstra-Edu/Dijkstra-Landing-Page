"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { headlines, type Headline } from "@/content/job-market";
import { SectionHeading } from "./section-heading";

const tagStyle: Record<Headline["tag"], string> = {
  Layoffs: "bg-red-50 text-red-700 ring-red-200",
  Hiring: "bg-green-50 text-green-700 ring-green-200",
  "AI & jobs": "bg-violet-50 text-violet-700 ring-violet-200",
  Careers: "bg-amber-50 text-amber-700 ring-amber-200",
};

/**
 * Masonry of real headlines about the job market students graduate into.
 * Pure CSS columns: cards keep their natural height, nothing is absolutely
 * positioned, so the section can never overlap its neighbours.
 */
export function JobMarket() {
  return (
    <section
      id="job-market"
      aria-labelledby="job-market-heading"
      data-nav-tone="light"
      className="relative overflow-hidden border-t border-neutral-200 bg-white py-20 md:py-28"
    >
      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          id="job-market-heading"
          tone="light"
          eyebrow="The reality"
          title="The market students graduate into"
          description="Layoffs, AI and saturated entry-level roles make the headlines. Dijkstra exists so you can prepare anyway â€” actively, not passively."
        />

        <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [&>li]:mb-4 [&>li]:break-inside-avoid">
          {headlines.map((item, i) => {
            const featured = i % 5 === 0;
            return (
              <motion.li
                key={item.url}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group block rounded-xl border p-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600",
                    featured
                      ? "border-neutral-900 bg-neutral-950 text-white"
                      : "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset",
                        featured
                          ? "bg-white/10 text-white ring-white/20"
                          : tagStyle[item.tag],
                      )}
                    >
                      {item.tag}
                    </span>
                    <ArrowUpRight
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                        featured
                          ? "text-green-400"
                          : "text-gray-400 group-hover:text-green-600",
                      )}
                    />
                  </div>
                  <p
                    className={cn(
                      "mt-4 font-semibold leading-snug",
                      featured ? "text-xl" : "text-base sm:text-lg",
                    )}
                  >
                    {item.title}
                  </p>
                  <p
                    className={cn(
                      "mt-4 text-xs",
                      featured ? "text-gray-400" : "text-gray-500",
                    )}
                  >
                    {item.source}
                  </p>
                </a>
              </motion.li>
            );
          })}
        </ul>
        <p className="mt-6 text-center text-xs text-gray-500">
          Headlines link to third-party articles and reflect their authors&apos;
          views.
        </p>
      </div>
    </section>
  );
}
