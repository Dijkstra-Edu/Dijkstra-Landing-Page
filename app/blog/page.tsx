import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { posts, readingTime } from "@/content/blog";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Announcements, engineering deep-dives and guides from the Dijkstra team.",
};

export default function BlogPage() {
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured.slug);
  return (
    <PageShell>
      <PageHero
        eyebrow="Blog"
        title="News from Dijkstra"
        description={
          <>
            Announcements, engineering deep-dives and guides. For LeetCode
            solutions and articles written by members, visit the{" "}
            <a
              href={siteConfig.blogUrl}
              className="text-green-400 hover:underline"
            >
              Dijkstra Blog
            </a>
            .
          </>
        }
      />

      <Section className="pt-0 md:pt-0">
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20 md:grid-cols-2"
        >
          <div className="relative aspect-video md:aspect-auto md:min-h-[320px]">
            <Image
              src={featured.cover}
              alt={featured.coverAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
              priority
            />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="text-sm font-medium text-green-400">
              Featured Â· {featured.category}
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl group-hover:text-green-300">
              {featured.title}
            </h2>
            <p className="mt-3 text-neutral-400">{featured.excerpt}</p>
            <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white">
              Read article{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              <span className="text-neutral-500">
                Â· {readingTime(featured)} min read
              </span>
            </p>
          </div>
        </Link>
      </Section>

      <Section title="All posts">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20"
            >
              <div className="relative aspect-[16/9] bg-gradient-to-br from-green-950 to-black">
                <Image
                  src={post.cover}
                  alt={post.coverAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className={
                    post.cover.includes("splash")
                      ? "object-contain p-10"
                      : "object-cover"
                  }
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-green-400">
                  {post.category}
                </p>
                <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-green-300">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-neutral-400">
                  {post.excerpt}
                </p>
                <p className="mt-4 text-xs text-neutral-500">
                  {readingTime(post)} min read
                </p>
              </div>
            </Link>
          ))}
          <a
            href={siteConfig.blogUrl}
            className="group flex flex-col justify-between rounded-2xl border border-dashed border-white/15 p-6 transition-colors hover:border-green-500/40 hover:bg-green-500/[0.03]"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                Community writing
              </p>
              <h3 className="mt-2 text-lg font-semibold">
                LeetCode solutions & member articles
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                Step-by-step solutions and articles written by Dijkstra members.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-green-400">
              Visit the Dijkstra Blog <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </div>
      </Section>
    </PageShell>
  );
}
