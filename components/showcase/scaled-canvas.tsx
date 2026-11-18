"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export type CanvasSize = {
  name: "desktop" | "tablet" | "phone";
  w: number;
  h: number;
};

/**
 * Design sizes the product is rendered at before being scaled to fit.
 * Desktop mirrors a 1760Ã—1000 browser viewport, tablet a ~1100px window
 * (sidebar visible, profile rail hidden) and phone a 430px-wide device.
 */
export const CANVAS_SIZES: CanvasSize[] = [
  { name: "phone", w: 430, h: 780 },
  { name: "tablet", w: 1100, h: 760 },
  { name: "desktop", w: 1760, h: 1000 },
];

const CanvasContext = createContext<CanvasSize>(CANVAS_SIZES[2]);

/** The design size the current frame is being rendered at. */
export function useCanvasSize(): CanvasSize {
  return useContext(CanvasContext);
}

export function pickCanvas(containerWidth: number): CanvasSize {
  if (containerWidth < 608) return CANVAS_SIZES[0];
  if (containerWidth < 960) return CANVAS_SIZES[1];
  return CANVAS_SIZES[2];
}

/**
 * Renders children at a fixed design size and scales the result to the
 * container's width (CSS transform), like a live, pixel-faithful screenshot.
 * The outer box reserves exactly the scaled height, so nothing shifts.
 */
export function ScaledCanvas({
  children,
  className,
}: {
  children: (size: CanvasSize) => React.ReactNode;
  className?: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const measure = () => setWidth(el.getBoundingClientRect().width);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const size = pickCanvas(width ?? 1200);
  const scale = width ? width / size.w : 0;

  return (
    <div
      ref={outerRef}
      className={className}
      style={{
        height: width ? size.h * scale : undefined,
        aspectRatio: width ? undefined : `${size.w} / ${size.h}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {width !== null && (
        <div
          data-canvas={size.name}
          style={{
            width: size.w,
            height: size.h,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "absolute",
            left: 0,
            top: 0,
          }}
        >
          <CanvasContext.Provider value={size}>
            {children(size)}
          </CanvasContext.Provider>
        </div>
      )}
    </div>
  );
}
