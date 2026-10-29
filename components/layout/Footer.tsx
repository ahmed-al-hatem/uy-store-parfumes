import Link from "next/link";
import { footerColumns } from "@/lib/navigation";
import { HideOnHome } from "./HideOnHome";
import { NewsletterForm } from "./NewsletterForm";

const linkClass = "link-grow text-canvas/70 hover:text-canvas";

/** Ink band: newsletter, three link columns, and the wordmark set large as the page's closing line. */
export function Footer() {
  return (
    <footer className="mt-section bg-ink text-canvas">
      <div className="grid gap-30 px-16 pb-48 pt-64 md:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none lg:px-32">
        <HideOnHome>
          <section aria-labelledby="footer-letter" className="md:col-span-2 lg:col-span-1">
            <h2 id="footer-letter" className="text-title">
              The letter
            </h2>
            <p className="pb-13 pt-10 text-body-sm text-canvas/70">New arrivals and studio evenings, four times a year.</p>
            <NewsletterForm tone="dark" />
          </section>
        </HideOnHome>
        {footerColumns.map((column) => (
          <section key={column.title} aria-labelledby={`footer-${column.title}`}>
            <h2 id={`footer-${column.title}`} className="label text-canvas">
              {column.title}
            </h2>
            <ul className="pt-17 text-body-sm">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={`inline-flex min-h-touch items-center lg:min-h-0 lg:py-6 ${linkClass}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p aria-hidden="true" className="font-display select-none overflow-hidden whitespace-nowrap px-16 text-[clamp(64px,15vw,240px)] leading-[0.85] tracking-[0.02em] text-accent lg:px-32">
        UY Studio
      </p>
      <div className="flex flex-wrap items-center justify-between gap-13 border-t border-canvas/15 px-16 py-17 text-caption text-canvas/70 lg:px-32">
        <p>© 2026 UY Studio, Berlin</p>
        <ul className="flex gap-20">
          <li>
            <Link href="/shipping-returns" className={linkClass}>
              Shipping and returns
            </Link>
          </li>
          <li>
            <Link href="/faq" className={linkClass}>
              Questions
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
