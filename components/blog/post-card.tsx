import Link from "next/link";
import { cn } from "@/lib/utils";
import { readingTime, type Post } from "@/content/blog";
import { PostCover } from "./post-cover";

type Tone = "light" | "dark";

const tones = {
  light: {
    cover: "border-neutral-200 group-hover:border-neutral-300",
    category: "text-green-700",
    dot: "text-neutral-300",
    meta: "text-neutral-500",
    title: "text-neutral-950 decoration-neutral-300",
    excerpt: "text-neutral-600",
  },
  dark: {
    cover: "border-white/10 group-hover:border-white/25",
    category: "text-green-400",
    dot: "text-neutral-600",
    meta: "text-neutral-500",
    title: "text-white decoration-neutral-600",
    excerpt: "text-neutral-400",
  },
} satisfies Record<Tone, Record<string, string>>;

function Meta({ post, tone }: { post: Post; tone: Tone }) {
  const t = tones[tone];
  return (
    <p className="flex items-center gap-2 text-[13px]">
      <span className={cn("font-medium", t.category)}>{post.category}</span>
      <span aria-hidden className={t.dot}>
        Â·
      </span>
      <span className={t.meta}>{readingTime(post)} min read</span>
    </p>
  );
}

/**
 * The one blog card used across the site (blog index, articles, home page,
 * product and press pages, navigation). Editorial and quiet: cover on top,
 * small category + reading time, a medium-weight title that underlines on
 * hover, a two-line excerpt. The whole card is one link (stretched title
 * link), so it has a single tab stop and a meaningful accessible name.
 *
 * Variants: "default" (grid card), "featured" (large, side-by-side on
 * wide screens) and "compact" (thumbnail row for lists and menus).
 */
export function PostCard({
  post,
  tone = "light",
  variant = "default",
  headingLevel = 3,
  priority = false,
  className,
}: {
  post: Post;
  tone?: Tone;
  variant?: "default" | "featured" | "compact";
  headingLevel?: 2 | 3 | 4;
  priority?: boolean;
  className?: string;
}) {
  const t = tones[tone];
  const Heading = `h${headingLevel}` as const;
  const href = `/blog/${post.slug}`;
  const titleLink = (
    <Link
      href={href}
      className="underline-offset-4 outline-none after:absolute after:inset-0 after:rounded-xl group-hover:underline focus-visible:underline"
    >
      {post.title}
    </Link>
  );

  if (variant === "compact") {
    return (
      <article
        className={cn(
          "group relative flex items-start gap-4 rounded-xl focus-within:ring-2 focus-within:ring-green-600",
          className,
        )}
      >
        <PostCover
          post={post}
          sizes="112px"
          className={cn("w-28 shrink-0 rounded-lg border", t.cover)}
        />
        <div className="min-w-0">
          <Meta post={post} tone={tone} />
          <Heading className={cn("mt-1 font-medium leading-snug", t.title)}>
            {titleLink}
          </Heading>
        </div>
      </article>
    );
  }

  if (variant === "featured") {
    return (
      <article
        className={cn(
          "group relative grid items-center gap-6 rounded-xl focus-within:ring-2 focus-within:ring-green-600 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-10",
          className,
        )}
      >
        <PostCover
          post={post}
          priority={priority}
          sizes="(min-width: 1024px) 640px, 100vw"
          className={cn("rounded-xl border", t.cover)}
        />
        <div>
          <Meta post={post} tone={tone} />
          <Heading
            className={cn(
              "mt-3 text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-3xl",
              t.title,
            )}
          >
            {titleLink}
          </Heading>
          <p
            className={cn(
              "mt-3 text-pretty text-lg leading-relaxed",
              t.excerpt,
            )}
          >
            {post.excerpt}
          </p>
          <p className={cn("mt-6 flex items-center gap-2 text-sm", t.meta)}>
            <img src="/icon.png" alt="" className="h-5 w-5" />
            Dijkstra Team
          </p>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-xl focus-within:ring-2 focus-within:ring-green-600",
        className,
      )}
    >
      <PostCover
        post={post}
        priority={priority}
        className={cn("rounded-xl border transition-colors", t.cover)}
      />
      <div className="mt-4 flex flex-1 flex-col">
        <Meta post={post} tone={tone} />
        <Heading
          className={cn(
            "mt-2 text-balance text-lg font-semibold leading-snug",
            t.title,
          )}
        >
          {titleLink}
        </Heading>
        <p
          className={cn(
            "mt-2 line-clamp-2 text-[15px] leading-relaxed",
            t.excerpt,
          )}
        >
          {post.excerpt}
        </p>
        <p className={cn("mt-4 flex items-center gap-2 text-sm", t.meta)}>
          <img src="/icon.png" alt="" className="h-5 w-5" />
          Dijkstra Team
        </p>
      </div>
    </article>
  );
}
