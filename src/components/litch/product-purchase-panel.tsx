"use client"

import { useMemo, useState } from "react"
import { Heart, ShoppingBag } from "lucide-react"
import type { Product, Weekday } from "@/lib/mock-data"
import { getTimeSlots } from "@/lib/mock-data"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useToast } from "@/lib/toast-context"
import { useAsyncAction } from "@/lib/use-async-action"
import { LitchButton } from "./button"

const weekdayKeys: Weekday[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
]

function nextAvailableDates(product: Product) {
  return Array.from({ length: 14 })
    .map((_, i) => {
      const d = new Date()
      d.setDate(d.getDate() + i)
      return {
        iso: d.toISOString().slice(0, 10),
        dow:
          i === 0
            ? "Today"
            : i === 1
              ? "Tomorrow"
              : d.toLocaleDateString(undefined, { weekday: "short" }),
        day: d.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        }),
        weekday: weekdayKeys[d.getDay()],
      }
    })
    .filter(
      (date) =>
        !product.availabilityDays?.length ||
        product.availabilityDays.includes(date.weekday),
    )
    .slice(0, 7)
}

export function ProductPurchasePanel({ product }: { product: Product }) {
  const { addToBag, addBooking } = useCart()
  const { toast } = useToast()

  // --- Product path: size / color / add to bag -----------------------
  const [size, setSize] = useState(product.sizes?.[0])
  const [color, setColor] = useState(product.colors?.[0])
  const { run: runAddToBag, pending: addingToBag } = useAsyncAction(() => {
    addToBag(product, { size, color })
    toast(`Added "${product.name}" to Shopping Bag`, "success")
  }, 350)

  // --- Service path: date / time slot / book --------------------------
  const dates = useMemo(() => nextAvailableDates(product), [product])
  const [date, setDate] = useState(dates[0]?.iso)
  const slots = useMemo(() => getTimeSlots(product), [product])
  const [slot, setSlot] = useState(slots[0])
  const { run: runBook, pending: booking } = useAsyncAction(() => {
    if (!date || !slot) return
    addBooking(product, date, slot)
    toast(`Booked "${product.name}" for ${slot}`, "success")
  }, 350)

  if (product.type === "service") {
    return (
      <div className="mt-6 flex flex-col gap-5">
        <div>
          <p className="mb-2 text-sm font-bold text-foreground">
            Select day and date
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {dates.map((d) => (
              <button
                key={d.iso}
                type="button"
                onClick={() => setDate(d.iso)}
                className={`rounded-xl border px-2 py-2 text-center text-xs font-semibold transition ${
                  date === d.iso
                    ? "border-primary bg-gold-50 text-primary"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                <span className="block">{d.dow}</span>
                <span className="block text-[11px] font-normal">{d.day}</span>
              </button>
            ))}
          </div>
        </div>

        {slots.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-bold text-foreground">
              Available time slots
            </p>
            <p className="mb-2 text-xs text-muted-foreground">
              Open {product.openingTime} – {product.closingTime}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {slots.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSlot(s)}
                  className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                    slot === s
                      ? "border-primary bg-gold-50 text-primary"
                      : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <LitchButton secondary className="flex-1" onClick={() => runBook()}>
            {booking ? "Adding…" : "Add to bookings"}
          </LitchButton>
          <LitchButton className="flex-1" onClick={() => runBook()}>
            Book now
          </LitchButton>
        </div>
      </div>
    )
  }

  // --- Product UI --------------------------------------------------------
  return (
    <div className="mt-6 flex flex-col gap-5">
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-bold text-foreground">Size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`min-w-11 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                  size === s
                    ? "border-primary bg-gold-50 text-primary"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.colors && product.colors.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-bold text-foreground">Color</p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                  color === c
                    ? "border-primary bg-gold-50 text-primary"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <LitchButton onClick={() => runAddToBag()}>
          <ShoppingBag size={17} />{" "}
          {addingToBag ? "Adding…" : "Add to shopping bag"}
        </LitchButton>
        <WishlistToggleButton product={product} />
      </div>
    </div>
  )
}

function WishlistToggleButton({ product }: { product: Product }) {
  const { toggle, isSaved } = useWishlist()
  const saved = isSaved(product.id)
  return (
    <LitchButton secondary onClick={() => toggle(product)}>
      <Heart size={17} fill={saved ? "currentColor" : "none"} />{" "}
      {saved ? "Saved" : "Save"}
    </LitchButton>
  )
}
