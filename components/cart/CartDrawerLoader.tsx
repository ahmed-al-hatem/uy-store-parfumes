"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useCartDrawer } from "@/store/cart";

const CartDrawer = dynamic(() => import("./CartDrawer").then((m) => m.CartDrawer), { ssr: false });

/** The drawer's code is fetched the first time the bag is opened, not on every page load. */
export function CartDrawerLoader() {
  const open = useCartDrawer((s) => s.open);
  const [requested, setRequested] = useState(false);
  if (open && !requested) setRequested(true);
  return requested ? <CartDrawer /> : null;
}
