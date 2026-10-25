import type { Metadata } from "next";
import OptionPlaybook from "@/components/landing/options/OptionPlaybook";
import { getGoogleReviews } from "@/lib/googleReviews";

// Ad landing page, option C: the Ontario First-Time Buyer Playbook. Hidden from search.
export const metadata: Metadata = {
  title: "The Ontario First-Time Buyer Playbook | Jesse Karkoukly",
  description: "Every cost, every program and every step from savings to keys, written for Ontario first-time buyers in 2026.",
  robots: { index: false, follow: false },
};

export default async function Page() {
  const google = await getGoogleReviews();
  return <OptionPlaybook google={google} />;
}
