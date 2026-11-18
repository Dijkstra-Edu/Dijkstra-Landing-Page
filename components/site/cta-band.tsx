import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { platformLinks, siteConfig } from "@/lib/site";

/** Closing call-to-action used at the bottom of sub-pages. */
export function CtaBand({
  title = "Ready to start building your proof of work?",
  description = "Dijkstra is free for students. Set up in minutes and join a team of people learning the same way.",
  primary = { label: "Get started", href: platformLinks.onboarding },
  secondary = { label: "Join the Discord", href: siteConfig.links.discord },
}: {
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  const Primary = primary.href.startsWith("/") ? Link : "a";
  const Secondary = secondary.href.startsWith("/") ? Link : "a";
  return (
    <section className="container mx-auto px-4 pb-20 pt-8 md:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-8 sm:p-12">
        <h2 className="max-w-2xl text-balance text-2xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-neutral-400">{description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Primary
            href={primary.href}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 font-medium text-white transition-colors hover:bg-green-600"
          >
            {primary.label} <ArrowRight className="h-4 w-4" />
          </Primary>
          <Secondary
            href={secondary.href}
            className="inline-flex items-center justify-center rounded-lg border border-white/15 px-5 py-2.5 font-medium text-neutral-200 transition-colors hover:border-white/30 hover:bg-white/5"
          >
            {secondary.label}
          </Secondary>
        </div>
      </div>
    </section>
  );
}
