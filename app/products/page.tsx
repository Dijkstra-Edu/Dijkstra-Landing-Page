import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { LinkCard } from "@/components/site/link-card";
import { CtaBand } from "@/components/site/cta-band";
import { StatusBadge } from "@/components/features/status-badge";
import { products } from "@/content/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The Dijkstra platform suite: Dijkstra GPT, Helios ranking, the proof-of-work dashboard, resume builder, opportunities, blog, and dashboards for universities and companies.",
};

export default function ProductsPage() {
  const groups = [
    {
      title: "For students",
      items: products.filter((p) => p.audience === "Students"),
    },
    {
      title: "For universities and companies",
      items: products.filter((p) => p.audience === "Organisations"),
    },
  ];
  return (
    <PageShell>
      <PageHero
        eyebrow="Products"
        title="The Dijkstra platform suite"
        description="Everything a student needs to prepare for a career in software â€” and the tools universities and companies need to see that preparation â€” built in the open, by students."
      />
      {groups.map((group) => (
        <Section key={group.title} title={group.title}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((product) => (
              <LinkCard
                key={product.slug}
                href={`/products/${product.slug}`}
                icon={<product.icon className="h-5 w-5 text-neutral-400" />}
                title={product.name}
                description={product.tagline}
                meta={<StatusBadge status={product.status} />}
              />
            ))}
          </div>
        </Section>
      ))}
      <CtaBand />
    </PageShell>
  );
}
