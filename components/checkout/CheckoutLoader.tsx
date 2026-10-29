"use client";

import dynamic from "next/dynamic";

function CheckoutSkeleton() {
  return (
    <div className="px-16 pt-20 lg:px-32 lg:pt-32" aria-busy="true" aria-label="Loading checkout">
      <div className="h-[36px] w-1/3 animate-breathe bg-chalk" />
      <div className="mt-20 grid grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-[48px] animate-breathe bg-chalk" />
        ))}
      </div>
      <div className="mt-30 h-[240px] animate-breathe bg-chalk" />
    </div>
  );
}

// The form, validation and card helpers ship in their own chunk.
export const CheckoutLoader = dynamic(() => import("./CheckoutForm").then((m) => m.CheckoutForm), {
  ssr: false,
  loading: CheckoutSkeleton,
});
