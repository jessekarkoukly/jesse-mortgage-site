import type { NeighbourhoodData } from "./types";

export const theAnnex: NeighbourhoodData = {
  slug: "the-annex",
  name: "The Annex",

  metaTitle: "Buying in The Annex, Toronto | Mortgage Agent Jesse Karkoukly",
  metaDescription:
    "Thinking about buying in The Annex? Market data, property types, top streets, and mortgage guidance from a local agent who lives in the neighbourhood.",
  metaKeywords: [
    "The Annex Toronto",
    "buy home Annex Toronto",
    "Annex real estate",
    "mortgage agent Annex",
    "Toronto Annex property",
    "Annex neighbourhood guide",
  ],
  ogDescription:
    "Market data, property types, and mortgage guidance for buyers looking at The Annex. From a local agent who lives here.",

  eyebrow: "Toronto Neighbourhood Guide",
  headline: "Buying in The Annex",
  intro:
    "The Annex sits between Bloor and Dupont, Bathurst and Avenue. Victorian homes, tree-lined streets, and a walkability score that makes a car optional. This page covers the market, the property types, and what to think about before you make an offer.",

  quickFacts: [
    { label: "Walk Score", value: "95/100" },
    { label: "Transit Score", value: "93/100" },
    { label: "Vibe", value: "Established, walkable" },
    { label: "Housing", value: "Victorian, semis, condos" },
    { label: "Turnover", value: "Low" },
    { label: "Best For", value: "Professionals, families" },
  ],

  mapCenter: { lat: 43.6697, lng: -79.4043 },
  mapZoom: 15,

  marketDataUrl: "https://www.zolo.ca/toronto-real-estate/annex",

  jesseNote: {
    heading: "From a neighbour",
    body: "I live in The Annex. So when someone asks about a specific street or building, I usually have something useful to share. Not as a real estate expert, just as someone who has walked these blocks for years and pays attention. If you are looking at something in the area, happy to tell you what I know.",
  },

  vibe: {
    heading: "What The Annex feels like",
    paragraphs: [
      "One of the most walkable neighbourhoods in the city. Bloor Street runs along the south edge with restaurants, bookshops, and the Bloor subway line. Step one block north and you are on quiet residential streets with mature trees and century homes.",
      "It draws professors, professionals, and long-time residents who have been here for decades. The pace is calm but the location is central. You can walk to U of T, bike downtown in fifteen minutes, or take the subway anywhere.",
      "Turnover is low. People who buy in The Annex tend to stay.",
    ],
  },

  buyerProfiles: {
    heading: "Who buys here",
    profiles: [
      "Young professionals wanting walkability",
      "Growing families near top schools",
      "U of T faculty and hospital staff",
      "Downsizers staying central",
      "Multi-unit investors",
    ],
  },

  propertyTypes: {
    heading: "What you can buy",
    types: [
      {
        label: "Detached",
        priceRange: "$2M to $3.5M+",
        note: "Three-storey Victorians, many with original details. Some converted to duplexes or triplexes.",
      },
      {
        label: "Semi-Detached",
        priceRange: "$1.3M to $2M+",
        note: "More common on the east side near Avenue Road. Solid entry point into the neighbourhood.",
      },
      {
        label: "Condo",
        priceRange: "$500K to $900K",
        note: "Mostly along Bloor Street. Ranges from older boutique buildings to newer mid-rise developments.",
      },
    ],
  },

  topStreets: {
    heading: "Where buyers want to be",
    streets: [
      {
        name: "Howland Avenue",
        note: "High demand. Large restored Victorians on a wide, quiet street. Listings here move fast and often over asking.",
      },
      {
        name: "Brunswick Avenue",
        note: "Classic Annex. Consistent buyer interest for single-family homes. Some multi-unit conversions attract investors too.",
      },
      {
        name: "Admiral Road",
        note: "Premium pocket. Short block, grand homes, rarely available. When something lists here, people notice.",
      },
      {
        name: "Lowther Avenue",
        note: "Heritage homes with deep lots between Spadina and Walmer. Draws buyers willing to pay for the character.",
      },
      {
        name: "Dalton Road",
        note: "Quieter, closer to Dupont. Slightly more accessible price point. Good for buyers priced out of streets further south.",
      },
      {
        name: "Madison Avenue",
        note: "Popular with investors. Strong rental demand from U of T proximity. Multi-unit properties trade well here.",
      },
    ],
  },

  localLife: {
    heading: "Living in The Annex",
    categories: [
      {
        label: "Transit",
        items: [
          "Spadina, St. George, Bay subway stations",
          "Spadina streetcar to the waterfront",
          "Bike lanes on Bloor, Harbord, and Shaw",
          "15-minute bike to the Financial District",
        ],
      },
      {
        label: "Schools",
        items: [
          "Huron Street Junior Public School",
          "Jesse Ketchum Junior and Senior PS",
          "St. Thomas Aquinas Catholic School",
          "Near UTS, Branksome Hall, Bishop Strachan",
        ],
      },
      {
        label: "Food and drink",
        items: [
          "Bloor Street strip from Bathurst to Avenue",
          "Future Bistro, Playa Cabana, Paupers",
          "Korean restaurants on north Bloor",
          "Kensington Market, 10-minute walk south",
        ],
      },
      {
        label: "Green space",
        items: [
          "Taddle Creek Park",
          "Philosopher's Walk (U of T campus)",
          "Christie Pits Park (just west)",
          "Bickford Park",
        ],
      },
    ],
  },

  buyingConsiderations: {
    heading: "What to know before buying here",
    points: [
      {
        title: "Heritage designations",
        body: "Many Annex homes fall under heritage conservation, limiting exterior changes but protecting long-term property values. Check before making an offer if you have renovation plans.",
      },
      {
        title: "Multi-unit potential",
        body: "Larger Victorians may have legal secondary suites. Rental income from a basement or upper unit can significantly improve your mortgage qualification.",
      },
      {
        title: "Older homes mean older systems",
        body: "Furnaces, plumbing, knob-and-tube wiring, and foundations all factor into lender assessments and insurance. A thorough home inspection is not optional here.",
      },
      {
        title: "Low inventory, high demand",
        body: "The Annex does not see the same volume of listings as newer neighbourhoods. Well-priced homes move quickly. Pre-approval before you start looking is essential.",
      },
    ],
  },

  faq: [
    {
      q: "How much do I need for a down payment in The Annex?",
      a: "For homes under $500,000, the minimum is 5%. Between $500,000 and $1,499,999, it is 5% on the first $500K and 10% on the rest. At $1.5M and above, you need 20% down. Most Annex detached homes fall in the 20% category. Condos on Bloor may qualify for lower minimums.",
    },
    {
      q: "Can rental income from a basement suite help me qualify?",
      a: "Yes. Most lenders will count a portion of rental income toward your qualification. The unit typically needs to be legal and separately metered. Jesse can walk you through the specifics for the property you are looking at.",
    },
    {
      q: "Do heritage restrictions affect my mortgage approval?",
      a: "Not directly. Lenders care about condition and value. But if the home needs significant work and heritage limits what you can do, that can affect appraisal value. Worth discussing early.",
    },
    {
      q: "Is it better to buy a condo or freehold in The Annex?",
      a: "Depends on budget and timeline. Condos on Bloor get you into the neighbourhood at a lower price point. Freehold costs more but appreciates faster and gives you more flexibility. Both are solid holds here.",
    },
    {
      q: "How competitive is the market right now?",
      a: "Inventory is always limited because people tend to stay. Well-priced homes often get multiple offers. The best thing you can do is be prepared: pre-approval in hand, clear budget, and a plan for how you want to make your offer.",
    },
  ],
};
