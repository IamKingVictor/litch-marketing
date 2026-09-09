"use client"

import { useState } from "react"
import { Plus, Trash2, X } from "lucide-react"
import {
  products as initialProducts,
  categories,
  type Product,
  type Weekday,
} from "@/lib/mock-data"
import { formatCurrency } from "@/lib/currency"
import { useToast } from "@/lib/toast-context"
import { useAsyncAction } from "@/lib/use-async-action"
import { LitchButton } from "@/components/litch/button"

type FormState = {
  name: string
  category: string
  type: "product" | "service"
  price: string
  originalPrice: string
  stock: string
  image: string
  description: string
  sizes: string
  colors: string
  openingTime: string
  closingTime: string
  availabilityDays: Weekday[]
}

const weekdays: { value: Weekday; label: string }[] = [
  { value: "monday", label: "Mon" },
  { value: "tuesday", label: "Tue" },
  { value: "wednesday", label: "Wed" },
  { value: "thursday", label: "Thu" },
  { value: "friday", label: "Fri" },
  { value: "saturday", label: "Sat" },
  { value: "sunday", label: "Sun" },
]

const EMPTY_FORM: FormState = {
  name: "",
  category: categories[1],
  type: "product",
  price: "",
  originalPrice: "",
  stock: "",
  image: "",
  description: "",
  sizes: "",
  colors: "",
  openingTime: "09:00",
  closingTime: "18:00",
  availabilityDays: weekdays.map((day) => day.value),
}

function AddProductForm({
  onCancel,
  onSubmit,
  pending,
}: {
  onCancel: () => void
  onSubmit: (form: FormState) => void
  pending: boolean
}) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(form)
      }}
      className="mt-6 flex flex-col gap-4 rounded-xl border bg-card p-5"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold">
          Add product or service
        </h3>
        <button type="button" onClick={onCancel} aria-label="Close form">
          <X size={18} />
        </button>
      </div>

      <div>
        <label className="mb-1 block text-xs font-bold text-muted-foreground">
          Listing type
        </label>
        <div className="flex gap-2">
          {(["product", "service"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => set("type", t)}
              className={`flex-1 rounded-lg border py-2 text-sm font-bold capitalize transition ${
                form.type === t
                  ? "border-primary bg-gold-50 text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Products are added to shoppers&apos; Shopping Bag. Services are booked
          into a date + time slot in My Bookings.
        </p>
      </div>

      <div>
        <label className="mb-1 block text-xs font-bold text-muted-foreground">
          Name
        </label>
        <input
          required
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          className="h-11 w-full rounded-lg border bg-background px-3 text-sm"
          placeholder="e.g. Linen Everyday Shirt"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-bold text-muted-foreground">
          Category
        </label>
        <select
          value={form.category}
          onChange={(e) => set("category", e.target.value)}
          className="h-11 w-full rounded-lg border bg-background px-3 text-sm"
        >
          {categories.slice(1).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="mb-1 block text-xs font-bold text-muted-foreground">
            Price ($)
          </label>
          <input
            required
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) => set("price", e.target.value)}
            className="h-11 w-full rounded-lg border bg-background px-3 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold text-muted-foreground">
            Was ($)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.originalPrice}
            onChange={(e) => set("originalPrice", e.target.value)}
            className="h-11 w-full rounded-lg border bg-background px-3 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold text-muted-foreground">
            Stock / slots
          </label>
          <input
            required
            type="number"
            min="0"
            value={form.stock}
            onChange={(e) => set("stock", e.target.value)}
            className="h-11 w-full rounded-lg border bg-background px-3 text-sm"
          />
        </div>
      </div>

      {form.type === "product" ? (
        <div className="rounded-lg border border-dashed p-3">
          <p className="mb-2 text-xs font-bold text-muted-foreground">
            Available days
          </p>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
            {weekdays.map((day) => {
              const selected = form.availabilityDays.includes(day.value)
              return (
                <button
                  key={day.value}
                  type="button"
                  onClick={() =>
                    set(
                      "availabilityDays",
                      selected
                        ? form.availabilityDays.filter(
                            (value) => value !== day.value,
                          )
                        : [...form.availabilityDays, day.value],
                    )
                  }
                  className={`rounded-lg border px-2 py-2 text-xs font-bold transition ${
                    selected
                      ? "border-primary bg-gold-50 text-primary"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {day.label}
                </button>
              )
            })}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-bold text-muted-foreground">
                Sizes (comma separated)
              </label>
              <input
                value={form.sizes}
                onChange={(e) => set("sizes", e.target.value)}
                placeholder="S, M, L, XL"
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-muted-foreground">
                Colors (comma separated)
              </label>
              <input
                value={form.colors}
                onChange={(e) => set("colors", e.target.value)}
                placeholder="Black, Navy"
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 rounded-lg border border-dashed p-3">
          <div>
            <label className="mb-1 block text-xs font-bold text-muted-foreground">
              Opening time
            </label>
            <input
              type="time"
              value={form.openingTime}
              onChange={(e) => set("openingTime", e.target.value)}
              className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-muted-foreground">
              Closing time
            </label>
            <input
              type="time"
              value={form.closingTime}
              onChange={(e) => set("closingTime", e.target.value)}
              className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
            />
          </div>
        </div>
      )}

      <div>
        <label className="mb-1 block text-xs font-bold text-muted-foreground">
          Description
        </label>
        <textarea
          required
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          className="min-h-20 w-full rounded-lg border bg-background p-3 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-bold text-muted-foreground">
          Image URL
        </label>
        <input
          required
          value={form.image}
          onChange={(e) => set("image", e.target.value)}
          placeholder="/images/products/product_1.jpg"
          className="h-11 w-full rounded-lg border bg-background px-3 text-sm"
        />
      </div>

      <div className="flex gap-2">
        <LitchButton type="submit" className="flex-1">
          {pending ? "Saving…" : `Add ${form.type}`}
        </LitchButton>
        <LitchButton type="button" secondary onClick={onCancel}>
          Cancel
        </LitchButton>
      </div>
    </form>
  )
}

export default function SellerProductsPage() {
  const [items, setItems] = useState<Product[]>(initialProducts.slice(0, 3))
  const [showForm, setShowForm] = useState(false)
  const { toast } = useToast()

  const { run: addProduct, pending: adding } = useAsyncAction(
    (form: FormState) => {
      const newItem: Product = {
        id: `new-${Date.now()}`,
        name: form.name,
        shop: "Your shop",
        category: form.category,
        price: Number(form.price) || 0,
        originalPrice: form.originalPrice
          ? Number(form.originalPrice)
          : undefined,
        image: form.image,
        description: form.description,
        stock: Number(form.stock) || 0,
        visible: true,
        type: form.type,
        ...(form.type === "product"
          ? {
              sizes: form.sizes
                ? form.sizes
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                : undefined,
              colors: form.colors
                ? form.colors
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                : undefined,
            }
          : {
              openingTime: form.openingTime,
              closingTime: form.closingTime,
              durationMinutes: 60,
              availabilityDays: form.availabilityDays,
            }),
      }
      setItems((prev) => [...prev, newItem])
      toast(`Added "${newItem.name}"`, "success")
      setShowForm(false)
    },
  )

  const deleteProduct = (id: string, name: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
    toast(`Deleted "${name}"`)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-gold-600">
            Manage catalog
          </p>
          <h2 className="font-heading text-2xl font-bold">Your products</h2>
        </div>
        <LitchButton onClick={() => setShowForm((v) => !v)}>
          <Plus size={16} /> {showForm ? "Close" : "Add product"}
        </LitchButton>
      </div>

      {showForm && (
        <AddProductForm
          pending={adding}
          onCancel={() => setShowForm(false)}
          onSubmit={(form) => addProduct(form)}
        />
      )}

      <div className="mt-6 flex flex-col gap-3">
        {items.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-4 rounded-xl border bg-card p-3"
          >
            <img
              src={p.image}
              alt={p.name}
              className="size-16 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold">{p.name}</h3>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                    p.type === "service"
                      ? "bg-gold-50 text-gold-600"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {p.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {formatCurrency(p.price)} · {p.stock} in stock
                {p.sizes &&
                  p.sizes.length > 0 &&
                  ` · Sizes: ${p.sizes.join(", ")}`}
                {p.colors &&
                  p.colors.length > 0 &&
                  ` · Colors: ${p.colors.join(", ")}`}
                {p.type === "service" &&
                  p.openingTime &&
                  ` · ${p.openingTime}–${p.closingTime}`}
              </p>
            </div>
            <button
              onClick={() => deleteProduct(p.id, p.name)}
              aria-label={`Delete ${p.name}`}
              className="rounded-lg p-2 text-destructive"
            >
              <Trash2 size={17} />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            No products yet.
          </p>
        )}
      </div>
    </div>
  )
}
