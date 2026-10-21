import { ogAlt, ogCard, ogSize } from "@/lib/og";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ headline: "Helping people in Ontario make confident mortgage decisions." });
}
