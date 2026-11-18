import LandingPage from "@/components/landing-page";
import { FromTheBlog } from "@/components/landing/from-the-blog";
import { getTeamsSnapshot } from "@/lib/teams";

// Re-generate the page at most once an hour so team membership stays fresh
// without calling GitHub on every request.
export const revalidate = 3600;

export default async function Home() {
  const teams = await getTeamsSnapshot();
  return <LandingPage teams={teams} blog={<FromTheBlog />} />;
}
