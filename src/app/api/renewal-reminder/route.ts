import { supabaseServer } from "@/lib/supabaseServer";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const { email, renewal_date } = await req.json();

    if (!email || !renewal_date) {
      return NextResponse.json(
        { error: "Email and renewal date are required" },
        { status: 400 }
      );
    }

    const supabase = supabaseServer();
    if (!supabase) return NextResponse.json({ error: "Not configured" }, { status: 500 });

    const { error } = await supabase
      .from("renewal_reminders")
      .upsert(
        {
          email,
          renewal_date,
          created_at: new Date().toISOString(),
        },
        { onConflict: "email" }
      );

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to save reminder" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Renewal reminder error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
