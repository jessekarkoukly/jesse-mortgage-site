import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const rawUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").replace(/\s/g, "").replace(/\/rest\/v1\/?$/, "");
const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").replace(/\s/g, "");
const supabase = createClient(rawUrl, serviceKey);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type } = body;

    if (type === "pageview") {
      const base = {
        page: body.page,
        referrer: body.referrer ?? null,
        device: body.device ?? null,
        session_id: body.session_id ?? null,
      };
      const withSource = {
        ...base,
        utm_source: body.utm_source ?? null,
        utm_medium: body.utm_medium ?? null,
        utm_campaign: body.utm_campaign ?? null,
        landing_page: body.landing_page ?? null,
      };

      // Try with the visit-source columns first. If they haven't been added
      // to the table yet, fall back to the original columns so no visit is lost.
      let result = await supabase.from("analytics_pageviews").insert(withSource).select("id").single();
      if (result.error) {
        result = await supabase.from("analytics_pageviews").insert(base).select("id").single();
      }

      if (result.error) throw result.error;
      return NextResponse.json({ id: result.data.id });
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
