"use client";

import { useEffect } from "react";
import { useCart } from "@/store/cart";

/** Loads persisted stores from localStorage after the first client render. */
export function StoreHydrator() {
  useEffect(() => {
    void useCart.persist.rehydrate();
  }, []);
  return null;
}
