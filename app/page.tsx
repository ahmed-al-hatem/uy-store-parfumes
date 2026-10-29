import Link from "next/link";

// Placeholder until phase (f) builds the home page.
export default function HomePage() {
  return (
    <main className="px-16 py-section md:px-32">
      <h1 className="text-heading tracking-display">UY</h1>
      <p className="mt-13">
        <Link href="/dev/images" className="underline underline-offset-4">
          Image review
        </Link>
      </p>
    </main>
  );
}
