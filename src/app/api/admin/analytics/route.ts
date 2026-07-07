import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim(),
  (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim()
);

function getRangeStart(range: string): string | null {
  const now = new Date();
  if (range === "7d")  { now.setDate(now.getDate() - 7);  return now.toISOString(); }
  if (range === "30d") { now.setDate(now.getDate() - 30); return now.toISOString(); }
  if (range === "90d") { now.setDate(now.getDate() - 90); return now.toISOString(); }
  return null;
}

export async function GET(req: NextRequest) {
  const range = req.nextUrl.searchParams.get("range") ?? "30d";
  const rangeStart = getRangeStart(range);

  let pvQuery = supabase
    .from("analytics_pageviews")
    .select("page, session_id, duration_seconds, device, created_at")
    .order("created_at", { ascending: false });

  let evQuery = supabase
    .from("analytics_events")
    .select("page, event_name, created_at")
    .order("created_at", { ascending: false });

  if (rangeStart) {
    pvQuery = pvQuery.gte("created_at", rangeStart);
    evQuery = evQuery.gte("created_at", rangeStart);
  }

  const [{ data: pageviews, error: pvErr }, { data: events, error: evErr }] =
    await Promise.all([pvQuery, evQuery]);

  if (pvErr || evErr) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }

  return NextResponse.json({ pageviews: pageviews ?? [], events: events ?? [] });
}
