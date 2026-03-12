export interface NeighbourhoodData {
  slug: string;
  name: string;

  // SEO
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  ogDescription: string;

  // Hero
  eyebrow: string;
  headline: string;
  intro: string;

  // Quick facts (scannable chips under hero)
  quickFacts: { label: string; value: string }[];

  // Map
  mapCenter: { lat: number; lng: number };
  mapZoom?: number;

  // External market data (zero maintenance)
  marketDataUrl: string;

  // The vibe (keep it short)
  vibe: {
    heading: string;
    paragraphs: string[];
  };

  // Who buys here (displayed as chips)
  buyerProfiles: {
    heading: string;
    profiles: string[];
  };

  // Property types (visual cards with price ranges)
  propertyTypes: {
    heading: string;
    types: {
      label: string;
      priceRange: string;
      note: string;
    }[];
  };

  // Top streets or pockets
  topStreets?: {
    heading: string;
    streets: { name: string; note: string }[];
  };

  // Local life (amenities, transit, schools)
  localLife: {
    heading: string;
    categories: { label: string; items: string[] }[];
  };

  // What to know about buying here
  buyingConsiderations: {
    heading: string;
    points: { title: string; body: string }[];
  };

  // FAQ
  faq: { q: string; a: string }[];

  // Jesse's personal note (optional, primarily for The Annex)
  jesseNote?: {
    heading: string;
    body: string;
  };
}
