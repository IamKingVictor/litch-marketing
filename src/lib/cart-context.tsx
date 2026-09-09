"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Product as MockProduct } from "@/lib/mock-data"
import type { Product as ContextProduct } from "@/lib/products-context"

export type CartProduct = MockProduct | ContextProduct

export type CartItem = {
  product: CartProduct
  quantity: number
  size?: string
  color?: string
}

export type BookingItem = {
  product: CartProduct
  date: string
  timeSlot: string
}

type CartContextValue = {
  // Shopping Bag — products only.
  bag: CartItem[]
  addToBag: (p: CartProduct, options?: { size?: string; color?: string }) => void
  updateBagQuantity: (productId: string, quantity: number) => void
  removeFromBag: (productId: string) => void
  clearBag: () => void
  bagCount: number

  // My Bookings — services only.
  bookings: BookingItem[]
  addBooking: (p: CartProduct, date: string, timeSlot: string) => void
  removeBooking: (productId: string, date: string, timeSlot: string) => void
  clearBookings: () => void
  bookingsCount: number

  // Combined badge count, kept for existing header/bottom-nav usage.
  cartCount: number

  /** @deprecated use addToBag — kept so older callers still compile. */
  add: (p: CartProduct) => void
  /** @deprecated use updateBagQuantity */
  updateQuantity: (productId: string, quantity: number) => void
  /** @deprecated use removeFromBag */
  remove: (productId: string) => void
  /** @deprecated use clearBag */
  clear: () => void
  /** @deprecated use `bag` — kept so older callers still compile. */
  cart: CartItem[]
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<CartItem[]>([])
  const [bookings, setBookings] = useState<BookingItem[]>([])

  const addToBag: CartContextValue["addToBag"] = (p, options) =>
    setBag((items) =>
      items.some(
        (i) =>
          i.product.id === p.id &&
          i.size === options?.size &&
          i.color === options?.color,
      )
        ? items.map((i) =>
            i.product.id === p.id && i.size === options?.size && i.color === options?.color
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          )
        : [...items, { product: p, quantity: 1, size: options?.size, color: options?.color }],
    )

  const updateBagQuantity = (productId: string, quantity: number) =>
    setBag((items) =>
      items.map((i) =>
        i.product.id === productId ? { ...i, quantity: Math.max(1, quantity) } : i,
      ),
    )

  const removeFromBag = (productId: string) =>
    setBag((items) => items.filter((i) => i.product.id !== productId))

  const clearBag = () => setBag([])

  const addBooking: CartContextValue["addBooking"] = (p, date, timeSlot) =>
    setBookings((items) => [...items, { product: p, date, timeSlot }])

  const removeBooking = (productId: string, date: string, timeSlot: string) =>
    setBookings((items) =>
      items.filter(
        (i) => !(i.product.id === productId && i.date === date && i.timeSlot === timeSlot),
      ),
    )

  const clearBookings = () => setBookings([])

  const bagCount = bag.reduce((s, i) => s + i.quantity, 0)
  const bookingsCount = bookings.length

  return (
    <CartContext.Provider
      value={{
        bag,
        addToBag,
        updateBagQuantity,
        removeFromBag,
        clearBag,
        bagCount,
        bookings,
        addBooking,
        removeBooking,
        clearBookings,
        bookingsCount,
        cartCount: bagCount + bookingsCount,
        // Back-compat aliases for any older call sites.
        add: addToBag,
        updateQuantity: updateBagQuantity,
        remove: removeFromBag,
        clear: clearBag,
        cart: bag,
      }}
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
