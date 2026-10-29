"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartLine = {
  /** `${slug}:${sizeMl}:${concentration}` */
  id: string;
  slug: string;
  sizeMl: number;
  /** Set when the size is a different concentration from the product default. */
  concentration?: string;
  quantity: number;
};

type CartState = {
  lines: CartLine[];
  add: (line: Omit<CartLine, "id" | "quantity">, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const MAX_QUANTITY = 10;

export const lineId = (slug: string, sizeMl: number, concentration?: string) => `${slug}:${sizeMl}:${concentration ?? ""}`;

// Phase (e) adds gift options, promo codes and samples.
export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: (line, quantity = 1) =>
        set((s) => {
          const id = lineId(line.slug, line.sizeMl, line.concentration);
          const existing = s.lines.find((l) => l.id === id);
          return {
            lines: existing
              ? s.lines.map((l) => (l.id === id ? { ...l, quantity: Math.min(MAX_QUANTITY, l.quantity + quantity) } : l))
              : [...s.lines, { ...line, id, quantity }],
          };
        }),
      setQuantity: (id, quantity) =>
        set((s) => ({ lines: s.lines.map((l) => (l.id === id ? { ...l, quantity: Math.max(1, Math.min(MAX_QUANTITY, quantity)) } : l)) })),
      remove: (id) => set((s) => ({ lines: s.lines.filter((l) => l.id !== id) })),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "uy-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ lines: s.lines }),
      // Rehydrated on the client by <StoreHydrator/> so server and first client render match.
      skipHydration: true,
    },
  ),
);

export const selectCartCount = (s: CartState) => s.lines.reduce((n, l) => n + l.quantity, 0);
