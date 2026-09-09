"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { CartProduct } from "@/lib/cart-context"

type WishlistContextValue = {
  items: CartProduct[]
  toggle: (p: CartProduct) => void
  isSaved: (id: string) => boolean
  wishlistCount: number
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartProduct[]>([])

  const toggle = (p: CartProduct) =>
    setItems((current) =>
      current.some((i) => i.id === p.id)
        ? current.filter((i) => i.id !== p.id)
        : [...current, p],
    )

  const isSaved = (id: string) => items.some((i) => i.id === id)

  return (
    <WishlistContext.Provider
      value={{ items, toggle, isSaved, wishlistCount: items.length }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider")
  return ctx
}
