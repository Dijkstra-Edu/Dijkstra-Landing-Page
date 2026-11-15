"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Animates a number from 0 to `target` once `active` becomes true.
 * Respects `prefers-reduced-motion` (jumps straight to the target).
 */
export function useCountUp(
  target: number,
  { duration = 1200, active = true, delay = 0 } = {},
): number {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    if (reduceMotion) {
      setValue(target);
      return;
    }
    let frame = 0;
    let start: number | null = null;
    const timeout = window.setTimeout(() => {
      const tick = (now: number) => {
        if (start === null) start = now;
        const progress = Math.min((now - start) / duration, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [target, duration, active, delay, reduceMotion]);

  return value;
}
