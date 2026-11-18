"use client";

import { cn } from "@/lib/utils";
import { useCountUp } from "@/hooks/use-count-up";

/** Animated number (no chart library dependency). */
export function CountUp({
  value,
  delay = 0,
  duration = 1200,
  format = (n: number) => n.toLocaleString("en-US"),
  className,
}: {
  value: number;
  delay?: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
}) {
  const current = useCountUp(value, { delay, duration });
  return (
    <span className={cn("tabular-nums", className)}>{format(current)}</span>
  );
}
