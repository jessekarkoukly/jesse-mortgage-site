import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      first_name,
      last_name,
      email,
      phone,
      inquiry_type,
      day_preferences,
      time_preference,
      contact_method,
      message,
      source,
    } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert lead into Supabase
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          first_name,
          last_name,
          email,
          phone: phone || null,
          inquiry_type,
          day_preferences: day_preferences || [],
          time_preference: time_preference || null,
          contact_method,
          message: message || null,
          source: source || "direct",
          status: "new",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
    }

    // Send notification email via Supabase Edge Function (or direct SMTP)
    // For now we log — wire email sending in Phase 2 via Supabase trigger or Resend
    console.log(`New lead: ${first_name} ${last_name} <${email}> via ${source}`);

    // Trigger notification email (non-blocking)
    void sendNotificationEmail({ first_name, last_name, email, inquiry_type, source });

    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch (err) {
    console.error("Lead submission error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function sendNotificationEmail({
  first_name,
  last_name,
  email,
  inquiry_type,
  source,
}: {
  first_name: string;
  last_name: string;
  email: string;
  inquiry_type: string;
  source: string;
}) {
  // If RESEND_API_KEY is set, send via Resend (recommended for production)
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;

  const subject = `New Lead: ${first_name} via ${source}`;
  const html = `
    <p><strong>New lead from jessekarkoukly.com</strong></p>
    <p><strong>Name:</strong> ${first_name} ${last_name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Inquiry type:</strong> ${inquiry_type}</p>
    <p><strong>Source:</strong> ${source}</p>
  `;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "notifications@jessekarkoukly.com",
        to: ["jkarkoukly@sherwoodmortgagegroup.com"],
        subject,
        html,
      }),
    });
  } catch (err) {
    console.error("Notification email failed:", err);
  }
}
