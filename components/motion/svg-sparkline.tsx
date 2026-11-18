"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Lightweight SVG sparkline with a draw-in animation. Used where pulling in
 * a full chart library would bloat the page bundle.
 */
export function SvgSparkline({
  values,
  color = "#22c55e",
  className,
}: {
  values: number[];
  color?: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const gradientId = `spark-${useId().replace(/:/g, "")}`;
  const width = 100;
  const height = 30;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - ((v - min) / (max - min || 1)) * (height - 2) - 1;
    return [x, y] as const;
  });
  const line = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;

  const clipId = `${gradientId}-clip`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.35} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
        {/* Reveal left-to-right with a clip rect: unlike animating
            pathLength, this keeps non-scaling strokes gap-free. */}
        <clipPath id={clipId}>
          <motion.rect
            x={0}
            y={0}
            height={height}
            initial={{ width: reduceMotion ? width : 0 }}
            animate={{ width }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <path d={area} fill={`url(#${gradientId})`} />
        <path
          d={line}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  );
}
