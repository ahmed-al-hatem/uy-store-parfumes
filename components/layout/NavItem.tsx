"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type NavItemProps = ComponentProps<typeof Link> & { href: string };

/** Uppercase 13px nav link: underline on hover, permanent underline when current (DESIGN.md). */
export function NavItem({ href, className = "", children, ...props }: NavItemProps) {
  const pathname = usePathname();
  const current = pathname === href.split("?")[0];
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={`inline-flex min-h-touch items-center text-caption uppercase decoration-1 underline-offset-4 hover:underline aria-[current=page]:underline ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
