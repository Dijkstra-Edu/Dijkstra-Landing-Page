import { NextResponse, type NextRequest } from "next/server";
import { contactSchema, contactTopics } from "@/lib/contact";

/**
 * POST /api/contact
 *
 * Delivers contact-form messages to CONTACT_WEBHOOK_URL â€” for example a
 * Discord channel webhook (https://discord.com/api/webhooks/â€¦). Any other URL
 * receives the validated message as JSON. Without a webhook the endpoint
 * answers 503 so the form can point people to Discord / LinkedIn instead.
 */
export const dynamic = "force-dynamic";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please try again in a minute." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the form.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }
  const { website, ...message } = parsed.data;
  // Bots fill the hidden field: pretend success, deliver nothing.
  if (website) return NextResponse.json({ ok: true });

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      { error: "The contact inbox is not connected yet.", fallback: true },
      { status: 503 },
    );
  }

  const topic =
    contactTopics.find((t) => t.value === message.topic)?.label ??
    message.topic;
  const isDiscord = /discord(app)?\.com\/api\/webhooks\//.test(webhook);
  const payload = isDiscord
    ? {
        username: "dijkstra.org.in",
        allowed_mentions: { parse: [] },
        content: [
          `**New message â€” ${topic}**`,
          `From: ${message.name} <${message.email}>`,
          "",
          message.message,
        ]
          .join("\n")
          .slice(0, 1990),
      }
    : { ...message, topicLabel: topic, receivedAt: new Date().toISOString() };

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (error) {
    console.error("[contact] delivery failed:", (error as Error).message);
    return NextResponse.json(
      { error: "We couldn't deliver your message right now.", fallback: true },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
