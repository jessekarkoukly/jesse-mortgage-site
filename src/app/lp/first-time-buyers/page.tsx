import type { Metadata } from "next";
import OptionPlan from "@/components/landing/options/OptionPlan";
import { getGoogleReviews } from "@/lib/googleReviews";

// Ad-only landing page (Meta and ChatGPT ads). Hidden from search.
// Shows option A until Jesse and Matt pick a winner from /lp/first-time-buyers/options.
export const metadata: Metadata = {
  title: "Your First Home Plan | Jesse Karkoukly",
  description: "Know your number before you fall for a home. What you can afford, your cash for closing day and every first-time buyer program, in writing.",
  robots: { index: false, follow: false },
};

export default async function Page() {
  const google = await getGoogleReviews();
  return <OptionPlan google={google} />;
}
