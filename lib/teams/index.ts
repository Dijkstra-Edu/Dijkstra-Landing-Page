import "server-only";

import {
  assembleSnapshot,
  buildTree,
  computeSubtreeCounts,
  findNode,
  seedAsRawTeams,
} from "./build";
import {
  checkMembership,
  fetchOrgTeams,
  fetchPublicMembers,
  fetchTeam,
  githubConfig,
  type MembershipCheck,
} from "./github";
import type { TeamNode, TeamsSnapshot, TeamsSource } from "./types";

export type { TeamNode, TeamsSnapshot, TeamsSource } from "./types";

/* -------------------------------------------------------------------------- */
/* Full snapshot                                                              */
/* -------------------------------------------------------------------------- */

let cache: { key: string; expires: number; value: TeamsSnapshot } | null = null;
let inflight: Promise<TeamsSnapshot> | null = null;

async function loadSnapshot(): Promise<TeamsSnapshot> {
  const cfg = githubConfig();

  // 1. Live: every team, its parent and its direct members.
  if (cfg.token) {
    try {
      const [teams, publicMembers] = await Promise.all([
        fetchOrgTeams(cfg),
        cfg.publicMembersOnly ? fetchPublicMembers(cfg) : Promise.resolve(null),
      ]);
      return assembleSnapshot({
        raw: teams,
        source: "github",
        org: cfg.org,
        visibleLogins: publicMembers
          ? new Set(publicMembers.map((m) => m.login))
          : null,
      });
    } catch (error) {
      console.warn(
        "[teams] Live GitHub teams unavailable:",
        (error as Error).message,
      );
      return assembleSnapshot({
        raw: seedAsRawTeams(cfg.org),
        source: "snapshot",
        org: cfg.org,
        notice:
          "Live GitHub data is temporarily unavailable; showing the last known structure.",
      });
    }
  }

  // 2. No token: structure from the snapshot, people from the public list.
  try {
    const publicPeople = await fetchPublicMembers(cfg);
    if (publicPeople.length > 0) {
      return assembleSnapshot({
        raw: seedAsRawTeams(cfg.org),
        source: "public-members",
        org: cfg.org,
        publicPeople,
      });
    }
  } catch {
    // Offline build or rate-limited: fall through to the bundled snapshot.
  }

  // 3. Bundled snapshot only.
  return assembleSnapshot({
    raw: seedAsRawTeams(cfg.org),
    source: "snapshot",
    org: cfg.org,
  });
}

/**
 * The Dijkstra team hierarchy, live from GitHub when possible.
 * Never throws: degrades to the bundled snapshot.
 */
export async function getTeamsSnapshot(): Promise<TeamsSnapshot> {
  const cfg = githubConfig();
  const key = `${cfg.org}|${cfg.token ? "token" : "anon"}|${cfg.publicMembersOnly}`;
  if (cache && cache.key === key && cache.expires > Date.now())
    return cache.value;
  if (!inflight) {
    inflight = loadSnapshot()
      .then((value) => {
        // Cache failures for a shorter time so recovery is quick.
        const ttl =
          value.source === "github" || !cfg.token ? cfg.revalidate : 60;
        cache = { key, value, expires: Date.now() + ttl * 1000 };
        return value;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

/* -------------------------------------------------------------------------- */
/* Single team                                                                */
/* -------------------------------------------------------------------------- */

export type TeamDetail = {
  source: TeamsSource;
  org: string;
  fetchedAt: string;
  team: TeamNode;
  /** Ancestors from the department down to the parent. */
  path: { slug: string; label: string; kind: TeamNode["kind"] }[];
  membership?:
    | MembershipCheck
    | { login: string; state: "unknown"; role: null };
};

const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,99}$/;
const LOGIN_RE = /^[a-z\d](?:[a-z\d-]{0,38})$/i;

export function isValidSlug(slug: string) {
  return SLUG_RE.test(slug);
}

export function isValidLogin(login: string) {
  return LOGIN_RE.test(login);
}

/**
 * Queries one team directly from GitHub (direct members + sub-teams), and
 * optionally checks whether `member` belongs to it. Falls back to the
 * snapshot when no token is configured or GitHub is unreachable.
 */
export async function getTeamDetail(
  slug: string,
  { member }: { member?: string } = {},
): Promise<TeamDetail | null> {
  const cfg = githubConfig();
  const snapshot = await getTeamsSnapshot();
  const fromSnapshot = findNode(snapshot.roots, slug);
  const path = (fromSnapshot?.path ?? []).map((n) => ({
    slug: n.slug,
    label: n.label,
    kind: n.kind,
  }));

  if (cfg.token) {
    try {
      const live = await fetchTeam(slug, cfg);
      if (!live) return null;
      const [team] = buildTree([live.team, ...live.children]).filter(
        (n) => n.slug === live.team.slug,
      );
      computeSubtreeCounts(team, true);
      // Only one level of sub-teams is fetched here; the full snapshot may
      // know about deeper levels.
      if (snapshot.source === "github" && fromSnapshot) {
        team.subtreeMemberCount = Math.max(
          team.subtreeMemberCount,
          fromSnapshot.node.subtreeMemberCount,
        );
      }
      const detail: TeamDetail = {
        source: "github",
        org: cfg.org,
        fetchedAt: new Date().toISOString(),
        team,
        path,
      };
      if (member) detail.membership = await checkMembership(slug, member, cfg);
      return detail;
    } catch (error) {
      console.warn(
        `[teams] Live lookup for ${slug} failed:`,
        (error as Error).message,
      );
    }
  }

  if (!fromSnapshot) return null;
  return {
    source: snapshot.source === "github" ? "github" : "snapshot",
    org: snapshot.org,
    fetchedAt: snapshot.fetchedAt,
    team: fromSnapshot.node,
    path,
    ...(member
      ? {
          membership:
            snapshot.source === "github"
              ? (() => {
                  const m = fromSnapshot.node.members.find(
                    (x) => x.login.toLowerCase() === member.toLowerCase(),
                  );
                  return m
                    ? { login: m.login, state: "active" as const, role: m.role }
                    : { login: member, state: "none" as const, role: null };
                })()
              : { login: member, state: "unknown" as const, role: null },
        }
      : {}),
  };
}
