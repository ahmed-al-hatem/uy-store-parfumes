import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage, Prose } from "@/components/content/ContentPage";
import { ProductFrame } from "@/components/product/ProductFrame";
import { atmosphereImages } from "@/data/product-images.generated";

export const metadata: Metadata = {
  title: "The studio",
  description: "A concrete room on Linienstraße, a short list of perfumes we would wear ourselves, and a small line of our own.",
};

export default function AboutPage() {
  return (
    <ContentPage
      title="The studio"
      intro="A concrete room on Linienstraße, a short list of perfumes we would wear ourselves, and a small line of our own."
      aside={<ProductFrame image={atmosphereImages["perfume-oil-dropper"]} alt="Glass vials and a dropper of perfume oil in the studio" sizes="(min-width: 1024px) 40vw, 100vw" />}
    >
      <Prose>
        <h2>How it began</h2>
        <p>
          UY opened in 2019 as a single shelf in a former print workshop in Mitte. The walls were left as we found them: raw concrete, old plaster, a
          window that catches the afternoon. We wanted a place where a bottle could stand on its own and be smelled slowly, without a sales counter between
          you and it.
        </p>
        <p>
          The name is two letters because the room asks for very little. Our own fragrances follow the same rule: each one is a single letter, A for amber,
          S for sun, C for cut glass, and so on, written on the label in the same plain type you are reading now.
        </p>
        <h2>What we stock</h2>
        <p>
          Sixty-nine fragrances, chosen one at a time. Some are icons that changed perfumery; some are quiet colognes; a few come from small houses we found
          along the way. If we would not wear it, it is not on the shelf.
        </p>
        <h2>Our own line</h2>
        <p>
          The UY letters are blended with a perfumer in Grasse and filled by hand in Berlin, in batches of a few hundred bottles. When a batch is gone, the
          next one takes a few weeks. We would rather wait than rush it.
        </p>
        <h2>Every order</h2>
        <p>
          Is wrapped in the studio, with two samples of your choice, so the next bottle you buy is one you have already lived with for a few days. Unopened
          bottles can always come back.
        </p>
        <p>
          <Link href="/shop" className="underline decoration-1 underline-offset-4">
            Browse all fragrance
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="underline decoration-1 underline-offset-4">
            visit the studio
          </Link>
          .
        </p>
      </Prose>
    </ContentPage>
  );
}
