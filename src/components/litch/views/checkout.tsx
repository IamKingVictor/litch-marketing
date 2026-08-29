"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import type { CartItem, View } from "@/lib/types"
import { formatCurrency } from "@/lib/currency"
import { LitchButton } from "../button"

export function Checkout({
  go,
  cart,
}: {
  go: (v: View) => void
  cart: CartItem[]
}) {
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  if (done)
    return (
      <main className="mx-auto max-w-xl px-4 py-16 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-secondary text-primary">
          <Check />
        </div>
        <h1 className="mt-5 font-heading text-3xl font-bold">
          Order confirmed
        </h1>
        <p className="mt-2 text-muted-foreground">
          Thanks for shopping with Litch. Your order is on its way.
        </p>
        <LitchButton onClick={() => go("home")} className="mt-7">
          Continue shopping
        </LitchButton>
      </main>
    )
  return (
    <main className="mx-auto max-w-2xl px-4 py-8 md:px-10">
      <h1 className="font-heading text-3xl font-bold">Checkout</h1>
      <div className="mt-6 flex items-center justify-between text-xs font-bold">
        {["Review cart", "Delivery details", "Pay"].map((s, i) => (
          <div
            key={s}
            className={`flex items-center gap-2 ${
              step === i + 1 ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-secondary">
              {i + 1}
            </span>
            {s}
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-xl border bg-card p-6">
        {step === 1 && (
          <>
            <h2 className="font-heading text-xl font-bold">Review cart</h2>
            {cart.map((i) => (
              <div
                key={i.product.id}
                className="mt-4 flex justify-between text-sm"
              >
                <span>
                  {i.product.name} × {i.quantity}
                </span>
                <b>{formatCurrency(i.product.price * i.quantity)}</b>
              </div>
            ))}
            <LitchButton onClick={() => setStep(2)} className="mt-7 w-full">
              Continue to delivery
            </LitchButton>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="font-heading text-xl font-bold">
              Delivery details
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input
                placeholder="Full name"
                className="h-11 rounded-lg border bg-background px-3 text-sm md:col-span-2"
              />
              <input
                placeholder="Address"
                className="h-11 rounded-lg border bg-background px-3 text-sm md:col-span-2"
              />
              <input
                placeholder="City"
                className="h-11 rounded-lg border bg-background px-3 text-sm"
              />
              <input
                placeholder="Postcode"
                className="h-11 rounded-lg border bg-background px-3 text-sm"
              />
            </div>
            <LitchButton onClick={() => setStep(3)} className="mt-7 w-full">
              Continue to payment
            </LitchButton>
          </>
        )}
        {step === 3 && (
          <>
            <h2 className="font-heading text-xl font-bold">Pay securely</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Demo checkout — no payment will be charged.
            </p>
            <input
              placeholder="Card number"
              className="mt-5 h-11 w-full rounded-lg border bg-background px-3 text-sm"
            />
            <LitchButton onClick={() => setDone(true)} className="mt-5 w-full">
              Place order
            </LitchButton>
          </>
        )}
      </div>
    </main>
  )
}
