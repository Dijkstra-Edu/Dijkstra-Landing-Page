import type { Metadata } from "next";
import { Compass, Eye, Hammer, Route, Users } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { CtaBand } from "@/components/site/cta-band";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Mission",
  description:
    "It is still possible to land well-compensated, meaningful jobs in tech. Dijkstra helps students prepare actively, not passively.",
};

export default function MissionPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Our mission"
        title={
          <>
            Prepare <span className="text-green-400">actively</span>, not
            passively
          </>
        }
        description="Entry-level roles in tech have become fiercely competitive. Many students graduate without offers, competition has intensified and AI is reshaping roles. We firmly believe it is still possible to land well-compensated, meaningful jobs in tech â€” by getting back to the fundamentals and preparing systematically."
      />

      <Section title="The problems students face">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <Eye className="h-6 w-6 text-green-500" />
            <h3 className="mt-4 text-lg font-semibold">
              Lack of awareness and visibility
            </h3>
            <p className="mt-2 leading-relaxed text-neutral-400">
              Students from premier institutes are mentored from day one.
              Students from Tier-2 and Tier-3 colleges are often left in the
              dark: how to join product companies, which skills matter, where
              the opportunities are. Industry staples like Git, GitHub, Docker
              and Kubernetes are frequently missing from curricula.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <Compass className="h-6 w-6 text-green-500" />
            <h3 className="mt-4 text-lg font-semibold">
              Overwhelming complexity
            </h3>
            <p className="mt-2 leading-relaxed text-neutral-400">
              Computer science is vast. Without guidance, students get pulled
              between courses, videos, roadmaps and bootcamps with no trusted
              path â€” which leads to confusion, burnout and missed opportunities.
            </p>
          </div>
        </div>
      </Section>

      <Section title="How Dijkstra solves them">
        <ol className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Users,
              title: "A real community",
              text: "An open-source, student-run space that is safe, inclusive and mentorship-focused â€” for anyone passionate about computer science.",
            },
            {
              icon: Route,
              title: "A clear path to success",
              text: "Strong fundamentals (DSA, operating systems, networks), developmental knowledge for real-world work, and the soft skills a career needs.",
            },
            {
              icon: Hammer,
              title: "Hands-on experience",
              text: "Students build Dijkstra itself â€” full-stack apps, microservices and cloud services â€” and come out with proof of work.",
            },
          ].map((item, i) => (
            <li
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 font-mono text-xs text-neutral-300">
                  {i + 1}
                </span>
                <item.icon className="h-5 w-5 text-neutral-500" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-neutral-400">
                {item.text}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <blockquote className="mx-auto max-w-3xl border-l-2 border-green-500 pl-6 text-2xl font-medium leading-relaxed text-white sm:text-3xl">
          We want you to get back to your roots, and to systematically approach
          preparing for software engineering â€” actively, not passively.
        </blockquote>
        <p className="mx-auto mt-6 max-w-3xl pl-6 text-sm text-neutral-500">
          Read the full mission in the{" "}
          <a
            href={`${siteConfig.docsUrl}/dijkstra-introduction/mission/`}
            className="text-green-400 hover:underline"
          >
            Dijkstra docs
          </a>
          .
        </p>
      </Section>

      <CtaBand />
    </PageShell>
  );
}
