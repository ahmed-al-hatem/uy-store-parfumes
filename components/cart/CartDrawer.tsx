"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dialog } from "radix-ui";
import { CloseIcon } from "@/components/ui/icons";
import { useCartDrawer } from "@/store/cart";
import { CartLines, UndoNotice } from "./CartLines";
import { FreeShippingBar } from "./FreeShippingBar";
import { OrderSummary } from "./OrderSummary";
import { useCartPricing } from "./useCartPricing";

/** Slide-over bag from the end edge. Opens when something is added. */
export function CartDrawer() {
  const router = useRouter();
  const open = useCartDrawer((s) => s.open);
  const setOpen = useCartDrawer((s) => s.setOpen);
  const { ready, hydrated, priced, totals, count } = useCartPricing();
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
        <Dialog.Content className="fixed inset-y-0 end-0 z-50 flex w-[min(100vw,440px)] flex-col border-s border-line bg-canvas shadow-float data-[state=closed]:animate-drawer-out-end data-[state=open]:animate-drawer-in-end">
          <div className="flex items-center justify-between border-b border-line px-16">
            <Dialog.Title className="text-caption uppercase">
              Your bag{count > 0 && <span className="normal-case"> ({count})</span>}
            </Dialog.Title>
            <Dialog.Close className="inline-flex min-h-touch min-w-touch items-center justify-end" aria-label="Close bag">
              <CloseIcon />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">Review the items in your bag before checking out.</Dialog.Description>

          {hydrated && count === 0 ? (
            <div className="flex flex-1 flex-col justify-center px-16 text-center">
              <div className="pb-17 text-start">
                <UndoNotice />
              </div>
              <p className="text-subheading tracking-display">Your bag is empty.</p>
              <p className="pt-10 text-body-sm">Every order ships with two samples of your choice.</p>
              <Link href="/shop" onClick={close} className="mt-17 min-h-touch text-caption uppercase underline decoration-1 underline-offset-4">
                Browse all fragrance
              </Link>
            </div>
          ) : (
            <>
              <div className="px-16 py-13">
                <FreeShippingBar totals={totals} />
              </div>
              <div className="flex-1 overflow-y-auto px-16">
                {ready ? (
                  <CartLines priced={priced} compact onNavigate={close} />
                ) : (
                  <div className="h-[120px] animate-breathe border-y border-line bg-surface" aria-label="Loading your bag" />
                )}
              </div>
              <div className="border-t border-line px-16 pb-16 pt-13">
                <OrderSummary totals={totals} />
                <button
                  type="button"
                  disabled={!ready}
                  onClick={() => {
                    close();
                    router.push("/checkout");
                  }}
                  className="btn btn-primary mt-13 w-full"
                >
                  Checkout
                </button>
                <Link
                  href="/cart"
                  onClick={close}
                  className="mt-7 flex min-h-touch items-center justify-center text-caption uppercase underline decoration-1 underline-offset-4"
                >
                  View bag, samples and gift options
                </Link>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
