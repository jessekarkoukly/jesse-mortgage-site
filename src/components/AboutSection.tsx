import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="bg-sand py-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Photo */}
        <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden order-2 lg:order-1">
          <Image
            src="/jesse-about.jpg"
            alt="Jesse Karkoukly, Toronto Mortgage Agent"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <p
            className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            About Jesse
          </p>
          <h2
            className="text-[2rem] sm:text-[2.5rem] font-bold text-navy leading-tight mb-8"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            You should understand exactly what you are signing. I make sure you do.
          </h2>

          <div
            className="flex flex-col gap-5 text-[1.0625rem] text-navy-2 leading-relaxed"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            <p>
              I came to mortgages after a decade in tech. What I noticed: most people feel like
              they are on their own when it comes to one of the biggest financial decisions of their
              adult lives. That felt wrong to me.
            </p>
            <p>
              My approach is simple. I listen first. Then I look at your full picture, run the
              numbers across multiple lenders, and walk you through what actually makes sense for
              your situation. Not what sounds good. What is good.
            </p>
            <p>
              I live in The Annex with my family. I work with clients across Toronto and Ontario.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
