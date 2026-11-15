import type React from "react";
import { cn } from "@/lib/utils";

/** Standard heading block for sub-pages. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(4,131,4,0.25),transparent_65%)]" />
      <div className="container relative mx-auto px-4 pb-12 pt-10 md:px-6 md:pb-16 md:pt-14 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-500">
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {description && (
            <div className="mt-5 text-lg leading-relaxed text-neutral-300">
              {description}
            </div>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
