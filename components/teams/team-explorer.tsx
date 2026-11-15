"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Boxes,
  Building2,
  ChevronRight,
  Crown,
  ExternalLink,
  FolderGit2,
  Layers,
  Search,
  Sparkles,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { kindLabel } from "@/lib/teams/parse";
import type { TeamKind, TeamNode, TeamsSnapshot } from "@/lib/teams/types";
import { joinTeamUrl } from "./links";

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const kindIcon: Record<TeamKind, typeof Users> = {
  Dept: Building2,
  Group: Layers,
  "Sub-Group": Layers,
  Team: Users,
  Projects: Boxes,
  Project: FolderGit2,
  Other: Users,
};

const kindTone: Record<TeamKind, string> = {
  Dept: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
  Group: "text-sky-300 bg-sky-500/10 border-sky-500/20",
  "Sub-Group": "text-sky-300 bg-sky-500/10 border-sky-500/20",
  Team: "text-amber-300 bg-amber-500/10 border-amber-500/20",
  Projects: "text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-500/20",
  Project: "text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-500/20",
  Other: "text-neutral-300 bg-white/5 border-white/10",
};

function TeamIcon({ node, className }: { node: TeamNode; className?: string }) {
  if (node.icon) {
    // Some specialization artwork is dark line-art: a light tile keeps every
    // icon legible on the dark UI (Dijkstra Web also uses tiles).
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-[5px] bg-neutral-100 p-[2px]",
          className,
        )}
      >
        <img src={node.icon} alt="" className="h-full w-full object-contain" />
      </span>
    );
  }
  const Icon = kindIcon[node.kind];
  return <Icon className={cn("text-neutral-400", className)} />;
}

function KindTag({ kind, className }: { kind: TeamKind; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        kindTone[kind],
        className,
      )}
    >
      {kindLabel[kind]}
    </span>
  );
}

function index(roots: TeamNode[]) {
  const bySlug = new Map<string, TeamNode>();
  const parents = new Map<string, string | null>();
  const visit = (nodes: TeamNode[], parent: string | null) => {
    for (const n of nodes) {
      bySlug.set(n.slug, n);
      parents.set(n.slug, parent);
      visit(n.children, n.slug);
    }
  };
  visit(roots, null);
  const pathTo = (slug: string) => {
    const path: TeamNode[] = [];
    let current = parents.get(slug) ?? null;
    while (current) {
      const node = bySlug.get(current);
      if (!node) break;
      path.unshift(node);
      current = parents.get(current) ?? null;
    }
    return path;
  };
  return { bySlug, pathTo };
}

/** Nodes matching `query` (label, description or member) plus their ancestors. */
function matchingSlugs(roots: TeamNode[], query: string): Set<string> | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  const keep = new Set<string>();
  const visit = (node: TeamNode, ancestors: string[]): boolean => {
    const self =
      node.label.toLowerCase().includes(q) ||
      node.description.toLowerCase().includes(q) ||
      node.members.some(
        (m) =>
          m.login.toLowerCase().includes(q) ||
          m.name?.toLowerCase().includes(q),
      );
    let childMatch = false;
    for (const child of node.children) {
      if (visit(child, [...ancestors, node.slug])) childMatch = true;
    }
    if (self || childMatch) {
      keep.add(node.slug);
      ancestors.forEach((a) => keep.add(a));
    }
    return self || childMatch;
  };
  roots.forEach((r) => visit(r, []));
  return keep;
}

/* -------------------------------------------------------------------------- */
/* Source badge                                                               */
/* -------------------------------------------------------------------------- */

function timeAgo(iso: string) {
  const minutes = Math.max(
    0,
    Math.round((Date.now() - new Date(iso).getTime()) / 60000),
  );
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  return hours < 24 ? `${hours} h ago` : `${Math.round(hours / 24)} d ago`;
}

export function TeamsSourceBadge({ snapshot }: { snapshot: TeamsSnapshot }) {
  // Relative time depends on the clock: render it after mount only.
  const [ago, setAgo] = useState<string | null>(null);
  useEffect(() => setAgo(timeAgo(snapshot.fetchedAt)), [snapshot.fetchedAt]);

  const live = snapshot.source === "github";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs",
        live
          ? "border-green-500/30 bg-green-500/10 text-green-300"
          : "border-white/10 bg-white/5 text-neutral-400",
      )}
      title={snapshot.notice}
    >
      <span className="relative flex h-2 w-2">
        {live && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
        )}
        <span
          className={cn(
            "relative inline-flex h-2 w-2 rounded-full",
            live ? "bg-green-400" : "bg-neutral-500",
          )}
        />
      </span>
      {live
        ? `Live from GitHub${ago ? ` Â· synced ${ago}` : ""}`
        : `Team structure from the ${snapshot.org} GitHub organisation`}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Members                                                                    */
/* -------------------------------------------------------------------------- */

function MemberGrid({ node }: { node: TeamNode }) {
  if (node.members.length > 0) {
    const hidden = Math.max(0, node.memberCount - node.members.length);
    return (
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {node.members.map((m) => (
          <li key={m.login}>
            <a
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-2.5 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
            >
              <img
                src={`${m.avatarUrl}${m.avatarUrl.includes("?") ? "&" : "?"}s=80`}
                alt=""
                loading="lazy"
                className="h-9 w-9 rounded-full bg-white/10"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-white">
                  {m.name ?? m.login}
                </span>
                <span className="block truncate text-xs text-neutral-500">
                  @{m.login}
                </span>
              </span>
              {m.role === "maintainer" && (
                <span
                  className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-300"
                  title="Team maintainer"
                >
                  <Crown className="h-3 w-3" /> Lead
                </span>
              )}
            </a>
          </li>
        ))}
        {hidden > 0 && (
          <li className="flex items-center rounded-xl border border-dashed border-white/10 p-2.5 text-xs text-neutral-500">
            +{hidden} member{hidden === 1 ? "" : "s"} with private membership
          </li>
        )}
      </ul>
    );
  }

  if (node.memberCount > 0) {
    // Count known (snapshot / public data), identities not available.
    const shown = Math.min(node.memberCount, 12);
    return (
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex -space-x-2">
          {Array.from({ length: shown }).map((_, i) => (
            <span
              key={i}
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-neutral-950 bg-gradient-to-br from-neutral-700 to-neutral-800"
            >
              <Users className="h-4 w-4 text-neutral-400" />
            </span>
          ))}
        </div>
        <p className="text-sm text-neutral-400">
          <span className="font-semibold text-white">{node.memberCount}</span>{" "}
          direct member{node.memberCount === 1 ? "" : "s"} on GitHub
        </p>
      </div>
    );
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/* Detail panel                                                               */
/* -------------------------------------------------------------------------- */

function TeamDetailPanel({
  node,
  path,
  onSelect,
}: {
  node: TeamNode;
  path: TeamNode[];
  onSelect: (slug: string) => void;
}) {
  const isOpen = node.subtreeMemberCount === 0;
  return (
    <motion.div
      key={node.slug}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-5"
    >
      {path.length > 0 && (
        <nav
          aria-label="Team path"
          className="flex flex-wrap items-center gap-1 text-xs text-neutral-500"
        >
          {path.map((p) => (
            <span key={p.slug} className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={() => onSelect(p.slug)}
                className="rounded hover:text-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              >
                {p.label}
              </button>
              <ChevronRight className="h-3 w-3" />
            </span>
          ))}
        </nav>
      )}

      <div className="flex items-start gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <TeamIcon
            node={node}
            className={node.icon ? "h-12 w-12 rounded-xl p-1" : "h-7 w-7"}
          />
        </span>
        <div className="min-w-0">
          <KindTag kind={node.kind} />
          <h3 className="mt-1.5 text-xl font-semibold leading-tight text-white sm:text-2xl">
            {node.label}
          </h3>
          {node.description && node.description !== node.label && (
            <p className="mt-1 text-sm leading-relaxed text-neutral-400">
              {node.description}
            </p>
          )}
        </div>
      </div>

      <dl className="grid grid-cols-3 gap-2 text-balance">
        {[
          ["Direct members", node.memberCount],
          ["Incl. sub-teams", node.subtreeMemberCount],
          ["Sub-teams", node.children.length],
        ].map(([label, value]) => (
          <div
            key={label as string}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
          >
            <dt className="text-[11px] text-neutral-500">{label}</dt>
            <dd className="text-lg font-semibold tabular-nums text-white">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      {isOpen ? (
        <div className="rounded-xl border border-dashed border-green-500/30 bg-green-500/[0.04] p-4">
          <p className="flex items-center gap-2 text-sm font-medium text-green-300">
            <Sparkles className="h-4 w-4" /> This team is open
          </p>
          <p className="mt-1 text-sm text-neutral-400">
            Nobody has joined yet â€” be the first and help shape it.
          </p>
          <a
            href={joinTeamUrl}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-500"
          >
            <UserPlus className="h-4 w-4" /> How to join
          </a>
        </div>
      ) : (
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Members
          </h4>
          {node.memberCount === 0 ? (
            <p className="text-sm text-neutral-400">
              No direct members â€” everyone here works in one of the sub-teams
              below.
            </p>
          ) : (
            <MemberGrid node={node} />
          )}
        </div>
      )}

      {node.children.length > 0 && (
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Sub-teams
          </h4>
          <div className="flex flex-wrap gap-2">
            {node.children.map((child) => (
              <button
                key={child.slug}
                type="button"
                onClick={() => onSelect(child.slug)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500",
                  child.subtreeMemberCount === 0
                    ? "border-dashed border-white/10 text-neutral-500 hover:text-neutral-300"
                    : "border-white/10 bg-white/[0.03] text-neutral-200 hover:border-white/25",
                )}
              >
                <TeamIcon node={child} className="h-4 w-4" />
                {child.label}
                <span className="rounded bg-white/10 px-1 tabular-nums text-[10px] text-neutral-400">
                  {child.subtreeMemberCount}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <a
        href={node.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-wrap items-center gap-x-1.5 text-sm text-neutral-400 hover:text-white"
      >
        View on GitHub <ExternalLink className="h-3.5 w-3.5" />
        <span className="text-xs text-neutral-600">(organisation members)</span>
      </a>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Tree                                                                       */
/* -------------------------------------------------------------------------- */

type VisibleItem = { node: TeamNode; depth: number };

function TeamTree({
  roots,
  selected,
  expanded,
  filter,
  onSelect,
  onToggle,
  className,
}: {
  roots: TeamNode[];
  selected: string;
  expanded: Set<string>;
  filter: Set<string> | null;
  onSelect: (slug: string) => void;
  onToggle: (slug: string, open?: boolean) => void;
  className?: string;
}) {
  const listRef = useRef<HTMLUListElement>(null);

  const visible = useMemo(() => {
    const out: VisibleItem[] = [];
    const visit = (nodes: TeamNode[], depth: number) => {
      for (const node of nodes) {
        if (filter && !filter.has(node.slug)) continue;
        out.push({ node, depth });
        if (node.children.length && (expanded.has(node.slug) || filter)) {
          visit(node.children, depth + 1);
        }
      }
    };
    visit(roots, 0);
    return out;
  }, [roots, expanded, filter]);

  // Keep the selected item in view inside the scroll container only.
  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>(`[data-slug="${selected}"]`);
    if (!list || !item) return;
    const top = item.offsetTop;
    const bottom = top + item.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = top - 8;
    else if (bottom > list.scrollTop + list.clientHeight)
      list.scrollTop = bottom - list.clientHeight + 8;
  }, [selected, visible]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = visible.findIndex((v) => v.node.slug === selected);
    if (i < 0) return;
    const { node } = visible[i];
    const focus = (slug: string) => {
      onSelect(slug);
      requestAnimationFrame(() =>
        listRef.current
          ?.querySelector<HTMLElement>(`[data-slug="${slug}"] button`)
          ?.focus(),
      );
    };
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (visible[i + 1]) focus(visible[i + 1].node.slug);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (visible[i - 1]) focus(visible[i - 1].node.slug);
        break;
      case "ArrowRight":
        e.preventDefault();
        if (node.children.length && !expanded.has(node.slug))
          onToggle(node.slug, true);
        else if (node.children[0]) focus(node.children[0].slug);
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (expanded.has(node.slug)) onToggle(node.slug, false);
        else if (node.parentSlug) focus(node.parentSlug);
        break;
    }
  };

  return (
    <ul
      ref={listRef}
      role="tree"
      aria-label="Dijkstra teams"
      onKeyDown={onKeyDown}
      className={cn(
        "relative space-y-0.5 overflow-y-auto overscroll-contain pr-1",
        className,
      )}
    >
      {visible.length === 0 && (
        <li className="px-3 py-6 text-center text-sm text-neutral-500">
          No matching teams
        </li>
      )}
      {visible.map(({ node, depth }) => {
        const isSelected = node.slug === selected;
        const isExpanded = expanded.has(node.slug) || Boolean(filter);
        const empty = node.subtreeMemberCount === 0;
        return (
          <li
            key={node.slug}
            data-slug={node.slug}
            role="treeitem"
            aria-level={depth + 1}
            aria-selected={isSelected}
            aria-expanded={node.children.length ? isExpanded : undefined}
          >
            <div
              className={cn(
                "group flex items-center gap-1 rounded-lg pr-2 transition-colors",
                isSelected ? "bg-white/[0.08]" : "hover:bg-white/[0.04]",
              )}
              style={{ paddingLeft: `${depth * 14 + 4}px` }}
            >
              {node.children.length ? (
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={
                    isExpanded
                      ? `Collapse ${node.label}`
                      : `Expand ${node.label}`
                  }
                  onClick={() => onToggle(node.slug)}
                  className="flex h-6 w-5 shrink-0 items-center justify-center rounded text-neutral-500 hover:text-white"
                >
                  <ChevronRight
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      isExpanded && "rotate-90",
                    )}
                  />
                </button>
              ) : (
                <span className="w-5 shrink-0" />
              )}
              <button
                type="button"
                tabIndex={isSelected ? 0 : -1}
                onClick={() => {
                  onSelect(node.slug);
                  if (node.children.length && !expanded.has(node.slug))
                    onToggle(node.slug, true);
                }}
                className="flex min-w-0 flex-1 items-center gap-2 py-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded"
              >
                <TeamIcon node={node} className="h-4 w-4 shrink-0" />
                <span
                  className={cn(
                    "truncate text-[13px]",
                    isSelected
                      ? "font-medium text-white"
                      : empty
                        ? "text-neutral-500"
                        : "text-neutral-300",
                  )}
                >
                  {node.label}
                </span>
              </button>
              <span
                className={cn(
                  "shrink-0 rounded-md px-1.5 text-[10px] tabular-nums",
                  empty ? "text-neutral-600" : "bg-white/5 text-neutral-400",
                )}
                aria-label={`${node.subtreeMemberCount} members`}
              >
                {empty ? "open" : node.subtreeMemberCount}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/* Explorer                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Explorer for the GitHub team hierarchy.
 * - `compact`: department tabs + tree + details (home page)
 * - `full`: adds search across teams and members (team page)
 */
export function TeamExplorer({
  snapshot,
  variant = "compact",
}: {
  snapshot: TeamsSnapshot;
  variant?: "compact" | "full";
}) {
  const { roots } = snapshot;
  const { bySlug, pathTo } = useMemo(() => index(roots), [roots]);
  const [dept, setDept] = useState(roots[0]?.slug ?? "");
  const [selected, setSelected] = useState(() => {
    // Start on the first group with members so visitors see people, not an
    // empty department.
    const first = roots[0];
    return (
      first?.children.find((c) => c.subtreeMemberCount > 0)?.slug ??
      first?.slug ??
      ""
    );
  });
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    const first = roots[0];
    return new Set(
      first
        ? [first.slug, ...first.children.slice(0, 1).map((c) => c.slug)]
        : [],
    );
  });
  const [query, setQuery] = useState("");
  const detailRef = useRef<HTMLDivElement>(null);

  const deptNode = bySlug.get(dept) ?? roots[0];
  const filter = useMemo(
    () => (variant === "full" ? matchingSlugs(roots, query) : null),
    [roots, query, variant],
  );
  const treeRoots = filter ? roots : deptNode ? [deptNode] : [];
  const selectedNode = bySlug.get(selected) ?? deptNode;

  const select = (slug: string) => {
    setSelected(slug);
    const path = pathTo(slug);
    const root = path[0]?.slug ?? slug;
    if (root !== dept) setDept(root);
    setExpanded((prev) => new Set([...prev, ...path.map((p) => p.slug)]));
  };

  const toggle = (slug: string, open?: boolean) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      const shouldOpen = open ?? !next.has(slug);
      if (shouldOpen) next.add(slug);
      else next.delete(slug);
      return next;
    });

  const selectFromTree = (slug: string) => {
    select(slug);
    // On narrow screens the details sit below the tree: bring them into view.
    if (window.matchMedia("(max-width: 767px)").matches) {
      requestAnimationFrame(() =>
        detailRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      );
    }
  };

  if (!selectedNode) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/80 shadow-2xl shadow-green-950/20 backdrop-blur">
      {/* Toolbar: departments (+ search on the full variant) */}
      <div className="flex flex-col gap-3 border-b border-white/10 p-3 sm:p-4 lg:flex-row lg:items-center">
        <div
          role="tablist"
          aria-label="Departments"
          className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {roots.map((root) => {
            const active = !filter && root.slug === dept;
            return (
              <button
                key={root.slug}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => {
                  setQuery("");
                  setDept(root.slug);
                  setSelected(root.slug);
                  setExpanded((prev) => new Set([...prev, root.slug]));
                }}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500",
                  active
                    ? "border-green-500/40 bg-green-500/10 text-white"
                    : "border-white/10 text-neutral-400 hover:border-white/20 hover:text-neutral-200",
                )}
              >
                {root.label}
                <span className="rounded bg-white/10 px-1 tabular-nums text-[10px] text-neutral-300">
                  {root.subtreeMemberCount}
                </span>
              </button>
            );
          })}
        </div>
        {variant === "full" && (
          <label className="relative flex-1 lg:ml-auto lg:max-w-xs">
            <span className="sr-only">Search teams and members</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                snapshot.source === "github"
                  ? "Search teams or GitHub usernames"
                  : "Search teams"
              }
              className="h-9 w-full rounded-lg border border-white/10 bg-white/[0.03] pl-9 pr-8 text-sm text-white placeholder:text-neutral-500 focus:border-green-500/50 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-neutral-500 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        <div className="border-b border-white/10 p-2 md:border-b-0 md:border-r">
          <TeamTree
            roots={treeRoots}
            selected={selectedNode.slug}
            expanded={expanded}
            filter={filter}
            onSelect={selectFromTree}
            onToggle={toggle}
            className={
              variant === "full"
                ? "max-h-[70vh] md:max-h-[640px]"
                : "max-h-72 md:max-h-[480px]"
            }
          />
        </div>
        <div ref={detailRef} className="scroll-mt-28 p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <TeamDetailPanel
              key={selectedNode.slug}
              node={selectedNode}
              path={pathTo(selectedNode.slug)}
              onSelect={select}
            />
          </AnimatePresence>
        </div>
      </div>
      {snapshot.source !== "github" && (
        <p className="border-t border-white/10 px-4 py-2.5 text-[11px] text-neutral-500">
          Numbers are team memberships from GitHub â€” one person can belong to
          several teams.
        </p>
      )}
    </div>
  );
}
