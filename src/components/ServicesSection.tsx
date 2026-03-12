import Link from "next/link";

const BUYING = [
  { label: "First-Time Buyers", href: "/services/first-time-buyers" },
  { label: "Purchases and Investment Properties", href: "/services/purchases-and-investment" },
];

const EXISTING = [
  { label: "Renewals and Refinancing", href: "/services/renewals-and-refinancing" },
  { label: "Debt Consolidation", href: "/services/debt-consolidation" },
  { label: "Self-Employed Mortgages", href: "/services/self-employed-mortgages" },
];

function ServiceLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between py-3.5 border-b border-sand-2 hover:border-coral transition-colors duration-150"
    >
      <span
        className="text-[1rem] font-semibold text-navy group-hover:text-coral transition-colors duration-150"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        {label}
      </span>
      <svg
        className="w-4 h-4 text-sand-2 group-hover:text-coral transition-colors duration-150 translate-x-0 group-hover:translate-x-1 transition-transform"
        fill="none"
        viewBox="0 0 16 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </Link>
  );
}

export default function ServicesSection() {
  return (
    <section className="bg-sand py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <p
          className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Services
        </p>
        <h2
          className="text-[2rem] sm:text-[2.5rem] font-bold text-navy leading-tight mb-4"
          style={{ fontFamily: "var(--font-spectral)" }}
        >
          Who I work with.
        </h2>
        <p
          className="text-[1rem] text-slate mb-12 max-w-xl"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Every situation is different. Here is where you might fit.
        </p>

        {/* Two columns */}
        <div className="grid sm:grid-cols-2 gap-10 lg:gap-20 max-w-3xl">
          {/* Buying */}
          <div>
            <h3
              className="text-[0.6875rem] font-bold text-coral uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Buying
            </h3>
            {BUYING.map((s) => (
              <ServiceLink key={s.href} {...s} />
            ))}
          </div>

          {/* Existing Homeowners */}
          <div>
            <h3
              className="text-[0.6875rem] font-bold text-coral uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Existing Homeowners
            </h3>
            {EXISTING.map((s) => (
              <ServiceLink key={s.href} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
