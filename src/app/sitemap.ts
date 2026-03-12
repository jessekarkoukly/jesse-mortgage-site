import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jessekarkoukly.com";
  const now = new Date().toISOString();

  const mainPages = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly" as const, priority: 0.8 },
{ url: `${baseUrl}/process`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/working-with-jesse`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/rates`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/calculators`, changeFrequency: "monthly" as const, priority: 0.7 },
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
  }));
}
