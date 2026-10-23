import Image from "next/image";
import { B, serif, sans } from "./brand";

type Props = { onSchedule: () => void; onEmail: () => void };

export default function HomeHero({ onSchedule, onEmail }: Props) {
  return (
    <section className="pt-24 lg:pt-32 pb-14 lg:pb-20 px-5 sm:px-6" style={{ background: B.linen }}>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-14">
        {/* Headshot first on mobile so the arch leads; sits on the right on desktop */}
        <div className="flex justify-center lg:order-2 lg:shrink-0">
          <Image
            src="/jesse-hero-arch.jpg"
            alt="Jesse Karkoukly, Toronto mortgage agent"
            width={1000}
            height={1250}
            priority
            sizes="(min-width: 1024px) 340px, (min-width: 640px) 300px, 240px"
            className="w-[240px] h-[300px] sm:w-[300px] sm:h-[375px] lg:w-[340px] lg:h-[430px] object-cover"
            style={{ borderRadius: "999px 999px 18px 18px" }}
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-6 lg:order-1">
          <h1
            className="m-0 text-[2.5rem] sm:text-[3.25rem] lg:text-[4.25rem] leading-[1.05]"
            style={{ ...serif, color: B.espresso, fontWeight: 400, letterSpacing: "-0.5px" }}
          >
            Confident mortgage decisions start here.
          </h1>
          <p className="m-0 text-[1.0625rem] sm:text-[1.1875rem] leading-relaxed max-w-xl" style={{ ...sans, color: B.body }}>
            I’m Jesse Karkoukly, a Toronto mortgage agent at Sherwood Mortgage Group. I help first-time home buyers and self-employed borrowers understand what they qualify for and build a home buying plan.
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 pt-1">
            <button
              type="button"
              onClick={onSchedule}
              className="cursor-pointer w-full sm:w-auto rounded-full px-7 py-4 min-h-[48px] text-[1rem] font-semibold transition-colors duration-150 bg-[#352B26] text-[#F5EFE8] border-[1.5px] border-[#352B26] hover:bg-[#4F6B7A] hover:border-[#4F6B7A]"
              style={sans}
            >
              Schedule a call
            </button>
            <button
              type="button"
              onClick={onEmail}
              className="cursor-pointer w-full sm:w-auto rounded-full px-7 py-4 min-h-[48px] text-[1rem] font-semibold transition-colors duration-150 bg-transparent text-[#352B26] border-[1.5px] border-[#352B26] hover:text-[#4F6B7A] hover:border-[#4F6B7A]"
              style={sans}
            >
              Start the conversation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
