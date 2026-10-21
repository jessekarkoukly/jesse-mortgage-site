import { getPost, posts } from "@/data/posts";
import { ogCard, ogSize } from "@/lib/og";

export const alt = "Jesse Karkoukly, Toronto Mortgage Agent";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.h1 ?? "Mortgage insights from Jesse Karkoukly";
  return ogCard({ label: post?.category ?? "Blog", headline: title });
}
