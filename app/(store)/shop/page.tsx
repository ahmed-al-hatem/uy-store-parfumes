import type { Metadata } from "next";
import { ShopPage } from "@/components/shop/ShopPage";

export const metadata: Metadata = {
  title: "All fragrance",
  description: "Sixty-nine fragrances from the houses we admire and our own small line. Filter by family, note, house and size.",
};

export default function AllFragrancePage() {
  return (
    <ShopPage
      heading="All fragrance"
      intro="Sixty-nine bottles from the houses we admire and our own small line. Filter by family, note or house, or search for the one you remember."
    />
  );
}
