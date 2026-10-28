import type { Metadata } from "next";
import ConceptA from "@/components/home-concepts/ConceptA";
import { getGoogleReviews } from "@/lib/googleReviews";

export const metadata: Metadata = {
  title: "Concept A: In your corner | Homepage preview",
  robots: { index: false, follow: false },
};

export default async function Page() {
  const google = await getGoogleReviews();
  return <ConceptA google={google} />;
}
