import { TEAM_KINDS, type TeamKind } from "./types";

const KIND_RE = /^\s*\[([^\]]+)\]\s*(.*)$/;

/** "[Team] Data Engineering" â†’ { kind: "Team", label: "Data Engineering" } */
export function parseTeamName(name: string): { kind: TeamKind; label: string } {
  const match = KIND_RE.exec(name);
  if (!match) return { kind: "Other", label: name.trim() };
  const rawKind = match[1].trim().toLowerCase();
  const kind =
    TEAM_KINDS.find((k) => k.toLowerCase() === rawKind) ??
    (rawKind === "department"
      ? "Dept"
      : rawKind === "subgroup"
        ? "Sub-Group"
        : "Other");
  return { kind, label: match[2].trim() };
}

/**
 * Approximates GitHub's team slug generation: lower-case, every run of
 * non-alphanumeric characters becomes a single "-", trimmed.
 * "[Team] Full Stack Software Dev (FE+BE)" â†’ "team-full-stack-software-dev-fe-be"
 */
export function slugifyTeamName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Normalised key used to match live teams against the bundled snapshot. */
export function labelKey(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

/** Display names for kinds. */
export const kindLabel: Record<TeamKind, string> = {
  Dept: "Department",
  Group: "Group",
  "Sub-Group": "Sub-group",
  Team: "Team",
  Projects: "Project group",
  Project: "Project",
  Other: "Team",
};

/**
 * Cosmetic fixes for typos in GitHub team names/descriptions. Applied to
 * display text only â€” slugs and URLs always use GitHub's real values.
 */
const DISPLAY_FIXES: [RegExp, string][] = [
  [/\bPlatfrom\b/g, "Platform"],
  [/\bSoftwre\b/g, "Software"],
  [/\bPiplining\b/g, "Pipelining"],
  [/\bIOS\b/g, "iOS"],
  [/\bMacOS\b/g, "macOS"],
  [/\bincharge\b/g, "in charge"],
];

export function displayText(text: string): string {
  return DISPLAY_FIXES.reduce((t, [re, to]) => t.replace(re, to), text);
}
