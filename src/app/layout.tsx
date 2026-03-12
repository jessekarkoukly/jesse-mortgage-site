import type { Metadata, Viewport } from "next";
import { Spectral, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400", "700"],
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
  themeColor: "#1E2D3D",
};

export const metadata: Metadata = {
  title: {
    default: "Jesse Karkoukly | Toronto Mortgage Agent | Sherwood Mortgage Group",
    template: "%s | Jesse Karkoukly Toronto Mortgage Agent",
  },
  description:
    "Jesse Karkoukly is a Toronto mortgage agent with Sherwood Mortgage Group. Compare 50+ lenders, get a clear plan, and find the right mortgage for your situation.",
  metadataBase: new URL("https://jessekarkoukly.com"),
  alternates: {
    canonical: "/",
  },
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
    title: "Jesse Karkoukly | Toronto Mortgage Agent | Sherwood Mortgage Group",
    description:
      "Jesse Karkoukly is a Toronto mortgage agent with Sherwood Mortgage Group. Compare 50+ lenders, get a clear plan, and find the right mortgage for your situation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jesse Karkoukly | Toronto Mortgage Agent",
    description:
      "Compare 50+ lenders with a Toronto mortgage agent who gives you a clear plan in plain language.",
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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
