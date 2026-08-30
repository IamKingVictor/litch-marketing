"use client"

import Link from "next/link"
import {
  Home as HomeIcon,
  Package,
  ShoppingCart,
  Store,
  UserRound,
} from "lucide-react"
import { useCart } from "@/lib/cart-context"

export function BottomNav() {
  const { cartCount } = useCart()
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex justify-around border-t bg-card px-2 py-3 text-[10px] font-semibold shadow-lg md:hidden">
      <Link href="/">
        <HomeIcon size={18} className="mx-auto mb-1" />
        Home
      </Link>
      <Link href="/products">
        <Package size={18} className="mx-auto mb-1" />
        Browse
      </Link>
      <Link href="/shops">
        <Store size={18} className="mx-auto mb-1" />
        Shops
      </Link>
      <Link href="/cart">
        <ShoppingCart size={18} className="mx-auto mb-1" />
        Cart {cartCount ? `(${cartCount})` : ""}
      </Link>
      <Link href="/login">
        <UserRound size={18} className="mx-auto mb-1" />
        Profile
      </Link>
    </nav>
  )
}
