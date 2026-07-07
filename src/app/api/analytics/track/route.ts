import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type } = body;

    if (type === "pageview") {
      const { data, error } = await supabase
        .from("analytics_pageviews")
        .insert({
          page: body.page,
          referrer: body.referrer ?? null,
          device: body.device ?? null,
          session_id: body.session_id ?? null,
        })
        .select("id")
        .single();

      if (error) throw error;
      return NextResponse.json({ id: data.id });
    }

    if (type === "duration") {
      if (body.id && body.duration_seconds > 0) {
        await supabase
          .from("analytics_pageviews")
          .update({ duration_seconds: body.duration_seconds })
          .eq("id", body.id);
      }
      return NextResponse.json({ ok: true });
    }

    if (type === "event") {
      await supabase.from("analytics_events").insert({
        page: body.page,
        event_name: body.event_name,
        session_id: body.session_id ?? null,
      });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch {
    // Fail silently — analytics should never break the site
    return NextResponse.json({ ok: true });
  }
}
