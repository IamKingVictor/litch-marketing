"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Product as MockProduct } from "@/lib/mock-data"
import type { Product as ContextProduct } from "@/lib/products-context"

export type CartProduct = MockProduct | ContextProduct

export type CartItem = { product: CartProduct; quantity: number }

type CartContextValue = {
  cart: CartItem[]
  add: (p: CartProduct) => void
  updateQuantity: (productId: string, quantity: number) => void
  remove: (productId: string) => void
  clear: () => void
  cartCount: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  const add = (p: CartProduct) =>
    setCart((items) =>
      items.some((i) => i.product.id === p.id)
        ? items.map((i) =>
            i.product.id === p.id ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [...items, { product: p, quantity: 1 }],
    )

  const updateQuantity = (productId: string, quantity: number) =>
    setCart((items) =>
      items.map((i) =>
        i.product.id === productId
          ? { ...i, quantity: Math.max(1, quantity) }
          : i,
      ),
    )

  const remove = (productId: string) =>
    setCart((items) => items.filter((i) => i.product.id !== productId))

  const clear = () => setCart([])

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ cart, add, updateQuantity, remove, clear, cartCount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}
