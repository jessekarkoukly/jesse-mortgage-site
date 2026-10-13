import type { ComponentType } from "react";

export interface PostFaq {
  q: string;
  a: string;
}

export interface Post {
  slug: string;
  /** Visible H1 */
  h1: string;
  /** Schema headline */
  headline: string;
  /** <title> and social title */
  metaTitle: string;
  metaDescription: string;
  /** Card copy on /blog */
  teaser: string;
  category: string;
  published: string; // YYYY-MM-DD
  updated: string; // YYYY-MM-DD
  readMinutes: number;
  wordCount: number;
  keywords: string[];
  /** Public path of the card / schema image */
  image: { src: string; alt: string; width: number; height: number };
  /** Rendered in the FAQ section and the FAQPage schema, so the two always match */
  faq: PostFaq[];
  /** Extra schema bits */
  mentions: string[];
  sources: { label: string; url: string }[];
  Body: ComponentType;
}
