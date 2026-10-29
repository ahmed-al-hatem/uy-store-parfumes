import type { ProductSummary } from "@/lib/types";
import { ProductCard } from "./ProductCard";

/** One row of cards in the full-bleed divided grid; used for "you may also like". */
export function ProductRow({ title, products, id }: { title: string; products: ProductSummary[]; id: string }) {
  if (!products.length) return null;
  return (
    <section aria-labelledby={id} className="pt-section">
      <h2 id={id} className="px-16 pb-17 text-subheading tracking-display lg:px-32">
        {title}
      </h2>
      <div className="overflow-hidden border-t border-soot">
        <ul className="grid w-[calc(100%+1px)] grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {products.map((p, i) => (
            <li key={p.slug} className={`border-b border-e border-soot ${i === 4 ? "max-lg:hidden" : ""} ${i === 3 ? "sm:max-lg:hidden" : ""}`}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
