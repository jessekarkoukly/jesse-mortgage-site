const LENDERS = [
  { name: "Mortgage Architects", logo: "/logos/Mortgage-Architects.webp" },
  { name: "Merix Financial", logo: "/logos/Merix.webp" },
  { name: "First National", logo: "/logos/First-National-Logo.webp" },
  { name: "MCAP", logo: "/logos/MCAP-logo.webp" },
  { name: "RMG Mortgages", logo: "/logos/RMG-logo.webp" },
  { name: "Strive", logo: "/logos/Strive-logo.webp" },
  { name: "Equitable Bank", logo: "/logos/Equitable-logo.webp" },
  { name: "HomeEquity Bank", logo: "/logos/HEB-CHIP-logo.webp" },
  { name: "CWB Optimum", logo: "/logos/CWB-Optimum-logo.webp" },
  { name: "Radius Financial", logo: "/logos/Radius-logo.webp" },
  { name: "TD", logo: "/logos/TD-logo.webp" },
  { name: "Scotiabank", logo: "/logos/Scotiabank.webp" },
  { name: "CMLS Financial", logo: "/logos/CMLS-Logo.webp" },
  { name: "Haventree Bank", logo: "/logos/HavenTree-Logo.webp" },
  { name: "CMHC", logo: "/logos/CMHC-SCHL-Logo.webp" },
  { name: "Home Trust", logo: "/logos/Home-Trust-logo.webp" },
  { name: "B2B Bank", logo: "/logos/B2B-Logo.webp" },
  { name: "DUCA", logo: "/logos/Duca-logo.webp" },
  { name: "RFA", logo: "/logos/RFA.webp" },
  { name: "Manulife", logo: "/logos/ManuLife.webp" },
  { name: "Sagen", logo: "/logos/Sagen.webp" },
  { name: "Canada Guaranty", logo: "/logos/Canada-Guaranty.webp" },
  { name: "Blueprint", logo: "/logos/Blueprint-logo.webp" },
];

export default function LenderTicker() {
  const doubled = [...LENDERS, ...LENDERS];

  return (
    <div className="bg-white border-y border-sand-2 py-6 sm:py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4 sm:gap-8">
        {/* Fixed label */}
        <p
          className="hidden sm:block shrink-0 text-[0.875rem] font-semibold text-slate uppercase tracking-widest"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Lender Partners
        </p>

        {/* Scrolling track */}
        <div className="flex-1 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="marquee-track items-center">
            {doubled.map((lender, i) => (
              <div key={i} className="flex items-center shrink-0 px-6">
                <img
                  src={lender.logo}
                  alt={lender.name}
                  className="h-14 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
