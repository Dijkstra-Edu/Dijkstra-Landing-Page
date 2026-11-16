import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/site/page-shell";
import { ProseBlocks } from "@/components/site/prose-blocks";
import { PostCard } from "@/components/blog/post-card";
import { PostCover } from "@/components/blog/post-cover";
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
  // Same category first, then the most recent of the rest.
  const more = [
    ...posts.filter(
      (p) => p.slug !== post.slug && p.category === post.category,
    ),
    ...posts.filter(
      (p) => p.slug !== post.slug && p.category !== post.category,
    ),
  ].slice(0, 3);

  return (
    <PageShell tone="light">
      <article className="container mx-auto px-4 pb-16 pt-8 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/blog" className="hover:text-neutral-900">
                  Blog
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-neutral-900">{post.category}</li>
            </ol>
          </nav>
          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-950 sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-pretty text-xl leading-relaxed text-neutral-600">
            {post.excerpt}
          </p>
          <div className="mt-8 flex items-center gap-3 border-y border-neutral-200 py-4 text-sm text-neutral-500">
            <img src="/icon.png" alt="" className="h-7 w-7" />
            <span className="font-medium text-neutral-900">Dijkstra Team</span>
            <span aria-hidden>Â·</span>
            <span>{readingTime(post)} min read</span>
          </div>
        </div>

        <PostCover
          post={post}
          priority
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="mx-auto mt-10 aspect-[2/1] max-w-5xl rounded-2xl border border-neutral-200"
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <ProseBlocks blocks={post.body} tone="light" />
        </div>
      </article>

      <section
        aria-labelledby="keep-reading"
        className="border-t border-neutral-200 bg-neutral-50"
      >
        <div className="container mx-auto px-4 py-16 md:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2
              id="keep-reading"
              className="text-2xl font-semibold tracking-tight text-neutral-950"
            >
              Keep reading
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline"
            >
              All posts
            </Link>
          </div>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
