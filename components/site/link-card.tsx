import type React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** A bordered card that links somewhere; internal links use next/link. */
export function LinkCard({
  href,
  title,
  description,
  icon,
  meta,
  className,
}: {
  href: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  meta?: React.ReactNode;
  className?: string;
}) {
  const external = !href.startsWith("/");
  const classes = cn(
    "group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500",
    className,
  );
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        {icon}
        {external && (
          <ArrowUpRight className="h-4 w-4 shrink-0 text-neutral-500 transition-colors group-hover:text-green-400" />
        )}
      </div>
      <h3
        className={cn(
          "font-semibold text-white group-hover:text-green-300",
          icon && "mt-4",
        )}
      >
        {title}
      </h3>
      {description && (
        <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-400">
          {description}
        </p>
      )}
      {meta && <div className="mt-4 text-xs text-neutral-500">{meta}</div>}
    </>
  );
  return external ? (
    <a href={href} className={classes}>
      {body}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {body}
    </Link>
  );
}
