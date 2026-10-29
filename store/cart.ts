"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { storeConfig } from "@/lib/config";

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
  giftWrap: boolean;
  giftMessage: string;
  promoCode: string | null;
  /** Slugs of the free samples, at most `storeConfig.freeSamples`. */
  samples: string[];
  add: (line: Omit<CartLine, "id" | "quantity">, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  /** Puts a removed line back where it was (undo). */
  restore: (line: CartLine, index: number) => void;
  setGiftWrap: (on: boolean) => void;
  setGiftMessage: (message: string) => void;
  setPromoCode: (code: string | null) => void;
  toggleSample: (slug: string) => void;
  clear: () => void;
};

export const MAX_QUANTITY = 10;
export const GIFT_MESSAGE_MAX = 200;

export const lineId = (slug: string, sizeMl: number, concentration?: string) => `${slug}:${sizeMl}:${concentration ?? ""}`;

const empty = { lines: [], giftWrap: false, giftMessage: "", promoCode: null, samples: [] };

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      ...empty,
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
      restore: (line, index) =>
        set((s) => {
          if (s.lines.some((l) => l.id === line.id)) return s;
          const lines = [...s.lines];
          lines.splice(Math.min(index, lines.length), 0, line);
          return { lines };
        }),
      setGiftWrap: (giftWrap) => set({ giftWrap }),
      setGiftMessage: (giftMessage) => set({ giftMessage: giftMessage.slice(0, GIFT_MESSAGE_MAX) }),
      setPromoCode: (promoCode) => set({ promoCode }),
      toggleSample: (slug) =>
        set((s) =>
          s.samples.includes(slug)
            ? { samples: s.samples.filter((x) => x !== slug) }
            : s.samples.length >= storeConfig.freeSamples
              ? s
              : { samples: [...s.samples, slug] },
        ),
      clear: () => set(empty),
    }),
    {
      name: "uy-cart",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: ({ lines, giftWrap, giftMessage, promoCode, samples }) => ({ lines, giftWrap, giftMessage, promoCode, samples }),
      migrate: (persisted) => ({ ...empty, ...(persisted as object) }),
      // Rehydrated on the client by <StoreHydrator/> so server and first client render match.
      skipHydration: true,
    },
  ),
);

export const selectCartCount = (s: CartState) => s.lines.reduce((n, l) => n + l.quantity, 0);

type Removed = { line: CartLine; index: number; name: string };

const UNDO_MS = 6000;
let undoTimer: ReturnType<typeof setTimeout> | undefined;

/**
 * The last removed line, kept for a few seconds so it can be put back. Lives
 * outside the line list so "Undo" survives the bag becoming empty.
 */
export const useCartUndo = create<{
  removed: Removed | null;
  remember: (removed: Removed) => void;
  undo: () => void;
  dismiss: () => void;
}>((set, get) => ({
  removed: null,
  remember: (removed) => {
    clearTimeout(undoTimer);
    set({ removed });
    undoTimer = setTimeout(() => set({ removed: null }), UNDO_MS);
  },
  undo: () => {
    const r = get().removed;
    if (!r) return;
    clearTimeout(undoTimer);
    useCart.getState().restore(r.line, r.index);
    set({ removed: null });
  },
  dismiss: () => set({ removed: null }),
}));

/** Drawer visibility; not persisted. */
export const useCartDrawer = create<{ open: boolean; setOpen: (open: boolean) => void }>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
