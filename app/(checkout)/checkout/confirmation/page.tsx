import type { Metadata } from "next";
import { Suspense } from "react";
import { ConfirmationView } from "@/components/checkout/ConfirmationView";

export const metadata: Metadata = { title: "Order confirmed", robots: { index: false } };

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="h-[60dvh] animate-breathe bg-surface" aria-busy="true" />}>
      <ConfirmationView />
    </Suspense>
  );
}
