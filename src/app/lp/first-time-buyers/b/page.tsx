import type { Metadata } from "next";
import { LandingFrame } from "@/components/landing/kit";
import OptionNumber from "@/components/landing/options/OptionNumber";
import { getGoogleReviews } from "@/lib/googleReviews";

// Ad landing page, option B: savings calculator first. Hidden from search.
export const metadata: Metadata = {
  title: "See How Far Your Savings Go | Jesse Karkoukly",
  description: "Type in what you’ve saved and see the most home it covers in Ontario, after the down payment, land transfer tax and closing costs.",
  robots: { index: false, follow: false },
};

export default async function Page() {
  const google = await getGoogleReviews();
  return (
    <LandingFrame>
      <OptionNumber google={google} />
    </LandingFrame>
  );
}
