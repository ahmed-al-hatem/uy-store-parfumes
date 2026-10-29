"use client";

import Link from "next/link";
import { Dialog } from "radix-ui";
import { CloseIcon } from "@/components/ui/icons";
import { shopMenu } from "@/lib/navigation";

const accountLinks = [
  { label: "Your account", href: "/account" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "The studio", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Phone and tablet navigation: a drawer from the start edge. */
export function MobileMenu() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="inline-flex min-h-touch min-w-touch items-center text-caption uppercase decoration-1 underline-offset-4 hover:underline">
        Menu
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-soot/30 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
        <Dialog.Content className="fixed inset-y-0 start-0 z-50 flex w-[min(100vw,420px)] flex-col overflow-y-auto border-e border-soot bg-limestone data-[state=closed]:animate-drawer-out-start data-[state=open]:animate-drawer-in-start">
          <div className="flex items-center justify-between border-b border-soot px-16">
            <Dialog.Title className="text-caption uppercase">Menu</Dialog.Title>
            <Dialog.Close className="inline-flex min-h-touch min-w-touch items-center justify-end" aria-label="Close menu">
              <CloseIcon />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">Shop by wearer, family and house.</Dialog.Description>
          <nav aria-label="Main" className="flex-1 px-16 py-20">
            {shopMenu.map((group) => (
              <section key={group.title} className="pb-30">
                <h2 className="pb-6 text-caption uppercase">{group.title}</h2>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Dialog.Close asChild>
                        <Link href={link.href} className="flex min-h-touch items-center text-body decoration-1 underline-offset-4 hover:underline">
                          {link.label}
                        </Link>
                      </Dialog.Close>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>
          <ul className="border-t border-soot px-16 py-13">
            {accountLinks.map((link) => (
              <li key={link.href}>
                <Dialog.Close asChild>
                  <Link href={link.href} className="flex min-h-touch items-center text-caption uppercase decoration-1 underline-offset-4 hover:underline">
                    {link.label}
                  </Link>
                </Dialog.Close>
              </li>
            ))}
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
