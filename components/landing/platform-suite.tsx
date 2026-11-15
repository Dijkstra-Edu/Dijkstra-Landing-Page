"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/features/status-badge";
import type { FeatureStatus } from "@/content/features";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { siteConfig } from "@/lib/site";

type SuiteItem = {
  title: string;
  description: string;
  status: FeatureStatus;
  bullets: string[];
  cta: { label: string; href: string };
  learnMore: string;
  media:
    | { kind: "image"; src: string; alt: string }
    | { kind: "phones"; shots: { src: string; alt: string }[] };
};

const suite: SuiteItem[] = [
  {
    title: "Dijkstra GPT",
    description:
      "Our in-house AI assistant for software engineering prep. Consider it that senior in university who could advise you on a thing or two â€” one who also knows your GitHub, LeetCode and rank.",
    status: "beta",
    bullets: [
      "Scoped to computer science, careers and your own progress",
      "Reads your metrics through secure, user-scoped tools",
      "Remembers your conversations",
      "Built by Dijkstra's AI & ML engineering team",
    ],
    learnMore: "/products/dijkstra-gpt",
    cta: {
      label: "Try Dijkstra GPT",
      href: `${siteConfig.platformUrl}/dijkstra-gpt`,
    },
    media: {
      kind: "image",
      src: "/dijkstra-gpt.png",
      alt: "Dijkstra GPT chat interface",
    },
  },
  {
    title: "Dijkstra Analytics & Tracking",
    description:
      "Gain insights across all your platforms â€” from LeetCode and GitHub to research â€” in one place, with a rank that reflects real proof of work.",
    status: "beta",
    bullets: [
      "GitHub, LeetCode and LinkedIn in one dashboard",
      "Daily task list and streaks",
      "Rank and XP from the Helios ranking service",
      "Contribution heatmaps and activity trends",
    ],
    learnMore: "/products/dashboard",
    cta: {
      label: "Open your dashboard",
      href: `${siteConfig.platformUrl}/dashboard`,
    },
    media: {
      kind: "image",
      src: "/dashboard.png",
      alt: "Dijkstra analytics dashboard",
    },
  },
  {
    title: "Dijkstra Mobile",
    description:
      "Bring the tracking to your phone too, with mobile apps built by Dijkstra's own community mobile teams.",
    status: "in-development",
    bullets: [
      "Android and iOS apps built by community teams",
      "Tasks, streaks and featured posts on the go",
      "LeetCode daily and blog feed",
      "One account across web and mobile",
    ],
    learnMore: "/products/mobile",
    cta: { label: "Follow progress on GitHub", href: siteConfig.links.github },
    media: {
      kind: "phones",
      shots: [
        { src: "/mobile1.png", alt: "Dijkstra mobile splash screen" },
        { src: "/mobile2.jpeg", alt: "Dijkstra mobile featured posts" },
        { src: "/mobile3.jpeg", alt: "Dijkstra mobile about screen" },
      ],
    },
  },
];

export function PlatformSuite() {
  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative overflow-hidden py-20 md:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(5,177,5,0.1),transparent_50%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          id="products-heading"
          eyebrow="Products"
          title="The Dijkstra Platform Suite"
          description="The products students use every day â€” built in the open, by students, on top of Dijkstra's backend services."
        />

        <div className="space-y-20 md:space-y-28">
          {suite.map((item, index) => {
            const reversed = index % 2 === 1;
            return (
              <div
                key={item.title}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:px-8 xl:px-16"
              >
                <motion.div
                  initial={{ opacity: 0, x: reversed ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={cn(
                    "space-y-4 md:space-y-6",
                    reversed && "md:order-last",
                  )}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-bold md:text-3xl">
                      {item.title}
                    </h3>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="text-base text-gray-300 md:text-lg">
                    {item.description}
                  </p>
                  <ul className="space-y-2 md:space-y-3">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                        <span className="text-sm md:text-base">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      className="group border-2 border-gray-700 bg-gray-900/50 text-white transition-all duration-300 hover:border-green-500 hover:bg-gray-800/50 hover:text-white"
                      asChild
                    >
                      <Link href={item.learnMore}>
                        Learn more
                        <ArrowRight className="h-4 w-4 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-green-500" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-gray-300 hover:bg-white/5 hover:text-white"
                      asChild
                    >
                      <a href={item.cta.href}>{item.cta.label}</a>
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: reversed ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="rounded-lg bg-gradient-to-br from-green-500/20 to-gray-500/20 p-1">
                    {item.media.kind === "image" ? (
                      <div className="relative w-full overflow-hidden rounded-lg">
                        <Image
                          src={item.media.src}
                          alt={item.media.alt}
                          width={1280}
                          height={720}
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="h-auto w-full rounded-lg shadow-lg"
                        />
                      </div>
                    ) : (
                      <div className="flex h-[260px] items-center justify-center gap-2 md:h-[400px] md:gap-4">
                        {item.media.shots.map((shot) => (
                          <Image
                            key={shot.src}
                            src={shot.src}
                            alt={shot.alt}
                            width={120}
                            height={240}
                            className="h-auto max-h-full w-[28%] max-w-[120px] rounded-lg object-contain shadow-lg"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
