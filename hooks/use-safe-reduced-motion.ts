"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Like framer-motion's `useReducedMotion`, but always `false` during SSR and
 * the first client render. Use it whenever the value changes *markup*, so
 * that server and client render identical HTML (no hydration errors) and the
 * reduced-motion variant is applied right after mount.
 */
export function useSafeReducedMotion(): boolean {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? Boolean(prefersReduced) : false;
}
