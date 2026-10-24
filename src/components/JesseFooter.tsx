import Link from "next/link";
import Image from "next/image";

export default function JesseFooter() {
  return (
    <footer className="bg-navy py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <Link href="/" className="select-none w-fit">
              <Image
                src="/jesse-logo.png"
                alt="Jesse Karkoukly Mortgage Agent"
                width={224}
                height={48}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>

            {/* Footer nav */}
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                { label: "Services", href: "/#services" },
                { label: "Neighbourhoods", href: "/neighbourhoods" },
                { label: "Calculators", href: "/calculators" },
                { label: "About", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
                { label: "FAQ", href: "/#faq" },
                { label: "Privacy", href: "/privacy" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[0.8125rem] text-slate hover:text-white transition-colors"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Contact */}
            <div
              className="flex flex-wrap gap-x-6 gap-y-1 text-[0.8125rem] text-slate"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              <a
                href="tel:4162762666"
                className="hover:text-white transition-colors"
              >
                416-276-2666
              </a>
              <a
                href="mailto:jkarkoukly@sherwoodmortgagegroup.com"
                className="hover:text-white transition-colors"
              >
                jkarkoukly@sherwoodmortgagegroup.com
              </a>
              <a
                href="https://app.scarlettnetwork.com/Jesse_Karkoukly/application/0/interview/purpose"
                target="_blank"
                rel="noopener noreferrer"
                className="text-coral hover:text-coral-dark transition-colors"
              >
                Start Application
              </a>
            </div>
          </div>

          {/* Official Sherwood logo with brokerage licence (supplied artwork, unmodified, full colour on white) */}
          <div className="self-start md:self-center shrink-0 rounded-2xl bg-white px-6 py-4">
            <Image
              src="/sherwood-logo-lic.png"
              alt="Sherwood Mortgage Group, Brokerage Lic. 12176"
              width={220}
              height={62}
              className="w-[200px] sm:w-[220px] h-auto"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-navy-2" />

        {/* Full disclaimer */}
        <p
          className="text-[0.75rem] text-slate leading-relaxed max-w-4xl"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Jesse Karkoukly, Mortgage Agent Lic. M25003068. Brokerage: Sherwood
          Mortgage Group, Brokerage Lic. 12176. This website does not constitute
          a mortgage approval, commitment, or rate guarantee. All rates and
          terms subject to lender approval.
        </p>
      </div>
    </footer>
  );
}
