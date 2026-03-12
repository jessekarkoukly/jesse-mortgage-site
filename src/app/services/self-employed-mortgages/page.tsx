import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Self-Employed Mortgages | Toronto Mortgage Agent",
  description:
    "Self-employed in Toronto and need a mortgage? Jesse Karkoukly explains how lenders assess non-traditional income, what documents you need, and how to present your file to get approved.",
  openGraph: {
    title: "Self-Employed Mortgages | Toronto Mortgage Agent",
    description:
      "Toronto mortgage agent Jesse Karkoukly helps self-employed borrowers navigate income assessment, lender selection, and documentation to secure the best available mortgage.",
    url: "https://jessekarkoukly.com/services/self-employed-mortgages",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

export default function SelfEmployedMortgagesPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Services", href: "/services" }, { name: "Self-Employed Mortgages", href: "/services/self-employed-mortgages" }]} />
      {/* Hero */}
      <section className="bg-sand pt-16 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p
            className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Services / Self-Employed Mortgages
          </p>
          <h1
            className="text-[2.5rem] sm:text-[3rem] font-bold text-navy leading-tight mb-6 max-w-3xl"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Self-Employed Mortgages in Toronto
          </h1>
          <p
            className="text-[1.125rem] text-navy-2 leading-relaxed max-w-2xl"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Self-employed borrowers can get excellent mortgages. The process is different, not harder. The key is knowing how to present your income and which lenders assess it fairly.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          {/* Income Assessment */}
          <div>
            <p
              className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Income Assessment
            </p>
            <h2
              className="text-[1.75rem] font-bold text-navy mb-5"
              style={{ fontFamily: "var(--font-spectral)" }}
            >
              How self-employed income is assessed
            </h2>
            <div
              className="flex flex-col gap-4 text-[1rem] text-navy-2 leading-relaxed"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              <p>
                Lenders look at your net income as reported on your tax returns. If you have been legitimately reducing your taxable income through business expenses, the number on your Notice of Assessment will be lower than what you actually earn and spend. That gap is the core challenge for self-employed borrowers.
              </p>
              <p>
                Most lenders use a two-year average of your line 15000 income (total income) or line 23600 (net income before adjustments). Some lenders will add back certain deductions, such as depreciation or business-use-of-home, to arrive at a higher qualifying income. The rules vary by lender and product.
              </p>
              <p>
                Generally, you need to have been self-employed in the same business for at least two years to qualify under traditional income verification. If you are newer to self-employment, there are alternative approaches depending on your situation.
              </p>
            </div>
          </div>

          {/* Stated Income vs Traditional */}
          <div>
            <p
              className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Product Options
            </p>
            <h2
              className="text-[1.75rem] font-bold text-navy mb-5"
              style={{ fontFamily: "var(--font-spectral)" }}
            >
              Stated income versus traditional verification
            </h2>
            <div
              className="flex flex-col gap-4 text-[1rem] text-navy-2 leading-relaxed"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              <p>
                Traditional income verification uses your tax documents to prove what you earn. If your reported income is sufficient, this is the strongest path and gives you access to the best rates.
              </p>
              <p>
                Stated income programs are designed for borrowers whose documented income does not reflect their actual financial capacity. These programs typically require a larger down payment (often 20% or more), have higher rates, and are offered through alternative lenders rather than major banks. They can be an effective bridge while you build your income history.
              </p>
              <p>
                The right path depends on your specific situation: how long you have been self-employed, how your income is structured, what is on your tax returns, and what you are trying to buy. There is rarely one obvious answer, which is why the conversation matters.
              </p>
            </div>
          </div>

          {/* Lender Landscape */}
          <div>
            <p
              className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Lender Selection
            </p>
            <h2
              className="text-[1.75rem] font-bold text-navy mb-5"
              style={{ fontFamily: "var(--font-spectral)" }}
            >
              Not all lenders assess self-employment the same way
            </h2>
            <div
              className="flex flex-col gap-4 text-[1rem] text-navy-2 leading-relaxed"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              <p>
                Some of the major banks have strict internal policies around self-employed income. Others are more flexible. Monoline lenders and certain credit unions often have underwriting guidelines that work in a self-employed borrower's favour.
              </p>
              <p>
                Because I work with 50+ lenders, I know which institutions understand business income and how to present your file to them effectively. The same borrower can get very different results depending on where the application goes and how it is framed.
              </p>
            </div>
          </div>

          {/* What to Prepare */}
          <div>
            <p
              className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Documentation
            </p>
            <h2
              className="text-[1.75rem] font-bold text-navy mb-5"
              style={{ fontFamily: "var(--font-spectral)" }}
            >
              What to have ready
            </h2>
            <div
              className="flex flex-col gap-4 text-[1rem] text-navy-2 leading-relaxed"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              <p>
                The exact document list depends on your structure, but most self-employed applications require: two years of personal tax returns (T1 generals) and Notices of Assessment, business financial statements for the same period, confirmation of business ownership (articles of incorporation or business registration), and six months of personal and business bank statements.
              </p>
              <p>
                If you operate through a corporation, corporate tax returns (T2) may also be required. If you have business partners, lenders need to know the ownership structure.
              </p>
              <p>
                I walk through your specific situation before we request anything. There is no point gathering documents we do not need. I give you a clear list and let you know exactly why each item matters.
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
              Self-employed and ready to buy or refinance?
            </h2>
            <p
              className="text-[1rem] text-slate leading-relaxed"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Let us look at your income picture and figure out what is possible.
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
