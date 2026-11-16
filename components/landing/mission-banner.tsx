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
    <section
      data-nav-tone="light"
      className="relative flex h-[40vh] min-h-[260px] max-h-[440px] items-center justify-center overflow-hidden bg-white"
    >
      {/* Background Segments */}
      <div className="absolute inset-0 z-0">
        {segments.map((seg, i) => (
          <div
            key={i}
            className="absolute h-px rounded-full bg-neutral-300"
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
        {/* h2: the page already has its h1 in the hero. */}
        <h2 className="mb-3 bg-white px-2 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl md:text-6xl">
          For Students, By Students
        </h2>
        <p className="text-lg font-medium text-green-700 sm:text-xl md:text-2xl">
          Dijkstra
        </p>
      </div>
    </section>
  );
}
