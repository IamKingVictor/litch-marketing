"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { products as initialProducts } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/currency"
import { useToast } from "@/lib/toast-context"
import { useAsyncAction } from "@/lib/use-async-action"
import { LitchButton } from "@/components/litch/button"

export default function SellerProductsPage() {
  const [items, setItems] = useState(initialProducts.slice(0, 3))
  const { toast } = useToast()

  const { run: addProduct, pending: adding } = useAsyncAction(() => {
    const newItem = {
      ...initialProducts[3],
      id: `new-${Date.now()}`,
      name: "New product",
      shop: "Your shop",
    }
    setItems((prev) => [...prev, newItem])
    toast(`Added "${newItem.name}"`, "success")
  })

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
        <LitchButton onClick={() => addProduct()}>
          <Plus size={16} /> {adding ? "Adding…" : "Add product"}
        </LitchButton>
      </div>
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
              <h3 className="font-heading font-bold">{p.name}</h3>
              <p className="text-sm text-muted-foreground">
                {formatCurrency(p.price)} · {p.stock} in stock
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
