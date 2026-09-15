"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, CreditCard, Landmark, WalletCards } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/lib/toast-context"
import { useAsyncAction } from "@/lib/use-async-action"
import { formatCurrency } from "@/lib/currency"
import { LitchButton } from "@/components/litch/button"

export default function CheckoutPage() {
  const { bag, clearBag } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "transfer" | "espees"
  >("card")
  const total = bag.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )
  const NAIRA_PER_ESPEE = 2050
  // Assumption (option a): mock prices are treated as Naira for Espees only.
  // Existing $ display remains unchanged until the catalog declares a currency.
  const totalEspees = total / NAIRA_PER_ESPEE

  const { run: placeOrder, pending } = useAsyncAction(() => {
    // NOTE: previously the cart was never cleared after checkout completed —
    // items would still sit in the cart after a "successful" order. Fixed here.
    // TODO: replace this UI-only branch with the selected payment SDK/API.
    clearBag()
    toast("Order placed!", "success")
    setDone(true)
  }, 700)

  if (done) {
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
        <LitchButton onClick={() => router.push("/")} className="mt-7">
          Continue shopping
        </LitchButton>
      </main>
    )
  }

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
            {bag.map((i) => (
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
            <h2 className="font-heading text-xl font-bold">Delivery details</h2>
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
            <div className="mt-5 grid gap-3">
              <PaymentOption
                selected={paymentMethod === "card"}
                onClick={() => setPaymentMethod("card")}
                icon={<CreditCard size={18} />}
                title="Pay with card"
              />
              <PaymentOption
                selected={paymentMethod === "transfer"}
                onClick={() => setPaymentMethod("transfer")}
                icon={<Landmark size={18} />}
                title="Pay with bank transfer"
              />
              <PaymentOption
                selected={paymentMethod === "espees"}
                onClick={() => setPaymentMethod("espees")}
                icon={<WalletCards size={18} />}
                title="Pay with Espees"
              />
            </div>
            {paymentMethod === "card" && (
              <input
                placeholder="Card number"
                className="mt-5 h-11 w-full rounded-lg border bg-background px-3 text-sm"
              />
            )}
            {paymentMethod === "espees" && (
              <p className="mt-4 rounded-lg bg-secondary/50 p-3 text-sm text-primary">
                {formatCurrency(total)} assumed as ₦{total.toLocaleString()} ={" "}
                {totalEspees.toFixed(6)} Espees. Rate: 1 Espee = ₦
                {NAIRA_PER_ESPEE.toLocaleString()}.
              </p>
            )}
            <LitchButton onClick={() => placeOrder()} className="mt-5 w-full">
              {pending ? "Placing order…" : "Place order"}
            </LitchButton>
          </>
        )}
      </div>
    </main>
  )
}

function PaymentOption({
  selected,
  onClick,
  icon,
  title,
}: {
  selected: boolean
  onClick: () => void
  icon: React.ReactNode
  title: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl border p-4 text-left text-sm font-bold ${selected ? "border-primary bg-secondary text-primary" : "border-border bg-background"}`}
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-card">
        {icon}
      </span>
      <span className="flex-1">{title}</span>
      <span
        className={`size-4 rounded-full border-2 ${selected ? "border-primary bg-primary ring-2 ring-primary/20" : "border-muted-foreground"}`}
      />
    </button>
  )
}
