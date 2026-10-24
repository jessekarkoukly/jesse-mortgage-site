import type { Metadata } from "next";
import FirstTimeBuyerLanding from "@/components/landing/FirstTimeBuyerLanding";
import { getGoogleReviews } from "@/lib/googleReviews";

// Ad-only landing page (Meta and ChatGPT ads). Hidden from search.
export const metadata: Metadata = {
  title: "Your First Home Plan | Jesse Karkoukly",
  description: "Find out what you can afford, what closing day costs and every first-time buyer program you can use. Toronto mortgage agent Jesse Karkoukly.",
  robots: { index: false, follow: false },
};

export default async function Page() {
  const google = await getGoogleReviews();
  return (
    <FirstTimeBuyerLanding google={google} />
  );
}
