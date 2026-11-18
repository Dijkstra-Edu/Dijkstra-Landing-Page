import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Info } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { getLegalDoc, legalDocs } from "@/content/legal";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const doc = getLegalDoc(params.slug);
  return doc ? { title: doc.title, description: doc.description } : {};
}

export default function LegalPage({ params }: { params: { slug: string } }) {
  const doc = getLegalDoc(params.slug);
  if (!doc) notFound();
  return (
    <PageShell>
      <PageHero
        eyebrow="Legal"
        title={doc.title}
        description={doc.description}
      />
      <div className="container mx-auto grid gap-10 px-4 pb-20 md:px-6 lg:grid-cols-[14rem_1fr] lg:px-8">
        <nav
          aria-label="Legal pages"
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {legalDocs.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/legal/${d.slug}`}
                  aria-current={d.slug === doc.slug ? "page" : undefined}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm transition-colors",
                    d.slug === doc.slug
                      ? "bg-white/10 text-white"
                      : "text-neutral-400 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {d.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="max-w-3xl">
          {doc.note && (
            <p className="mb-8 flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-neutral-300">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
              {doc.note}
            </p>
          )}
          <div className="space-y-10">
            {doc.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold">{section.heading}</h2>
                {section.paragraphs?.map((p) => (
                  <p key={p} className="mt-3 leading-relaxed text-neutral-300">
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-neutral-300 marker:text-green-500">
                    {section.bullets.map((b) => (
                      <li key={b} className="break-words">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
          {doc.canonical && (
            <a
              href={doc.canonical.href}
              className="mt-12 inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-2.5 font-medium hover:border-white/30 hover:bg-white/5"
            >
              {doc.canonical.label} <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </PageShell>
  );
}
