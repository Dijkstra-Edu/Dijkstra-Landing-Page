"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  TeamExplorer,
  TeamsSourceBadge,
} from "@/components/teams/team-explorer";
import { joinTeamUrl } from "@/components/teams/links";
import type { TeamsSnapshot } from "@/lib/teams/types";

export function Members({ teams }: { teams: TeamsSnapshot }) {
  const { stats } = teams;
  const figures = [
    { label: "Departments", value: stats.departments },
    { label: "Groups", value: stats.groups },
    { label: "Teams", value: stats.teams },
    { label: "Projects", value: stats.projects },
  ];

  return (
    <section
      id="members"
      data-nav-tone="dark"
      className="relative overflow-hidden border-t border-white/10 bg-neutral-950 py-20 md:py-28"
      aria-labelledby="members-heading"
    >
      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid gap-10 xl:grid-cols-12 xl:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="max-w-3xl xl:col-span-4 xl:max-w-none"
          >
            <p className="mb-3 text-sm font-medium text-green-500">
              Current members
            </p>
            <h2
              id="members-heading"
              className="mb-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]"
            >
              The people building Dijkstra
            </h2>
            <p className="mb-4 text-base text-neutral-300 md:text-lg">
              Dijkstra is organised like an engineering company. Every team here
              is a real team in the {teams.org} GitHub organisation â€”
              departments, groups, teams and the projects they ship.
            </p>
            <p className="mb-6 text-base text-neutral-500">
              Pick a team to see who is in it, or spot an open team and be the
              first to join.
            </p>

            <dl className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-2">
              {stats.people !== null && (
                <div className="col-span-2 rounded-lg border border-white/10 px-4 py-3 sm:col-span-4 xl:col-span-2">
                  <dt className="text-xs text-neutral-500">People on a team</dt>
                  <dd className="text-3xl font-semibold tabular-nums text-white">
                    {stats.people}
                  </dd>
                </div>
              )}
              {figures.map((f) => (
                <div
                  key={f.label}
                  className="rounded-lg border border-white/10 px-4 py-3"
                >
                  <dt className="text-xs text-neutral-500">{f.label}</dt>
                  <dd className="text-2xl font-semibold tabular-nums text-white">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mb-8">
              <TeamsSourceBadge snapshot={teams} />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row xl:flex-col 2xl:flex-row">
              <Button
                className="bg-green-700 text-white hover:bg-green-600"
                asChild
              >
                <Link href="/team">
                  Explore all teams <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-white/15 bg-transparent text-neutral-200 hover:border-white/30 hover:bg-white/5 hover:text-white"
                asChild
              >
                <a href={joinTeamUrl}>
                  <UserPlus className="h-4 w-4" /> Join a team
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="min-w-0 xl:col-span-8"
          >
            <TeamExplorer snapshot={teams} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
