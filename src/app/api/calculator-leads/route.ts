import { supabaseServer } from "@/lib/supabaseServer";
import { NextRequest, NextResponse } from "next/server";

/*
  Supabase table SQL:

  create table calculator_leads (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default now(),
    report_name text,
    first_name text,
    last_name text,
    phone text,
    email text,
    calculator_type text,
    calculator_snapshot jsonb
  );
*/


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      report_name,
      first_name,
      last_name,
      phone,
      email,
      calculator_type,
      calculator_snapshot,
    } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const supabase = supabaseServer();
    if (!supabase) return NextResponse.json({ error: "Not configured" }, { status: 500 });

    const { error } = await supabase
      .from("calculator_leads")
      .insert([
        {
          report_name,
          first_name,
          last_name,
          phone: phone || null,
          email,
          calculator_type,
          calculator_snapshot: calculator_snapshot || null,
        },
      ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
    }

    console.log(`New calculator lead: ${first_name} ${last_name} <${email}> via ${calculator_type}`);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Calculator lead submission error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
