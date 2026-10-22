import { supabaseServer } from "@/lib/supabaseServer";
import { NextRequest, NextResponse } from "next/server";

const JESSE_EMAIL = "jkarkoukly@sherwoodmortgagegroup.com";

const esc = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const clean = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * Lead form endpoint (the "Schedule a call" inquiry form and the older booking form).
 * Saves the lead in Supabase `leads` and emails Jesse through Resend.
 * Succeeds if either works, so a lead is never lost to one service being down.
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Honeypot: people never fill this field in.
  if (clean(body.website)) return NextResponse.json({ success: true }, { status: 201 });

  const first_name = clean(body.first_name, 80);
  const last_name = clean(body.last_name, 80);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const inquiry_type = clean(body.inquiry_type, 120);
  const message = clean(body.message, 3000);
  const source = clean(body.source, 200) || "direct";
  const day_preferences = Array.isArray(body.day_preferences) ? body.day_preferences.map((d) => clean(d, 20)).slice(0, 7) : [];
  const time_preference = clean(body.time_preference, 40);
  const contact_method = clean(body.contact_method, 20);

  if (!/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  const [saved, emailed] = await Promise.all([
    saveLead({ first_name, last_name, email, phone, inquiry_type, message, source, day_preferences, time_preference, contact_method }),
    emailJesse({ first_name, last_name, email, phone, inquiry_type, message, source, day_preferences, time_preference, contact_method }),
  ]);

  if (!saved && !emailed) {
    return NextResponse.json({ error: "Could not send" }, { status: 502 });
  }
  return NextResponse.json({ success: true }, { status: 201 });
}

type Lead = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  inquiry_type: string;
  message: string;
  source: string;
  day_preferences: string[];
  time_preference: string;
  contact_method: string;
};

async function saveLead(lead: Lead) {
  const db = supabaseServer();
  if (!db) return false;
  try {
    const { error } = await db
      .from("leads")
      .insert([
        {
          ...lead,
          phone: lead.phone || null,
          message: lead.message || null,
          time_preference: lead.time_preference || null,
          contact_method: lead.contact_method || null,
          status: "new",
        },
      ]);
    if (error) {
      console.error("Lead save failed:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Lead save error:", err);
    return false;
  }
}

async function emailJesse(lead: Lead) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return false;

  const name = [lead.first_name, lead.last_name].filter(Boolean).join(" ") || "Someone";
  const rows: [string, string][] = [
    ["Name", name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Looking for help with", lead.inquiry_type],
    ["Message", lead.message],
    ["Preferred days", lead.day_preferences.join(", ")],
    ["Preferred time", lead.time_preference],
    ["Contact method", lead.contact_method],
    ["Came from", lead.source],
  ].filter(([, v]) => v) as [string, string][];

  const html = `<p><strong>New lead from jessekarkoukly.com</strong></p>${rows
    .map(([k, v]) => `<p><strong>${esc(k)}:</strong> ${esc(v).replace(/\n/g, "<br>")}</p>`)
    .join("")}<p>Reply to this email to reach ${esc(lead.first_name || "them")} directly.</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Jesse Karkoukly Website <notifications@jessekarkoukly.com>",
        to: [JESSE_EMAIL],
        reply_to: lead.email,
        subject: `New Lead: ${lead.first_name || name} via ${lead.source}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error("Lead email failed:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Lead email error:", err);
    return false;
  }
}
