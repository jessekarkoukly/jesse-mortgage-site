import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import styles from "@/components/blog/article.module.css";
import { getPost, posts } from "@/data/posts";

const SITE = "https://jessekarkoukly.com";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: url },
    authors: [{ name: "Jesse Karkoukly", url: `${SITE}/about` }],
    openGraph: {
      type: "article",
      url,
      title: post.metaTitle,
      description: post.metaDescription,
      siteName: "Jesse Karkoukly, Mortgage Agent",
      publishedTime: post.published,
      modifiedTime: post.updated,
      authors: [`${SITE}/about`],
      section: post.category,
      locale: "en_CA",
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.headline,
        description: post.metaDescription,
        datePublished: post.published,
        dateModified: post.updated,
        timeRequired: `PT${post.readMinutes}M`,
        wordCount: post.wordCount,
        inLanguage: "en-CA",
        mainEntityOfPage: url,
        articleSection: post.category,
        keywords: post.keywords.join(", "),
        about: [
          { "@type": "Thing", name: "Self-employed mortgage" },
          { "@type": "Thing", name: "Dividend income" },
        ],
        spatialCoverage: { "@type": "Place", name: "Ontario, Canada" },
        author: { "@id": `${SITE}/#jesse` },
        publisher: { "@id": `${SITE}/#jesse` },
        image: [`${SITE}${post.image.src}`, `${url}/opengraph-image`],
        isPartOf: { "@type": "Blog", name: "Jesse Karkoukly Blog", url: `${SITE}/blog` },
        citation: post.sources.map((s) => s.url),
        mentions: post.mentions.map((name) => ({ "@type": "Thing", name })),
      },
      {
        "@type": "Person",
        "@id": `${SITE}/#jesse`,
        name: "Jesse Karkoukly",
        url: `${SITE}/about`,
        image: `${SITE}/jesse-headshot.png`,
        jobTitle: "Mortgage Agent Level 1",
        knowsAbout: ["Self-employed mortgages", "First-time home buyers", "Mortgage qualification"],
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "license",
          name: "Ontario Mortgage Agent Level 1, Licence M25003068",
          recognizedBy: { "@type": "Organization", name: "Financial Services Regulatory Authority of Ontario" },
        },
        worksFor: {
          "@type": "Organization",
          name: "Sherwood Mortgage Group",
          identifier: "Brokerage Licence 12176",
          memberOf: { "@type": "Organization", name: "Mortgage Architects" },
        },
        areaServed: [
          { "@type": "City", name: "Toronto" },
          { "@type": "AdministrativeArea", name: "Ontario" },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "390 Dupont St Ste 201",
          addressLocality: "Toronto",
          addressRegion: "ON",
          postalCode: "M5R 1V9",
          addressCountry: "CA",
        },
        telephone: "+1-416-276-2666",
        email: "jkarkoukly@sherwoodmortgagegroup.com",
      },
      {
        "@type": "FAQPage",
        mainEntity: post.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  const { Body } = post;

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Blog", href: "/blog" },
          { name: post.headline, href: `/blog/${post.slug}` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className={styles.article}>
        <header>
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/blog">Blog</Link> / <Link href="/services/self-employed">{post.category}</Link>
          </nav>
          <div className="read-time">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            {post.readMinutes} min read
          </div>
          <h1>{post.h1}</h1>
          <div className="byline">
            <Image
              src="/blog/jesse-face.jpg"
              alt="Jesse Karkoukly"
              width={46}
              height={46}
              priority
            />
            <div>
              <Link className="who" href="/about" rel="author">
                Jesse Karkoukly
              </Link>
              , Mortgage Agent, Toronto
              <br />
              Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time> · Published{" "}
              <time dateTime={post.published}>{formatDate(post.published)}</time>
            </div>
          </div>
        </header>

        <Body />

        <footer className="author">
          <Image
            src="/blog/jesse-headshot.jpg"
            alt="Jesse Karkoukly, Toronto mortgage agent"
            width={96}
            height={96}
          />
          <div>
            <div className="name">
              <Link href="/about" rel="author">
                Jesse Karkoukly
              </Link>
              <span className="coral">.</span>
            </div>
            <div className="role">
              Mortgage Agent Level 1, Licence M25003068 · Sherwood Mortgage Group · Toronto
            </div>
            <p>
              I help first-time buyers and self-employed borrowers get ready for their first or next home. Real numbers,
              plain answers. <Link href="/services/self-employed">More on self-employed mortgages</Link>
            </p>
          </div>
        </footer>

        <div className="sources">
          <h2>Sources</h2>
          <ul>
            {post.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </PageShell>
  );
}
