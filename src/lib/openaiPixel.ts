// OpenAI pixel for Jesse's ChatGPT ads (added October 28, 2026).
// Leave the ID empty and the pixel does not load at all.
export const OPENAI_PIXEL_ID = "G3xh41Qnd6KnQg5ek2vYkk";
// Debug mode, as OpenAI supplied the snippet. Set to false once the campaign is verified.
export const OPENAI_PIXEL_DEBUG = true;

type Oaiq = (...args: unknown[]) => void;

function oaiq(): Oaiq | null {
  if (typeof window === "undefined" || !OPENAI_PIXEL_ID) return null;
  return (window as unknown as { oaiq?: Oaiq }).oaiq ?? null;
}

/** A conversion, for example "appointment_scheduled". */
export function openaiMeasure(event: string, params: Record<string, string> = { type: "customer_action" }) {
  try { oaiq()?.("measure", event, params); } catch {}
}
