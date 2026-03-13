import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Toronto Neighbourhood Guides | Mortgage Agent Jesse Karkoukly",
  description:
    "Neighbourhood-by-neighbourhood mortgage guidance for Toronto. Market data, property types, top streets, and what to know before buying in each area.",
  keywords: [
    "Toronto neighbourhoods",
    "Toronto neighbourhood guide",
    "buy home Toronto",
    "Toronto real estate neighbourhoods",
    "mortgage agent Toronto neighbourhoods",
  ],
  alternates: { canonical: "/neighbourhoods" },
  openGraph: {
    title: "Toronto Neighbourhood Guides | Jesse Karkoukly",
    description:
      "Market data, property types, and mortgage guidance for Toronto neighbourhoods from a local mortgage agent.",
    url: "https://jessekarkoukly.com/neighbourhoods",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

const NEIGHBOURHOODS = [
  {
    name: "The Annex",
    slug: "the-annex",
    tagline: "Victorian homes, walkability, and a pace that keeps people here for decades.",
    area: "Central",
  },
  {
    name: "Leslieville",
    slug: "leslieville",
    tagline: "East-end energy with young families, indie shops, and strong value for the price.",
    area: "East",
  },
  {
    name: "Roncesvalles",
    slug: "roncesvalles",
    tagline: "Village feel with park access, heritage homes, and a tight-knit community.",
    area: "West",
  },
  {
    name: "Midtown",
    slug: "midtown",
    tagline: "Yonge and Eglinton corridor. Condos, side-street bungalows, and future LRT access.",
    area: "Central",
  },
  {
    name: "The Junction",
    slug: "the-junction",
    tagline: "Creative energy on Dundas West with more accessible price points.",
    area: "West",
  },
  {
    name: "Riverdale",
    slug: "riverdale",
    tagline: "Skyline views, mature trees, and some of the strongest long-term holds in the east.",
    area: "East",
  },
  {
    name: "The Danforth",
    slug: "the-danforth",
    tagline: "Community-driven, family-friendly, and more accessible than its neighbours to the south.",
    area: "East",
  },
  {
    name: "High Park",
    slug: "high-park",
    tagline: "Toronto's biggest park at your doorstep. Families, trails, and Bloor West Village.",
    area: "West",
  },
  {
    name: "Cabbagetown",
    slug: "cabbagetown",
    tagline: "The largest collection of Victorian row homes in North America. Heritage on every block.",
    area: "Central",
  },
  {
    name: "Trinity Bellwoods",
    slug: "trinity-bellwoods",
    tagline: "Queen West culture, a park everyone knows, and some of the most competitive freehold in the city.",
    area: "Central",
  },
  {
    name: "King West",
    slug: "king-west",
    tagline: "Condos, restaurants, and a central location that draws young professionals.",
    area: "Central",
  },
  {
    name: "Liberty Village",
    slug: "liberty-village",
    tagline: "A strong entry point for first-time buyers who want to own downtown.",
    area: "Central",
  },
  {
    name: "Leaside",
    slug: "leaside",
    tagline: "Tree-lined streets, top-tier schools, and steady family-driven demand.",
    area: "East",
  },
];

export default function NeighbourhoodsPage() {
  return (
    <PageShell hideFloatingCTAs>
      <BreadcrumbJsonLd
        items={[{ name: "Neighbourhoods", href: "/neighbourhoods" }]}
      />

      {/* Hero */}
      <section className="bg-sand pt-28 pb-20 px-6 lg:pt-32 lg:pb-24">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-[0.75rem] font-semibold text-coral uppercase tracking-widest mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Toronto Neighbourhood Guides
          </p>
          <h1
            className="text-[2.25rem] sm:text-[3rem] font-bold text-navy leading-tight mb-6"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Know the neighbourhood before you buy
            <span className="text-coral">.</span>
          </h1>
          <p
            className="text-[1.0625rem] text-navy-2 leading-relaxed max-w-2xl"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Every Toronto neighbourhood has its own personality, price dynamics,
            and things you should know before making an offer. These guides cover
            the market, the streets, and the mortgage considerations that matter
            in each area.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {NEIGHBOURHOODS.map((n) => (
              <Link
                key={n.slug}
                href={`/neighbourhoods/${n.slug}`}
                className="border border-sand-2 rounded-xl p-6 hover:border-coral/40 hover:shadow-md transition-all block"
              >
                <span
                  className="inline-block text-[0.6875rem] font-bold uppercase tracking-widest text-slate bg-sand-2 px-2.5 py-1 rounded-full mb-3"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {n.area}
                </span>
                <h2
                  className="text-[1.25rem] font-bold text-navy mb-2 leading-snug"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  {n.name}
                </h2>
                <p
                  className="text-[0.9375rem] text-navy-2 leading-relaxed mb-4"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {n.tagline}
                </p>
                <span
                  className="inline-flex items-center gap-1.5 text-coral font-semibold text-[0.875rem]"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Read guide
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
