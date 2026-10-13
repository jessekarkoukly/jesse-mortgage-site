import type { Post } from "./types";
import selfEmployedDividends from "./self-employed-dividends-mortgage";

/** Newest first. Add new posts here. */
export const posts: Post[] = [selfEmployedDividends];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
