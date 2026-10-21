// Profiles that confirm this is one person. Add the Google Business Profile
// share link here once Jesse sends it.
const SAME_AS = [
  "https://www.linkedin.com/in/jessekarkoukly",
  "https://www.instagram.com/jkarkoukly/",
  "https://www.mortgagearchitects.ca/jessekarkoukly",
  "https://medium.com/@jessekarkoukly",
  "https://share.google/pcVCw03qKeeffDScG",
];

export default function HomeJsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": "https://jessekarkoukly.com/#business",
    name: "Jesse Karkoukly, Mortgage Agent",
    description:
      "Licensed Ontario mortgage agent with Sherwood Mortgage Group. Compare 50+ lenders and get a clear plan for your mortgage.",
    url: "https://jessekarkoukly.com",
    telephone: "+1-416-276-2666",
    email: "jkarkoukly@sherwoodmortgagegroup.com",
    image: "https://jessekarkoukly.com/opengraph-image",
    address: {
      "@type": "PostalAddress",
      streetAddress: "390 Dupont St Ste 201",
      addressLocality: "Toronto",
      addressRegion: "ON",
      postalCode: "M5R 1V9",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.6697,
      longitude: -79.4043,
    },
    areaServed: {
      "@type": "State",
      name: "Ontario",
      sameAs: "https://en.wikipedia.org/wiki/Ontario",
    },
    priceRange: "Free consultation",
    sameAs: SAME_AS,
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://jessekarkoukly.com/#jesse",
    name: "Jesse Karkoukly",
    jobTitle: "Mortgage Agent",
    description:
      "Licensed Ontario mortgage agent (Lic. M25003068) with Sherwood Mortgage Group, Brokerage Lic. 12176. Works mostly with first-time buyers and self-employed borrowers in Toronto.",
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: "Mortgage Agent Level 1, Lic. M25003068",
      recognizedBy: {
        "@type": "Organization",
        name: "Financial Services Regulatory Authority of Ontario",
        url: "https://www.fsrao.ca",
      },
    },
    knowsAbout: [
      "First-time home buyer mortgages",
      "Self-employed mortgages",
      "Mortgage pre-approval",
      "Mortgage renewal and refinancing",
      "Toronto real estate",
    ],
    areaServed: { "@type": "City", name: "Toronto" },
    url: "https://jessekarkoukly.com",
    telephone: "+1-416-276-2666",
    email: "jkarkoukly@sherwoodmortgagegroup.com",
    image: "https://jessekarkoukly.com/opengraph-image",
    worksFor: {
      "@type": "Organization",
      name: "Sherwood Mortgage Group",
      url: "https://sherwoodmortgagegroup.com",
      identifier: "Brokerage Lic. 12176",
    },
    memberOf: {
      "@type": "Organization",
      name: "Mortgage Architects Network",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "390 Dupont St Ste 201",
      addressLocality: "Toronto",
      addressRegion: "ON",
      postalCode: "M5R 1V9",
      addressCountry: "CA",
    },
    sameAs: SAME_AS,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jesse Karkoukly | Toronto Mortgage Agent",
    url: "https://jessekarkoukly.com",
    description:
      "Compare 50+ lenders with a Toronto mortgage agent who gives you a clear plan in plain language.",
    publisher: {
      "@type": "Person",
      name: "Jesse Karkoukly",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
