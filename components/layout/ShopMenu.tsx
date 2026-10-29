"use client";

import Link from "next/link";
import { NavigationMenu } from "radix-ui";
import { ProductFrame } from "@/components/product/ProductFrame";
import { primaryLinks, shopMenu } from "@/lib/navigation";
import type { SourceImage } from "@/lib/types";
import { NavItem } from "./NavItem";

/**
 * Desktop category navigation: "Shop ▾" opens a full-width panel under the header.
 * `featured` comes from the server so the image manifest stays out of the client bundle.
 */
export function ShopMenu({ featured }: { featured: SourceImage }) {
  return (
    <NavigationMenu.Root className="static" aria-label="Shop">
      <NavigationMenu.List className="flex items-center gap-13">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="group inline-flex min-h-touch items-center">
            <span className="label link-grow text-muted hover:text-ink group-data-[state=open]:text-ink">Shop</span>
            <span aria-hidden="true" className="ms-4 text-[10px] text-muted transition-transform duration-[var(--duration-base)] group-data-[state=open]:rotate-180">▾</span>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="grid grid-cols-4 gap-48 px-32 py-48 data-[state=open]:animate-fade-in">
            {shopMenu.map((group) => (
              <div key={group.title}>
                <p className="text-title pb-13">{group.title}</p>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <NavigationMenu.Link asChild>
                        <Link href={link.href} className="link-grow inline-block py-6 text-body-sm text-muted hover:text-ink">
                          {link.label}
                        </Link>
                      </NavigationMenu.Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <NavigationMenu.Link asChild>
              <Link href="/product/maison-margiela-replica-jazz-club" className="group block">
                <ProductFrame image={featured} alt="Maison Margiela Replica Jazz Club, bottle beside its box" sizes="20vw" matted zoom />
                <span className="font-display block pt-13 text-title">
                  Jazz Club, rum and tobacco leaf
                </span>
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        {primaryLinks.map((link) => (
          <NavigationMenu.Item key={link.href}>
            <NavigationMenu.Link asChild>
              <NavItem href={link.href}>{link.label}</NavItem>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
      <NavigationMenu.Viewport className="absolute inset-x-0 top-full border-b border-line bg-canvas shadow-float data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
    </NavigationMenu.Root>
  );
}
