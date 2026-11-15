"use client";

import { useMemo, useState } from "react";
import { Crown, Search } from "lucide-react";
import type { TeamsSnapshot } from "@/lib/teams/types";

/** Everyone in the organisation's teams (live) or its public members. */
export function PeopleWall({ snapshot }: { snapshot: TeamsSnapshot }) {
  const [query, setQuery] = useState("");
  const people = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? snapshot.people.filter(
          (p) =>
            p.login.toLowerCase().includes(q) ||
            p.name?.toLowerCase().includes(q) ||
            p.teams.some((t) => t.toLowerCase().includes(q)),
        )
      : snapshot.people;
  }, [snapshot.people, query]);

  if (snapshot.people.length === 0) return null;
  const live = snapshot.source === "github";

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {live ? "Everyone on a team" : "Public organisation members"}
          </h2>
          <p className="mt-1 text-sm text-neutral-400">
            {live
              ? `${snapshot.people.length} people across ${snapshot.stats.teams + snapshot.stats.projects + snapshot.stats.groups} teams.`
              : "Members who chose to show their Dijkstra-Edu membership publicly on GitHub."}
          </p>
        </div>
        <label className="relative w-full sm:w-64">
          <span className="sr-only">Filter people</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={live ? "Filter by name or team" : "Filter by username"}
            className="h-9 w-full rounded-lg border border-white/10 bg-white/[0.03] pl-9 pr-3 text-sm text-white placeholder:text-neutral-500 focus:border-green-500/50 focus:outline-none"
          />
        </label>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {people.map((person) => (
          <li key={person.login}>
            <a
              href={person.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center transition-colors hover:border-white/20 hover:bg-white/[0.06]"
            >
              <img
                src={`${person.avatarUrl}${person.avatarUrl.includes("?") ? "&" : "?"}s=120`}
                alt=""
                loading="lazy"
                className="h-14 w-14 rounded-full bg-white/10"
              />
              <span className="mt-3 flex max-w-full items-center gap-1 truncate text-sm font-medium text-white">
                {person.role === "maintainer" && (
                  <Crown
                    className="h-3.5 w-3.5 shrink-0 text-amber-300"
                    aria-label="Team lead"
                  />
                )}
                <span className="truncate">{person.name ?? person.login}</span>
              </span>
              <span className="max-w-full truncate text-xs text-neutral-500">
                @{person.login}
              </span>
              {person.teams.length > 0 && (
                <span className="mt-2 line-clamp-2 text-[11px] text-neutral-400">
                  {person.teams.slice(0, 2).join(" Â· ")}
                  {person.teams.length > 2
                    ? ` +${person.teams.length - 2}`
                    : ""}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
      {people.length === 0 && (
        <p className="py-10 text-center text-sm text-neutral-500">
          Nobody matches â€œ{query}â€.
        </p>
      )}
    </div>
  );
}
