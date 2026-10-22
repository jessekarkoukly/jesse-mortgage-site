import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client with the service role key.
 * The Vercel values carry stray whitespace and a trailing /rest/v1 on the URL,
 * so they are cleaned here (same as the analytics routes). Returns null if unset.
 */
export function supabaseServer(): SupabaseClient | null {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").replace(/\s/g, "").replace(/\/rest\/v1\/?$/, "");
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").replace(/\s/g, "");
  if (!url || !key) return null;
  return createClient(url, key);
}
