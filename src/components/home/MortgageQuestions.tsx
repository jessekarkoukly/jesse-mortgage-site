import Image from "next/image";
import { B, JESSE_EMAIL, serif, sans } from "./brand";

type Props = { onSchedule: () => void; onEmail: () => void };

export default function MortgageQuestions({ onSchedule, onEmail }: Props) {
  return (
    <>
      <section className="px-5 sm:px-6 py-16 lg:py-20" style={{ background: B.espresso, color: B.linen }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14">
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.linen }}>Mortgage questions?</h2>
            <p className="m-0 max-w-[620px] text-[1.0625rem] leading-[1.65]" style={{ ...sans, color: B.onDark }}>
              Drop me a note about where you’re at, any questions you have or anything I can support with. I would be truly happy to assist any way I can.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:w-[300px]">
            <button
              type="button"
              onClick={onEmail}
              className="cursor-pointer w-full rounded-full px-7 py-4 min-h-[52px] flex items-center justify-center gap-2.5 text-[1rem] font-semibold transition-colors duration-150 bg-[#A88A78] text-[#352B26] border-[1.5px] border-[#A88A78] hover:bg-[#9DB6C3] hover:border-[#9DB6C3]"
              style={sans}
            >
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
              </svg>
              Drop me a note
            </button>
            <button
              type="button"
              onClick={onSchedule}
              className="cursor-pointer w-full rounded-full px-7 py-4 min-h-[52px] text-[1rem] font-semibold transition-colors duration-150 bg-transparent text-[#F5EFE8] border-[1.5px] border-[#6B5B52] hover:border-[#9DB6C3] hover:text-[#9DB6C3]"
              style={sans}
            >
              Schedule a call
            </button>
            <a href={`mailto:${JESSE_EMAIL}`} className="text-center text-[0.875rem] py-2 underline underline-offset-2 hover:text-[#9DB6C3]" style={{ ...sans, color: B.onDark }}>
              {JESSE_EMAIL}
            </a>
          </div>
        </div>
      </section>
      <section className="px-5 sm:px-6 py-20 lg:py-24" style={{ background: B.clay, color: B.linen }}>
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-7 text-center">
          <Image src="/brand/p4-on-clay.png" alt="" width={186} height={200} className="w-[90px] h-auto" />
          <p className="m-0 text-[2.25rem] sm:text-[3rem] lg:text-[4rem] leading-[1.12]" style={{ ...serif, fontWeight: 500 }}>
            Every door, walked through together.
          </p>
        </div>
      </section>
    </>
  );
}
