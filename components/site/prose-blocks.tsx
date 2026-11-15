import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Block } from "@/content/blog";

/** Renders structured article content with consistent typography. */
export function ProseBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6 text-[17px] leading-8 text-neutral-300">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return <p key={i}>{block.text}</p>;
          case "h2":
            return (
              <h2
                key={i}
                className="pt-4 text-2xl font-semibold leading-tight text-white"
              >
                {block.text}
              </h2>
            );
          case "ul":
            return (
              <ul
                key={i}
                className="list-disc space-y-2 pl-6 marker:text-green-500"
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol
                key={i}
                className="list-decimal space-y-2 pl-6 marker:text-green-500"
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
                className="border-l-2 border-green-500 pl-5 text-xl italic leading-relaxed text-white"
              >
                {block.text}
              </blockquote>
            );
          case "cta": {
            const className =
              "inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-2.5 text-base font-semibold text-white no-underline transition-colors hover:bg-green-600";
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
