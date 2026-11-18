"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { marketItems, type MarketItem } from "@/content/job-market";
import { SectionHeading } from "./section-heading";

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/**
 * One masonry tile: the original thumbnail at its original (half) height,
 * greyscale until hovered or focused, with a caption underneath. If the
 * publisher blocks hot-linking or removes the image, the tile turns into a
 * text card of the same height instead of showing a broken image.
 */
function Tile({ item }: { item: MarketItem }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  // An image can fail before React hydrates and attaches onError; catch
  // that case once on mount.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  const height = Math.round(item.height / 2);
  const isVideo = item.kind === "video";

  const media = (
    <div
      className="relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100"
      style={{ height }}
    >
      {failed ? (
        <div className="flex h-full flex-col justify-end gap-2 p-4 text-neutral-900">
          {isVideo && <Play className="h-5 w-5 text-neutral-400" aria-hidden />}
          <span className="line-clamp-4 text-lg font-semibold leading-snug tracking-tight">
            {item.title}
          </span>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={item.image}
          alt=""
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0 group-focus-visible:grayscale-0"
        />
      )}
      {isVideo && !failed && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-white">
            <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
          </span>
        </span>
      )}
    </div>
  );

  const caption = (
    <div className="mt-2.5 px-0.5">
      <p className="flex items-center gap-1.5 text-xs text-neutral-500">
        <span className="font-medium text-neutral-700">{item.source}</span>
        {item.tag && (
          <>
            <span aria-hidden className="text-neutral-300">
              Â·
            </span>
            <span>{item.tag}</span>
          </>
        )}
        {item.url && (
          <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-neutral-400 transition-colors group-hover:text-neutral-900" />
        )}
      </p>
      {!isVideo && !failed && (
        <p className="mt-1 line-clamp-3 text-[15px] font-medium leading-snug text-neutral-900 decoration-neutral-300 underline-offset-4 group-hover:underline">
          {item.title}
        </p>
      )}
    </div>
  );

  if (!item.url) {
    return (
      <figure className="group">
        {media}
        <figcaption>{caption}</figcaption>
      </figure>
    );
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${isVideo ? "Watch on YouTube" : item.title} (${hostOf(item.url)}, opens in a new tab)`}
      className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-4"
    >
      {media}
      {caption}
    </a>
  );
}

/**
 * The market students graduate into: the original masonry of headlines,
 * thumbnails and videos, rebuilt with CSS columns (no absolute positioning,
 * so it can never overlap neighbouring sections) and lazy, no-referrer
 * images with a text fallback.
 */
export function JobMarket() {
  return (
    <section
      id="job-market"
      data-nav-tone="light"
      aria-labelledby="job-market-heading"
      className="relative overflow-hidden border-t border-neutral-200 bg-white py-20 md:py-28"
    >
      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          id="job-market-heading"
          tone="light"
          eyebrow="The reality"
          title="The market students graduate into"
          description="Layoffs, AI and saturated entry-level roles make the headlines. Dijkstra exists so you can prepare anyway â€” actively, not passively."
        />

        <ul
          className={cn(
            "columns-1 gap-5 min-[480px]:columns-2 md:columns-3 xl:columns-4",
            "[&>li]:mb-6 [&>li]:break-inside-avoid",
          )}
        >
          {marketItems.map((item) => (
            <li key={item.id}>
              <Tile item={item} />
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center text-xs text-neutral-500">
          Thumbnails and headlines belong to their publishers and link to the
          original articles and videos.
        </p>
      </div>
    </section>
  );
}
