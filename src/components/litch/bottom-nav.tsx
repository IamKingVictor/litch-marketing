"use client"

import {
  Home as HomeIcon,
  Package,
  ShoppingCart,
  Store,
  UserRound,
} from "lucide-react"
import type { View } from "@/lib/types"

export function BottomNav({
  go,
  cartCount,
}: {
  go: (v: View) => void
  cartCount: number
}) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex justify-around border-t bg-card px-2 py-3 text-[10px] font-semibold shadow-lg md:hidden">
      <button onClick={() => go("home")}>
        <HomeIcon size={18} className="mx-auto mb-1" />
        Home
      </button>
      <button onClick={() => go("products")}>
        <Package size={18} className="mx-auto mb-1" />
        Browse
      </button>
      <button onClick={() => go("shops")}>
        <Store size={18} className="mx-auto mb-1" />
        Shops
      </button>
      <button onClick={() => go("cart")}>
        <ShoppingCart size={18} className="mx-auto mb-1" />
        Cart {cartCount ? `(${cartCount})` : ""}
      </button>
      <button onClick={() => go("login")}>
        <UserRound size={18} className="mx-auto mb-1" />
        Profile
      </button>
    </nav>
  )
}
