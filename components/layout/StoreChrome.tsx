import type { ReactNode } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { StoreHydrator } from "./StoreHydrator";

/** Announcement, sticky header, page, footer. Shared by the store layout and the 404 page. */
export function StoreChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:start-16 focus:top-16 focus:z-50 focus:bg-limestone focus:px-13 focus:py-7 focus:text-caption"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <Header />
      <main id="content" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <Footer />
      <StoreHydrator />
    </>
  );
}
