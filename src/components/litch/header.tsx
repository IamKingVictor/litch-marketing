"use client"

import Link from "next/link"
import { Menu, Search, ShoppingCart, Store, UserRound } from "lucide-react"
import { Logo } from "./logo"
import { useCart } from "@/lib/cart-context"
import { useSession } from "@/lib/session-context"

export function Header() {
  const { cartCount } = useCart()
  const { session } = useSession()
  const isSeller = session.role === "seller"

  return (
    <header className="sticky top-0 z-20 flex items-center gap-5 border-b bg-background/95 px-4 py-3 backdrop-blur md:px-10">
      <button className="md:hidden" aria-label="Menu">
        <Menu size={20} />
      </button>
      <Link href="/">
        <Logo />
      </Link>
      <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
        <Link href="/products">Products</Link>
        <Link href="/shops">Shops</Link>
        <Link href="/academy">Academy</Link>
        <Link href={isSeller ? "/seller/dashboard" : "/seller/login"}>
          {isSeller ? "Seller Dashboard" : "Sell on Litch"}
        </Link>
      </nav>
      <div className="hidden flex-1 md:block">
        <div className="relative mx-auto max-w-md">
          <Search
            className="absolute left-3 top-2.5 text-muted-foreground"
            size={17}
          />
          <input
            className="h-10 w-full rounded-lg border bg-muted/40 pl-10 text-sm outline-none focus:border-primary"
            placeholder="Search products and stores"
          />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-4 text-primary">
        {isSeller && (
          <Link href="/seller/dashboard" aria-label="Seller dashboard">
            <Store size={20} />
          </Link>
        )}
        <Link href="/profile" aria-label="Account">
          <UserRound size={20} />
        </Link>
        <Link href="/cart" aria-label="Cart" className="relative">
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
