import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

function getSupabase() {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").replace(/[\s\n\r]/g, "").replace(/\/rest\/v1\/?$/, "");
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").replace(/[\s\n\r]/g, "");
  return createClient(url, key);
}

function getRangeStart(range: string): string | null {
  const now = new Date();
  if (range === "7d")  { now.setDate(now.getDate() - 7);  return now.toISOString(); }
  if (range === "30d") { now.setDate(now.getDate() - 30); return now.toISOString(); }
  if (range === "90d") { now.setDate(now.getDate() - 90); return now.toISOString(); }
  return null;
}

export async function GET(req: NextRequest) {
  const supabase = getSupabase();
  const range = req.nextUrl.searchParams.get("range") ?? "30d";
  const rangeStart = getRangeStart(range);

  // Newer columns (referrer, utm_source, landing_page) may not exist yet in
  // Supabase. Try the richest select first and step down so the dashboard
  // always loads.
  const PV_SELECTS = [
    "page, session_id, duration_seconds, device, created_at, referrer, utm_source, landing_page",
    "page, session_id, duration_seconds, device, created_at, referrer",
    "page, session_id, duration_seconds, device, created_at",
  ];
  const EV_SELECTS = ["page, event_name, created_at, session_id", "page, event_name, created_at"];

  async function firstWorking(table: string, selects: string[]) {
    let last: unknown = null;
    for (const cols of selects) {
      let q = supabase.from(table).select(cols).order("created_at", { ascending: false }).limit(20000);
      if (rangeStart) q = q.gte("created_at", rangeStart);
      const { data, error } = await q;
      if (!error) return { data: data ?? [], error: null };
      last = error;
    }
    return { data: [], error: last };
  }

  const [pv, ev] = await Promise.all([
    firstWorking("analytics_pageviews", PV_SELECTS),
    firstWorking("analytics_events", EV_SELECTS),
  ]);

  if (pv.error || ev.error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }

  const pageviews = pv.data;
  const events = ev.data;

  return NextResponse.json({ pageviews, events });
}
