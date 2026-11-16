import Image from "next/image";
import { cn } from "@/lib/utils";
import { mulberry32 } from "@/lib/seeded-random";
import type { Post } from "@/content/blog";

export type PostLike = Pick<Post, "slug" | "cover" | "coverAlt" | "category">;

/** One flat, muted colour per category (no gradients). */
export const categoryTheme: Record<
  Post["category"],
  { bg: string; ink: string; soft: string }
> = {
  Announcement: { bg: "#E6F0E9", ink: "#166534", soft: "#9CC5A8" },
  Engineering: { bg: "#E9ECF1", ink: "#1F2937", soft: "#A7B0BE" },
  Community: { bg: "#F2ECE3", ink: "#7A4B1F", soft: "#D2B996" },
  Guide: { bg: "#E6EDF5", ink: "#1E3A5F", soft: "#9FB4CC" },
};

function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Deterministic "shortest path" artwork for posts without a screenshot: a
 * small weighted graph with one highlighted route â€” a nod to the algorithm
 * the project is named after. Seeded by the slug, so it is stable across
 * server and client renders.
 */
function GraphArt({
  slug,
  ink,
  soft,
}: {
  slug: string;
  ink: string;
  soft: string;
}) {
  const random = mulberry32(hash(slug));
  const cols = 5;
  const rows = 3;
  const nodes = Array.from({ length: cols * rows }, (_, i) => {
    const c = i % cols;
    const r = Math.floor(i / cols);
    return {
      x: 40 + c * 60 + (random() - 0.5) * 26,
      y: 40 + r * 60 + (random() - 0.5) * 22,
    };
  });
  const edges: [number, number][] = [];
  nodes.forEach((_, i) => {
    const c = i % cols;
    const r = Math.floor(i / cols);
    if (c < cols - 1) edges.push([i, i + 1]);
    if (r < rows - 1 && random() > 0.25) edges.push([i, i + cols]);
    if (c < cols - 1 && r < rows - 1 && random() > 0.55)
      edges.push([i, i + cols + 1]);
  });
  // A monotone left-to-right route through the grid.
  let row = Math.floor(random() * rows);
  const route = [row * cols];
  for (let c = 1; c < cols; c++) {
    const step = random() < 0.35 ? (random() < 0.5 ? -1 : 1) : 0;
    row = Math.min(rows - 1, Math.max(0, row + step));
    route.push(row * cols + c);
  }
  const routeEdges = route.slice(1).map((n, i) => [route[i], n] as const);

  return (
    <svg
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      {edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={soft}
          strokeWidth={1.25}
        />
      ))}
      {routeEdges.map(([a, b]) => (
        <line
          key={`r-${a}-${b}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={ink}
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      ))}
      {nodes.map((n, i) => {
        const onRoute = route.includes(i);
        return (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={onRoute ? 5 : 3.5}
            fill={onRoute ? ink : "#fff"}
            stroke={onRoute ? ink : soft}
            strokeWidth={1.25}
          />
        );
      })}
    </svg>
  );
}

/**
 * Standard cover for every blog card on the site: a flat category colour
 * with either the post's product screenshot inset from the top-left (like a
 * window peeking in) or generated graph artwork.
 */
export function PostCover({
  post,
  className,
  sizes = "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw",
  priority = false,
}: {
  post: PostLike;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const theme = categoryTheme[post.category];
  const screenshot = !post.cover.includes("splash");
  return (
    <div
      className={cn("relative aspect-[16/10] overflow-hidden", className)}
      style={{ backgroundColor: theme.bg }}
    >
      {screenshot ? (
        <div className="absolute bottom-0 left-[9%] right-0 top-[12%] overflow-hidden rounded-tl-lg border-l border-t border-black/10 bg-white">
          <Image
            src={post.cover}
            alt={post.coverAlt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-left-top"
          />
        </div>
      ) : (
        <>
          <GraphArt slug={post.slug} ink={theme.ink} soft={theme.soft} />
          <span className="sr-only">{post.coverAlt}</span>
        </>
      )}
    </div>
  );
}
