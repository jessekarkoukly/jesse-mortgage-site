import type { Metadata } from "next";
import PlaybookContent from "@/components/landing/PlaybookContent";
import { getGoogleReviews } from "@/lib/googleReviews";

// The playbook itself, opened after the option C signup. Hidden from search.
export const metadata: Metadata = {
  title: "The Ontario First-Time Buyer Playbook, 2026 | Jesse Karkoukly",
  description: "What your first home really costs, the programs that stretch your savings, pre-approval, offer to keys, and the mistakes that cost money.",
  robots: { index: false, follow: false },
};

export default async function Page() {
  const google = await getGoogleReviews();
  return <PlaybookContent google={google} />;
}
