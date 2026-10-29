import Link from "next/link";
import { HeartIcon, PersonIcon, SearchIcon } from "@/components/ui/icons";
import { productImages } from "@/data/product-images.generated";
import { utilityLinks } from "@/lib/navigation";
import { CartLink } from "./CartLink";
import { HeaderShell } from "./HeaderShell";
import { MobileMenu } from "./MobileMenu";
import { NavItem } from "./NavItem";
import { ShopMenu } from "./ShopMenu";

const iconLink = "inline-flex min-h-touch min-w-touch items-center justify-center text-ink hover:text-accent-strong";

/** Three zones: categories start, serif wordmark centre, utilities end. */
export function Header() {
  return (
    <HeaderShell>
      <div className="grid min-h-[var(--header-h)] grid-cols-[1fr_auto_1fr] items-center px-16 lg:px-32">
        <div className="flex items-center">
          <div className="lg:hidden">
            <MobileMenu />
          </div>
          <div className="hidden lg:block">
            <ShopMenu featured={productImages["maison-margiela-replica-jazz-club"][0]} />
          </div>
        </div>

        <Link href="/" className="font-display inline-flex min-h-touch items-center px-16 text-[34px] leading-none tracking-[0.08em]" aria-label="UY Studio, home">
          UY
        </Link>

        <nav aria-label="Utilities" className="flex items-center justify-end lg:gap-20">
          <Link href="/shop?focus=search" className={`${iconLink} lg:hidden`} aria-label="Search">
            <SearchIcon />
          </Link>
          <div className="hidden items-center gap-20 lg:flex">
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
    </HeaderShell>
  );
}
