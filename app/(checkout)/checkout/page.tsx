import type { Metadata } from "next";
import { CheckoutLoader } from "@/components/checkout/CheckoutLoader";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return <CheckoutLoader />;
}
