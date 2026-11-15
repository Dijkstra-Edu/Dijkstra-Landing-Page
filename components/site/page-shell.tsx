import type React from "react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

/** Header + footer chrome shared by every sub-page. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <SiteHeader />
      <main id="main" className="pt-24 md:pt-28">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
