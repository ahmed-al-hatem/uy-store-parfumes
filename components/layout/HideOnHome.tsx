"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** The home page has its own newsletter band, so the footer's copy steps aside there. */
export function HideOnHome({ children }: { children: ReactNode }) {
  return usePathname() === "/" ? null : <>{children}</>;
}
