import { cn } from "@/lib/utils";
import { statusLabel, type FeatureStatus } from "@/content/features";

const styles: Record<FeatureStatus, string> = {
  live: "border-green-500/30 bg-green-500/10 text-green-400",
  beta: "border-sky-500/30 bg-sky-500/10 text-sky-300",
  "in-development": "border-amber-500/30 bg-amber-500/10 text-amber-300",
  planned: "border-white/15 bg-white/5 text-neutral-400",
};

export function StatusBadge({
  status,
  className,
}: {
  status: FeatureStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        styles[status],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {statusLabel[status]}
    </span>
  );
}
