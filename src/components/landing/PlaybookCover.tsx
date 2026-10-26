import Image from "next/image";
import { B, serif, sans } from "@/components/home/brand";
import { FAMILY_PHOTO } from "@/data/landing/fthb";

/** The playbook as a printed booklet: arch-cropped family photo, title, edition, author. */
export default function PlaybookCover({ width = 320, tilt = true, priority = false }: { width?: number; tilt?: boolean; priority?: boolean }) {
  return (
    <div className={`relative ${tilt ? "lg:-rotate-[3deg]" : ""}`} style={{ width, maxWidth: "100%" }}>
      {/* Page edges peeking out on the right */}
      <div aria-hidden="true" className="absolute top-[2.5%] bottom-[2.5%] -right-[10px] w-[14px] rounded-r-[6px]" style={{ background: "repeating-linear-gradient(90deg, #FFFFFF 0 2px, #E9E1D7 2px 3px)" }} />
      <div
        className="relative aspect-[3/4] rounded-[4px_12px_12px_4px] overflow-hidden flex flex-col shadow-[0_30px_60px_-26px_rgba(53,43,38,0.6),0_10px_20px_-12px_rgba(53,43,38,0.35)]"
        style={{ background: B.espresso, padding: "8.5% 9% 8%" }}
        role="img"
        aria-label="Cover of The Ontario First-Time Buyer Playbook, 2026 edition, by Jesse Karkoukly, Mortgage Agent"
      >
        <div aria-hidden="true" className="absolute inset-y-0 left-0 w-[6%]" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.28), rgba(0,0,0,0))" }} />
        <div className="relative w-[64%] aspect-[4/5] mx-auto overflow-hidden rounded-t-full">
          <Image src={FAMILY_PHOTO.src} alt="" fill priority={priority} sizes={`${Math.round(width * 0.64)}px`} className="object-cover object-[50%_80%]" />
        </div>
        <div className="relative mt-auto flex flex-col" style={{ gap: width * 0.02 }}>
          <span style={{ ...serif, fontWeight: 500, color: B.linen, fontSize: width * 0.083, lineHeight: 1.08 }}>The Ontario <span className="whitespace-nowrap">First-Time</span> Buyer Playbook</span>
          <span style={{ ...serif, fontStyle: "italic", color: B.clayLight, fontSize: width * 0.05 }}>2026 edition</span>
          <span className="flex items-end justify-between" style={{ marginTop: width * 0.04 }}>
            <span className="flex flex-col" style={{ ...sans, color: B.onDark, fontSize: width * 0.039, lineHeight: 1.35 }}>
              <span style={{ fontWeight: 600, color: B.linen }}>Jesse Karkoukly</span>
              <span>Mortgage Agent</span>
            </span>
            <Image src="/brand/p4-on-clay.png" alt="" width={186} height={200} style={{ width: width * 0.075, height: "auto" }} />
          </span>
        </div>
      </div>
    </div>
  );
}
