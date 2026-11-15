import type { RawTeam } from "./github";
import { displayText, labelKey, parseTeamName, slugifyTeamName } from "./parse";
import { seedTree, type SeedTeam } from "./seed";
import type {
  TeamMember,
  TeamNode,
  TeamsSnapshot,
  TeamsSource,
  TeamsStats,
} from "./types";

/* -------------------------------------------------------------------------- */
/* Seed helpers                                                               */
/* -------------------------------------------------------------------------- */

type FlatSeed = SeedTeam & { parentName: string | null };

function flattenSeed(
  teams: SeedTeam[],
  parentName: string | null = null,
): FlatSeed[] {
  return teams.flatMap((team) => [
    { ...team, parentName },
    ...flattenSeed(team.children ?? [], team.name),
  ]);
}

const flatSeed = flattenSeed(seedTree);

/** Seed entries keyed by normalised label, for enriching live data. */
const seedByKey = new Map(
  flatSeed.map((t) => [labelKey(parseTeamName(t.name).label), t]),
);

/**
 * Find the seed entry for a (live) label. Truncated seed names only match as
 * a prefix, and live names may carry extra words, so both directions are
 * tried before giving up.
 */
export function findSeed(label: string): FlatSeed | undefined {
  const key = labelKey(label);
  const exact = seedByKey.get(key);
  if (exact) return exact;
  for (const [seedKey, seed] of seedByKey) {
    if (
      seedKey.length >= 6 &&
      (key.startsWith(seedKey) || seedKey.startsWith(key))
    ) {
      return seed;
    }
  }
  return undefined;
}

export function teamUrl(org: string, slug: string) {
  return `https://github.com/orgs/${org}/teams/${slug}`;
}

/** RawTeam list built from the bundled snapshot. */
export function seedAsRawTeams(org: string): RawTeam[] {
  return flatSeed.map((seed) => {
    const { label } = parseTeamName(seed.name);
    const slug = slugifyTeamName(seed.name);
    return {
      slug,
      name: seed.name,
      description: seed.description ?? "",
      // Slugs of truncated names are a best guess: link to a search instead.
      url: seed.nameTruncated
        ? `https://github.com/orgs/${org}/teams?query=${encodeURIComponent(label)}`
        : teamUrl(org, slug),
      parentSlug: seed.parentName ? slugifyTeamName(seed.parentName) : null,
      members: null,
      memberCount: seed.members,
    };
  });
}

/* -------------------------------------------------------------------------- */
/* Tree building                                                              */
/* -------------------------------------------------------------------------- */

const byName = (a: { name: string }, b: { name: string }) =>
  a.name.localeCompare(b.name, "en", { sensitivity: "base" });

function toNode(raw: RawTeam, visibleLogins: Set<string> | null): TeamNode {
  const { kind, label } = parseTeamName(raw.name);
  const members = (raw.members ?? []).filter(
    (m) => !visibleLogins || visibleLogins.has(m.login),
  );
  return {
    slug: raw.slug,
    name: raw.name,
    kind,
    label: displayText(label),
    description: displayText(raw.description),
    url: raw.url,
    parentSlug: raw.parentSlug,
    members: members.sort(
      (a, b) =>
        (a.role === "maintainer" ? 0 : 1) - (b.role === "maintainer" ? 0 : 1) ||
        a.login.localeCompare(b.login),
    ),
    memberCount: raw.memberCount,
    subtreeMemberCount: 0,
    icon: findSeed(label)?.icon ?? null,
    children: [],
  };
}

/** Links nodes to their parents; unknown parents become roots. */
export function buildTree(
  raw: RawTeam[],
  visibleLogins: Set<string> | null = null,
): TeamNode[] {
  const nodes = new Map(raw.map((t) => [t.slug, toNode(t, visibleLogins)]));
  const roots: TeamNode[] = [];
  for (const node of nodes.values()) {
    const parent = node.parentSlug ? nodes.get(node.parentSlug) : undefined;
    if (parent && parent !== node) parent.children.push(node);
    else roots.push(node);
  }
  const sortRec = (list: TeamNode[]) => {
    list.sort(byName);
    list.forEach((n) => sortRec(n.children));
  };
  sortRec(roots);
  return roots;
}

/** Fills `subtreeMemberCount`. Live: unique people. Snapshot: sum of counts. */
export function computeSubtreeCounts(
  node: TeamNode,
  live: boolean,
): Set<string> | number {
  if (live) {
    const logins = new Set(node.members.map((m) => m.login));
    for (const child of node.children) {
      for (const login of computeSubtreeCounts(child, true) as Set<string>) {
        logins.add(login);
      }
    }
    node.subtreeMemberCount = Math.max(logins.size, node.memberCount);
    return logins;
  }
  const total =
    node.memberCount +
    node.children.reduce(
      (sum, child) => sum + (computeSubtreeCounts(child, false) as number),
      0,
    );
  node.subtreeMemberCount = total;
  return total;
}

export function walk(
  nodes: TeamNode[],
  fn: (node: TeamNode, path: TeamNode[]) => void,
  path: TeamNode[] = [],
) {
  for (const node of nodes) {
    fn(node, path);
    walk(node.children, fn, [...path, node]);
  }
}

export function computeStats(roots: TeamNode[], live: boolean): TeamsStats {
  const stats: TeamsStats = {
    departments: 0,
    groups: 0,
    teams: 0,
    projects: 0,
    people: null,
    memberships: 0,
    openTeams: 0,
  };
  const people = new Set<string>();
  walk(roots, (node) => {
    if (node.kind === "Dept") stats.departments++;
    else if (node.kind === "Group" || node.kind === "Sub-Group") stats.groups++;
    else if (node.kind === "Project") stats.projects++;
    else stats.teams++;
    stats.memberships += node.memberCount;
    if (node.subtreeMemberCount === 0) stats.openTeams++;
    node.members.forEach((m) => people.add(m.login));
  });
  if (live) stats.people = people.size;
  return stats;
}

/** Unique people with the teams they belong to, most involved first. */
export function collectPeople(roots: TeamNode[]): TeamsSnapshot["people"] {
  const people = new Map<string, TeamMember & { teams: string[] }>();
  walk(roots, (node) => {
    for (const member of node.members) {
      const entry = people.get(member.login) ?? { ...member, teams: [] };
      entry.teams.push(node.label);
      if (member.role === "maintainer") entry.role = "maintainer";
      if (!entry.name && member.name) entry.name = member.name;
      people.set(member.login, entry);
    }
  });
  return [...people.values()].sort(
    (a, b) => b.teams.length - a.teams.length || a.login.localeCompare(b.login),
  );
}

export function assembleSnapshot({
  raw,
  source,
  org,
  visibleLogins = null,
  publicPeople = [],
  notice,
}: {
  raw: RawTeam[];
  source: TeamsSource;
  org: string;
  visibleLogins?: Set<string> | null;
  publicPeople?: TeamMember[];
  notice?: string;
}): TeamsSnapshot {
  const live = source === "github";
  const roots = buildTree(raw, visibleLogins);
  roots.forEach((root) => computeSubtreeCounts(root, live));
  return {
    source,
    org,
    fetchedAt: new Date().toISOString(),
    roots,
    stats: computeStats(roots, live),
    people: live
      ? collectPeople(roots)
      : publicPeople.map((p) => ({ ...p, teams: [] as string[] })),
    ...(notice ? { notice } : {}),
  };
}

/** Finds a node and the path of ancestors leading to it. */
export function findNode(
  roots: TeamNode[],
  slug: string,
): { node: TeamNode; path: TeamNode[] } | null {
  let found: { node: TeamNode; path: TeamNode[] } | null = null;
  walk(roots, (node, path) => {
    if (!found && node.slug === slug) found = { node, path };
  });
  return found;
}
