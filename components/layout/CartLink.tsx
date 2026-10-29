"use client";

import Link from "next/link";
import { BagIcon } from "@/components/ui/icons";
import { selectCartCount, useCart } from "@/store/cart";

export function CartLink() {
  const count = useCart(selectCartCount);
  return (
    <Link
      href="/cart"
      aria-label={count ? `Bag, ${count} ${count === 1 ? "item" : "items"}` : "Bag, empty"}
      className="inline-flex min-h-touch min-w-touch items-center justify-center gap-4 text-caption hover:underline decoration-1 underline-offset-4"
    >
      <BagIcon />
      {count > 0 && <span aria-hidden="true">{count}</span>}
    </Link>
  );
}
