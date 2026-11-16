import type React from "react";
import { cn } from "@/lib/utils";

/** Consistent container + vertical rhythm for sub-page sections. */
export function Section({
  id,
  title,
  description,
  children,
  className,
}: {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={title && id ? `${id}-heading` : undefined}
      className={cn(
        "container mx-auto scroll-mt-28 px-4 py-12 md:px-6 md:py-16 lg:px-8",
        className,
      )}
    >
      {(title || description) && (
        <div className="mb-8 max-w-2xl md:mb-10">
          {title && (
            <h2
              id={id ? `${id}-heading` : undefined}
              className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            >
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-3 text-neutral-400">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
