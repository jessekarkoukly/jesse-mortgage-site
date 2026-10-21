import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Link preview cards (Open Graph and Twitter). Fonts and logo are bundled in /assets/og
// as .woff and .png, because the image renderer cannot read .woff2 or reach Google Fonts reliably.
export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Jesse Karkoukly, Toronto Mortgage Agent at Sherwood Mortgage Group";

const ESPRESSO = "#352B26";
const LINEN = "#F5EFE8";
const CLAY_DEEP = "#7E6352";
const BODY2 = "#5A4C44";

async function asset(name: string) {
  return readFile(join(process.cwd(), "assets/og", name));
}

export async function ogCard({ label, headline }: { label?: string; headline: string }) {
  const [serif, serifItalic, sans, logo] = await Promise.all([
    asset("newsreader-latin-500-normal.woff"),
    asset("newsreader-latin-400-italic.woff"),
    asset("plus-jakarta-sans-latin-600-normal.woff"),
    asset("jesse-logo.png"),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const size = headline.length > 70 ? 60 : 68;
  // Brand labels are sentence case.
  const labelText = label ? label.charAt(0).toUpperCase() + label.slice(1).toLowerCase() : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: LINEN,
          padding: "64px 80px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={420} height={90} alt="" />
        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", marginBottom: "auto" }}>
          {labelText && (
            <span style={{ fontFamily: "Newsreader Italic", fontSize: 32, color: CLAY_DEEP, marginBottom: 18 }}>{labelText}</span>
          )}
          <span style={{ fontFamily: "Newsreader", fontSize: size, lineHeight: 1.12, color: ESPRESSO, maxWidth: 1000 }}>
            {headline}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Plus Jakarta Sans", fontSize: 24, color: BODY2 }}>
          <span>Toronto mortgage agent at Sherwood Mortgage Group</span>
          <span style={{ color: CLAY_DEEP }}>jessekarkoukly.com</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Newsreader", data: serif, weight: 500, style: "normal" },
        { name: "Newsreader Italic", data: serifItalic, weight: 400, style: "italic" },
        { name: "Plus Jakarta Sans", data: sans, weight: 600, style: "normal" },
      ],
    }
  );
}
