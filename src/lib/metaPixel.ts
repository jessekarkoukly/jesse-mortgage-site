// Meta (Facebook and Instagram) pixel for Matt Evanoff's ad campaigns.
// Leave the ID empty and the pixel does not load at all.
export const META_PIXEL_ID = "2288575438605105";

type Fbq = (...args: unknown[]) => void;

function fbq(): Fbq | null {
  if (typeof window === "undefined" || !META_PIXEL_ID) return null;
  return (window as unknown as { fbq?: Fbq }).fbq ?? null;
}

/** Standard Meta events, for example "Lead" or "PageView". */
export function metaTrack(event: string, params?: Record<string, string>) {
  try { fbq()?.("track", event, params); } catch {}
}

/** Custom events, for example "FormStart". */
export function metaCustom(event: string, params?: Record<string, string>) {
  try { fbq()?.("trackCustom", event, params); } catch {}
}
