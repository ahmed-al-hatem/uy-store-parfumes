import Link from "next/link";
import { footerColumns } from "@/lib/navigation";
import { NewsletterForm } from "./NewsletterForm";

const linkClass = "decoration-1 underline-offset-4 hover:underline";

/** Three link columns and the newsletter, on the Limestone canvas (DESIGN.md "Footer Link Column"). */
export function Footer() {
  return (
    <footer className="mt-section border-t border-soot">
      <div className="grid gap-30 px-16 py-30 md:grid-cols-2 lg:grid-cols-4 lg:px-32 lg:py-32">
        <section aria-labelledby="footer-letter" className="md:col-span-2 lg:col-span-1">
          <h2 id="footer-letter" className="text-caption uppercase">
            The letter
          </h2>
          <p className="pb-13 pt-17 text-body-sm">New arrivals and studio evenings, four times a year.</p>
          <NewsletterForm />
        </section>
        {footerColumns.map((column) => (
          <section key={column.title} aria-labelledby={`footer-${column.title}`}>
            <h2 id={`footer-${column.title}`} className="text-caption uppercase">
              {column.title}
            </h2>
            <ul className="pt-17 text-caption">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={`inline-flex min-h-touch items-center lg:min-h-0 lg:py-4 ${linkClass}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-13 border-t border-soot px-16 py-13 text-caption lg:px-32">
        <p>© 2026 UY Studio, Berlin</p>
        <ul className="flex gap-13">
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
