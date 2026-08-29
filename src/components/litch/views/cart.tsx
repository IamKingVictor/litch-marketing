"use client"

import type { Dispatch, SetStateAction } from "react"
import { ArrowRight, ShoppingBag, X } from "lucide-react"
import type { CartItem, View } from "@/lib/types"
import { formatCurrency } from "@/lib/currency"
import { LitchButton } from "../button"

const DELIVERY_FEE = 5

export function Cart({
  go,
  cart,
  setCart,
}: {
  go: (v: View) => void
  cart: CartItem[]
  setCart: Dispatch<SetStateAction<CartItem[]>>
}) {
  const total = cart.reduce((s, i) => s + i.product.price * i.quantity, 0)
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 md:px-10">
      <h1 className="font-heading text-3xl font-bold">Your cart</h1>
      {!cart.length ? (
        <div className="mt-8 rounded-xl border border-dashed p-10 text-center">
          <ShoppingBag className="mx-auto text-muted-foreground" />
          <p className="mt-3 font-heading font-bold">Your cart is waiting</p>
          <LitchButton onClick={() => go("products")} className="mt-5">
            Explore products
          </LitchButton>
        </div>
      ) : (
        <>
          <div className="mt-7 flex flex-col gap-3">
            {cart.map((i) => (
              <div
                key={i.product.id}
                className="flex gap-4 rounded-xl border bg-card p-3"
              >
                <img
                  src={i.product.image}
                  alt={i.product.name}
                  className="size-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h2 className="font-heading font-bold">{i.product.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(i.product.price)}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      onClick={() =>
                        setCart(
                          cart.map((x) =>
                            x.product.id === i.product.id
                              ? { ...x, quantity: Math.max(1, x.quantity - 1) }
                              : x,
                          ),
                        )
                      }
                    >
                      −
                    </button>
                    <span>{i.quantity}</span>
                    <button
                      onClick={() =>
                        setCart(
                          cart.map((x) =>
                            x.product.id === i.product.id
                              ? { ...x, quantity: x.quantity + 1 }
                              : x,
                          ),
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setCart(cart.filter((x) => x.product.id !== i.product.id))
                  }
                  aria-label="Remove item"
                >
                  <X size={17} />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-7 rounded-xl border bg-card p-5">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <b>{formatCurrency(total)}</b>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span>Delivery</span>
              <span>{formatCurrency(DELIVERY_FEE)}</span>
            </div>
            <div className="my-4 border-t" />
            <div className="flex justify-between font-heading text-xl font-bold">
              <span>Total</span>
              <span>{formatCurrency(total + DELIVERY_FEE)}</span>
            </div>
            <LitchButton onClick={() => go("checkout")} className="mt-5 w-full">
              Checkout <ArrowRight size={16} />
            </LitchButton>
          </div>
        </>
      )}
    </main>
  )
}
