"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface ScrollingLogosProps {
  logos: string[]
  speed?: "slow" | "normal" | "fast"
  direction?: "left" | "right"
  className?: string
}

const ScrollingLogos: React.FC<ScrollingLogosProps> = ({ logos, speed = "slow", direction = "left", className }) => {
  const speedMap = {
    slow: "30s",
    normal: "20s",
    fast: "10s",
  }

  const animationDirection = direction === "left" ? "reverse" : "normal"

  return (
    <div className="relative" role="img" aria-label="Logos of companies where Dijkstra members have worked">
      <div
        className={cn("group flex overflow-hidden", className)}
        style={
          {
            "--duration": speedMap[speed],
          } as React.CSSProperties
        }
      >
        {/* Animated container with three sets of logos */}
        <div
          className="flex shrink-0 animate-marquee"
          style={{
            animationDirection: animationDirection,
            animationDuration: "var(--duration)",
          }}
        >
          {/* Generate three identical sets for seamless loop */}
          {[...Array(3)].map((_, setIndex) => (
            <div key={`set-${setIndex}`} className="flex shrink-0">
              {logos.map((src, idx) => (
                <div key={`${setIndex}-${idx}`} className="mx-5 flex items-center sm:mx-8">
                  <img
                    src={src || "/placeholder.svg"}
                    alt=""
                    className="h-10 w-auto filter grayscale hover:grayscale-0 transition duration-300 ease-in-out sm:h-14"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Gradient fade overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background to-transparent" />
    </div>
  )
}

export default ScrollingLogos
