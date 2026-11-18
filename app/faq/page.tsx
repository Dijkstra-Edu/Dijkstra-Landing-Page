import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { CtaBand } from "@/components/site/cta-band";
import { faqGroups } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Dijkstra: cost, ranking, data, teams and contributing.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((g) =>
      g.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    ),
  };
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Can't find what you are looking for? Ask on Discord or send us a message."
      />
      {faqGroups.map((group) => (
        <Section
          key={group.title}
          title={group.title}
          className="py-8 md:py-10"
        >
          <div className="max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10">
            {group.items.map((item) => (
              <details
                key={item.q}
                className="group p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                  {item.q}
                  <ChevronRight className="h-4 w-4 shrink-0 text-neutral-500 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 leading-relaxed text-neutral-400">
                  {item.a}
                </p>
                {item.link &&
                  (item.link.href.startsWith("/") ? (
                    <Link
                      href={item.link.href}
                      className="mt-3 inline-block text-sm font-medium text-green-400 hover:text-green-300"
                    >
                      {item.link.label} â†’
                    </Link>
                  ) : (
                    <a
                      href={item.link.href}
                      className="mt-3 inline-block text-sm font-medium text-green-400 hover:text-green-300"
                    >
                      {item.link.label} â†’
                    </a>
                  ))}
              </details>
            ))}
          </div>
        </Section>
      ))}
      <CtaBand
        title="Still have questions?"
        primary={{ label: "Contact us", href: "/contact" }}
      />
    </PageShell>
  );
}
