"use client"

import { useState } from "react"
import type { Product } from "@/lib/mock-data"
import type { CartItem } from "@/lib/types"

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])

  const add = (p: Product) =>
    setCart((items) =>
      items.some((i) => i.product.id === p.id)
        ? items.map((i) =>
            i.product.id === p.id ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [...items, { product: p, quantity: 1 }],
    )

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)

  return { cart, setCart, add, cartCount }
}
