import type { Metadata } from "next";
import OptionChat from "@/components/landing/options/OptionChat";
import { getGoogleReviews } from "@/lib/googleReviews";

// Ad landing page, option D: the plan questions as a text conversation. Hidden from search.
export const metadata: Metadata = {
  title: "Your First Home Plan | Jesse Karkoukly",
  description: "Four quick questions, answered like a text. Then Jesse works out what you can afford, your cash for closing day and the programs you can use.",
  robots: { index: false, follow: false },
};

export default async function Page() {
  const google = await getGoogleReviews();
  return <OptionChat google={google} />;
}
