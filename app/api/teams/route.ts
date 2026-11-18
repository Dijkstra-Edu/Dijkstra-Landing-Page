import { NextResponse } from "next/server";
import { getTeamsSnapshot } from "@/lib/teams";

/**
 * GET /api/teams
 *
 * The full Dijkstra team hierarchy (departments â†’ groups â†’ teams â†’ projects)
 * with direct members, live from the GitHub organisation when a token is
 * configured, otherwise from the bundled snapshot. `source` tells which.
 */
export const revalidate = 3600;

export async function GET() {
  const snapshot = await getTeamsSnapshot();
  return NextResponse.json(snapshot, {
    headers: {
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
    },
  });
}
