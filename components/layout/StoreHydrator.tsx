"use client";

import { useEffect } from "react";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";

/** Loads persisted stores from localStorage after the first client render. */
export function StoreHydrator() {
  useEffect(() => {
    void useCart.persist.rehydrate();
    void useWishlist.persist.rehydrate();
  }, []);
  return null;
}
