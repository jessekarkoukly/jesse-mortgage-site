// Sends a landing page lead to /api/leads (saved in Supabase `leads` and emailed to Jesse).

export type LeadInput = {
  name: string;
  email: string;
  phone?: string;
  inquiryType: string;
  /** Answers, one per line. Shown in Jesse's email. */
  message: string;
  /** Which page and form, for example "fthb_lp_plan". The page path is added. */
  source: string;
  /** Honeypot. People never fill it in. */
  website?: string;
};

export async function submitLead(i: LeadInput): Promise<boolean> {
  const [first, ...rest] = i.name.trim().split(/\s+/);
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: first ?? "",
        last_name: rest.join(" "),
        email: i.email.trim(),
        phone: (i.phone ?? "").trim(),
        inquiry_type: i.inquiryType,
        message: i.message,
        source: `${i.source} ${window.location.pathname}`,
        website: i.website ?? "",
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Name and email for the next page (thank-you greeting and Calendly prefill).
 * Kept in this browser tab only, never in the URL.
 */
export function rememberLead(name: string, email: string, from: string) {
  try { sessionStorage.setItem("jk_inquiry", JSON.stringify({ name: name.trim(), email: email.trim(), from })); } catch {}
}

export const isEmail = (v: string) => /\S+@\S+\.\S+/.test(v.trim());
