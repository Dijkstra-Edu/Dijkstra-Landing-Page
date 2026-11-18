"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { platformLinks, siteConfig } from "@/lib/site";
import { mainNav, type MegaMenu, type NavLink } from "@/lib/navigation";
import type { HeaderTone } from "./use-header-state";

const tones = {
  dark: {
    sheet: "bg-black text-white",
    muted: "text-neutral-500",
    row: "text-white active:bg-white/10",
    sub: "text-neutral-200 active:bg-white/10",
    divider: "border-white/10",
    ghost: "border-white/15 text-white",
    iconBox: "border-white/10 text-neutral-300",
  },
  light: {
    sheet: "bg-white text-neutral-900",
    muted: "text-neutral-500",
    row: "text-neutral-900 active:bg-neutral-100",
    sub: "text-neutral-800 active:bg-neutral-100",
    divider: "border-neutral-200",
    ghost: "border-neutral-300 text-neutral-900",
    iconBox: "border-neutral-200 text-neutral-600",
  },
} satisfies Record<HeaderTone, Record<string, string>>;

/** Every link inside a mega menu, grouped for the drill-down level. */
function groupsFor(menu: MegaMenu): { title: string; links: NavLink[] }[] {
  const groups = [...menu.columns];
  if (menu.aside.kind === "links") {
    groups.push({ title: menu.aside.title, links: menu.aside.links });
  } else {
    groups.push({
      title: menu.aside.title,
      links: [
        {
          label: menu.aside.article.title,
          href: menu.aside.article.href,
          description: menu.aside.article.excerpt,
        },
      ],
    });
  }
  return groups;
}

function Row({
  link,
  className,
  onNavigate,
  children,
}: {
  link: NavLink;
  className: string;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  if (link.href.startsWith("/")) {
    return (
      <Link href={link.href} onClick={onNavigate} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={link.href} onClick={onNavigate} className={className}>
      {children}
    </a>
  );
}

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } },
};
const listItem = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: "easeOut" as const },
  },
};

/**
 * Full-screen mobile navigation sheet with drill-down sub-levels: top-level
 * entries are large tap targets; menus open as a second level that slides in
 * from the right with a Back control. Items stagger in, page scroll is locked
 * while open, Escape closes, and focus moves into the sheet and back out.
 */
export function MobileMenu({
  open,
  onClose,
  onNavigate,
  tone,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: () => void;
  tone: HeaderTone;
}) {
  const reduceMotion = useReducedMotion();
  const [level, setLevel] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const t = tones[tone];

  useEffect(() => {
    if (!open) {
      setLevel(null);
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const onResize = () =>
      window.matchMedia("(min-width: 1024px)").matches && onClose();
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, onClose]);

  const menu = mainNav.find(
    (item) => item.type === "mega" && item.menu.id === level,
  );
  const current = menu && menu.type === "mega" ? menu.menu : null;

  const go = (id: string | null) => {
    setDirection(id ? 1 : -1);
    setLevel(id);
  };

  const slide = reduceMotion
    ? {}
    : {
        initial: { x: `${direction * 24}%`, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: `${direction * -24}%`, opacity: 0 },
        transition: {
          duration: 0.24,
          ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
        },
      };

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          id="mobile-menu"
          aria-label="Mobile"
          role="dialog"
          aria-modal="true"
          className={cn(
            "fixed inset-0 z-[60] flex flex-col lg:hidden",
            t.sheet,
          )}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Sheet header mirrors the bar so the logo doesn't jump */}
          <div className="flex h-16 shrink-0 items-center justify-between px-4 md:h-[72px] md:px-6">
            <Link
              href="/"
              onClick={onNavigate}
              className="flex items-center gap-2"
              aria-label="Dijkstra home"
            >
              <img src="/icon.png" alt="" className="h-9 w-9" />
              <span className="text-lg font-semibold tracking-tight">
                {siteConfig.name}
              </span>
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-green-600"
            >
              <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden>
                <path
                  d="M5 5l10 10M15 5 5 15"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="relative min-h-0 flex-1 overflow-hidden">
            <AnimatePresence
              initial={false}
              mode="popLayout"
              custom={direction}
            >
              {!current ? (
                <motion.div
                  key="root"
                  className="absolute inset-0 overflow-y-auto overscroll-contain px-4 pb-8 pt-2 md:px-6"
                  {...slide}
                >
                  <motion.ul
                    variants={reduceMotion ? undefined : list}
                    initial="hidden"
                    animate="show"
                    className={cn("divide-y border-b", t.divider)}
                  >
                    {mainNav.map((item) => (
                      <motion.li
                        key={
                          item.type === "mega" ? item.menu.id : item.link.href
                        }
                        variants={reduceMotion ? undefined : listItem}
                        className={t.divider}
                      >
                        {item.type === "mega" ? (
                          <button
                            type="button"
                            onClick={() => go(item.menu.id)}
                            aria-haspopup="true"
                            className={cn(
                              "flex w-full items-center justify-between rounded-md py-4 text-left text-2xl font-medium tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-green-600",
                              t.row,
                            )}
                          >
                            {item.menu.label}
                            <ChevronRight
                              className={cn("h-5 w-5", t.muted)}
                              aria-hidden
                            />
                          </button>
                        ) : (
                          <Row
                            link={item.link}
                            onNavigate={onNavigate}
                            className={cn(
                              "flex w-full items-center rounded-md py-4 text-2xl font-medium tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-green-600",
                              t.row,
                            )}
                          >
                            {item.link.label}
                          </Row>
                        )}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              ) : (
                <motion.div
                  key={current.id}
                  className="absolute inset-0 overflow-y-auto overscroll-contain px-4 pb-8 pt-1 md:px-6"
                  {...slide}
                >
                  <button
                    type="button"
                    onClick={() => go(null)}
                    className={cn(
                      "-ml-1 mb-2 inline-flex items-center gap-1 rounded-md py-2 pr-2 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-green-600",
                      t.muted,
                    )}
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden /> Back
                  </button>
                  <h2 className="text-2xl font-medium tracking-tight">
                    {current.label}
                  </h2>
                  <p className={cn("mt-1 text-sm", t.muted)}>
                    {current.intro.description}
                  </p>
                  <motion.div
                    variants={reduceMotion ? undefined : list}
                    initial="hidden"
                    animate="show"
                    className="mt-4 space-y-6"
                  >
                    {groupsFor(current).map((group) => (
                      <motion.section
                        key={group.title}
                        variants={reduceMotion ? undefined : listItem}
                      >
                        <h3 className={cn("mb-1 text-xs font-medium", t.muted)}>
                          {group.title}
                        </h3>
                        <ul className={cn("divide-y border-y", t.divider)}>
                          {group.links.map((link) => (
                            <li
                              key={link.href + link.label}
                              className={t.divider}
                            >
                              <Row
                                link={link}
                                onNavigate={onNavigate}
                                className={cn(
                                  "flex items-center gap-3 rounded-md py-3 outline-none focus-visible:ring-2 focus-visible:ring-green-600",
                                  t.sub,
                                )}
                              >
                                {link.icon && (
                                  <span
                                    className={cn(
                                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border",
                                      t.iconBox,
                                    )}
                                  >
                                    <link.icon
                                      className="h-4 w-4"
                                      aria-hidden
                                    />
                                  </span>
                                )}
                                <span className="min-w-0 flex-1">
                                  <span className="block text-[15px] font-medium">
                                    {link.label}
                                  </span>
                                  {link.description && (
                                    <span
                                      className={cn(
                                        "block truncate text-[13px]",
                                        t.muted,
                                      )}
                                    >
                                      {link.description}
                                    </span>
                                  )}
                                </span>
                                {!link.href.startsWith("/") && (
                                  <ArrowUpRight
                                    className={cn("h-4 w-4", t.muted)}
                                    aria-hidden
                                  />
                                )}
                              </Row>
                            </li>
                          ))}
                        </ul>
                      </motion.section>
                    ))}
                    <motion.div variants={reduceMotion ? undefined : listItem}>
                      <Row
                        link={current.intro.cta}
                        onNavigate={onNavigate}
                        className="inline-flex items-center gap-1 text-sm font-medium text-green-600"
                      >
                        {current.intro.cta.label}
                        <ChevronRight className="h-4 w-4" aria-hidden />
                      </Row>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Persistent actions */}
          <div
            className={cn(
              "shrink-0 border-t px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 md:px-6",
              t.divider,
            )}
          >
            <div className="grid grid-cols-2 gap-3">
              <a
                href={platformLinks.login}
                className={cn(
                  "flex h-11 items-center justify-center rounded-lg border text-[15px] font-medium",
                  t.ghost,
                )}
              >
                Log in
              </a>
              <a
                href={platformLinks.onboarding}
                className="flex h-11 items-center justify-center rounded-lg bg-green-700 text-[15px] font-medium text-white"
              >
                Get started
              </a>
            </div>
            <a
              href={siteConfig.links.github}
              className={cn(
                "mt-3 flex items-center justify-center gap-2 py-1 text-sm",
                t.muted,
              )}
            >
              <IconBrandGithub className="h-4 w-4" aria-hidden /> Dijkstra on
              GitHub
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
