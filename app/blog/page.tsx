import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { PostCard } from "@/components/blog/post-card";
import { BlogIndex } from "@/components/blog/blog-index";
import { posts } from "@/content/blog";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Announcements, engineering deep-dives and guides from the Dijkstra team.",
};

export default function BlogPage() {
  const featured = posts.find((p) => p.featured) ?? posts[0];
  return (
    <PageShell tone="light">
      <header className="container mx-auto px-4 pb-10 pt-10 md:px-6 md:pt-14 lg:px-8">
        <p className="text-sm font-medium text-green-700">Blog</p>
        <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl md:text-6xl">
          News from Dijkstra
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-neutral-600">
          Announcements, engineering deep-dives and guides from the people
          building Dijkstra.
        </p>
      </header>

      <section
        aria-label="Featured post"
        className="container mx-auto px-4 pb-16 md:px-6 md:pb-20 lg:px-8"
      >
        <PostCard
          post={featured}
          variant="featured"
          headingLevel={2}
          priority
        />
      </section>

      <section
        aria-labelledby="all-posts"
        className="container mx-auto px-4 pb-20 md:px-6 md:pb-28 lg:px-8"
      >
        <BlogIndex posts={posts} featuredSlug={featured.slug} />
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="container mx-auto flex flex-col items-start justify-between gap-6 px-4 py-12 md:flex-row md:items-center md:px-6 lg:px-8">
          <div className="max-w-xl">
            <h2 className="text-xl font-semibold tracking-tight text-neutral-950">
              LeetCode solutions and member articles
            </h2>
            <p className="mt-2 text-neutral-600">
              Step-by-step solutions and long-form writing by Dijkstra members
              live on the community blog.
            </p>
          </div>
          <a
            href={siteConfig.blogUrl}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-400"
          >
            Visit the Dijkstra Blog <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </PageShell>
  );
}
