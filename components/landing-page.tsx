"use client";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/landing/hero";
import { MissionBanner } from "@/components/landing/mission-banner";
import { Principles } from "@/components/landing/principles";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features } from "@/components/landing/features";
import { PlatformSuite } from "@/components/landing/platform-suite";
import { Testimonials } from "@/components/landing/testimonials";
import { Members } from "@/components/landing/members";
import { JobMarket } from "@/components/landing/job-market";
import { Mission } from "@/components/landing/mission";
import { Contact } from "@/components/landing/contact";
import type React from "react";
import type { TeamsSnapshot } from "@/lib/teams/types";

/**
 * The landing page is composed of self-contained section components
 * (see `components/landing/*`). Shared chrome (header / footer) lives in
 * `components/site/*` so that every sub-page can reuse it.
 */
export default function LandingPage({
  teams,
  blog,
}: {
  teams: TeamsSnapshot;
  /** Server-rendered "From the blog" section (see app/page.tsx). */
  blog?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <SiteHeader />
      <main id="main">
        <Hero />
        <MissionBanner />
        <Principles />
        <HowItWorks />
        <Features />
        <PlatformSuite />
        <Testimonials />
        <Members teams={teams} />
        <JobMarket />
        {blog}
        <Mission />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
