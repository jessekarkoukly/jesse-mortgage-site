import type { Metadata } from "next";
import ConceptB from "@/components/home-concepts/ConceptB";
import { getGoogleReviews } from "@/lib/googleReviews";

export const metadata: Metadata = {
  title: "Concept B: Know your numbers | Homepage preview",
  robots: { index: false, follow: false },
};

export default async function Page() {
  const google = await getGoogleReviews();
  return <ConceptB google={google} />;
}
