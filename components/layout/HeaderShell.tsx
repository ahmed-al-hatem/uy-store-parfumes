"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sticky header that slides away while reading down the page and returns on
 * the first scroll up. It stays put near the top, and while a menu, drawer or
 * dialog is open. Transform only; sets `data-header-hidden` on <html> so
 * toolbars that stick under the header can follow it.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      const y = window.scrollY;
      const header = ref.current;
      const somethingOpen =
        document.body.hasAttribute("data-scroll-locked") || !!header?.querySelector('[data-state="open"]') || !!header?.contains(document.activeElement);
      const hide = !somethingOpen && y > 240 && y > lastY + 4;
      const show = somethingOpen || y < 240 || y < lastY - 4;
      if (hide) root.dataset.headerHidden = "";
      else if (show) delete root.dataset.headerHidden;
      lastY = y;
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      delete root.dataset.headerHidden;
    };
  }, []);

  return (
    <header ref={ref} className="header-shell sticky top-0 z-40 border-b border-line bg-canvas">
      {children}
    </header>
  );
}
