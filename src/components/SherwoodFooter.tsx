import Image from "next/image";

export default function SherwoodFooter() {
  return (
    <section className="bg-white py-10 px-6 border-t border-sand-2">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Sherwood logo + license */}
        <div className="flex flex-col items-center sm:items-start gap-3">
          <Image
            src="/sherwood-logo.png"
            alt="Sherwood Mortgage Group"
            width={260}
            height={68}
            className="object-contain"
          />
          <p
            className="text-[0.8125rem] font-semibold text-navy"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Brokerage Lic. 12176
          </p>
        </div>

        {/* Affiliation */}
        <p
          className="text-[0.9375rem] font-semibold text-slate text-center sm:text-right"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Part of the Mortgage Architects Network
        </p>
      </div>
    </section>
  );
}
