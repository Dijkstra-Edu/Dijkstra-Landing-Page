import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { ProseBlocks } from "@/components/site/prose-blocks";
import { getPost, posts, readingTime } from "@/content/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
    },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <PageShell>
      <article className="container mx-auto px-4 pb-16 pt-8 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> All posts
          </Link>
          <p className="mt-8 text-sm font-medium text-green-400">
            {post.category}
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-xl leading-relaxed text-neutral-400">
            {post.excerpt}
          </p>
          <div className="mt-6 flex items-center gap-3 border-b border-white/10 pb-8 text-sm text-neutral-500">
            <img src="/icon.png" alt="" className="h-8 w-8" />
            <span className="text-neutral-300">Dijkstra Team</span>
            <span>Â·</span>
            <span>{readingTime(post)} min read</span>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-green-950 to-black">
          <div className="relative aspect-video">
            <Image
              src={post.cover}
              alt={post.coverAlt}
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className={
                post.cover.includes("splash")
                  ? "object-contain p-16"
                  : "object-cover"
              }
              priority
            />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <ProseBlocks blocks={post.body} />
        </div>
      </article>

      <section className="container mx-auto border-t border-white/10 px-4 py-14 md:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold">More from the blog</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {more.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-green-400">
                {p.category}
              </p>
              <h3 className="mt-2 font-semibold group-hover:text-green-300">
                {p.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-neutral-400">
                {p.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
