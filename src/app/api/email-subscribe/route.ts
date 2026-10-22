import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Server key: the email_subscribers table is closed to the public.
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: Request) {
  try {
    const { email, source } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("email_subscribers")
      .upsert(
        { email: email.toLowerCase().trim(), source: source || "homepage", created_at: new Date().toISOString() },
        { onConflict: "email" }
      );

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Email subscribe error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
