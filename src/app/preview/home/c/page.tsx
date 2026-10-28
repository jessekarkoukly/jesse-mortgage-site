import type { Metadata } from "next";
import ConceptC from "@/components/home-concepts/ConceptC";
import { getGoogleReviews } from "@/lib/googleReviews";

export const metadata: Metadata = {
  title: "Concept C: Start here | Homepage preview",
  robots: { index: false, follow: false },
};

export default async function Page() {
  const google = await getGoogleReviews();
  return <ConceptC google={google} />;
}
