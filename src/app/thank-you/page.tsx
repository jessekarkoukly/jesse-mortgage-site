import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ThankYouContent from "./ThankYouContent";

export const metadata: Metadata = {
  title: "Thank you | Jesse Karkoukly",
  description: "Thanks for reaching out. Pick a time for your call with Jesse Karkoukly.",
  alternates: { canonical: "/thank-you" },
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <PageShell hideFloatingCTAs>
      <ThankYouContent />
    </PageShell>
  );
}
