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
      <div className="relative overflow-hidden rounded-3xl border border-green-500/20 bg-gradient-to-br from-green-950/70 via-black to-black p-8 sm:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
        <h2 className="max-w-2xl text-2xl font-bold sm:text-4xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-neutral-400">{description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Primary
            href={primary.href}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-600"
          >
            {primary.label} <ArrowRight className="h-4 w-4" />
          </Primary>
          <Secondary
            href={secondary.href}
            className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 font-medium text-neutral-200 transition-colors hover:border-white/30 hover:bg-white/5"
          >
            {secondary.label}
          </Secondary>
        </div>
      </div>
    </section>
  );
}
