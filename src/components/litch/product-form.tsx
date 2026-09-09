"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { categories } from "@/lib/mock-data"
//import type { Product } from "@/lib/products-context"
import { LitchButton } from "./button"
import { Product } from "@/lib/products-context"

type DetailRow = { key: string; value: string }

export type ProductFormValues = Omit<Product, "id" | "createdAt" | "vendor">

export function ProductForm({
  initial,
  onSubmit,
  onCancel,
  submitLabel = "Add product",
  pending = false,
}: {
  initial?: Partial<ProductFormValues>
  onSubmit: (values: ProductFormValues) => void
  onCancel?: () => void
  submitLabel?: string
  pending?: boolean
}) {
  const [name, setName] = useState(initial?.name ?? "")
  const [category, setCategory] = useState(initial?.category ?? categories[1])
  const [price, setPrice] = useState(initial?.price?.toString() ?? "")
  const [b2bPrice, setB2bPrice] = useState(initial?.b2bPrice?.toString() ?? "")
  const [b2bMinQty, setB2bMinQty] = useState(
    initial?.b2bMinQty?.toString() ?? "10",
  )
  const [stock, setStock] = useState(initial?.stock?.toString() ?? "")
  const [description, setDescription] = useState(initial?.description ?? "")
  const [usage, setUsage] = useState(initial?.usage ?? "")
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "")
  const [visible, setVisible] = useState(initial?.visible ?? true)
  const [detailRows, setDetailRows] = useState<DetailRow[]>(
    initial?.details
      ? Object.entries(initial.details).map(([key, value]) => ({
          key,
          value,
        }))
      : [{ key: "", value: "" }],
  )

  const updateRow = (i: number, patch: Partial<DetailRow>) =>
    setDetailRows((rows) =>
      rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r)),
    )

  const removeRow = (i: number) =>
    setDetailRows((rows) => rows.filter((_, idx) => idx !== i))

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const details = Object.fromEntries(
          detailRows
            .filter((r) => r.key.trim())
            .map((r) => [r.key.trim(), r.value.trim()]),
        )
        onSubmit({
          name,
          category,
          price: Number(price) || 0,
          b2bPrice: Number(b2bPrice) || 0,
          b2bMinQty: Number(b2bMinQty) || 1,
          stock: Number(stock) || 0,
          description,
          usage,
          imageUrl,
          visible,
          details,
        })
      }}
      className="flex flex-col gap-4"
    >
      <div>
        <label className="mb-1 block text-xs font-bold text-muted-foreground">
          Product name
        </label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Linen Everyday Shirt"
          className="h-11 w-full rounded-lg border bg-background px-3 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-bold text-muted-foreground">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-11 w-full rounded-lg border bg-background px-3 text-sm"
        >
          {categories.slice(1).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-bold text-muted-foreground">
            Retail price ($)
          </label>
          <input
            required
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            className="h-11 w-full rounded-lg border bg-background px-3 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold text-muted-foreground">
            Stock quantity
          </label>
          <input
            required
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="0"
            className="h-11 w-full rounded-lg border bg-background px-3 text-sm"
          />
        </div>
      </div>

      <div className="rounded-lg border border-dashed p-3">
        <p className="mb-2 text-xs font-bold text-muted-foreground">
          Wholesale (B2B) pricing
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">
              B2B price ($)
            </label>
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={b2bPrice}
              onChange={(e) => setB2bPrice(e.target.value)}
              placeholder="0.00"
              className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">
              Min quantity for B2B
            </label>
            <input
              required
              type="number"
              min="1"
              value={b2bMinQty}
              onChange={(e) => setB2bMinQty(e.target.value)}
              className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-bold text-muted-foreground">
          Description
        </label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product details, size guide, or specs..."
          className="min-h-24 w-full rounded-lg border bg-background p-3 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-bold text-muted-foreground">
          Usage / care instructions
        </label>
        <textarea
          value={usage}
          onChange={(e) => setUsage(e.target.value)}
          placeholder="e.g. Hand wash cold, lay flat to dry."
          className="min-h-16 w-full rounded-lg border bg-background p-3 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-bold text-muted-foreground">
          Additional details
        </label>
        <div className="flex flex-col gap-2">
          {detailRows.map((row, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={row.key}
                onChange={(e) => updateRow(i, { key: e.target.value })}
                placeholder="Label (e.g. Material)"
                className="h-10 flex-1 rounded-lg border bg-background px-3 text-sm"
              />
              <input
                value={row.value}
                onChange={(e) => updateRow(i, { value: e.target.value })}
                placeholder="Value (e.g. 100% linen)"
                className="h-10 flex-1 rounded-lg border bg-background px-3 text-sm"
              />
              <button
                type="button"
                onClick={() => removeRow(i)}
                aria-label="Remove detail"
                className="rounded-lg border px-2 text-destructive"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setDetailRows([...detailRows, { key: "", value: "" }])
            }
            className="flex w-fit items-center gap-1 text-xs font-bold text-primary"
          >
            <Plus size={13} /> Add detail
          </button>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-bold text-muted-foreground">
          Image URL
        </label>
        {/* Paste-only, on purpose — there's no real file storage backing
            this app yet, so a fake "Upload" button would just be misleading. */}
        <input
          required
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://..."
          className="h-11 w-full rounded-lg border bg-background px-3 text-sm"
        />
      </div>

      <label className="flex items-center justify-between rounded-lg border p-3">
        <span>
          <span className="block text-sm font-bold">Publish to store</span>
          <span className="block text-xs text-muted-foreground">
            Visible products show up on the public storefront immediately.
          </span>
        </span>
        <input
          type="checkbox"
          checked={visible}
          onChange={(e) => setVisible(e.target.checked)}
          className="size-5"
        />
      </label>

      <div className="flex gap-2">
        <LitchButton type="submit" className="flex-1">
          {pending ? "Saving…" : submitLabel}
        </LitchButton>
        {onCancel && (
          <LitchButton type="button" secondary onClick={onCancel}>
            Cancel
          </LitchButton>
        )}
      </div>
    </form>
  )
}
