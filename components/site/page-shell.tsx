import type React from "react";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

/**
 * Header + footer chrome shared by every sub-page.
 *
 * `tone="light"` gives a white, editorial page (used by the blog); the
 * header reads `data-nav-tone` and switches its colours to match.
 */
export function PageShell({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <div
      data-nav-tone={tone}
      className={cn(
        "min-h-screen overflow-x-hidden",
        tone === "dark" ? "bg-black text-white" : "bg-white text-neutral-900",
      )}
    >
      <SiteHeader />
      <main id="main" className="pt-24 md:pt-28">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
