import type { Metadata } from "next";
import { ProductFrame } from "@/components/product/ProductFrame";
import { productImages } from "@/data/product-images.generated";

export const metadata: Metadata = {
  title: "Image review",
  robots: { index: false },
};

// Review flags from IMAGES.md, shown so each one can be judged in its frame.
const FLAGS: Record<string, string> = {
  "amber-oval-perfume": "F2 no label",
  "amber-square-perfume": "F2 no label",
  "blue-glass-perfume": "F2 no label, F5 saturated",
  "clear-glass-perfume": "F2 no label",
  "floral-glass-perfume": "F2 no label",
  "red-diamond": "F2 house unknown",
  "l-eau-laurissi": "F2 house unknown",
  "tilo-skin-99-9": "F2 house unknown",
  "gucci-guilty": "F3 other bottles",
  "lancome-poeme": "F3 other bottles",
  "montblanc-explorer": "F3 other bottles",
  "roberto-cavalli-gemma-di-paradiso": "F3 other bottle",
  "hugo-boss-bottled": "F3 hand",
  "armani-si": "F4 variant",
  "burberry-weekend": "F4 variant",
  "dior-sauvage": "F4 EDP and Parfum",
  "dolce-gabbana-the-one": "F4 variant",
  "miu-miu": "F4 two variants",
  "prada": "F4 flanker",
  "chanel-coco-noir": "F5 saturated (photo 2)",
  "dolce-gabbana-11-la-force": "F5 saturated (photos 2, 3)",
  "valentino-voce-viva": "F5 saturated (photo 2)",
  "creed-green-irish-tweed": "F5 saturated",
};

const label = (slug: string) => slug.replace(/-/g, " ");

export default function ImageReviewPage() {
  const products = Object.entries(productImages);
  const photoCount = products.reduce((n, [, list]) => n + list.length, 0);

  return (
    <main className="pb-section">
      <header className="border-b border-line px-16 py-30 md:px-32">
        <h1 className="text-subheading tracking-display">Image review</h1>
        <p className="mt-13 max-w-[60ch] text-body-sm">
          {products.length} products, {photoCount} photos, all copied unchanged from ./perfumes. Each frame is 1:1 with
          the whole photo visible; the frame colour is the photo&apos;s own measured edge colour.
        </p>
      </header>

      <section aria-labelledby="cards" className="mt-section">
        <h2 id="cards" className="px-16 pb-17 text-caption uppercase md:px-32">
          Card frames
        </h2>
        <ul className="grid grid-cols-2 gap-px border-y border-line bg-ink lg:grid-cols-5">
          {products.map(([slug, images]) => (
            <li key={slug} className="bg-canvas">
              <ProductFrame
                image={images[0]}
                alt={`${label(slug)}, bottle photograph`}
                sizes="(min-width: 1024px) 20vw, 50vw"
              />
              <div className="px-10 py-13 text-center">
                <p className="text-body-sm">{label(slug)}</p>
                <p className="text-caption">
                  {images.length} {images.length === 1 ? "photo" : "photos"}
                  {FLAGS[slug] ? `, ${FLAGS[slug]}` : ""}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="pdp" className="mt-section">
        <h2 id="pdp" className="px-16 pb-17 text-caption uppercase md:px-32">
          Product page frames
        </h2>
        <div className="border-t border-line">
          {products.map(([slug, images]) => (
            <article key={slug} className="border-b border-line py-30">
              <h3 className="px-16 pb-13 text-body-sm md:px-32">{label(slug)}</h3>
              <ul className="flex snap-x snap-mandatory gap-px overflow-x-auto px-16 md:px-32">
                {images.map((image, i) => (
                  <li key={image.src} className="w-[calc(100vw-32px)] shrink-0 snap-start md:w-[46vw]">
                    <ProductFrame
                      image={image}
                      alt={`${label(slug)}, photo ${i + 1} of ${images.length}`}
                      sizes="(min-width: 768px) 46vw, 100vw"
                    />
                    <p className="pt-7 text-caption">
                      {String(i + 1).padStart(2, "0")} {image.source}, edge {image.frame}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
