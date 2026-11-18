import type { Metadata } from "next";
import { Check, Minus, X } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { CtaBand } from "@/components/site/cta-band";

export const metadata: Metadata = {
  title: "Comparisons",
  description:
    "How Dijkstra compares with traditional placement training, practising alone and paid bootcamps.",
};

type Mark = "yes" | "partial" | "no";
const columns = [
  "Dijkstra",
  "Traditional placement training",
  "Practising alone",
  "Paid bootcamps",
];
const rows: { label: string; marks: Mark[] }[] = [
  {
    label: "Real team experience with code review",
    marks: ["yes", "no", "no", "partial"],
  },
  {
    label: "Public, verifiable proof of work",
    marks: ["yes", "no", "partial", "partial"],
  },
  {
    label: "Progress across GitHub, LeetCode & LinkedIn in one place",
    marks: ["yes", "no", "no", "no"],
  },
  { label: "Rank that reflects actual work", marks: ["yes", "no", "no", "no"] },
  {
    label: "AI mentor that knows your progress",
    marks: ["yes", "no", "no", "partial"],
  },
  {
    label: "Structured DSA and development paths",
    marks: ["partial", "yes", "no", "yes"],
  },
  {
    label: "Mentorship from peers who got there",
    marks: ["yes", "partial", "no", "yes"],
  },
  { label: "Free for students", marks: ["yes", "partial", "yes", "no"] },
  { label: "Open source", marks: ["yes", "no", "no", "no"] },
];

function Cell({ mark }: { mark: Mark }) {
  if (mark === "yes")
    return (
      <Check className="mx-auto h-5 w-5 text-green-500" aria-label="Yes" />
    );
  if (mark === "partial")
    return (
      <Minus className="mx-auto h-5 w-5 text-amber-400" aria-label="Partly" />
    );
  return <X className="mx-auto h-5 w-5 text-neutral-600" aria-label="No" />;
}

export default function ComparePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Comparisons"
        title="Why Dijkstra is different"
        description="Most preparation is passive: watch, memorise, repeat. Dijkstra is built around active preparation â€” building in a real team and making your work visible."
      />
      <Section>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="bg-white/[0.03]">
                <th
                  scope="col"
                  className="p-4 text-left font-medium text-neutral-400"
                >
                  <span className="sr-only">Capability</span>
                </th>
                {columns.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    className={
                      i === 0
                        ? "p-4 text-center font-semibold text-green-300"
                        : "p-4 text-center font-medium text-neutral-300"
                    }
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-white/10">
                  <th
                    scope="row"
                    className="p-4 text-left font-normal text-neutral-200"
                  >
                    {row.label}
                  </th>
                  {row.marks.map((m, i) => (
                    <td
                      key={i}
                      className={i === 0 ? "bg-green-500/[0.04] p-4" : "p-4"}
                    >
                      <Cell mark={m} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-neutral-500">
          Generalisations, not reviews of any specific provider. Dijkstra&apos;s
          structured learning paths are still being built (see the Learning
          Hub).
        </p>
      </Section>
      <Section
        title="Use them together"
        description="Dijkstra is not a replacement for practice or coursework. It is the place where that work adds up."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            [
              "Keep practising",
              "Your LeetCode and GitHub work counts towards your dashboard and rank.",
            ],
            [
              "Keep learning",
              "Courses teach; Dijkstra gives you a team to apply what you learned.",
            ],
            [
              "Get seen",
              "Everything you build becomes public proof of work that universities and companies can verify.",
            ],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-neutral-400">{text}</p>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand />
    </PageShell>
  );
}
