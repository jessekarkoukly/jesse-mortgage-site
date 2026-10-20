import Image from "next/image";

export default function SherwoodFooter() {
  return (
    <section className="bg-white py-10 px-6 border-t border-sand-2">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Official Sherwood logo with brokerage licence (supplied artwork, do not modify) */}
        <div className="flex flex-col items-center sm:items-start gap-3">
          <Image
            src="/sherwood-logo-lic.png"
            alt="Sherwood Mortgage Group, Brokerage Lic. 12176"
            width={260}
            height={73}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
