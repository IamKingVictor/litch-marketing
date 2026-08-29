"use client"

import { Menu, Search, ShoppingCart, UserRound } from "lucide-react"
import type { View } from "@/lib/types"
import { Logo } from "./logo"

export function Header({
  go,
  cartCount,
}: {
  go: (v: View) => void
  cartCount: number
}) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-5 border-b bg-background/95 px-4 py-3 backdrop-blur md:px-10">
      <button className="md:hidden" aria-label="Menu">
        <Menu size={20} />
      </button>
      <button onClick={() => go("home")}>
        <Logo />
      </button>
      <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
        <button onClick={() => go("products")}>Products</button>
        <button onClick={() => go("shops")}>Shops</button>
        <button onClick={() => go("academy")}>Academy</button>
        <button onClick={() => go("seller-signup")}>Sell on Litch</button>
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
        <button onClick={() => go("login")} aria-label="Account">
          <UserRound size={20} />
        </button>
        <button
          onClick={() => go("cart")}
          aria-label="Cart"
          className="relative"
        >
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
