"use client";

import Link from "next/link";
import { BagIcon } from "@/components/ui/icons";
import { selectCartCount, useCart, useCartDrawer } from "@/store/cart";

/** Opens the bag drawer; still a real link to /cart for new tabs and no-JS. */
export function CartLink() {
  const count = useCart(selectCartCount);
  const setOpen = useCartDrawer((s) => s.setOpen);
  return (
    <Link
      href="/cart"
      data-cart-target
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        setOpen(true);
      }}
      aria-label={count ? `Bag, ${count} ${count === 1 ? "item" : "items"}` : "Bag, empty"}
      className="inline-flex min-h-touch min-w-touch items-center justify-center gap-4 text-caption decoration-1 underline-offset-4 hover:underline"
    >
      <BagIcon />
      {count > 0 && <span aria-hidden="true">{count}</span>}
    </Link>
  );
}
