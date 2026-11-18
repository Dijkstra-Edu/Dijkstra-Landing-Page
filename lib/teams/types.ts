/**
 * Types for Dijkstra's team structure, as modelled by the GitHub teams of the
 * Dijkstra-Edu organisation. Team names follow the convention
 * "[Kind] Name", e.g. "[Team] Data Engineering" â†’ slug "team-data-engineering".
 */

export const TEAM_KINDS = [
  "Dept",
  "Group",
  "Sub-Group",
  "Team",
  "Projects",
  "Project",
] as const;

export type TeamKind = (typeof TEAM_KINDS)[number] | "Other";

export type TeamMember = {
  login: string;
  name: string | null;
  avatarUrl: string;
  url: string;
  role: "maintainer" | "member";
};

/** Where the data came from. */
export type TeamsSource =
  /** Full live data (structure + members) from the GitHub API. */
  | "github"
  /** Structure from the bundled snapshot, people from the public member list. */
  | "public-members"
  /** Bundled snapshot only (no token configured, or GitHub unreachable). */
  | "snapshot";

export type TeamNode = {
  slug: string;
  /** Raw GitHub team name, e.g. "[Team] Data Engineering". */
  name: string;
  kind: TeamKind;
  /** Display label without the kind prefix. */
  label: string;
  description: string;
  /** Team page on GitHub (visible to organisation members). */
  url: string;
  parentSlug: string | null;
  /** Immediate (direct) members. Empty when members are not known. */
  members: TeamMember[];
  /** Number of immediate members (known even in snapshot mode). */
  memberCount: number;
  /** Unique people in this team and all of its sub-teams (live) or the
   *  sum of member counts (snapshot, an upper bound). */
  subtreeMemberCount: number;
  /** Optional specialization icon (public path). */
  icon: string | null;
  children: TeamNode[];
};

export type TeamsStats = {
  departments: number;
  groups: number;
  teams: number;
  projects: number;
  /** Unique people across all teams; null when unknown (snapshot). */
  people: number | null;
  /** Sum of memberships across all teams. */
  memberships: number;
  /** Teams without any member in their subtree. */
  openTeams: number;
};

export type TeamsSnapshot = {
  source: TeamsSource;
  org: string;
  /** ISO timestamp of when the data was produced. */
  fetchedAt: string;
  roots: TeamNode[];
  stats: TeamsStats;
  /** Unique people, most-involved first (empty in snapshot mode). */
  people: (TeamMember & { teams: string[] })[];
  /** Human-readable reason when falling back from live data. */
  notice?: string;
};
