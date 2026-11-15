"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export type StreamingTextOptions = {
  /** Milliseconds between tokens. */
  interval?: number;
  /** Delay before the first token. */
  delay?: number;
  /** Start streaming only when true (e.g. when the element is visible). */
  active?: boolean;
};

/**
 * Reveals `text` token-by-token, mimicking an LLM streaming response.
 * Tokens are words (whitespace is kept attached to the following word), so
 * the output wraps naturally while it streams.
 *
 * Returns the visible text and whether the stream has finished.
 */
export function useStreamingText(
  text: string,
  { interval = 35, delay = 0, active = true }: StreamingTextOptions = {},
): { text: string; done: boolean } {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const tokens = text.match(/\s*\S+/g) ?? [];

  useEffect(() => {
    setCount(0);
    if (!active) return;
    if (reduceMotion) {
      setCount(tokens.length);
      return;
    }
    let timer: number | undefined;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        setCount((c) => {
          if (c + 1 >= tokens.length && timer) window.clearInterval(timer);
          return Math.min(c + 1, tokens.length);
        });
      }, interval);
    }, delay);
    return () => {
      window.clearTimeout(start);
      if (timer) window.clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, interval, delay, active, reduceMotion]);

  return {
    text: tokens.slice(0, count).join(""),
    done: count >= tokens.length,
  };
}
