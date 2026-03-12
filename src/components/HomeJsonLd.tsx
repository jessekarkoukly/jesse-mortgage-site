export default function HomeJsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Jesse Karkoukly, Mortgage Agent",
    description:
      "Licensed Ontario mortgage agent with Sherwood Mortgage Group. Compare 50+ lenders and get a clear plan for your mortgage.",
    url: "https://jessekarkoukly.com",
    telephone: "+1-416-276-2666",
    email: "jkarkoukly@sherwoodmortgagegroup.com",
    image: "https://jessekarkoukly.com/og-image.jpg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "ON",
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
    sameAs: [
      "https://www.linkedin.com/in/jessekarkoukly",
      "https://medium.com/@jessekarkoukly",
    ],
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jesse Karkoukly",
    jobTitle: "Mortgage Agent",
    url: "https://jessekarkoukly.com",
    telephone: "+1-416-276-2666",
    email: "jkarkoukly@sherwoodmortgagegroup.com",
    image: "https://jessekarkoukly.com/og-image.jpg",
    worksFor: {
      "@type": "Organization",
      name: "Sherwood Mortgage Group",
      url: "https://sherwoodmortgagegroup.com",
    },
    memberOf: {
      "@type": "Organization",
      name: "Mortgage Architects Network",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    sameAs: [
      "https://www.linkedin.com/in/jessekarkoukly",
      "https://medium.com/@jessekarkoukly",
    ],
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
