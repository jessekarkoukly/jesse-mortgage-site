import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Link preview images read their fonts and logo from /assets/og at runtime.
  outputFileTracingIncludes: {
    "/opengraph-image": ["./assets/og/**"],
    "/twitter-image": ["./assets/og/**"],
    "/blog/[slug]/opengraph-image": ["./assets/og/**"],
  },
  async redirects() {
    return [
      // Send www to the main address so Google sees one site, not two.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.jessekarkoukly.com" }],
        destination: "https://jessekarkoukly.com/:path*",
        permanent: true,
      },
      { source: "/services/self-employed-mortgages", destination: "/services/self-employed", permanent: true },
      { source: "/services/cottage-vacation", destination: "/services/cottage", permanent: true },
      { source: "/services/renewals-and-refinancing", destination: "/services/renewal", permanent: true },
      { source: "/process", destination: "/working-with-jesse", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
