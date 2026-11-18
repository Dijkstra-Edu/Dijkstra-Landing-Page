import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PostCard } from "@/components/blog/post-card";
import { posts } from "@/content/blog";

/**
 * "From the blog" on the home page. A server component (passed into the
 * client-side landing page as a slot), so post content never ships in the
 * page's JavaScript.
 */
export function FromTheBlog() {
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const latest = [featured, ...posts.filter((p) => p !== featured)].slice(0, 3);
  return (
    <section
      id="blog"
      data-nav-tone="light"
      aria-labelledby="from-the-blog-heading"
      className="border-t border-neutral-200 bg-white py-20 md:py-28"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-14">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-medium text-green-700">Blog</p>
            <h2
              id="from-the-blog-heading"
              className="text-balance text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl"
            >
              From the blog
            </h2>
            <p className="mt-3 text-pretty text-neutral-600 sm:text-lg">
              What we are shipping, how it works, and how to get the most out of
              Dijkstra.
            </p>
          </div>
          <Link
            href="/blog"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-neutral-900 underline-offset-4 hover:underline"
          >
            All posts
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post, i) => (
            <PostCard
              key={post.slug}
              post={post}
              className={i === 2 ? "sm:max-lg:hidden" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
