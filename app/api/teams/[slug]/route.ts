import { NextResponse, type NextRequest } from "next/server";
import { getTeamDetail, isValidLogin, isValidSlug } from "@/lib/teams";

/**
 * GET /api/teams/:slug[?member=<github-login>]
 *
 * Queries a single GitHub team (e.g. `team-data-engineering`): its direct
 * members and sub-teams. With `?member=`, also checks whether that GitHub
 * user belongs to the team (`state`: active | pending | none, or `unknown`
 * when no GitHub token is configured).
 */
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug.toLowerCase();
  if (!isValidSlug(slug)) {
    return NextResponse.json({ error: "Invalid team slug" }, { status: 400 });
  }
  const member = request.nextUrl.searchParams.get("member") ?? undefined;
  if (member !== undefined && !isValidLogin(member)) {
    return NextResponse.json(
      { error: "Invalid GitHub username" },
      { status: 400 },
    );
  }

  const detail = await getTeamDetail(slug, { member });
  if (!detail) {
    return NextResponse.json(
      { error: `Team "${slug}" not found` },
      { status: 404 },
    );
  }
  return NextResponse.json(detail, {
    headers: {
      // Membership answers must not be shared between visitors.
      "Cache-Control": member
        ? "private, no-store"
        : "public, s-maxage=300, stale-while-revalidate=3600",
    },
  });
}
