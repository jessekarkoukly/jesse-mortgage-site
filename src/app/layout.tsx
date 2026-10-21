import type { Metadata, Viewport } from "next";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";

// Brand refresh: headlines are Newsreader. The CSS variable keeps its old name (--font-spectral)
// so every existing heading picks up the new face without touching each file.
const spectral = Newsreader({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5EFE8",
};

export const metadata: Metadata = {
  title: {
    default: "Jesse Karkoukly | Toronto Mortgage Agent",
    template: "%s",
  },
  description:
    "Jesse Karkoukly is a Toronto mortgage agent with Sherwood Mortgage Group, helping first-time and self-employed buyers make confident mortgage decisions.",
  metadataBase: new URL("https://jessekarkoukly.com"),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://jessekarkoukly.com",
    siteName: "Jesse Karkoukly | Toronto Mortgage Agent",
    title: "Jesse Karkoukly | Toronto Mortgage Agent",
    description:
      "Jesse Karkoukly is a Toronto mortgage agent with Sherwood Mortgage Group, helping first-time and self-employed buyers make confident mortgage decisions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jesse Karkoukly | Toronto Mortgage Agent",
    description:
      "Jesse Karkoukly is a Toronto mortgage agent with Sherwood Mortgage Group, helping first-time and self-employed buyers make confident mortgage decisions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className={`${spectral.variable} ${jakarta.variable}`}>
      <body className="antialiased overflow-x-hidden">
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url(/noise.svg)",
            backgroundSize: "256px 256px",
            backgroundRepeat: "repeat",
            opacity: 0.06,
            pointerEvents: "none",
            zIndex: 100,
          }}
        />
        <AnalyticsTracker />
        <div className="w-full overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
