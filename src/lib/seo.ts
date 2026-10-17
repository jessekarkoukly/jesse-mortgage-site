import type { Metadata } from "next";

const SITE_NAME = "Jesse Karkoukly, Mortgage Agent";
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Jesse Karkoukly, Toronto Mortgage Agent",
};

// Link previews (LinkedIn, iMessage, ChatGPT, Slack) use these tags.
// Keep them identical to the page title and description so every
// surface shows the same, current wording, with the shared image.
export function social(
  title: string,
  description: string,
  path: string
): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_CA",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
