"use client";

import { useEffect, useRef, useState } from "react";

export type HeaderTone = "dark" | "light";

/**
 * Scroll-driven state for the site header.
 *
 * - `atTop`: the page is (nearly) at the top â€” the header sits flush and
 *   transparent over the hero.
 * - `hidden`: the reader is scrolling down through content â€” the header
 *   slides away; any upward scroll brings it straight back.
 * - `tone`: the colour scheme of whatever is currently *under* the header,
 *   read from the nearest `[data-nav-tone]` ancestor at the header's
 *   position, so the bar stays legible over dark and light sections alike.
 *
 * Work is batched into one requestAnimationFrame per scroll burst.
 */
export function useHeaderState({
  fallbackTone = "dark",
  pinned = false,
  probeY = 32,
  routeKey,
}: {
  fallbackTone?: HeaderTone;
  /** Keep the header visible (e.g. while a menu is open). */
  pinned?: boolean;
  /** Y coordinate (px from the top of the viewport) used to read the tone. */
  probeY?: number;
  /** Changes on client-side navigation so the tone is re-read. */
  routeKey?: string;
}) {
  const [atTop, setAtTop] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [tone, setTone] = useState<HeaderTone>(fallbackTone);
  const lastY = useRef(0);
  const pinnedRef = useRef(pinned);
  pinnedRef.current = pinned;

  useEffect(() => {
    if (pinned) setHidden(false);
  }, [pinned]);

  useEffect(() => {
    let frame = 0;

    const readTone = () => {
      const x = Math.round(window.innerWidth / 2);
      const stack = document.elementsFromPoint(x, probeY);
      for (const el of stack) {
        if (el.closest("[data-site-header]")) continue;
        const owner = el.closest<HTMLElement>("[data-nav-tone]");
        if (owner) {
          const value = owner.dataset.navTone;
          setTone(value === "light" ? "light" : "dark");
          return;
        }
      }
      setTone(fallbackTone);
    };

    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY.current;
      setAtTop(y < 16);
      if (pinnedRef.current || y < 160) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }
      if (Math.abs(delta) > 6 || y < 160) lastY.current = y;
      readTone();
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [fallbackTone, probeY, routeKey]);

  return { atTop, hidden, tone, setHidden };
}
