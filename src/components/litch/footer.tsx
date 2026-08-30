import Link from "next/link"
import { Logo } from "./logo"

export function Footer() {
  return (
    <footer className="mt-16 bg-primary px-5 py-10 text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-primary-foreground/65">
            Good things, well made — from people worth discovering.
          </p>
        </div>
        <div>
          <h3 className="font-heading font-semibold">Shop</h3>
          <nav className="mt-3 flex flex-col gap-2 text-sm text-primary-foreground/70">
            <Link href="/" className="w-fit hover:text-primary-foreground">
              Home
            </Link>
            <Link
              href="/categories"
              className="w-fit hover:text-primary-foreground"
            >
              Categories
            </Link>
            <Link
              href="/shops"
              className="w-fit hover:text-primary-foreground"
            >
              Shops
            </Link>
            <Link href="/cart" className="w-fit hover:text-primary-foreground">
              Cart
            </Link>
          </nav>
        </div>
        <div>
          <h3 className="font-heading font-semibold">Help</h3>
          {/* Privacy Policy / Terms / Support don't have pages built yet —
              left as plain text rather than linking to a route that doesn't
              exist. Say the word if you want these scaffolded next. */}
          <p className="mt-3 text-sm text-primary-foreground/70">
            Privacy · Terms · Support
          </p>
        </div>
        <div>
          <h3 className="font-heading font-semibold">Build with Litch</h3>
          <nav className="mt-3 flex flex-col gap-2 text-sm text-primary-foreground/70">
            <Link
              href="/seller/login"
              className="w-fit hover:text-primary-foreground"
            >
              Become a seller
            </Link>
            <Link
              href="/academy"
              className="w-fit hover:text-primary-foreground"
            >
              Litch Academy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
