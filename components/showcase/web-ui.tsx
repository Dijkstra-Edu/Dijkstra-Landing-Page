"use client";

/**
 * Minimal, presentational copies of the shadcn/ui primitives Dijkstra Web is
 * built with (Card, Badge, Button, Tabs, Separator), using the same class
 * recipes and Dijkstra Web's light theme (Tailwind "gray" scale: primary
 * gray-900, muted gray-100, muted-foreground gray-500, border gray-200).
 *
 * They are deliberately static â€” the showcase is a picture of the product,
 * not a second copy of it â€” and sized in real CSS pixels; the whole canvas is
 * scaled down by ScaledCanvas.
 */
import type React from "react";
import { cn } from "@/lib/utils";

export function WCard({
  className,
  children,
  gradient = false,
}: {
  className?: string;
  children: React.ReactNode;
  /** Section cards use `bg-gradient-to-t from-primary/5 to-card shadow-xs`. */
  gradient?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded-xl border border-gray-200 py-6 text-gray-950",
        gradient
          ? "bg-gradient-to-t from-gray-900/[0.04] to-white shadow-xs"
          : "bg-white shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function WCardHeader({
  className,
  children,
  action,
}: {
  className?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid auto-rows-min items-start gap-1.5 px-6",
        action && "grid-cols-[1fr_auto]",
        className,
      )}
    >
      <div className="grid gap-1.5">{children}</div>
      {action && <div className="self-start justify-self-end">{action}</div>}
    </div>
  );
}

export function WCardTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("font-semibold leading-none", className)}>
      {children}
    </div>
  );
}

export function WCardDescription({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("text-sm text-gray-500", className)}>{children}</div>
  );
}

export function WCardContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("px-6", className)}>{children}</div>;
}

export function WCardFooter({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex items-center px-6", className)}>{children}</div>
  );
}

export function WBadge({
  className,
  children,
  variant = "outline",
}: {
  className?: string;
  children: React.ReactNode;
  variant?: "outline" | "secondary" | "default";
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium [&>svg]:size-3",
        variant === "outline" && "border-gray-200 text-gray-950",
        variant === "secondary" &&
          "border-transparent bg-gray-100 text-gray-900",
        variant === "default" && "border-transparent bg-gray-900 text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function WButton({
  className,
  children,
  variant = "default",
  size = "default",
  style,
}: {
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "icon";
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={style}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium [&_svg]:shrink-0",
        size === "default" && "h-9 px-4 py-2",
        size === "sm" && "h-8 gap-1.5 px-3",
        size === "icon" && "size-9",
        variant === "default" && "bg-gray-900 text-white shadow-xs",
        variant === "outline" &&
          "border border-gray-200 bg-white text-gray-950 shadow-xs",
        variant === "secondary" && "bg-gray-100 text-gray-900 shadow-xs",
        variant === "ghost" && "text-gray-950",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function WTabs({
  tabs,
  active,
  disabled = [],
  className,
}: {
  tabs: string[];
  active: string;
  disabled?: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex h-9 w-fit max-w-full shrink-0 items-center justify-start overflow-hidden rounded-lg bg-gray-100 p-[3px] text-gray-500",
        className,
      )}
    >
      {tabs.map((tab) => (
        <span
          key={tab}
          className={cn(
            "relative inline-flex h-[calc(100%-1px)] items-center justify-center whitespace-nowrap rounded-md px-2 py-1 text-sm font-medium transition-colors duration-300",
            disabled.includes(tab) ? "text-gray-400" : "text-gray-950",
          )}
        >
          <span
            className={cn(
              "absolute inset-0 rounded-md border border-transparent bg-white shadow-sm transition-opacity duration-300",
              tab === active ? "opacity-100" : "opacity-0",
            )}
          />
          <span className="relative">{tab}</span>
        </span>
      ))}
    </div>
  );
}

export function WSeparator({
  vertical = false,
  className,
}: {
  vertical?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "shrink-0 bg-gray-200",
        vertical ? "h-4 w-px" : "h-px w-full",
        className,
      )}
    />
  );
}
