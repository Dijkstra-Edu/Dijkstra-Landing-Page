import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight, Github, Users } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { PostCard } from "@/components/blog/post-card";
import { postsForProduct } from "@/content/blog";
import { Section } from "@/components/site/section";
import { LinkCard } from "@/components/site/link-card";
import { CtaBand } from "@/components/site/cta-band";
import { StatusBadge } from "@/components/features/status-badge";
import { StreamDemo } from "@/components/features/stream-demo";
import { getProduct, products, type Product } from "@/content/products";
import { statusLabel } from "@/content/features";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.tagline}. ${product.summary}`,
  };
}

function Visual({ product }: { product: Product }) {
  const { visual } = product;
  if (visual.kind === "stream") return <StreamDemo stream={visual.stream} />;
  if (visual.kind === "image") {
    return (
      <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-950 p-1.5">
        <Image
          src={visual.src}
          alt={visual.alt}
          width={1280}
          height={720}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-auto w-full rounded-xl"
          priority
        />
      </div>
    );
  }
  return (
    <div className="flex h-[320px] items-center justify-center gap-3 rounded-xl border border-white/10 bg-neutral-950 p-4 sm:h-[420px]">
      {visual.shots.map((shot) => (
        <Image
          key={shot.src}
          src={shot.src}
          alt={shot.alt}
          width={150}
          height={300}
          className="h-auto max-h-full w-[30%] max-w-[150px] rounded-xl object-contain shadow-lg"
        />
      ))}
    </div>
  );
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const related = product.related
    .map((slug) => getProduct(slug))
    .filter((p): p is Product => Boolean(p));
  const ctaExternal = !product.cta.href.startsWith("/");
  const posts = postsForProduct(product.slug);

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container relative mx-auto grid items-center gap-10 px-4 pb-12 pt-8 md:px-6 md:pt-12 lg:grid-cols-2 lg:gap-14 lg:px-8">
          <div>
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-1 text-sm text-neutral-500"
            >
              <Link href="/products" className="hover:text-white">
                Products
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-neutral-300">{product.name}</span>
            </nav>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <product.icon className="h-5 w-5 text-neutral-400" />
              <StatusBadge status={product.status} />
            </div>
            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-3 text-xl text-neutral-300">{product.tagline}</p>
            <p className="mt-5 text-lg leading-relaxed text-neutral-400">
              {product.summary}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {ctaExternal ? (
                <a
                  href={product.cta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 font-medium text-white hover:bg-green-600"
                >
                  {product.cta.label} <ArrowRight className="h-4 w-4" />
                </a>
              ) : (
                <Link
                  href={product.cta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 font-medium text-white hover:bg-green-600"
                >
                  {product.cta.label} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              <Link
                href="/features"
                className="inline-flex items-center justify-center rounded-lg border border-white/15 px-5 py-2.5 font-medium text-neutral-200 hover:border-white/30 hover:bg-white/5"
              >
                All features
              </Link>
            </div>
            {product.status !== "live" && (
              <p className="mt-4 text-sm text-neutral-500">
                Status: {statusLabel[product.status]} â€” details may change as
                the team ships.
              </p>
            )}
          </div>
          <div className="min-w-0">
            <Visual product={product} />
          </div>
        </div>
      </section>

      <Section id="highlights" title="What you get">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {product.highlights.map((h) => (
            <div
              key={h.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <h.icon className="h-5 w-5 text-neutral-400" />
              <h3 className="mt-4 font-semibold">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {h.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="how-it-works" title="How it works">
        <ol className="grid gap-4 md:grid-cols-3">
          {product.steps.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 font-mono text-xs text-neutral-300">
                {i + 1}
              </span>
              <h3 className="mt-4 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="under-the-hood"
        title="Under the hood"
        description="The open-source services behind this product."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
            {product.underTheHood.map((service) => (
              <div
                key={service.name}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">{service.name}</h3>
                  {service.repo && (
                    <a
                      href={service.repo}
                      className="text-neutral-500 hover:text-white"
                      aria-label={`${service.name} on GitHub`}
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <p className="mt-1 text-sm text-neutral-400">{service.role}</p>
                <p className="mt-3 font-mono text-xs text-neutral-500">
                  {service.stack}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 p-5">
            <Users className="h-5 w-5 text-neutral-400" />
            <h3 className="mt-4 font-semibold">Built by students</h3>
            <p className="mt-2 text-sm text-neutral-400">
              {product.name} is built by Dijkstra&apos;s{" "}
              {product.builtBy.map((t, i) => (
                <span key={t}>
                  <span className="text-white">{t}</span>
                  {i < product.builtBy.length - 2
                    ? ", "
                    : i === product.builtBy.length - 2
                      ? " and "
                      : ""}
                </span>
              ))}{" "}
              {product.builtBy.length > 1 ? "teams" : "team"}.
            </p>
            <Link
              href="/team"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-neutral-200 underline-offset-4 hover:text-white hover:underline"
            >
              Meet the team <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      {product.faqs.length > 0 && (
        <Section id="faq" title="Questions">
          <div className="max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10">
            {product.faqs.map((faq) => (
              <details
                key={faq.q}
                className="group p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                  {faq.q}
                  <ChevronRight className="h-4 w-4 shrink-0 text-neutral-500 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-neutral-400">{faq.a}</p>
              </details>
            ))}
          </div>
        </Section>
      )}

      {posts.length > 0 && (
        <Section id="reading" title="From the blog">
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} tone="dark" />
            ))}
          </div>
        </Section>
      )}

      <Section id="related" title="Related">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <LinkCard
              key={p.slug}
              href={`/products/${p.slug}`}
              icon={<p.icon className="h-5 w-5 text-neutral-400" />}
              title={p.name}
              description={p.tagline}
              meta={<StatusBadge status={p.status} />}
            />
          ))}
        </div>
      </Section>

      <CtaBand />
    </PageShell>
  );
}
