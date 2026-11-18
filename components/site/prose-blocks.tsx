import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Block } from "@/content/blog";

const tones = {
  dark: {
    body: "text-neutral-300",
    heading: "text-white",
    marker: "marker:text-neutral-500",
    quote: "border-neutral-600 text-white",
  },
  light: {
    body: "text-neutral-700",
    heading: "text-neutral-950",
    marker: "marker:text-neutral-400",
    quote: "border-neutral-300 text-neutral-900",
  },
};

/** Renders structured article content with consistent typography. */
export function ProseBlocks({
  blocks,
  tone = "dark",
}: {
  blocks: Block[];
  tone?: "dark" | "light";
}) {
  const t = tones[tone];
  return (
    <div className={cn("space-y-6 text-[17px] leading-8", t.body)}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return <p key={i}>{block.text}</p>;
          case "h2":
            return (
              <h2
                key={i}
                className={cn(
                  "pt-4 text-2xl font-semibold leading-tight tracking-tight",
                  t.heading,
                )}
              >
                {block.text}
              </h2>
            );
          case "ul":
            return (
              <ul key={i} className={cn("list-disc space-y-2 pl-6", t.marker)}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol
                key={i}
                className={cn("list-decimal space-y-2 pl-6", t.marker)}
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className={cn(
                  "border-l-2 pl-5 text-xl leading-relaxed",
                  t.quote,
                )}
              >
                {block.text}
              </blockquote>
            );
          case "cta": {
            const className =
              "inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 text-base font-medium text-white no-underline transition-colors hover:bg-green-600";
            return (
              <p key={i} className="pt-2">
                {block.href.startsWith("/") ? (
                  <Link href={block.href} className={className}>
                    {block.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <a href={block.href} className={className}>
                    {block.label} <ArrowRight className="h-4 w-4" />
                  </a>
                )}
              </p>
            );
          }
        }
      })}
    </div>
  );
}
