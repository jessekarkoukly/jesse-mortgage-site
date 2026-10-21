import type { PostFaq as Faq } from "@/data/posts/types";

export default function PostFaq({ items }: { items: Faq[] }) {
  return (
    <section id="faq" className="faq">
      <h2>FAQ</h2>
      {items.map((item) => (
        <details key={item.q} open>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </section>
  );
}
