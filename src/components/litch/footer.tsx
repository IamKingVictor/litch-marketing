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
          <p className="mt-3 text-sm text-primary-foreground/70">
            Products · Shops · Wishlist · Cart
          </p>
        </div>
        <div>
          <h3 className="font-heading font-semibold">Help</h3>
          <p className="mt-3 text-sm text-primary-foreground/70">
            Privacy · Terms · Support
          </p>
        </div>
        <div>
          <h3 className="font-heading font-semibold">Build with Litch</h3>
          <p className="mt-3 text-sm text-primary-foreground/70">
            Become a seller · Litch Academy
          </p>
        </div>
      </div>
    </footer>
  )
}
