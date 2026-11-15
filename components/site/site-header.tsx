"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { platformLinks, siteConfig } from "@/lib/site";
import { mainNav, type MegaMenu, type NavLink } from "@/lib/navigation";

/** Renders an internal link with next/link and anything else with <a>. */
function SmartLink({
  link,
  className,
  children,
  onClick,
  onMouseEnter,
}: {
  link: NavLink;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
}) {
  const props = { className, onClick, onMouseEnter };
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

function MegaMenuPanel({
  menu,
  onNavigate,
}: {
  menu: MegaMenu;
  onNavigate: () => void;
}) {
  const columnSpan = menu.columns.length === 1 ? "col-span-5" : "col-span-6";
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-3 border-r border-white/10 pr-8">
        <h3 className="mb-2 text-2xl font-bold">{menu.intro.title}</h3>
        <p className="mb-6 text-sm text-gray-400">{menu.intro.description}</p>
        <SmartLink
          link={menu.intro.cta}
          onClick={onNavigate}
          className="inline-flex items-center gap-2 rounded-lg border border-[#048304] px-4 py-2 text-sm font-medium text-[#17b317] transition-colors hover:bg-[#048304]/10"
        >
          {menu.intro.cta.label}
          <ArrowRight className="h-4 w-4" />
        </SmartLink>
      </div>

      <div
        className={cn(
          columnSpan,
          "grid gap-6",
          menu.columns.length > 1 && "grid-cols-2",
        )}
      >
        {menu.columns.map((column) => (
          <div key={column.title}>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              {column.title}
            </h4>
            <ul className="space-y-1">
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  <SmartLink
                    link={link}
                    onClick={onNavigate}
                    className="group/item flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-none"
                  >
                    {link.icon && (
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                          link.tone ?? "bg-white/5 text-gray-300",
                        )}
                      >
                        <link.icon className="h-4 w-4" />
                      </span>
                    )}
                    <span>
                      <span className="block text-sm font-medium text-white group-hover/item:text-green-400">
                        {link.label}
                      </span>
                      {link.description && (
                        <span className="block text-xs text-gray-400">
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
      </div>

      <div
        className={cn(
          "border-l border-white/10 pl-8",
          menu.columns.length === 1 ? "col-span-4" : "col-span-3",
        )}
      >
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          {menu.aside.title}
        </h4>
        {menu.aside.kind === "links" ? (
          <ul className="space-y-0.5">
            {menu.aside.links.map((link) => (
              <li key={link.href + link.label}>
                <SmartLink
                  link={link}
                  onClick={onNavigate}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-[#17b317]"
                >
                  {link.label}
                  {!link.href.startsWith("/") && (
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                  )}
                </SmartLink>
              </li>
            ))}
          </ul>
        ) : (
          <Link
            href={menu.aside.article.href}
            onClick={onNavigate}
            className="group/article block"
          >
            <div className="mb-3 aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-green-500/20 to-blue-500/20">
              <img
                src={menu.aside.article.image}
                alt=""
                className="h-full w-full object-cover opacity-80 transition-opacity group-hover/article:opacity-100"
              />
            </div>
            <h5 className="mb-1 font-semibold transition-colors group-hover/article:text-green-400">
              {menu.aside.article.title}
            </h5>
            <p className="mb-2 text-sm text-gray-400">
              {menu.aside.article.excerpt}
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-green-400">
              Read more <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeAll = useCallback(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  // Escape closes everything; lock page scroll while the mobile menu is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAll();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeAll]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onResize = () =>
      window.matchMedia("(min-width: 1024px)").matches && setMobileOpen(false);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen]);

  const openMenu = (id: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setActiveMenu(id);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setActiveMenu(null), 150);
  };

  const active = mainNav.find(
    (item) => item.type === "mega" && item.menu.id === activeMenu,
  );

  return (
    <header
      ref={headerRef}
      onMouseLeave={scheduleClose}
      className={cn(
        "fixed inset-x-0 top-0 z-50 text-white transition-[background-color,border-color,padding] duration-300",
        mobileOpen
          ? "border-b border-white/10 bg-black"
          : scrolled || activeMenu
            ? "border-b border-white/10 bg-black/90 backdrop-blur-xl"
            : "border-b border-white/5 bg-black/60 backdrop-blur-md",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:text-black"
      >
        Skip to content
      </a>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between gap-4 transition-[height] duration-300",
            scrolled ? "h-16" : "h-[72px] md:h-20",
          )}
        >
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            aria-label="Dijkstra home"
          >
            <img src="/icon.png" alt="" className="h-9 w-9 md:h-11 md:w-11" />
            <span className="text-lg font-bold md:text-xl">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) =>
              item.type === "mega" ? (
                <button
                  key={item.menu.id}
                  type="button"
                  aria-expanded={activeMenu === item.menu.id}
                  aria-controls="mega-menu"
                  onMouseEnter={() => openMenu(item.menu.id)}
                  onClick={() =>
                    setActiveMenu((current) =>
                      current === item.menu.id ? null : item.menu.id,
                    )
                  }
                  className={cn(
                    "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500",
                    activeMenu === item.menu.id
                      ? "text-white"
                      : "text-gray-300 hover:text-white",
                  )}
                >
                  {item.menu.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-300",
                      activeMenu === item.menu.id && "rotate-180",
                    )}
                  />
                </button>
              ) : (
                <SmartLink
                  key={item.link.href}
                  link={item.link}
                  onMouseEnter={scheduleClose}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                >
                  {item.link.label}
                </SmartLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <Button
              className="hidden h-9 border border-[#048304] bg-black px-3 text-[#17b317] hover:bg-neutral-900 lg:inline-flex"
              asChild
            >
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dijkstra on GitHub"
              >
                <IconBrandGithub className="h-5 w-5" />
              </a>
            </Button>
            <Button
              className="hidden h-9 border border-[#048304] bg-black px-4 text-[#17b317] hover:bg-neutral-900 lg:inline-flex"
              asChild
            >
              <a href={platformLinks.login}>Login</a>
            </Button>
            <Button
              className="hidden h-9 bg-green-700 px-4 text-white hover:bg-green-800 sm:inline-flex"
              asChild
            >
              <a href={platformLinks.onboarding}>Get Started</a>
            </Button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop mega menu */}
        <AnimatePresence initial={false}>
          {active && active.type === "mega" && (
            <motion.div
              id="mega-menu"
              key="mega"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="hidden overflow-hidden lg:block"
              onMouseEnter={() => openMenu(active.menu.id)}
            >
              <motion.div
                key={active.menu.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="pb-8 pt-4"
              >
                <MegaMenuPanel menu={active.menu} onNavigate={closeAll} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile / tablet menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={cn(
              // A solid, full-height layer under the header bar, so the page
              // never shows through while the menu is open.
              "fixed inset-x-0 bottom-0 overflow-y-auto overscroll-contain border-t border-white/10 bg-black lg:hidden",
              scrolled ? "top-16" : "top-[72px] md:top-20",
            )}
          >
            <div className="container mx-auto px-4 pb-10 pt-4 md:px-6">
              <ul className="divide-y divide-white/10">
                {mainNav.map((item) =>
                  item.type === "mega" ? (
                    <li key={item.menu.id} className="py-1">
                      <button
                        type="button"
                        aria-expanded={mobileSection === item.menu.id}
                        onClick={() =>
                          setMobileSection((s) =>
                            s === item.menu.id ? null : item.menu.id,
                          )
                        }
                        className="flex w-full items-center justify-between py-3 text-lg font-medium text-gray-200"
                      >
                        {item.menu.label}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-300",
                            mobileSection === item.menu.id && "rotate-180",
                          )}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileSection === item.menu.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="grid gap-x-6 gap-y-1 pb-4 sm:grid-cols-2">
                              {[
                                item.menu.intro.cta,
                                ...item.menu.columns.flatMap((c) => c.links),
                                ...(item.menu.aside.kind === "links"
                                  ? item.menu.aside.links
                                  : []),
                                ...(item.menu.aside.kind === "featured"
                                  ? [
                                      {
                                        label: item.menu.aside.article.title,
                                        href: item.menu.aside.article.href,
                                      },
                                    ]
                                  : []),
                              ].map((link) => (
                                <SmartLink
                                  key={link.href + link.label}
                                  link={link}
                                  onClick={closeAll}
                                  className="rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                                >
                                  {link.label}
                                </SmartLink>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  ) : (
                    <li key={item.link.href} className="py-1">
                      <SmartLink
                        link={item.link}
                        onClick={closeAll}
                        className="block py-3 text-lg font-medium text-gray-200 hover:text-white"
                      >
                        {item.link.label}
                      </SmartLink>
                    </li>
                  ),
                )}
              </ul>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="w-full border-[#048304] bg-transparent text-[#17b317] hover:bg-[#048304]/10 hover:text-[#17b317]"
                  asChild
                >
                  <a href={platformLinks.login}>Login</a>
                </Button>
                <Button
                  className="w-full bg-green-700 text-white hover:bg-green-800"
                  asChild
                >
                  <a href={platformLinks.onboarding}>Get Started</a>
                </Button>
              </div>
              <a
                href={siteConfig.links.github}
                className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white"
              >
                <IconBrandGithub className="h-4 w-4" /> Dijkstra on GitHub
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
