import Link from "next/link";

const SITE = "https://jessekarkoukly.com";

type Props = {
  /** ISO date the page content was last reviewed, e.g. "2026-10-20" */
  updated: string;
  /** Path of the page, e.g. "/services/self-employed" */
  path: string;
  /** Page title as shown in search */
  name: string;
};

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Author line and last-updated date for service pages.
 * Shows "By Jesse Karkoukly, Mortgage Agent · Updated <date>" under the headline
 * and adds matching WebPage structured data (author + dateModified) for search and AI tools.
 */
export default function ServiceByline({ updated, path, name }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE}${path}#webpage`,
    url: `${SITE}${path}`,
    name,
    dateModified: updated,
    author: { "@id": `${SITE}/#jesse` },
    publisher: { "@id": `${SITE}/#business` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <p
        className="text-slate text-[0.875rem] mb-6"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        By{" "}
        <Link href="/about" rel="author" className="underline underline-offset-2 hover:text-sand">
          Jesse Karkoukly
        </Link>
        , Mortgage Agent · Updated <time dateTime={updated}>{formatDate(updated)}</time>
      </p>
    </>
  );
}
