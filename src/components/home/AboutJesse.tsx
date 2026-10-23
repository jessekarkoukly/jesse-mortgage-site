import Image from "next/image";
import { B, serif, sans } from "./brand";

export default function AboutJesse({ onStory }: { onStory: () => void }) {
  return (
    <section className="px-5 sm:px-6 py-16 lg:py-20" style={{ background: B.linen }}>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-14">
        <Image
          src="/jesse-about.jpg"
          alt="Jesse Karkoukly walking with his family on a Toronto street in the fall"
          width={1067}
          height={1600}
          sizes="(max-width: 480px) 100vw, 440px"
          className="w-full max-w-[440px] h-[440px] lg:h-[580px] object-cover rounded-[20px] mx-auto lg:mx-0 shrink-0"
        />
        <div className="flex-1 min-w-0 flex flex-col gap-5">
          <p className="m-0 text-[1.375rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>About Jesse</p>
          <h2 className="m-0 text-[1.875rem] sm:text-[2.5rem] leading-[1.15]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>
            You should understand exactly what you are signing, and I make sure you do.
          </h2>
          <p className="m-0 text-[1.0625rem] leading-[1.7]" style={{ ...sans, color: B.bodyDark }}>
            I work with first-time home buyers and self-employed individuals looking to make confident mortgage decisions. I work with anyone looking to purchase in Ontario and help build out a personalized plan that is suited for you. No two mortgages are the same, and you deserve someone who is invested in your success from the beginning.
          </p>
          <p className="m-0 text-[1.0625rem] leading-[1.7]" style={{ ...sans, color: B.body }}>
            I came to mortgages after a decade in tech. What I noticed: most people feel like they are on their own when it comes to one of the biggest financial decisions of their adult lives. That felt wrong to me.
          </p>
          {/* A sky-blue button, set apart from the espresso ones elsewhere on the page. */}
          <button
            type="button"
            onClick={onStory}
            className="group self-start mt-1 cursor-pointer rounded-full pl-6 pr-5 py-3.5 min-h-[52px] flex items-center gap-3 text-[1rem] font-semibold text-white bg-[#4F6B7A] shadow-[0_8px_22px_rgba(79,107,122,0.35)] hover:bg-[#3F5966] hover:-translate-y-0.5 transition-all duration-150"
            style={sans}
          >
            Start the conversation
            <span aria-hidden="true" className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
