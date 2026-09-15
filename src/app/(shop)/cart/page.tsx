"use client"

import Link from "next/link"
import { CalendarCheck, Minus, Plus, ShoppingBag, X } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/lib/toast-context"
import { formatCurrency } from "@/lib/currency"
import { LitchButton } from "@/components/litch/button"

const DELIVERY_FEE = 5

export default function CartPage() {
  const [tab, setTab] = useState<"bag" | "bookings">("bag")
  const {
    bag,
    bookings,
    bagCount,
    bookingsCount,
    updateBagQuantity,
    removeFromBag,
    removeBooking,
  } = useCart()
  const { toast } = useToast()
  const subtotal = bag.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8 lg:px-12">
      <p className="text-xs font-bold uppercase tracking-[.16em] text-gold-600">
        Your Litch activity
      </p>
      <h1 className="mt-1 font-heading text-3xl font-bold">Cart</h1>
      <div className="mt-7 grid grid-cols-2 rounded-xl border bg-card p-1">
        <button
          type="button"
          onClick={() => setTab("bag")}
          className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition ${tab === "bag" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
        >
          <ShoppingBag size={17} /> Shopping Bag ({bagCount})
        </button>
        <button
          type="button"
          onClick={() => setTab("bookings")}
          className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition ${tab === "bookings" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
        >
          <CalendarCheck size={17} /> My Bookings ({bookingsCount})
        </button>
      </div>

      {tab === "bag" ? (
        <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_20rem]">
          <section className="space-y-4">
            {bag.length === 0 ? (
              <EmptyState
                icon={<ShoppingBag />}
                title="Your shopping bag is waiting"
                href="/products"
                action="Explore products"
              />
            ) : (
              bag.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex gap-4 rounded-2xl border bg-card p-4"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="size-24 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className="font-heading font-bold">
                      {item.product.name}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatCurrency(item.product.price)}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.product.name}`}
                        onClick={() =>
                          updateBagQuantity(item.product.id, item.quantity - 1)
                        }
                        className="flex size-8 items-center justify-center rounded-lg border"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.product.name}`}
                        onClick={() =>
                          updateBagQuantity(item.product.id, item.quantity + 1)
                        }
                        className="flex size-8 items-center justify-center rounded-lg border"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${item.product.name}`}
                    onClick={() => {
                      removeFromBag(item.product.id)
                      toast(`Removed "${item.product.name}" from Shopping Bag`)
                    }}
                    className="self-start text-muted-foreground hover:text-destructive"
                  >
                    <X size={17} />
                  </button>
                </div>
              ))
            )}
          </section>
          {bag.length > 0 && (
            <aside className="h-fit rounded-2xl border bg-card p-5">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <b>{formatCurrency(subtotal)}</b>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span>Delivery</span>
                <span>{formatCurrency(DELIVERY_FEE)}</span>
              </div>
              <div className="my-4 border-t" />
              <div className="flex justify-between font-heading text-xl font-bold">
                <span>Total</span>
                <span>{formatCurrency(subtotal + DELIVERY_FEE)}</span>
              </div>
              <Link href="/checkout">
                <LitchButton className="mt-5 w-full">Checkout</LitchButton>
              </Link>
            </aside>
          )}
        </div>
      ) : (
        <section className="mt-7 space-y-4">
          {bookings.length === 0 ? (
            <EmptyState
              icon={<CalendarCheck />}
              title="No bookings yet"
              href="/services"
              action="Explore services"
            />
          ) : (
            bookings.map((booking) => (
              <div
                key={`${booking.product.id}-${booking.date}-${booking.timeSlot}`}
                className="flex gap-4 rounded-2xl border bg-card p-4"
              >
                <img
                  src={booking.product.image}
                  alt={booking.product.name}
                  className="size-24 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h2 className="font-heading font-bold">
                    {booking.product.name}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {booking.date} · {booking.timeSlot}
                  </p>
                  <p className="mt-2 font-bold">
                    {formatCurrency(booking.product.price)}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`Remove ${booking.product.name}`}
                  onClick={() =>
                    removeBooking(
                      booking.product.id,
                      booking.date,
                      booking.timeSlot,
                    )
                  }
                  className="self-start text-muted-foreground hover:text-destructive"
                >
                  <X size={17} />
                </button>
              </div>
            ))
          )}
        </section>
      )}
    </main>
  )
}

function EmptyState({
  icon,
  title,
  href,
  action,
}: {
  icon: React.ReactNode
  title: string
  href: string
  action: string
}) {
  return (
    <div className="rounded-2xl border border-dashed p-12 text-center">
      <span className="mx-auto flex size-11 items-center justify-center text-muted-foreground">
        {icon}
      </span>
      <p className="mt-3 font-heading font-bold">{title}</p>
      <Link href={href}>
        <LitchButton className="mt-5">{action}</LitchButton>
      </Link>
    </div>
  )
}
