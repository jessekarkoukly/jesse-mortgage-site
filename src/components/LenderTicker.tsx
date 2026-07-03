const LENDERS = [
  { name: "TD",                 logo: "/logos/TD-logo.webp" },
  { name: "Scotiabank",         logo: "/logos/Scotiabank.webp" },
  { name: "First National",     logo: "/logos/First-National-Logo.webp" },
  { name: "MCAP",               logo: "/logos/MCAP-logo.webp" },
  { name: "Manulife",           logo: "/logos/ManuLife.webp" },
  { name: "Equitable Bank",     logo: "/logos/Equitable-logo.webp" },
  { name: "Home Trust",         logo: "/logos/Home-Trust-logo.webp" },
  { name: "Merix Financial",    logo: "/logos/Merix.webp" },
  { name: "RMG Mortgages",      logo: "/logos/RMG-logo.webp" },
  { name: "CMLS Financial",     logo: "/logos/CMLS-Logo.webp" },
  { name: "Haventree Bank",     logo: "/logos/HavenTree-Logo.webp" },
  { name: "DUCA",               logo: "/logos/Duca-logo.webp" },
  { name: "CWB Optimum",        logo: "/logos/CWB-Optimum-logo.webp" },
  { name: "Radius Financial",   logo: "/logos/Radius-logo.webp" },
  { name: "B2B Bank",           logo: "/logos/B2B-Logo.webp" },
  { name: "Mortgage Architects",logo: "/logos/Mortgage-Architects.webp" },
];

export default function LenderTicker() {
  const doubled = [...LENDERS, ...LENDERS];

  return (
    <div className="bg-navy py-2 sm:py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4 sm:gap-8">
        {/* Fixed label */}
        <p
          className="hidden sm:block shrink-0 text-[0.875rem] font-semibold text-white/50 uppercase tracking-widest"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Lender Partners
        </p>

        {/* Scrolling track */}
        <div className="flex-1 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none" />

          <div className="marquee-track items-center">
            {doubled.map((lender, i) => (
              <div key={i} className="flex items-center shrink-0 px-6">
                <img
                  src={lender.logo}
                  alt={lender.name}
                  className="h-24 sm:h-28 w-auto object-contain brightness-0 invert opacity-75 hover:opacity-100 hover:scale-110 transition-all duration-200"
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
