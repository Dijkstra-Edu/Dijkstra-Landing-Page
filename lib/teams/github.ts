import "server-only";

import type { TeamMember } from "./types";

/**
 * Thin GitHub client for the team explorer. Server-only: the token never
 * reaches the browser.
 *
 * Environment:
 *   GITHUB_TEAMS_TOKEN | GITHUB_TOKEN  token with `read:org` (classic) or
 *                                      "Members: read" (fine-grained)
 *   GITHUB_ORG | ORG                   organisation login (default Dijkstra-Edu)
 *   GITHUB_API_URL                     REST base (default https://api.github.com;
 *                                      GHES: https://HOST/api/v3)
 *   TEAMS_REVALIDATE_SECONDS           cache lifetime (default 3600)
 */

export type RawTeam = {
  slug: string;
  name: string;
  description: string;
  url: string;
  parentSlug: string | null;
  /** Immediate members; `null` when unknown. */
  members: TeamMember[] | null;
  memberCount: number;
};

export class GitHubError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "GitHubError";
  }
}

export function githubConfig() {
  const apiUrl = (
    process.env.GITHUB_API_URL ?? "https://api.github.com"
  ).replace(/\/+$/, "");
  const graphqlUrl = apiUrl.endsWith("/api/v3")
    ? apiUrl.replace(/\/api\/v3$/, "/api/graphql")
    : `${apiUrl}/graphql`;
  const ttl = Number(process.env.TEAMS_REVALIDATE_SECONDS ?? 3600);
  return {
    token: process.env.GITHUB_TEAMS_TOKEN || process.env.GITHUB_TOKEN || "",
    org: process.env.GITHUB_ORG || process.env.ORG || "Dijkstra-Edu",
    apiUrl,
    graphqlUrl,
    revalidate: Number.isFinite(ttl) && ttl > 0 ? ttl : 3600,
    publicMembersOnly: /^(1|true|yes)$/i.test(
      process.env.TEAMS_PUBLIC_MEMBERS_ONLY ?? "",
    ),
    timeoutMs: 8000,
  };
}

type Config = ReturnType<typeof githubConfig>;

function headers(cfg: Config, auth = true): HeadersInit {
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "dijkstra-landing-page",
    ...(auth && cfg.token ? { Authorization: `Bearer ${cfg.token}` } : {}),
  };
}

async function request<T>(
  cfg: Config,
  url: string,
  init: RequestInit & { auth?: boolean; fresh?: boolean } = {},
): Promise<{ data: T; response: Response }> {
  const { auth = true, fresh = false, ...rest } = init;
  let response: Response;
  try {
    response = await fetch(url, {
      ...rest,
      headers: { ...headers(cfg, auth), ...(rest.headers ?? {}) },
      signal: AbortSignal.timeout(cfg.timeoutMs),
      // Cached by Next.js' data cache and revalidated in the background,
      // unless the caller needs a fresh answer (membership checks).
      ...(fresh
        ? { cache: "no-store" as const }
        : { next: { revalidate: cfg.revalidate, tags: ["github-teams"] } }),
    });
  } catch (error) {
    throw new GitHubError(
      `GitHub is unreachable (${error instanceof Error ? error.message : "network error"})`,
    );
  }
  if (!response.ok) {
    throw new GitHubError(
      `GitHub responded ${response.status} for ${new URL(url).pathname}`,
      response.status,
    );
  }
  return { data: (await response.json()) as T, response };
}

/* -------------------------------------------------------------------------- */
/* GraphQL (preferred): one round-trip for teams, parents and direct members  */
/* -------------------------------------------------------------------------- */

const TEAMS_QUERY = /* GraphQL */ `
  query DijkstraTeams($org: String!, $cursor: String) {
    organization(login: $org) {
      teams(
        first: 50
        after: $cursor
        orderBy: { field: NAME, direction: ASC }
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          name
          slug
          description
          url
          parentTeam {
            slug
          }
          members(first: 100, membership: IMMEDIATE) {
            totalCount
            edges {
              role
              node {
                login
                name
                avatarUrl
                url
              }
            }
          }
        }
      }
    }
  }
`;

const TEAM_QUERY = /* GraphQL */ `
  query DijkstraTeam($org: String!, $slug: String!) {
    organization(login: $org) {
      team(slug: $slug) {
        name
        slug
        description
        url
        parentTeam {
          slug
        }
        members(first: 100, membership: IMMEDIATE) {
          totalCount
          edges {
            role
            node {
              login
              name
              avatarUrl
              url
            }
          }
        }
        childTeams(first: 100) {
          nodes {
            name
            slug
            description
            url
            members(first: 100, membership: IMMEDIATE) {
              totalCount
              edges {
                role
                node {
                  login
                  name
                  avatarUrl
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

type GqlMembers = {
  totalCount: number;
  edges: {
    role: "MAINTAINER" | "MEMBER";
    node: {
      login: string;
      name: string | null;
      avatarUrl: string;
      url: string;
    };
  }[];
};

type GqlTeam = {
  name: string;
  slug: string;
  description: string | null;
  url: string;
  parentTeam?: { slug: string } | null;
  members: GqlMembers;
};

async function graphql<T>(cfg: Config, query: string, variables: object) {
  const { data } = await request<{ data?: T; errors?: { message: string }[] }>(
    cfg,
    cfg.graphqlUrl,
    { method: "POST", body: JSON.stringify({ query, variables }) },
  );
  if (data.errors?.length) {
    throw new GitHubError(
      `GitHub GraphQL: ${data.errors.map((e) => e.message).join("; ")}`,
    );
  }
  if (!data.data) throw new GitHubError("GitHub GraphQL returned no data");
  return data.data;
}

function fromGqlMembers(members: GqlMembers): TeamMember[] {
  return members.edges.map((edge) => ({
    login: edge.node.login,
    name: edge.node.name,
    avatarUrl: edge.node.avatarUrl,
    url: edge.node.url,
    role: edge.role === "MAINTAINER" ? "maintainer" : "member",
  }));
}

function fromGqlTeam(team: GqlTeam, parentSlug: string | null): RawTeam {
  return {
    slug: team.slug,
    name: team.name,
    description: team.description ?? "",
    url: team.url,
    parentSlug,
    members: fromGqlMembers(team.members),
    memberCount: team.members.totalCount,
  };
}

async function fetchTeamsGraphQL(cfg: Config): Promise<RawTeam[]> {
  const teams: RawTeam[] = [];
  let cursor: string | null = null;
  for (let page = 0; page < 20; page++) {
    const data: {
      organization: {
        teams: {
          pageInfo: { hasNextPage: boolean; endCursor: string | null };
          nodes: GqlTeam[];
        };
      } | null;
    } = await graphql(cfg, TEAMS_QUERY, { org: cfg.org, cursor });
    if (!data.organization)
      throw new GitHubError(`Organisation ${cfg.org} not found`, 404);
    const { nodes, pageInfo } = data.organization.teams;
    teams.push(...nodes.map((t) => fromGqlTeam(t, t.parentTeam?.slug ?? null)));
    if (!pageInfo.hasNextPage) break;
    cursor = pageInfo.endCursor;
  }
  return teams;
}

/* -------------------------------------------------------------------------- */
/* REST fallback                                                              */
/* -------------------------------------------------------------------------- */

type RestTeam = {
  name: string;
  slug: string;
  description: string | null;
  html_url: string;
  parent: { slug: string } | null;
};

type RestUser = { login: string; avatar_url: string; html_url: string };

async function paginate<T>(
  cfg: Config,
  path: string,
  auth = true,
): Promise<T[]> {
  const out: T[] = [];
  let url: string | null =
    `${cfg.apiUrl}${path}${path.includes("?") ? "&" : "?"}per_page=100`;
  for (let page = 0; url && page < 20; page++) {
    const { data, response }: { data: T[]; response: Response } = await request<
      T[]
    >(cfg, url, { auth });
    out.push(...data);
    const next = /<([^>]+)>;\s*rel="next"/.exec(
      response.headers.get("link") ?? "",
    );
    url = next ? next[1] : null;
  }
  return out;
}

/** Run `fn` over `items` with bounded concurrency. */
async function mapLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
) {
  const results: R[] = new Array(items.length);
  let index = 0;
  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    async () => {
      while (index < items.length) {
        const i = index++;
        results[i] = await fn(items[i]);
      }
    },
  );
  await Promise.all(workers);
  return results;
}

function fromRestUser(user: RestUser, maintainers: Set<string>): TeamMember {
  return {
    login: user.login,
    name: null,
    avatarUrl: user.avatar_url,
    url: user.html_url,
    role: maintainers.has(user.login) ? "maintainer" : "member",
  };
}

async function fetchTeamsREST(cfg: Config): Promise<RawTeam[]> {
  const teams = await paginate<RestTeam>(cfg, `/orgs/${cfg.org}/teams`);
  const perTeam = await mapLimit(teams, 6, async (team) => {
    const base = `/orgs/${cfg.org}/teams/${team.slug}/members`;
    const [all, maintainers] = await Promise.all([
      paginate<RestUser>(cfg, base),
      paginate<RestUser>(cfg, `${base}?role=maintainer`),
    ]);
    return { team, all, maintainers: new Set(maintainers.map((m) => m.login)) };
  });

  // REST "members" (and `role=maintainer`) include members of child teams.
  // Derive the *immediate* members by removing everyone who is listed in a
  // child team. (Someone added both to a team and to one of its sub-teams is
  // attributed to the sub-team â€” GraphQL's IMMEDIATE filter is exact.)
  const bySlug = new Map(perTeam.map((t) => [t.team.slug, t]));
  const childLogins = new Map<string, Set<string>>();
  for (const { team } of perTeam) {
    if (!team.parent) continue;
    const set = childLogins.get(team.parent.slug) ?? new Set<string>();
    for (const user of bySlug.get(team.slug)?.all ?? []) set.add(user.login);
    childLogins.set(team.parent.slug, set);
  }

  return perTeam.map(({ team, all, maintainers }) => {
    const fromChildren = childLogins.get(team.slug) ?? new Set<string>();
    const direct = all
      .filter((u) => !fromChildren.has(u.login))
      .map((u) => fromRestUser(u, maintainers));
    return {
      slug: team.slug,
      name: team.name,
      description: team.description ?? "",
      url: team.html_url,
      parentSlug: team.parent?.slug ?? null,
      members: direct,
      memberCount: direct.length,
    };
  });
}

/* -------------------------------------------------------------------------- */
/* Public API                                                                 */
/* -------------------------------------------------------------------------- */

/** All teams with their direct members (GraphQL, falling back to REST). */
export async function fetchOrgTeams(
  cfg: Config = githubConfig(),
): Promise<RawTeam[]> {
  if (!cfg.token) throw new GitHubError("No GitHub token configured");
  try {
    return await fetchTeamsGraphQL(cfg);
  } catch (graphqlError) {
    // Fine-grained tokens and GHES versions differ in GraphQL support; the
    // REST API gives the same information with more requests.
    try {
      return await fetchTeamsREST(cfg);
    } catch {
      throw graphqlError;
    }
  }
}

/** Members who made their organisation membership public (no token needed). */
export async function fetchPublicMembers(
  cfg: Config = githubConfig(),
): Promise<TeamMember[]> {
  const users = await paginate<RestUser>(
    cfg,
    `/orgs/${cfg.org}/public_members`,
    Boolean(cfg.token),
  );
  return users.map((u) => fromRestUser(u, new Set()));
}

/** A single team, its direct members and its direct sub-teams. */
export async function fetchTeam(
  slug: string,
  cfg: Config = githubConfig(),
): Promise<{ team: RawTeam; children: RawTeam[] } | null> {
  if (!cfg.token) throw new GitHubError("No GitHub token configured");
  try {
    const data: {
      organization: {
        team: (GqlTeam & { childTeams: { nodes: GqlTeam[] } }) | null;
      } | null;
    } = await graphql(cfg, TEAM_QUERY, { org: cfg.org, slug });
    const team = data.organization?.team;
    if (!team) return null;
    return {
      team: fromGqlTeam(team, team.parentTeam?.slug ?? null),
      children: team.childTeams.nodes.map((c) => fromGqlTeam(c, team.slug)),
    };
  } catch (error) {
    if (error instanceof GitHubError && error.status === 404) return null;
    // REST fallback
    try {
      const { data: team } = await request<RestTeam>(
        cfg,
        `${cfg.apiUrl}/orgs/${cfg.org}/teams/${encodeURIComponent(slug)}`,
      );
      const [members, maintainers, children] = await Promise.all([
        paginate<RestUser>(cfg, `/orgs/${cfg.org}/teams/${team.slug}/members`),
        paginate<RestUser>(
          cfg,
          `/orgs/${cfg.org}/teams/${team.slug}/members?role=maintainer`,
        ),
        paginate<RestTeam>(cfg, `/orgs/${cfg.org}/teams/${team.slug}/teams`),
      ]);
      const maintainerSet = new Set(maintainers.map((m) => m.login));
      const mapped = members.map((u) => fromRestUser(u, maintainerSet));
      return {
        team: {
          slug: team.slug,
          name: team.name,
          description: team.description ?? "",
          url: team.html_url,
          parentSlug: team.parent?.slug ?? null,
          // REST includes child-team members; acceptable for a single-team view.
          members: mapped,
          memberCount: mapped.length,
        },
        children: children.map((c) => ({
          slug: c.slug,
          name: c.name,
          description: c.description ?? "",
          url: c.html_url,
          parentSlug: team.slug,
          members: null,
          memberCount: 0,
        })),
      };
    } catch (restError) {
      if (restError instanceof GitHubError && restError.status === 404)
        return null;
      throw error;
    }
  }
}

export type MembershipCheck = {
  login: string;
  /** "active" | "pending" from GitHub, "none" when not a member. */
  state: "active" | "pending" | "none";
  role: "maintainer" | "member" | null;
};

/**
 * Is `login` in team `slug`? Uses GitHub's team membership endpoint, which
 * (per GitHub) also reports membership inherited through child teams.
 */
export async function checkMembership(
  slug: string,
  login: string,
  cfg: Config = githubConfig(),
): Promise<MembershipCheck> {
  if (!cfg.token) throw new GitHubError("No GitHub token configured");
  try {
    const { data } = await request<{
      state: "active" | "pending";
      role: "maintainer" | "member";
    }>(
      cfg,
      `${cfg.apiUrl}/orgs/${cfg.org}/teams/${encodeURIComponent(slug)}/memberships/${encodeURIComponent(login)}`,
      { fresh: true },
    );
    return { login, state: data.state, role: data.role };
  } catch (error) {
    if (error instanceof GitHubError && error.status === 404) {
      return { login, state: "none", role: null };
    }
    throw error;
  }
}
