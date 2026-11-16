"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Drives a frame's little storyline: returns how many of the given time
 * marks (ms since mount) have passed. With reduced motion it jumps straight
 * to the final state.
 */
export function useTimeline(marks: number[]): number {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(reduceMotion ? marks.length : 0);

  useEffect(() => {
    if (reduceMotion) {
      setStep(marks.length);
      return;
    }
    const timers = marks.map((ms, i) =>
      window.setTimeout(() => setStep((s) => Math.max(s, i + 1)), ms),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
    // Marks are static per frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  return step;
}
