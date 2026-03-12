import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Investment Property Mortgages | Toronto Mortgage Agent",
  description:
    "Toronto mortgage agent Jesse Karkoukly explains the difference between primary purchase and investment property mortgages. Down payment rules, rental income treatment, and what to expect.",
  openGraph: {
    title: "Investment Property Mortgages | Toronto Mortgage Agent",
    description:
      "Primary residence and investment property mortgages operate under different rules. Jesse Karkoukly helps Toronto buyers and investors understand what applies to their situation.",
    url: "https://jessekarkoukly.com/services/purchases-and-investment",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

export default function PurchasesInvestmentPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Services", href: "/services" }, { name: "Purchases & Investment", href: "/services/purchases-and-investment" }]} />
      {/* Hero */}
      <section className="bg-sand pt-16 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p
            className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Services / Purchases and Investment
          </p>
          <h1
            className="text-[2.5rem] sm:text-[3rem] font-bold text-navy leading-tight mb-6 max-w-3xl"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Purchase and Investment Property Mortgages in Toronto
          </h1>
          <p
            className="text-[1.125rem] text-navy-2 leading-relaxed max-w-2xl"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Whether you are buying a primary residence or building a rental portfolio, the rules differ. Understanding those differences before you shop puts you in a much stronger position.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          {/* Primary vs Investment */}
          <div>
            <p
              className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Primary vs Investment
            </p>
            <h2
              className="text-[1.75rem] font-bold text-navy mb-5"
              style={{ fontFamily: "var(--font-spectral)" }}
            >
              Key differences in how lenders treat each
            </h2>
            <div
              className="flex flex-col gap-4 text-[1rem] text-navy-2 leading-relaxed"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              <p>
                A primary residence is a property you intend to occupy. It qualifies for the widest range of mortgage products, including insured mortgages with down payments as low as 5%. The stress test applies, but the overall qualification framework is the most flexible available.
              </p>
              <p>
                An investment property or rental property is treated differently by every lender. The fundamental rule is that investment properties require a minimum 20% down payment. Mortgage default insurance is not available on rental properties, which means the full 80% LTV risk sits with the lender. Rates are also typically higher to reflect that risk.
              </p>
              <p>
                Owner-occupied properties with rental suites (a basement apartment, for example) may qualify for more favourable treatment, as the borrower lives there and the rental income is secondary. The rental income can partially offset the mortgage payment in qualification calculations.
              </p>
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <p
              className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Down Payment
            </p>
            <h2
              className="text-[1.75rem] font-bold text-navy mb-5"
              style={{ fontFamily: "var(--font-spectral)" }}
            >
              Down payment minimums for investment properties
            </h2>
            <div
              className="flex flex-col gap-4 text-[1rem] text-navy-2 leading-relaxed"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              <p>
                For a single-unit investment property, the minimum is 20%. For a two-to-four unit rental property, many lenders require 20% as well, though some products allow for slightly less on owner-occupied multi-unit properties. For five units or more, you move into commercial mortgage territory with different qualification criteria entirely.
              </p>
              <p>
                The 20% minimum on investment properties significantly affects the capital required to enter the market. On a $700,000 rental property in Toronto, that is a $140,000 down payment before closing costs. For investors building a portfolio, each subsequent property requires its own 20% plus the carrying costs need to fit within your overall debt service ratios.
              </p>
            </div>
          </div>

          {/* Rental Income */}
          <div>
            <p
              className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Rental Income
            </p>
            <h2
              className="text-[1.75rem] font-bold text-navy mb-5"
              style={{ fontFamily: "var(--font-spectral)" }}
            >
              How rental income factors into qualification
            </h2>
            <div
              className="flex flex-col gap-4 text-[1rem] text-navy-2 leading-relaxed"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              <p>
                Lenders handle rental income in two ways. Some use a rental offset, where a portion of the expected rental income (typically 50% to 80%) is credited against the mortgage payment, reducing the effective payment in the TDS calculation. Others add the rental income directly to your qualifying income.
              </p>
              <p>
                The rental offset approach is typically more conservative and produces a lower qualifying income. The addback approach is more generous. Which method a lender uses depends on their internal guidelines and whether the property is currently rented or projected to be.
              </p>
              <p>
                If you are buying a property with existing tenants and a rental history, lenders generally want to see current leases and a rent roll. If the property is vacant, they will use market rent estimates, typically supported by an appraisal.
              </p>
            </div>
          </div>

          {/* Portfolio Investing */}
          <div>
            <p
              className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Portfolio Strategy
            </p>
            <h2
              className="text-[1.75rem] font-bold text-navy mb-5"
              style={{ fontFamily: "var(--font-spectral)" }}
            >
              Building beyond your first property
            </h2>
            <div
              className="flex flex-col gap-4 text-[1rem] text-navy-2 leading-relaxed"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              <p>
                Once you own multiple properties, the complexity increases. Each property's mortgage, taxes, and carrying costs factor into your overall debt service ratios. Lenders have internal limits on the number of properties they will hold in their portfolio, and some will not lend on properties four or five in a sequence even if the numbers work.
              </p>
              <p>
                Alternative lenders and private lenders often fill the gap for experienced investors who have maxed out their capacity at traditional institutions. The rates are higher but the flexibility is greater. Getting the lender sequence right from the beginning saves significant cost over time.
              </p>
              <p>
                If you are thinking about investment properties as a longer-term strategy, let us map out the structure early. The decisions you make on property one affect what is possible on property three.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2
              className="text-[1.75rem] sm:text-[2rem] font-bold text-white leading-tight mb-2"
              style={{ fontFamily: "var(--font-spectral)" }}
            >
              Buying your first home or your next investment?
            </h2>
            <p
              className="text-[1rem] text-slate leading-relaxed"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Let us map out what is possible for your situation.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 bg-coral text-white font-semibold px-7 py-3.5 rounded hover:bg-coral/90 transition-colors"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Book a Call
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
