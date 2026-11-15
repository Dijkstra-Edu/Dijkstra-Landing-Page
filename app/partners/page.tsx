import type { Metadata } from "next";
import { Building2, GitBranch, GraduationCap, Users } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { CtaBand } from "@/components/site/cta-band";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Partner with Dijkstra as a university, a company, an open-source organisation or a community.",
};

const partnerTypes = [
  {
    icon: GraduationCap,
    title: "Universities",
    text: "Give students a structured, proof-of-work path to placements and see their progress in one dashboard.",
    points: [
      "Student progress and placement readiness",
      "A job board for your students",
      "Students gain real team experience",
    ],
    href: "/products/universities",
  },
  {
    icon: Building2,
    title: "Companies",
    text: "Meet students whose skills are visible in public work, ranked and aligned with what you need.",
    points: [
      "Ranked, verifiable talent",
      "Post internships and roles",
      "Co-design hiring programmes",
    ],
    href: "/products/companies",
  },
  {
    icon: GitBranch,
    title: "Open-source organisations",
    text: "Bring mentored contributors to your project through Dijkstra's projects hub and programmes like GSoC.",
    points: [
      "List good first issues",
      "Mentored contributions",
      "Shared programmes",
    ],
    href: "/contact?topic=contributing",
  },
  {
    icon: Users,
    title: "Communities & clubs",
    text: "Start a Dijkstra club at your university and help students prepare together.",
    points: [
      "Community events",
      "Shared learning paths",
      "Support from Dijkstra mentors",
    ],
    href: "/contact?topic=general",
  },
];

export default function PartnersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Partners"
        title="Partner with Dijkstra"
        description="Dijkstra works with universities, companies, open-source projects and student communities to get students industry-ready. Our partner programmes are being shaped now â€” early partners help define them."
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          {partnerTypes.map((p) => (
            <a
              key={p.title}
              href={p.href}
              className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.05] sm:p-8"
            >
              <p.icon className="h-7 w-7 text-green-500" />
              <h2 className="mt-4 text-xl font-semibold group-hover:text-green-300">
                {p.title}
              </h2>
              <p className="mt-2 text-neutral-400">{p.text}</p>
              <ul className="mt-5 space-y-2 text-sm text-neutral-300">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                    {pt}
                  </li>
                ))}
              </ul>
            </a>
          ))}
        </div>
        <p className="mt-6 text-sm text-neutral-500">
          The company logos on our home page show where members have gone on to
          work; they are not partnerships or endorsements.
        </p>
      </Section>
      <CtaBand
        title="Become an early partner"
        description="Tell us about your university, company or community and we will get back to you."
        primary={{ label: "Contact us", href: "/contact?topic=universities" }}
        secondary={{ label: "See pricing plans", href: "/pricing" }}
      />
    </PageShell>
  );
}
