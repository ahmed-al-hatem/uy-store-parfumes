import type { Metadata } from "next";
import Link from "next/link";
import { StoreChrome } from "@/components/layout/StoreChrome";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <StoreChrome>
      <section className="px-16 pt-section lg:px-32">
        <h1 className="text-subheading tracking-display lg:text-heading">This page is not on the shelf.</h1>
        <p className="max-w-[48ch] pt-17 text-body">
          The address may have changed, or the fragrance has left the collection. The rest of the studio is still open.
        </p>
        <ul className="flex flex-wrap gap-x-30 pt-30 text-body-sm">
          <li>
            <Link href="/shop" className="inline-flex min-h-touch items-center underline decoration-1 underline-offset-4">
              Browse all fragrance
            </Link>
          </li>
          <li>
            <Link href="/" className="inline-flex min-h-touch items-center decoration-1 underline-offset-4 hover:underline">
              Return to the studio
            </Link>
          </li>
        </ul>
      </section>
    </StoreChrome>
  );
}
