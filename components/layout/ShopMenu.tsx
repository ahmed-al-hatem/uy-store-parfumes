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
          <NavigationMenu.Trigger className="group inline-flex min-h-touch items-center text-caption uppercase decoration-1 underline-offset-4 hover:underline data-[state=open]:underline">
            Shop&nbsp;<span aria-hidden="true">▾</span>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="grid grid-cols-4 gap-32 px-32 py-30 data-[state=open]:animate-fade-in">
            {shopMenu.map((group) => (
              <div key={group.title}>
                <p className="pb-10 text-caption uppercase">{group.title}</p>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <NavigationMenu.Link asChild>
                        <Link href={link.href} className="block py-4 text-body-sm decoration-1 underline-offset-4 hover:underline">
                          {link.label}
                        </Link>
                      </NavigationMenu.Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <NavigationMenu.Link asChild>
              <Link href="/product/maison-margiela-replica-jazz-club" className="group/feature block">
                <ProductFrame image={featured} alt="Maison Margiela Replica Jazz Club, bottle beside its box" sizes="20vw" />
                <span className="block pt-10 text-body-sm decoration-1 underline-offset-4 group-hover/feature:underline">
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
      <NavigationMenu.Viewport className="absolute inset-x-0 top-full border-b border-soot bg-limestone data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
    </NavigationMenu.Root>
  );
}
