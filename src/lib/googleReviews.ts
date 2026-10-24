// Google review count for Jesse's Business Profile.
// With GOOGLE_PLACES_API_KEY set in Vercel, the count and rating come live from Google
// (refreshed once a day). Without it, the last checked values below are used.
export type GoogleReviews = { count: number; rating: number };

// Checked on Google Maps, October 24, 2026: 19 reviews, all 5 stars.
export const GOOGLE_REVIEWS_FALLBACK: GoogleReviews = { count: 19, rating: 5 };

export async function getGoogleReviews(): Promise<GoogleReviews> {
  const key = (process.env.GOOGLE_PLACES_API_KEY ?? "").trim();
  if (!key) return GOOGLE_REVIEWS_FALLBACK;
  try {
    const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "places.displayName,places.rating,places.userRatingCount",
      },
      body: JSON.stringify({ textQuery: "Jesse Karkoukly Mortgage Agent, 390 Dupont St, Toronto" }),
      next: { revalidate: 86400 },
    });
    if (!res.ok) return GOOGLE_REVIEWS_FALLBACK;
    const data = (await res.json()) as { places?: { displayName?: { text?: string }; rating?: number; userRatingCount?: number }[] };
    const place = data.places?.find((p) => p.displayName?.text?.includes("Karkoukly"));
    if (!place?.userRatingCount || !place.rating) return GOOGLE_REVIEWS_FALLBACK;
    return { count: place.userRatingCount, rating: place.rating };
  } catch {
    return GOOGLE_REVIEWS_FALLBACK;
  }
}
