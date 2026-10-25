import type { Metadata } from "next";
import OptionPlan from "@/components/landing/options/OptionPlan";
import { getGoogleReviews } from "@/lib/googleReviews";

// Ad landing page, option A: the First Home Plan (long-form). Hidden from search.
export const metadata: Metadata = {
  title: "Your First Home Plan | Jesse Karkoukly",
  description: "Know your number before you fall for a home. What you can afford, your cash for closing day and every first-time buyer program, in writing.",
  robots: { index: false, follow: false },
};

export default async function Page() {
  const google = await getGoogleReviews();
  return <OptionPlan google={google} />;
}
