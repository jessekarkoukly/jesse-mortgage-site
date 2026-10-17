import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";

const PAGES_UPDATED = "2026-10-17";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jessekarkoukly.com";
  // Date the pages last changed. Update it when page content changes,
  // so search engines get a real freshness signal instead of the deploy date.
  const now = new Date(`${PAGES_UPDATED}T12:00:00-04:00`).toISOString();

  const mainPages = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/working-with-jesse`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/calculators`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly" as const, priority: 0.2 },
  ];

  const servicePages = [
    "first-time-buyers",
    "pre-approval",
    "renewal",
    "refinancing",
    "self-employed",
    "debt-consolidation",
    "cottage",
    "specialty",
    "equity-takeout",
  ].map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const calculatorPages = [
    "mortgage-payment",
    "affordability",
    "closing-costs",
    "land-transfer-tax",
    "prepayment-penalty",
    "required-income",
    "debt-service",
    "compare",
  ].map((slug) => ({
    url: `${baseUrl}/calculators/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const neighbourhoodPages = [
    "the-annex",
    "leslieville",
    "roncesvalles",
    "midtown",
    "the-junction",
    "riverdale",
    "the-danforth",
    "high-park",
    "cabbagetown",
    "trinity-bellwoods",
    "king-west",
    "liberty-village",
    "leaside",
  ].map((slug) => ({
    url: `${baseUrl}/neighbourhoods/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...mainPages,
    ...servicePages,
    ...calculatorPages,
    { url: `${baseUrl}/neighbourhoods`, changeFrequency: "monthly" as const, priority: 0.7 },
    ...neighbourhoodPages,
  ].map((page) => ({
    ...page,
    lastModified: now,
  })).concat(
    posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: new Date(`${post.updated}T12:00:00-04:00`).toISOString(),
    }))
  );
}
