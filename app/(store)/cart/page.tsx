import type { Metadata } from "next";
import { CartPageView } from "@/components/cart/CartPageView";

export const metadata: Metadata = { title: "Your bag", robots: { index: false } };

export default function CartPage() {
  return (
    // Reserve the space the saved bag will fill, so the footer does not jump (CLS).
    <div className="min-h-[80dvh]">
      <CartPageView />
    </div>
  );
}
