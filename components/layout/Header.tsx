import Link from "next/link";
import { HeartIcon, PersonIcon, SearchIcon } from "@/components/ui/icons";
import { productImages } from "@/data/product-images.generated";
import { utilityLinks } from "@/lib/navigation";
import { CartLink } from "./CartLink";
import { MobileMenu } from "./MobileMenu";
import { NavItem } from "./NavItem";
import { ShopMenu } from "./ShopMenu";

const iconLink =
  "inline-flex min-h-touch min-w-touch items-center justify-center decoration-1 underline-offset-4 hover:underline";

/** Three zones: categories start, wordmark centre, utilities end (DESIGN.md "Main Navigation"). */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-soot bg-limestone">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center px-16 lg:px-32">
        <div className="flex items-center">
          <div className="lg:hidden">
            <MobileMenu />
          </div>
          <div className="hidden lg:block">
            <ShopMenu featured={productImages["maison-margiela-replica-jazz-club"][0]} />
          </div>
        </div>

        <Link href="/" className="inline-flex min-h-touch items-center px-16 text-subheading tracking-display" aria-label="UY Studio, home">
          UY
        </Link>

        <nav aria-label="Utilities" className="flex items-center justify-end lg:gap-13">
          <Link href="/shop?focus=search" className={`${iconLink} lg:hidden`} aria-label="Search">
            <SearchIcon />
          </Link>
          <div className="hidden items-center gap-13 lg:flex">
            <NavItem href="/shop?focus=search">Search</NavItem>
            {utilityLinks.map((link) => (
              <NavItem key={link.href} href={link.href}>
                {link.label}
              </NavItem>
            ))}
            <NavItem href="/account">Log in</NavItem>
          </div>
          <Link href="/wishlist" className={`${iconLink} max-sm:hidden`} aria-label="Wishlist">
            <HeartIcon />
          </Link>
          <Link href="/account" className={`${iconLink} lg:hidden`} aria-label="Account">
            <PersonIcon />
          </Link>
          <CartLink />
        </nav>
      </div>
    </header>
  );
}
