export type NavLink = { label: string; href: string };
export type NavGroup = { title: string; links: NavLink[] };

/** Desktop mega menu and mobile menu share this tree. */
export const shopMenu: NavGroup[] = [
  {
    title: "Wear",
    links: [
      { label: "All fragrance", href: "/shop" },
      { label: "For her", href: "/shop/women" },
      { label: "For him", href: "/shop/men" },
      { label: "Shared", href: "/shop/unisex" },
      { label: "New in", href: "/shop?sort=newest" },
    ],
  },
  {
    title: "Families",
    links: [
      { label: "Floral", href: "/shop?family=floral" },
      { label: "Woody", href: "/shop?family=woody" },
      { label: "Amber", href: "/shop?family=amber" },
      { label: "Fresh", href: "/shop?family=fresh" },
      { label: "Aromatic", href: "/shop?family=aromatic" },
      { label: "Leather", href: "/shop?family=leather" },
    ],
  },
  {
    title: "Houses",
    links: [
      { label: "UY Studio", href: "/shop?brand=uy-studio" },
      { label: "Chanel", href: "/shop?brand=chanel" },
      { label: "Maison Margiela", href: "/shop?brand=maison-margiela" },
      { label: "Diptyque", href: "/shop?brand=diptyque" },
      { label: "Jo Malone London", href: "/shop?brand=jo-malone-london" },
      { label: "Hermès", href: "/shop?brand=hermes" },
    ],
  },
];

export const primaryLinks: NavLink[] = [
  { label: "For her", href: "/shop/women" },
  { label: "For him", href: "/shop/men" },
  { label: "Shared", href: "/shop/unisex" },
];

export const utilityLinks: NavLink[] = [
  { label: "The studio", href: "/about" },
];

export const footerColumns: NavGroup[] = [
  {
    title: "Shop",
    links: [
      { label: "All fragrance", href: "/shop" },
      { label: "For her", href: "/shop/women" },
      { label: "For him", href: "/shop/men" },
      { label: "Shared", href: "/shop/unisex" },
      { label: "Wishlist", href: "/wishlist" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping and returns", href: "/shipping-returns" },
      { label: "Questions", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Your account", href: "/account" },
    ],
  },
  {
    title: "Opening times",
    links: [
      { label: "Tuesday to Saturday, 11 to 19", href: "/contact" },
      { label: "Sunday by appointment", href: "/contact" },
      { label: "Linienstraße 40, Berlin", href: "/contact" },
      { label: "The studio", href: "/about" },
    ],
  },
];
