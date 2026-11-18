"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Post } from "@/content/blog";
import { PostCard } from "./post-card";

const categories: Post["category"][] = [
  "Announcement",
  "Engineering",
  "Community",
  "Guide",
];

/**
 * "All posts" grid with category filters. Without JavaScript every post is
 * listed (the default "All" state is what the server renders).
 */
export function BlogIndex({
  posts,
  featuredSlug,
}: {
  posts: Post[];
  featuredSlug: string;
}) {
  const [category, setCategory] = useState<Post["category"] | "All">("All");
  const visible =
    category === "All"
      ? posts.filter((p) => p.slug !== featuredSlug)
      : posts.filter((p) => p.category === category);
  const count = (c: Post["category"]) =>
    posts.filter((p) => p.category === c).length;

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 border-b border-neutral-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="all-posts" className="text-xl font-semibold tracking-tight">
          {category === "All" ? "All posts" : category}
        </h2>
        <div
          role="group"
          aria-label="Filter posts by category"
          className="-mx-4 flex gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {(["All", ...categories] as const).map((c) => {
            const selected = category === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={selected}
                onClick={() => setCategory(c)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1 text-sm transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600",
                  selected
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:text-neutral-900",
                )}
              >
                {c}
                {c !== "All" && (
                  <span
                    className={cn(
                      "ml-1.5 tabular-nums",
                      selected ? "text-neutral-400" : "text-neutral-400",
                    )}
                  >
                    {count(c)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div
        aria-live="polite"
        className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
