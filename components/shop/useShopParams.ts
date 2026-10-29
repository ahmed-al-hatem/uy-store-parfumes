"use client";

import { useQueryStates } from "nuqs";
import { shopParsers } from "@/lib/shop/query";

/**
 * All shop state lives in the URL: shareable, and the back button undoes the
 * last change. Shallow updates: the page is static, data comes from lib/api.
 */
export function useShopParams() {
  return useQueryStates(shopParsers, { shallow: true, history: "push", scroll: false });
}
