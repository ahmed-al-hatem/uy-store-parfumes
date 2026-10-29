"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartLine = {
  /** `${slug}:${sizeMl}` */
  id: string;
  slug: string;
  sizeMl: number;
  quantity: number;
};

type CartState = {
  lines: CartLine[];
};

// Phase (e) adds the actions; the header only needs the count for now.
export const useCart = create<CartState>()(
  persist((): CartState => ({ lines: [] }), {
    name: "uy-cart",
    storage: createJSONStorage(() => localStorage),
    // Rehydrated on the client by <StoreHydrator/> so server and first client render match.
    skipHydration: true,
  }),
);

export const selectCartCount = (s: CartState) => s.lines.reduce((n, l) => n + l.quantity, 0);
