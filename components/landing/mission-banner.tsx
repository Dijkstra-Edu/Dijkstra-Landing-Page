import { mulberry32 } from "@/lib/seeded-random";

const NUM_ROWS = 14;
const SEGMENTS_PER_ROW = 4;
const SAFE_ZONE_VERTICAL = [40, 60]; // % from top
const SAFE_ZONE_HORIZONTAL = [30, 70]; // % from left

type Segment = { top: number; left: number; width: number };

/**
 * Decorative line segments. A seeded PRNG keeps the output identical on the
 * server and the client (the previous `Math.random()` version caused React
 * hydration errors #418/#423 on every page load).
 */
function buildSegments(seed = 2025): Segment[] {
  const random = mulberry32(seed);
  const segments: Segment[] = [];
  for (let row = 0; row < NUM_ROWS; row++) {
    const top = (row / NUM_ROWS) * 100;
    for (let i = 0; i < SEGMENTS_PER_ROW; i++) {
      const width = 5 + random() * 15; // width between 5% and 20%
      const left = random() * (100 - width); // ensure it doesn't overflow
      const inVerticalSafeZone =
        top > SAFE_ZONE_VERTICAL[0] && top < SAFE_ZONE_VERTICAL[1];
      const inHorizontalSafeZone =
        left < SAFE_ZONE_HORIZONTAL[1] &&
        left + width > SAFE_ZONE_HORIZONTAL[0];
      if (inVerticalSafeZone && inHorizontalSafeZone) continue;
      segments.push({ top, left, width });
    }
  }
  return segments;
}

const segments = buildSegments();

export function MissionBanner() {
  return (
    <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-white">
      {/* Background Segments */}
      <div className="absolute inset-0 z-0">
        {segments.map((seg, i) => (
          <div
            key={i}
            className="absolute h-[2px] bg-gray-500/70 rounded-full"
            style={{
              top: `${seg.top}%`,
              left: `${seg.left}%`,
              width: `${seg.width}%`,
            }}
          />
        ))}
      </div>

      {/* Banner Text */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black mb-3 tracking-tight">
          For Students, By Students
        </h1>
        <p className="text-green-600 text-lg sm:text-xl md:text-2xl font-semibold tracking-wide">
          Dijkstra
        </p>
      </div>
    </section>
  );
}
