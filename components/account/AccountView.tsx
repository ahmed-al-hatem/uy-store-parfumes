"use client";

import Link from "next/link";
import { Tabs } from "radix-ui";
import { useState, useSyncExternalStore, type FormEvent } from "react";
import { InputField } from "@/components/checkout/Field";
import { ProductFrame } from "@/components/product/ProductFrame";
import { formatPrice, storeConfig } from "@/lib/config";
import { readOrders, type Order } from "@/lib/orders";

// Mock account: a name in localStorage stands in for a session. No password is
// stored or sent anywhere.
const SESSION_KEY = "uy-account";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const dateFormat = new Intl.DateTimeFormat(storeConfig.locale, { day: "numeric", month: "long", year: "numeric" });

type Session = { name: string; email: string };

let listeners: (() => void)[] = [];
const emit = () => listeners.forEach((l) => l());
const subscribe = (cb: () => void) => {
  listeners.push(cb);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
};
const readSession = () => {
  try {
    return localStorage.getItem(SESSION_KEY) ?? "";
  } catch {
    return "";
  }
};
const writeSession = (s: Session | null) => {
  try {
    if (s) localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    // Storage blocked: the session lasts until reload.
  }
  emit();
};

function useOrders(): Order[] | null {
  const raw = useSyncExternalStore(
    subscribe,
    () => JSON.stringify(readOrders()),
    () => "",
  );
  return raw ? (JSON.parse(raw) as Order[]) : null;
}

function AuthForms({ onSignedIn }: { onSignedIn: (s: Session) => void }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>, mode: "login" | "register") {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const name = String(data.get("name") ?? "").trim();
    const next: Record<string, string> = {};
    if (!EMAIL.test(email)) next.email = "Enter an email address like name@example.com.";
    if (password.length < 8) next.password = "Use at least 8 characters.";
    if (mode === "register" && !name) next.name = "Enter your first name.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setBusy(true);
    await new Promise((r) => setTimeout(r, 700));
    setBusy(false);
    onSignedIn({ name: mode === "register" ? name : email.split("@")[0], email });
  }

  const submitClass =
    "mt-17 min-h-[52px] w-full bg-graphite px-16 text-body-sm text-chalk transition-transform duration-[var(--duration-fast)] active:translate-y-px disabled:opacity-60";

  return (
    <Tabs.Root defaultValue="login" className="max-w-[440px]" onValueChange={() => setErrors({})}>
      <Tabs.List className="flex gap-30 border-b border-soot" aria-label="Account">
        {["login", "register"].map((v) => (
          <Tabs.Trigger
            key={v}
            value={v}
            className="min-h-touch text-caption uppercase decoration-1 underline-offset-[14px] data-[state=active]:underline"
          >
            {v === "login" ? "Log in" : "Create account"}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <Tabs.Content value="login" className="pt-20">
        <form onSubmit={(e) => submit(e, "login")} noValidate className="flex flex-col gap-13">
          <InputField label="E-mail" name="email" type="email" autoComplete="email" error={errors.email} />
          <InputField label="Password" name="password" type="password" autoComplete="current-password" error={errors.password} />
          <button type="submit" disabled={busy} className={submitClass}>
            {busy ? "Logging in…" : "Log in"}
          </button>
          <p className="text-caption">This is a demo: any address and an 8-character password will do. Nothing is sent.</p>
        </form>
      </Tabs.Content>
      <Tabs.Content value="register" className="pt-20">
        <form onSubmit={(e) => submit(e, "register")} noValidate className="flex flex-col gap-13">
          <InputField label="First name" name="name" autoComplete="given-name" error={errors.name} />
          <InputField label="E-mail" name="email" type="email" autoComplete="email" error={errors.email} />
          <InputField label="Password" name="password" type="password" autoComplete="new-password" hint="At least 8 characters." error={errors.password} />
          <button type="submit" disabled={busy} className={submitClass}>
            {busy ? "Creating your account…" : "Create account"}
          </button>
        </form>
      </Tabs.Content>
    </Tabs.Root>
  );
}

function OrderHistory({ orders }: { orders: Order[] | null }) {
  if (orders == null) return <div className="h-[160px] animate-breathe bg-chalk" aria-busy="true" />;
  if (!orders.length) {
    return (
      <p className="text-body-sm">
        No orders yet in this browser.{" "}
        <Link href="/shop" className="underline decoration-1 underline-offset-4">
          Browse all fragrance
        </Link>
      </p>
    );
  }
  return (
    <ul className="border-t border-soot">
      {orders.map((o) => (
        <li key={o.number} className="border-b border-soot py-17">
          <div className="flex flex-wrap items-baseline justify-between gap-x-13 gap-y-4">
            <Link href={`/checkout/confirmation?order=${o.number}`} className="text-body-sm underline decoration-1 underline-offset-4">
              Order {o.number}
            </Link>
            <span className="text-caption">
              {dateFormat.format(new Date(o.placedAt))}, {formatPrice(o.totals.total)}, preparing
            </span>
          </div>
          <ul className="flex gap-6 pt-10">
            {o.lines.map((l) => (
              <li key={`${l.slug}-${l.sizeMl}`} className="w-[64px]">
                <ProductFrame image={{ ...l.image, source: "", luminance: 0 }} alt={`${l.brandName} ${l.name}`} sizes="64px" />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export function AccountView() {
  const raw = useSyncExternalStore(subscribe, readSession, () => null);
  const session = raw ? (JSON.parse(raw) as Session) : null;
  const orders = useOrders();

  if (raw === null) return <div className="h-[50dvh] animate-breathe bg-chalk" aria-busy="true" />;

  return (
    <div className="grid gap-section px-16 pb-section pt-30 lg:grid-cols-2 lg:gap-32 lg:px-32 lg:pt-32">
      <section aria-labelledby="account-title">
        <h1 id="account-title" className="pb-20 text-subheading tracking-display lg:text-heading">
          {session ? `Welcome back, ${session.name}.` : "Your account"}
        </h1>
        {session ? (
          <div className="text-body-sm">
            <p>Signed in as {session.email}.</p>
            <button type="button" onClick={() => writeSession(null)} className="mt-13 min-h-touch text-caption uppercase underline decoration-1 underline-offset-4">
              Log out
            </button>
          </div>
        ) : (
          <AuthForms onSignedIn={writeSession} />
        )}
      </section>
      <section aria-labelledby="orders-title">
        <h2 id="orders-title" className="pb-13 text-caption uppercase">
          Order history
        </h2>
        <OrderHistory orders={orders} />
      </section>
    </div>
  );
}
