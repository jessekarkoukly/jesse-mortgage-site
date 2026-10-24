import type { Metadata } from "next";
import HomePage from "./HomePage";
import { getGoogleReviews } from "@/lib/googleReviews";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Page() {
  const google = await getGoogleReviews();
  return <HomePage google={google} />;
}
