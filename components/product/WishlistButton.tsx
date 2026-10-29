"use client";

import { HeartIcon } from "@/components/ui/icons";
import { useWishlist } from "@/store/wishlist";

export function WishlistButton({ slug, name, className = "" }: { slug: string; name: string; className?: string }) {
  const saved = useWishlist((s) => s.slugs.includes(slug));
  const toggle = useWishlist((s) => s.toggle);
  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      className={`inline-flex min-h-touch items-center gap-7 text-caption uppercase decoration-1 underline-offset-4 hover:underline ${className}`}
    >
      <HeartIcon filled={saved} />
      <span>{saved ? "Saved" : "Save"}</span>
    </button>
  );
}
