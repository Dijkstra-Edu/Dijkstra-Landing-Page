"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { platformLinks, siteConfig } from "@/lib/site";
import { mainNav, type MegaMenu, type NavLink } from "@/lib/navigation";
import { MobileMenu } from "./mobile-menu";
import { useHeaderState, type HeaderTone } from "./use-header-state";

/** Renders an internal link with next/link and anything else with <a>. */
export function SmartLink({
  link,
  className,
  children,
  onClick,
  onMouseEnter,
  role,
  tabIndex,
}: {
  link: NavLink;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  role?: string;
  tabIndex?: number;
}) {
  const props = { className, onClick, onMouseEnter, role, tabIndex };
  if (link.href.startsWith("/")) {
    return (
      <Link href={link.href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={link.href} {...props}>
      {children}
    </a>
  );
}

/** Panel width per menu; fixed widths let the panel glide between menus. */
const PANEL_WIDTH: Record<string, number> = {
  features: 720,
  products: 680,
  about: 600,
};
const panelWidth = (id: string) => PANEL_WIDTH[id] ?? 600;

/** Colour tokens for both header tones. */
const palette = {
  dark: {
    text: "text-white",
    link: "text-neutral-300 hover:text-white",
    muted: "text-neutral-500",
    hover: "bg-white/10",
    bar: "border-white/10 bg-black/70",
    panel: "border-white/10 bg-neutral-950 text-white shadow-black/40",
    item: "hover:bg-white/[0.06] focus-visible:bg-white/[0.06]",
    iconBox: "border-white/10 text-neutral-300",
    divider: "border-white/10",
    strip: "bg-white/[0.03]",
    ghost: "text-neutral-300 hover:bg-white/10 hover:text-white",
  },
  light: {
    text: "text-neutral-900",
    link: "text-neutral-600 hover:text-neutral-950",
    muted: "text-neutral-500",
    hover: "bg-neutral-900/[0.06]",
    bar: "border-neutral-200 bg-white/80",
    panel: "border-neutral-200 bg-white text-neutral-900 shadow-neutral-900/10",
    item: "hover:bg-neutral-100 focus-visible:bg-neutral-100",
    iconBox: "border-neutral-200 text-neutral-600",
    divider: "border-neutral-200",
    strip: "bg-neutral-50",
    ghost:
      "text-neutral-600 hover:bg-neutral-900/[0.06] hover:text-neutral-950",
  },
} satisfies Record<HeaderTone, Record<string, string>>;

function DropdownContent({
  menu,
  tone,
  onNavigate,
}: {
  menu: MegaMenu;
  tone: HeaderTone;
  onNavigate: () => void;
}) {
  const c = palette[tone];
  const itemClass = cn(
    "group/item flex items-start gap-3 rounded-lg p-2.5 outline-none transition-colors",
    c.item,
  );

  return (
    <div>
      <div
        className={cn(
          "grid gap-x-4 gap-y-1 p-3",
          menu.aside.kind === "featured" ? "grid-cols-[1fr_15rem]" : "",
          menu.aside.kind === "links" && menu.columns.length > 1
            ? "grid-cols-2"
            : "",
        )}
      >
        {menu.columns.map((column) => (
          <div key={column.title}>
            <p className={cn("px-2.5 pb-1 pt-2 text-xs font-medium", c.muted)}>
              {column.title}
            </p>
            <ul>
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  <SmartLink
                    link={link}
                    onClick={onNavigate}
                    className={itemClass}
                  >
                    {link.icon && (
                      <span
                        className={cn(
                          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border",
                          c.iconBox,
                        )}
                      >
                        <link.icon className="h-4 w-4" aria-hidden />
                      </span>
                    )}
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">
                        {link.label}
                      </span>
                      {link.description && (
                        <span className={cn("block text-[13px]", c.muted)}>
                          {link.description}
                        </span>
                      )}
                    </span>
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {menu.aside.kind === "featured" && (
          <div>
            <p className={cn("px-2.5 pb-1 pt-2 text-xs font-medium", c.muted)}>
              {menu.aside.title}
            </p>
            <Link
              href={menu.aside.article.href}
              onClick={onNavigate}
              className={cn(
                "group/article block rounded-lg p-2.5 outline-none transition-colors",
                c.item,
              )}
            >
              <span
                className={cn(
                  "mb-3 block aspect-[16/10] overflow-hidden rounded-md border",
                  c.divider,
                )}
              >
                <img
                  src={menu.aside.article.image}
                  alt=""
                  className="h-full w-full object-cover object-left-top"
                />
              </span>
              <span className="block text-sm font-medium">
                {menu.aside.article.title}
              </span>
              <span className={cn("mt-1 block text-[13px]", c.muted)}>
                {menu.aside.article.excerpt}
              </span>
            </Link>
          </div>
        )}
      </div>

      {/* Footer strip: secondary links + the menu's overview page */}
      <div
        className={cn(
          "flex items-center gap-x-4 gap-y-2 border-t px-5 py-3 text-[13px]",
          c.divider,
          c.strip,
        )}
      >
        {menu.aside.kind === "links" && (
          <ul className="flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-1">
            {menu.aside.links.map((link) => (
              <li key={link.href + link.label}>
                <SmartLink
                  link={link}
                  onClick={onNavigate}
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded outline-none transition-colors focus-visible:underline",
                    c.link,
                  )}
                >
                  {link.label}
                  {!link.href.startsWith("/") && (
                    <ArrowUpRight className="h-3 w-3 opacity-60" aria-hidden />
                  )}
                </SmartLink>
              </li>
            ))}
          </ul>
        )}
        {menu.aside.kind === "featured" && (
          <p className={cn("min-w-0 flex-1", c.muted)}>
            {menu.intro.description}
          </p>
        )}
        <SmartLink
          link={menu.intro.cta}
          onClick={onNavigate}
          className={cn(
            "group/cta ml-auto inline-flex shrink-0 items-center gap-1 font-medium outline-none focus-visible:underline",
            c.text,
          )}
        >
          {menu.intro.cta.label}
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5"
            aria-hidden
          />
        </SmartLink>
      </div>
    </div>
  );
}

/**
 * Site header.
 *
 * Desktop: a transparent bar at the top of the page that becomes a compact,
 * floating bar once you scroll; it slides away while you read downwards and
 * returns on any upward scroll. Menus open as anchored dropdowns with hover
 * intent (a short delay before opening and closing, instant switching between
 * menus) and full keyboard support. Colours follow whatever section is under
 * the bar (`data-nav-tone`), so it works on dark and light pages.
 *
 * Mobile: a full-screen sheet with drill-down sub-levels (see MobileMenu).
 */
export function SiteHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [panelLeft, setPanelLeft] = useState(0);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const panelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const baseId = useId();

  const { atTop, hidden, tone } = useHeaderState({
    pinned: Boolean(activeMenu) || mobileOpen || focusWithin,
    routeKey: pathname,
  });
  const c = palette[tone];
  const floating = !atTop;

  const clearTimers = () => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    openTimer.current = closeTimer.current = null;
  };

  const closeAll = useCallback(() => {
    clearTimers();
    setActiveMenu(null);
    setMobileOpen(false);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  // Position the dropdown under its trigger, clamped inside the bar.
  const positionFor = useCallback((id: string) => {
    const trigger = triggerRefs.current[id];
    const bar = barRef.current;
    if (!trigger || !bar) return 0;
    const t = trigger.getBoundingClientRect();
    const b = bar.getBoundingClientRect();
    const width = panelWidth(id);
    const ideal = t.left + t.width / 2 - width / 2 - b.left;
    return Math.max(8, Math.min(ideal, b.width - width - 8));
  }, []);

  const show = useCallback(
    (id: string) => {
      clearTimers();
      setPanelLeft(positionFor(id));
      setActiveMenu(id);
    },
    [positionFor],
  );

  // Hover intent: a short delay before opening from rest, none when
  // switching between menus, and a grace period before closing.
  const hoverOpen = (id: string) => {
    if (activeMenu) return show(id);
    clearTimers();
    openTimer.current = window.setTimeout(() => show(id), 90);
  };
  const hoverClose = () => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    openTimer.current = null;
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setActiveMenu(null), 180);
  };
  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  // Escape closes the dropdown and returns focus to its trigger.
  useEffect(() => {
    if (!activeMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const trigger = triggerRefs.current[activeMenu];
      setActiveMenu(null);
      trigger?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (barRef.current?.contains(target)) return;
      setActiveMenu(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [activeMenu]);

  // Keep the dropdown anchored when the window is resized.
  useEffect(() => {
    if (!activeMenu) return;
    const onResize = () => setPanelLeft(positionFor(activeMenu));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeMenu, positionFor]);

  useEffect(() => () => clearTimers(), []);

  const onTriggerKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    id: string,
  ) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      show(id);
      window.setTimeout(() => {
        panelRef.current?.querySelector<HTMLElement>("a")?.focus();
      }, 60);
    }
  };

  const active = mainNav.find(
    (item) => item.type === "mega" && item.menu.id === activeMenu,
  );
  const activeMega = active && active.type === "mega" ? active.menu : null;

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <header
      data-site-header=""
      data-tone={tone}
      data-state={hidden ? "hidden" : floating ? "floating" : "top"}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out motion-reduce:transition-none",
        hidden && !mobileOpen && "-translate-y-[calc(100%+12px)]",
      )}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setFocusWithin(false);
        }
      }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:text-black"
      >
        Skip to content
      </a>

      <div
        className={cn(
          "mx-auto transition-[max-width,padding] duration-300 ease-out motion-reduce:transition-none",
          floating ? "max-w-6xl px-3 pt-2 md:px-4" : "container px-0 pt-0",
        )}
      >
        <div
          ref={barRef}
          onMouseLeave={hoverClose}
          onMouseEnter={cancelClose}
          className={cn(
            "relative border transition-[background-color,border-color,border-radius,box-shadow,color] duration-300 motion-reduce:transition-none",
            c.text,
            floating
              ? cn("rounded-xl shadow-sm backdrop-blur-xl", c.bar)
              : "rounded-none border-transparent bg-transparent",
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between gap-4 transition-[height] duration-300",
              floating
                ? "h-14 px-3 md:px-4"
                : "h-16 px-4 md:h-[72px] md:px-6 lg:px-8",
            )}
          >
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-green-600"
              aria-label="Dijkstra home"
            >
              <img
                src="/icon.png"
                alt=""
                className={cn(
                  "transition-[width,height] duration-300",
                  floating ? "h-8 w-8" : "h-9 w-9",
                )}
              />
              <span className="text-lg font-semibold tracking-tight">
                {siteConfig.name}
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav aria-label="Main" className="hidden lg:block">
              <ul
                className="flex items-center gap-0.5"
                onMouseLeave={hoverClose}
              >
                {mainNav.map((item) => {
                  const key =
                    item.type === "mega" ? item.menu.id : item.link.href;
                  const isOpen =
                    item.type === "mega" && activeMenu === item.menu.id;
                  const isCurrent =
                    item.type === "link" &&
                    item.link.href.startsWith("/") &&
                    !item.link.href.includes("#") &&
                    (pathname === item.link.href ||
                      pathname.startsWith(item.link.href + "/"));
                  const itemClass = cn(
                    "relative flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-green-600",
                    isOpen || isCurrent ? c.text : c.link,
                  );
                  const highlight = isOpen && (
                    <motion.span
                      layoutId={reduceMotion ? undefined : `${baseId}-hl`}
                      className={cn(
                        "absolute inset-0 -z-10 rounded-md",
                        c.hover,
                      )}
                      transition={{
                        type: "spring",
                        bounce: 0.15,
                        duration: 0.35,
                      }}
                    />
                  );
                  return (
                    <li key={key} className="relative isolate">
                      {item.type === "mega" ? (
                        <button
                          ref={(el) => {
                            triggerRefs.current[item.menu.id] = el;
                          }}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`${baseId}-panel`}
                          aria-haspopup="true"
                          onMouseEnter={() => hoverOpen(item.menu.id)}
                          onClick={() =>
                            isOpen ? setActiveMenu(null) : show(item.menu.id)
                          }
                          onKeyDown={(e) => onTriggerKeyDown(e, item.menu.id)}
                          className={itemClass}
                        >
                          {highlight}
                          {item.menu.label}
                          <svg
                            viewBox="0 0 12 12"
                            aria-hidden
                            className={cn(
                              "h-3 w-3 opacity-60 transition-transform duration-200",
                              isOpen && "rotate-180",
                            )}
                          >
                            <path
                              d="M3 4.5 6 7.5 9 4.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      ) : (
                        <SmartLink
                          link={item.link}
                          onMouseEnter={hoverClose}
                          className={itemClass}
                        >
                          <span aria-current={isCurrent ? "page" : undefined}>
                            {item.link.label}
                          </span>
                        </SmartLink>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-1.5">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dijkstra on GitHub"
                className={cn(
                  "hidden h-9 w-9 items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-green-600 lg:inline-flex",
                  c.ghost,
                )}
              >
                <IconBrandGithub className="h-[18px] w-[18px]" />
              </a>
              <a
                href={platformLinks.login}
                className={cn(
                  "hidden h-9 items-center rounded-md px-3 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-green-600 lg:inline-flex",
                  c.ghost,
                )}
              >
                Log in
              </a>
              <a
                href={platformLinks.onboarding}
                className="hidden h-9 items-center rounded-md bg-green-700 px-3.5 text-sm font-medium text-white outline-none transition-colors hover:bg-green-600 focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 sm:inline-flex"
              >
                Get started
              </a>
              <button
                ref={menuButtonRef}
                type="button"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-green-600 lg:hidden",
                  c.ghost,
                )}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
              >
                <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden>
                  <path
                    d="M3 7h14M3 13h14"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop dropdown, anchored under the active trigger */}
          <AnimatePresence>
            {activeMega && (
              <motion.div
                key="panel"
                id={`${baseId}-panel`}
                ref={panelRef}
                role="region"
                aria-label={`${activeMega.label} menu`}
                data-menu={activeMega.id}
                className="absolute left-0 top-full hidden pt-2 lg:block"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: -4,
                        x: panelLeft,
                        width: panelWidth(activeMega.id),
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  x: panelLeft,
                  width: panelWidth(activeMega.id),
                }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                onMouseEnter={cancelClose}
                onBlur={(e) => {
                  const next = e.relatedTarget as Node | null;
                  if (next && !barRef.current?.contains(next)) {
                    setActiveMenu(null);
                  }
                }}
              >
                <div
                  className={cn(
                    "overflow-hidden rounded-xl border shadow-xl",
                    palette[tone].panel,
                  )}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={activeMega.id}
                      initial={reduceMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.12 }}
                    >
                      <DropdownContent
                        menu={activeMega}
                        tone={tone}
                        onNavigate={closeAll}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <MobileMenu
        open={mobileOpen}
        onClose={closeMobile}
        onNavigate={closeAll}
        tone={tone}
      />
    </header>
  );
}
