import type { Totals } from "./pricing";

// Mock order storage in the browser. A real backend replaces saveOrder/getOrder.

export type OrderLine = {
  slug: string;
  name: string;
  brandName: string;
  sizeMl: number;
  concentration?: string;
  quantity: number;
  unitPrice: number;
  image: { src: string; frame: string; width: number; height: number; blurDataURL: string };
};

export type Order = {
  number: string;
  placedAt: string;
  email: string;
  firstName: string;
  address: string[];
  shippingMethod: string;
  payment: string;
  lines: OrderLine[];
  samples: string[];
  giftMessage: string | null;
  totals: Totals;
};

const KEY = "uy-orders";

export function readOrders(): Order[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order) {
  try {
    localStorage.setItem(KEY, JSON.stringify([order, ...readOrders()].slice(0, 20)));
  } catch {
    // Storage blocked: the confirmation page falls back to sessionStorage below.
  }
  try {
    sessionStorage.setItem(`${KEY}-last`, JSON.stringify(order));
  } catch {
    // Nothing else to do in a locked-down browser.
  }
}

export function getOrder(number: string): Order | null {
  const fromList = readOrders().find((o) => o.number === number);
  if (fromList) return fromList;
  try {
    const last = JSON.parse(sessionStorage.getItem(`${KEY}-last`) ?? "null") as Order | null;
    return last?.number === number ? last : null;
  } catch {
    return null;
  }
}

export function newOrderNumber() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `UY-${n}`;
}
