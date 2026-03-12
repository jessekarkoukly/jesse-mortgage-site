# Patterns & Conventions — jessekarkoukly.com

How things are built. Reference this before adding or modifying anything.

---

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| Navy | `#1E2D3D` | Headlines, nav, dark sections, footer |
| Navy-2 | `#2E4255` | Secondary text on dark backgrounds |
| Sand | `#F7F3EE` | Light section backgrounds |
| Sand-2 | `#EDE7DC` / `#EDE7DE` | Borders, dividers, compliance footer bg |
| Coral | `#E8705A` | CTAs, accents, the period in "Jesse." |
| Coral-dark | `#D05A45` | Hover state for coral buttons |
| Slate | `#8A9BAA` | Muted text, labels |

## Fonts

- **Spectral 700/800** — Headlines, logo, large numbers
- **Spectral 400** — "Karkoukly" in logo
- **Plus Jakarta Sans 400/600/700** — Body, UI, buttons, labels

Applied via inline `style={{ fontFamily: "var(--font-spectral)" }}` or `var(--font-jakarta)`.

---

## Component Patterns

### Page Structure
Every page uses `PageShell` which provides:
- `Nav` (fixed top, white bg, shadow on scroll)
- `SherwoodFooter` (compliance)
- `JesseFooter` (disclaimer)
- `BookingModal` (triggered by custom event)
- `StickyMobileCTA` (appears after 400px scroll)

### Service Page TOC (FTHB/Pre-Approval pattern — use everywhere)
```
<section className="bg-white py-16 px-6">
  <div className="max-w-7xl mx-auto grid lg:grid-cols-[220px_1fr] gap-12">
    <nav className="hidden lg:block">
      <div className="sticky top-[84px] border-r border-sand-2 pr-6">
        <p className="text-[0.6875rem] font-bold text-slate uppercase tracking-widest mb-4">
          On This Page
        </p>
        <!-- TOC links with scroll-spy -->
      </div>
    </nav>
    <div className="max-w-3xl">
      <!-- Content sections as divs -->
    </div>
  </div>
</section>
```

TOC active state: `text-coral font-semibold bg-coral/5 border-l-2 border-coral`
TOC inactive: `text-navy-2 hover:text-coral border-l-2 border-transparent`
TOC text size: `text-[0.875rem]`
Label size: `text-[0.6875rem]`

### Content Section Pattern (inside TOC grid)
```
<div id="section-id" className="scroll-mt-24 mb-16 pb-16 border-b border-sand-2">
  <!-- Last section omits border-b -->
</div>
```

### Trust Chips (in hero, after CTA button)
```
<div className="flex flex-wrap gap-5 justify-center mt-6">
  {["chip1", "chip2", "chip3"].map((chip) => (
    <span key={chip} className="flex items-center gap-2 text-[0.8125rem] font-medium text-sand">
      <span className="w-2 h-2 rounded-full bg-coral shrink-0" />
      {chip}
    </span>
  ))}
</div>
```

Universal chips: "No cost to you", "50+ lenders compared"
Third chip varies by page (see SITE-MAP.md).

### Hero Pattern (service pages)
Navy bg, centered text:
- Eyebrow: `text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-coral`
- H1: `text-[2rem] md:text-[2.75rem] font-bold` (Spectral)
- Subhead: `text-sand/80 text-[1.0625rem] md:text-[1.125rem]` (Jakarta)
- CTA: `bg-coral text-white font-semibold px-8 py-3.5 rounded-lg`
- Trust chips below

### FAQ Accordion
```
<div className="bg-sand rounded-lg overflow-hidden">
  <button> <!-- question --> </button>
  <div style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
    <!-- answer -->
  </div>
</div>
```

### BookingModal Trigger
```tsx
window.dispatchEvent(new CustomEvent("open-booking-modal"));
```

### Scroll Spy (IntersectionObserver)
```tsx
const observer = new IntersectionObserver(
  (entries) => { /* track visible sections */ },
  { rootMargin: "-20% 0px -70% 0px" }
);
```

---

## Neighbourhood Data Pattern

Each neighbourhood has a data file exporting `NeighbourhoodData`:
- slug, name, SEO fields (metaTitle, metaDescription, metaKeywords, ogDescription)
- eyebrow, headline, intro
- quickFacts (6 chips: Walk Score, Transit Score, Vibe, Housing, Turnover/Growth/Entry Point/Inventory, Best For)
- mapCenter + mapZoom (Google Maps embed)
- marketDataUrl (Zolo link-out)
- vibe (heading + paragraphs)
- buyerProfiles (heading + string array as chips)
- propertyTypes (heading + cards with label, priceRange, note)
- topStreets (heading: "Where buyers want to be" + demand-focused notes)
- localLife (heading + categories: Transit, Schools, Food/drink, Green space)
- buyingConsiderations (heading + point cards)
- faq (Q&A array)
- jesseNote (optional, Annex only)

---

## CTA Labels

| Page | Label |
|---|---|
| Homepage / default | Book a Call |
| First-Time Buyers | Book an Intro Call |
| Pre-Approval | Book a Pre-Approval Call |
| Renewal mid-page | Explore Renewal Options |
| All others | Book a Call |

Nav CTA is always "Book a Call" with navy bg, white text.
Coral is for page-level CTAs only.

---

## SEO Pattern (every page)

1. Metadata export with title, description, keywords, openGraph, canonical
2. JSON-LD schemas: FAQPage (if FAQ exists), LocalBusiness, Service (if service page)
3. BreadcrumbJsonLd component
4. Proper heading hierarchy (single H1, H2s for sections)

---

## Writing Rules

- No em dashes anywhere
- Always "home" never "house"
- Jesse is singular, never "we/our/us"
- One idea per paragraph, three sentences max
- No salesy negations: "no obligation", "no commitment", "no spam"
- Voice: knowledgeable friend, warm and direct

---

## Canadian Mortgage Formula

Always use this. Never `annualRate / 12`:
```typescript
const ear = Math.pow(1 + annualRate / 2, 2) - 1;
const periodicRate = Math.pow(1 + ear, 1 / paymentsPerYear) - 1;
```
