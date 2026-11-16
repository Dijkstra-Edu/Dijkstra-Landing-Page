import type { Metadata } from "next";
import Link from "next/link";
import { Check, Info } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { CtaBand } from "@/components/site/cta-band";
import { platformLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Plans & Pricing",
  description:
    "Dijkstra is free for students. Here is how planned tiers for students, universities and companies are intended to work.",
};

type Plan = {
  name: string;
  badge: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
};

const studentPlans: Plan[] = [
  {
    name: "Free",
    badge: "Available now",
    description: "Everything you need to start building proof of work.",
    features: [
      "Rank and stats aggregation",
      "Proof-of-work dashboard and daily tasks",
      "Resume & CV builder",
      "Teams, mentors and open-source projects",
      "Bring your own database and Gemini key for advanced features",
    ],
    cta: { label: "Get started", href: platformLinks.onboarding },
    highlighted: true,
  },
  {
    name: "Basic",
    badge: "Planned",
    description: "A managed experience for students who want more help.",
    features: [
      "Everything in Free",
      "Dijkstra GPT with a monthly allowance",
      "Dijkstra manages your data (or keep managing it yourself)",
      "Resume optimisation",
      "Company-specific interview study notes",
    ],
    cta: { label: "Follow the roadmap", href: "/roadmap" },
  },
  {
    name: "Pro",
    badge: "Planned",
    description: "Full guidance towards the role you want.",
    features: [
      "Everything in Basic",
      "Unlimited, fully context-aware Dijkstra GPT",
      "Learning Hub",
      "Personalised plan with daily tasks and reminders",
      "Entry into Dijkstra's company talent pool",
    ],
    cta: { label: "Follow the roadmap", href: "/roadmap" },
  },
];

const orgPlans = [
  {
    name: "Universities",
    description:
      "Licences that give every student the full platform, with monitoring and reporting of student progress and placement preparation.",
    tiers: [
      "Basic â€” all students on the full plan, basic monitoring",
      "Enterprise â€” advanced monitoring, reporting and a job board for your students",
      "Custom â€” end-to-end upskilling programmes",
    ],
    href: "/contact?topic=universities",
  },
  {
    name: "Companies",
    description:
      "Access to a pool of students ranked by proof of work, and support to hire them â€” based on skills already shown, not potential.",
    tiers: [
      "Basic â€” access to the talent pool",
      "Enterprise â€” reservations for top students",
      "Custom â€” tailored hiring programmes",
    ],
    href: "/contact?topic=companies",
  },
];

export default function PricingPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Plans & Pricing"
        title="Free for students. Sustainable for everyone."
        description="Dijkstra is open source and free for students today. To keep it that way, we plan to offer optional paid tiers for students who want more, and programmes for universities and companies."
      >
        <p className="inline-flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm text-amber-200/90">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          Paid tiers are planned, not final: features may change and prices have
          not been set.
        </p>
      </PageHero>

      <Section id="students" title="For students">
        <div className="grid gap-4 lg:grid-cols-3">
          {studentPlans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "flex flex-col rounded-3xl border p-6 sm:p-8",
                plan.highlighted
                  ? "border-green-600/50 bg-neutral-950"
                  : "border-white/10 bg-white/[0.03]",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                    plan.highlighted
                      ? "bg-green-500/15 text-green-300"
                      : "bg-white/10 text-neutral-300",
                  )}
                >
                  {plan.badge}
                </span>
              </div>
              <p className="mt-2 text-sm text-neutral-400">
                {plan.description}
              </p>
              <p className="mt-6 text-4xl font-bold">
                {plan.highlighted ? "â‚¹0" : "TBD"}
                <span className="ml-1 text-base font-normal text-neutral-500">
                  {plan.highlighted ? "forever" : "pricing not set"}
                </span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-neutral-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    {f}
                  </li>
                ))}
              </ul>
              {plan.cta.href.startsWith("/") ? (
                <Link
                  href={plan.cta.href}
                  className="mt-8 inline-flex justify-center rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium hover:border-white/30 hover:bg-white/5"
                >
                  {plan.cta.label}
                </Link>
              ) : (
                <a
                  href={plan.cta.href}
                  className="mt-8 inline-flex justify-center rounded-xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-600"
                >
                  {plan.cta.label}
                </a>
              )}
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm text-neutral-500">
          Contributors who help build Dijkstra can earn upgraded access through
          their contributions.
        </p>
      </Section>

      <Section
        id="organisations"
        title="For universities and companies"
        description="Programmes are being piloted. Tell us what you need and we will shape them with you."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {orgPlans.map((plan) => (
            <div
              key={plan.name}
              className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
            >
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="mt-3 text-neutral-400">{plan.description}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.tiers.map((t) => (
                  <li key={t} className="flex gap-3 text-sm text-neutral-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    {t}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className="mt-8 inline-flex justify-center rounded-xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-600"
              >
                Talk to us
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand title="Start free today" />
    </PageShell>
  );
}
