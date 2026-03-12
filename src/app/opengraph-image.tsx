import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jesse Karkoukly, Toronto Mortgage Agent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const spectralBold = fetch(
    new URL(
      "https://fonts.gstatic.com/s/spectral/v13/rnCr-xNNww_2s0amA9M5kn3LSfukTA.woff2"
    )
  ).then((res) => res.arrayBuffer());

  const jakartaSemiBold = fetch(
    new URL(
      "https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_KU7NShXDFGCj.woff2"
    )
  ).then((res) => res.arrayBuffer());

  const [spectralData, jakartaData] = await Promise.all([
    spectralBold,
    jakartaSemiBold,
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#1E2D3D",
          padding: "80px",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "40px",
          }}
        >
          <span
            style={{
              fontFamily: "Spectral",
              fontSize: "72px",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1,
            }}
          >
            Jesse
            <span style={{ color: "#E8705A" }}>.</span>
          </span>
          <span
            style={{
              fontFamily: "Spectral",
              fontSize: "36px",
              fontWeight: 400,
              color: "#8A9BAA",
              lineHeight: 1,
              marginTop: "-4px",
            }}
          >
            Karkoukly
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "Spectral",
            fontSize: "44px",
            fontWeight: 700,
            color: "#F7F3EE",
            lineHeight: 1.25,
            margin: 0,
            maxWidth: "800px",
          }}
        >
          Toronto Mortgage Agent
        </p>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "Plus Jakarta Sans",
            fontSize: "22px",
            fontWeight: 600,
            color: "#8A9BAA",
            lineHeight: 1.5,
            marginTop: "20px",
            maxWidth: "700px",
          }}
        >
          50+ lenders compared. Clear plan in plain language.
        </p>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginTop: "auto",
          }}
        >
          <span
            style={{
              fontFamily: "Plus Jakarta Sans",
              fontSize: "18px",
              fontWeight: 600,
              color: "#8A9BAA",
            }}
          >
            Sherwood Mortgage Group
          </span>
          <span style={{ color: "#E8705A", fontSize: "18px" }}>|</span>
          <span
            style={{
              fontFamily: "Plus Jakarta Sans",
              fontSize: "18px",
              fontWeight: 600,
              color: "#8A9BAA",
            }}
          >
            jessekarkoukly.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Spectral",
          data: spectralData,
          weight: 700,
          style: "normal",
        },
        {
          name: "Plus Jakarta Sans",
          data: jakartaData,
          weight: 600,
          style: "normal",
        },
      ],
    }
  );
}
