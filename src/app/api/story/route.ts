import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// "Tell me a little about your story" form on the homepage.
// Emails Jesse (reply-to is the visitor) and saves a row in the leads table.
// Succeeds if either the email or the save works, so a visitor's note is never lost to one outage.

const SITUATIONS = new Set([
  "planning a home purchase",
  "renewing my mortgage and want to see my options",
  "considering refinancing my existing mortgage",
  "just getting started",
]);

function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Honeypot: people never fill this in
  if (clean(body.website, 200)) return NextResponse.json({ success: true }, { status: 200 });

  const name = clean(body.name, 80);
  const email = clean(body.email, 200);
  const goal = clean(body.goal, 300);
  const situationRaw = clean(body.situation, 80);
  const situation = SITUATIONS.has(situationRaw) ? situationRaw : "just getting started";

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Name and a valid email are required" }, { status: 400 });
  }

  const story = `Hi Jesse, I'm ${name}. Right now I'm ${situation}, and over the next few months I want to ${goal || "(left blank)"}. You can reach me at ${email}.`;

  let saved = false;
  let emailed = false;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key) {
    try {
      const [first, ...rest] = name.split(" ");
      const { error } = await createClient(url, key)
        .from("leads")
        .insert([{
          first_name: first,
          last_name: rest.join(" ") || "",
          email,
          inquiry_type: situation,
          contact_method: "email",
          message: story,
          source: "homepage_story_form",
          status: "new",
          day_preferences: [],
        }]);
      if (error) console.error("Story form save failed:", error);
      else saved = true;
    } catch (err) {
      console.error("Story form save error:", err);
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "notifications@jessekarkoukly.com",
          to: ["jkarkoukly@sherwoodmortgagegroup.com"],
          reply_to: email,
          subject: `New Lead: ${name} via homepage story form`,
          html: `<p><strong>New note from jessekarkoukly.com</strong></p><p style="font-size:16px;line-height:1.6">${esc(story)}</p><p>Reply to this email to answer ${esc(name)} directly.</p>`,
        }),
      });
      emailed = res.ok;
      if (!res.ok) console.error("Story form email failed:", res.status, await res.text());
    } catch (err) {
      console.error("Story form email error:", err);
    }
  }

  if (!saved && !emailed) {
    return NextResponse.json({ error: "Could not send" }, { status: 502 });
  }
  return NextResponse.json({ success: true }, { status: 201 });
}
