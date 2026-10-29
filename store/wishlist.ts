"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type WishlistState = {
  slugs: string[];
  toggle: (slug: string) => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set) => ({
      slugs: [],
      toggle: (slug) => set((s) => ({ slugs: s.slugs.includes(slug) ? s.slugs.filter((x) => x !== slug) : [slug, ...s.slugs] })),
    }),
    {
      name: "uy-wishlist",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ slugs: s.slugs }),
      skipHydration: true,
    },
  ),
);
