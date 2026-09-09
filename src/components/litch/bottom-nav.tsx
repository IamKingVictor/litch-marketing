"use client"

import Link from "next/link"
import {
  Home as HomeIcon,
  LayoutGrid,
  Heart,
  ShoppingCart,
  UserRound,
} from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"

export function BottomNav() {
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex justify-around border-t bg-card px-2 py-3 text-[10px] font-semibold shadow-lg md:hidden">
      <Link href="/">
        <HomeIcon size={18} className="mx-auto mb-1" />
        Home
      </Link>
      <Link href="/categories">
        <LayoutGrid size={18} className="mx-auto mb-1" />
        Categories
      </Link>
      <Link href="/wishlist" className="relative">
        <Heart size={18} className="mx-auto mb-1" />
        Wishlist
        {wishlistCount > 0 && (
          <span className="absolute -right-1 -top-1 flex size-3.5 items-center justify-center rounded-full bg-gold text-[8px] font-bold text-primary">
            {wishlistCount}
          </span>
        )}
      </Link>
      <Link href="/cart" className="relative">
        <ShoppingCart size={18} className="mx-auto mb-1" />
        Cart
        {cartCount > 0 && (
          <span className="absolute -right-1 -top-1 flex size-3.5 items-center justify-center rounded-full bg-gold text-[8px] font-bold text-primary">
            {cartCount}
          </span>
        )}
      </Link>
      <Link href="/profile">
        <UserRound size={18} className="mx-auto mb-1" />
        Profile
      </Link>
    </nav>
  )
}
