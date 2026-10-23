import { ogAlt, ogCard, ogSize } from "@/lib/og";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ headline: "Confident mortgage decisions start here." });
}
