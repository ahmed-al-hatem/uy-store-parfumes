"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type NavItemProps = ComponentProps<typeof Link> & { href: string };

/** Tracked uppercase nav label: muted, ink on hover, an underline that grows in; stays underlined when current. */
export function NavItem({ href, className = "", children, ...props }: NavItemProps) {
  const pathname = usePathname();
  // Links that carry a query (e.g. ?focus=search) are actions, never "current".
  const current = !href.includes("?") && pathname === href;
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={`inline-flex min-h-touch items-center ${className}`}
      {...props}
    >
      <span className={`label link-grow ${current ? "is-current text-ink" : "text-muted hover:text-ink"}`}>
        {children}
      </span>
    </Link>
  );
}
