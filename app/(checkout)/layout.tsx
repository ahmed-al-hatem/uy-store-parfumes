import Link from "next/link";
import { StoreHydrator } from "@/components/layout/StoreHydrator";

/** Checkout keeps only the wordmark and a way back: no navigation to wander off into. */
export default function CheckoutLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <header className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-soot px-16 lg:px-32">
        <Link href="/cart" className="inline-flex min-h-touch items-center text-caption uppercase decoration-1 underline-offset-4 hover:underline">
          <span aria-hidden="true">←&nbsp;</span>Bag
        </Link>
        <Link href="/" className="inline-flex min-h-touch items-center px-16 text-subheading tracking-display" aria-label="UY Studio, home">
          UY
        </Link>
        <span className="text-end text-caption">Secure checkout</span>
      </header>
      <main id="content">{children}</main>
      <StoreHydrator />
    </>
  );
}
