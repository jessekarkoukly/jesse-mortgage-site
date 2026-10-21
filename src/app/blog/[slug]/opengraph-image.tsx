import { ImageResponse } from "next/og";
import { getPost } from "@/data/posts";

export const runtime = "edge";
export const alt = "Jesse Karkoukly, Toronto Mortgage Agent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.h1 ?? "Mortgage insights from Jesse Karkoukly";
  const eyebrow = post?.category ?? "Blog";

  const [spectralData, jakartaData] = await Promise.all([
    fetch(new URL("https://fonts.gstatic.com/s/spectral/v13/rnCr-xNNww_2s0amA9M5kn3LSfukTA.woff2")).then((r) =>
      r.arrayBuffer()
    ),
    fetch(
      new URL(
        "https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_KU7NShXDFGCj.woff2"
      )
    ).then((r) => r.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#352B26",
          padding: "72px 80px",
        }}
      >
        <span
          style={{
            fontFamily: "Plus Jakarta Sans",
            fontSize: "22px",
            fontWeight: 600,
            color: "#7E6352",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </span>
        <p
          style={{
            fontFamily: "Spectral",
            fontSize: "60px",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.15,
            marginTop: "28px",
            maxWidth: "1000px",
          }}
        >
          {/[.?!]$/.test(title) ? title : `${title}.`}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "auto" }}>
          <span style={{ fontFamily: "Plus Jakarta Sans", fontSize: "20px", fontWeight: 600, color: "#7F9BAA" }}>
            Jesse Karkoukly, Mortgage Agent
          </span>
          <span style={{ color: "#7E6352", fontSize: "20px" }}>|</span>
          <span style={{ fontFamily: "Plus Jakarta Sans", fontSize: "20px", fontWeight: 600, color: "#7F9BAA" }}>
            jessekarkoukly.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Spectral", data: spectralData, style: "normal", weight: 700 },
        { name: "Plus Jakarta Sans", data: jakartaData, style: "normal", weight: 600 },
      ],
    }
  );
}
