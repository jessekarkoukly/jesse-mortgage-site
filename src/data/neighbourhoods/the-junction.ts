import type { NeighbourhoodData } from "./types";

export const theJunction: NeighbourhoodData = {
  slug: "the-junction",
  name: "The Junction",

  metaTitle:
    "Buying in The Junction, Toronto | Mortgage Agent Jesse Karkoukly",
  metaDescription:
    "Considering buying in The Junction? Property types, pricing, top streets, and mortgage guidance for this west end neighbourhood from a Toronto mortgage agent.",
  metaKeywords: [
    "The Junction Toronto",
    "buy home Junction Toronto",
    "Junction real estate",
    "mortgage agent Junction",
    "Toronto Junction property",
    "Junction neighbourhood guide",
  ],
  ogDescription:
    "Property types, top streets, and mortgage guidance for buyers looking at The Junction in Toronto's west end.",

  quickFacts: [
    { label: "Walk Score", value: "88/100" },
    { label: "Transit Score", value: "80/100" },
    { label: "Vibe", value: "Creative, independent" },
    { label: "Housing", value: "Semis, row homes, condos" },
    { label: "Inventory", value: "Competitive" },
    { label: "Best For", value: "First-time buyers, young families" },
  ],

  mapCenter: { lat: 43.6652, lng: -79.4672 },
  mapZoom: 15,

  marketDataUrl: "https://www.zolo.ca/toronto-real-estate/the-junction",

  eyebrow: "Toronto Neighbourhood Guide",
  headline: "Buying in The Junction",
  intro:
    "The Junction sits along the Dundas West corridor, west of Keele Street. It was a dry neighbourhood until 1998 and has changed dramatically since. Today it is one of Toronto's most active west end markets, with craft breweries, independent shops, and a steady stream of young buyers competing for limited freehold stock. This page covers what is available, what it costs, and what to plan for.",

  vibe: {
    heading: "What The Junction feels like",
    paragraphs: [
      "Dundas West through The Junction has a creative energy to it. Vintage shops, art galleries, craft breweries, and small restaurants line the strip. It is not polished in the way that some neighbourhoods are, and that is part of the appeal. The storefronts change, but the character stays.",
      "The community is a mix of young professionals, families who moved west for more space, and long-time residents who remember when this area looked very different. Weekend mornings bring people to the cafes and the farmers market. It is active without being overwhelming.",
      "Transit access is a real selling point. The UP Express at Bloor-Dundas West station connects to Pearson Airport in 25 minutes. The Dundas streetcar and Bloor subway line are both within reach. You can get downtown without a car, easily.",
    ],
  },

  buyerProfiles: {
    heading: "Who buys here",
    profiles: [
      "Young professionals priced out of High Park and Roncesvalles",
      "First-time buyers looking for freehold under $1.3M",
      "Creatives and entrepreneurs drawn to the neighbourhood's independent spirit",
      "Growing families who want walkable streets and good schools",
      "Investors targeting newer condo developments with rental upside",
    ],
  },

  propertyTypes: {
    heading: "What you can buy",
    types: [
      {
        label: "Semi-Detached",
        priceRange: "$900K to $1.3M",
        note: "Early 1900s homes on narrow lots (14 to 17 feet). Renovation levels vary from original to fully modernized.",
      },
      {
        label: "Row Home",
        priceRange: "$850K to $1.2M",
        note: "Two-storey freehold row homes throughout the neighbourhood. Treated as freehold by most lenders.",
      },
      {
        label: "Condo",
        priceRange: "$500K to $750K",
        note: "Newer developments along Dundas and Keele. Modern units in walkable locations, popular with younger buyers and investors.",
      },
      {
        label: "Detached",
        priceRange: "$1.3M to $1.8M",
        note: "Uncommon and command a premium. Wider lots, mostly near Indian Road and the eastern edge of the neighbourhood.",
      },
    ],
  },

  topStreets: {
    heading: "Where buyers want to be",
    streets: [
      {
        name: "Pacific Avenue",
        note: "Wider lots and established homes make this one of the most competitive streets in The Junction. Listings draw fast offers.",
      },
      {
        name: "Indian Road",
        note: "High Park proximity drives premium pricing. Buyers willing to pay more for park access compete heavily here.",
      },
      {
        name: "Laws Street",
        note: "Attracts buyers looking for a quieter block at a lower price point. Growing demand as the main strip continues to develop.",
      },
      {
        name: "Keele Street",
        note: "Newer condo and townhome developments bring first-time buyers and investors. Entry-level pricing for the neighbourhood.",
      },
      {
        name: "Annette Street",
        note: "Buyers who want proximity to the Dundas strip without the noise look here first. Demand has been climbing steadily.",
      },
    ],
  },

  localLife: {
    heading: "Living in The Junction",
    categories: [
      {
        label: "Transit",
        items: [
          "Dundas West station (Bloor-Danforth line, UP Express to Pearson)",
          "Keele station (Bloor-Danforth line)",
          "Dundas streetcar (505) along the main strip",
          "Bike lanes connecting west to the Humber Trail",
        ],
      },
      {
        label: "Schools",
        items: [
          "Annette Street Junior and Senior Public School",
          "Indian Road Crescent Junior Public School",
          "Western Technical-Commercial School",
          "St. Cecilia Catholic School",
        ],
      },
      {
        label: "Food and drink",
        items: [
          "Craft breweries: Indie Alehouse, Shacklands, Rainhard",
          "Dundas West strip: Playa Cabana Cantina, Hole in the Wall",
          "Saturday morning farmers market at the Junction",
          "Independent coffee shops and bakeries throughout",
        ],
      },
      {
        label: "Green space",
        items: [
          "High Park (eastern edge of the neighbourhood)",
          "Heintzman Park",
          "Baird Park",
          "Humber River Trail accessible by bike",
        ],
      },
    ],
  },

  buyingConsiderations: {
    heading: "What to know before buying here",
    points: [
      {
        title: "More affordable than neighbouring areas, for now",
        body: "The Junction still offers lower prices than High Park, Roncesvalles, and Bloor West Village. That price gap has been shrinking year over year as the neighbourhood continues to attract investment and new development. Buying now positions you ahead of that curve.",
      },
      {
        title: "Narrow lots mean creative layouts",
        body: "Many homes here sit on 14 to 17 foot lots. That is tight by any measure. Renovated homes often make good use of the space, but check ceiling heights, room sizes, and natural light carefully. What looks great in photos can feel different in person.",
      },
      {
        title: "Transit is a genuine advantage",
        body: "Access to the UP Express at Dundas West station is a unique selling point for this neighbourhood. If you or your partner travel frequently, the direct Pearson connection is a practical benefit that very few Toronto neighbourhoods offer. Lenders do not factor this in, but it supports long-term property values.",
      },
      {
        title: "Older homes need careful budgeting",
        body: "Budget for post-purchase upgrades. Many homes in The Junction are over a century old, and even renovated ones can have older systems behind the walls. Get a thorough inspection, factor maintenance into your carrying costs, and make sure your mortgage leaves room for the unexpected.",
      },
    ],
  },

  faq: [
    {
      q: "How much do I need for a down payment in The Junction?",
      a: "Most freehold homes sell between $900K and $1.4M. For anything under $1.5M, the minimum down payment is 5% on the first $500K and 10% on the remainder. On a $1.1M home, that works out to roughly $85,000. Condos in the area can require as little as 5% down if they are priced under $500K.",
    },
    {
      q: "Is The Junction a good area for first-time buyers?",
      a: "Yes, particularly compared to other west end neighbourhoods like Roncesvalles or High Park where freehold prices are higher. First-time buyers may also qualify for the First Home Savings Account or the Home Buyers' Plan. Jesse can walk you through all the programs available and how they affect your purchasing power.",
    },
    {
      q: "How does the UP Express affect property values?",
      a: "Transit access generally supports long-term property values, and the UP Express connection at Dundas West is a feature very few neighbourhoods in Toronto offer. It has contributed to the area's growth over the past several years. For buyers who travel for work, it is a practical advantage worth factoring in.",
    },
    {
      q: "Should I worry about ongoing development in the area?",
      a: "Several new condo and mixed-use projects are in various stages along Dundas and Keele. Development brings change, but it also brings amenities, transit improvements, and demand. If you are buying freehold, nearby development tends to support your property value over time.",
    },
    {
      q: "Can I get a mortgage on a row home?",
      a: "Absolutely. Row homes are treated as freehold by most lenders, similar to semi-detached properties. Some older row homes may require specific insurance or inspection conditions, but financing is straightforward in most cases. Jesse can confirm what your lender will need based on the specific property.",
    },
  ],

};
