import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/content/ContentPage";
import { ProductAccordions } from "@/components/product/ProductAccordions";
import { formatPrice, storeConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Questions",
  description: "Answers about authenticity, samples, concentrations, delivery, returns and caring for perfume.",
};

const link = "underline decoration-1 underline-offset-4";

const questions = [
  {
    id: "authentic",
    title: "Are your fragrances authentic?",
    content: (
      <p className="max-w-[60ch]">
        Yes. Every bottle comes from the house itself or its authorised distributor, in its original sealed packaging. Our own UY line is blended for us in
        Grasse and filled in Berlin.
      </p>
    ),
  },
  {
    id: "samples",
    title: "How do the free samples work?",
    content: (
      <p className="max-w-[60ch]">
        Choose {storeConfig.freeSamples} samples in your bag before checking out; they arrive with your order. If you try a sample and it is not for you,
        the sealed full bottle can come back for free.
      </p>
    ),
  },
  {
    id: "concentration",
    title: "What is the difference between cologne, eau de toilette and eau de parfum?",
    content: (
      <p className="max-w-[60ch]">
        The share of perfume oil. Colognes are the lightest and brightest, eaux de toilette sit in the middle, eaux de parfum are richer and last longer,
        and parfum is the most concentrated. Each product page shows how long it lasts and how far it travels.
      </p>
    ),
  },
  {
    id: "choose",
    title: "How do I choose without smelling it first?",
    content: (
      <p className="max-w-[60ch]">
        Start from a family you already love in the{" "}
        <Link href="/shop" className={link}>
          shop
        </Link>
        , read the notes pyramid on each page, then add the sample of your shortlist to your next order. Or visit the studio and we will help you choose.
      </p>
    ),
  },
  {
    id: "delivery",
    title: "How long does delivery take?",
    content: (
      <p className="max-w-[60ch]">
        Standard delivery takes 2 to 3 working days and is free over {formatPrice(storeConfig.freeShippingThreshold)}. Express arrives the next working day
        when ordered before 14:00. Details on{" "}
        <Link href="/shipping-returns" className={link}>
          shipping and returns
        </Link>
        .
      </p>
    ),
  },
  {
    id: "returns",
    title: "Can I return a perfume?",
    content: <p className="max-w-[60ch]">Sealed bottles can be returned within 30 days for a full refund. Opened bottles can only be returned if faulty.</p>,
  },
  {
    id: "care",
    title: "How should I store my perfume?",
    content: (
      <p className="max-w-[60ch]">
        Away from light and heat, with the cap on. A drawer or a cupboard is better than a bathroom shelf. Kept well, most fragrances stay true for several
        years.
      </p>
    ),
  },
  {
    id: "payment",
    title: "Which payment methods do you accept?",
    content: (
      <p className="max-w-[60ch]">
        Visa, Mastercard, American Express, Apple Pay, Google Pay, PayPal, {storeConfig.regionalWallet.label} and cash on delivery in selected countries.
      </p>
    ),
  },
];

export default function FaqPage() {
  return (
    <ContentPage
      title="Questions"
      intro="The things people ask us most. Anything else, write to us and a person in the studio will answer."
      aside={
        <Link href="/contact" className="inline-flex min-h-touch items-center text-caption uppercase underline decoration-1 underline-offset-4">
          Contact the studio
        </Link>
      }
    >
      <ProductAccordions sections={questions} />
    </ContentPage>
  );
}
