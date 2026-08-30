"use client"

import { useState } from "react"
import { initialOrders, type OrderStatus } from "@/lib/mock-seller-data"
import { formatCurrency } from "@/lib/currency"
import { useToast } from "@/lib/toast-context"

const TABS: { key: OrderStatus; label: string }[] = [
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "cancelled", label: "Cancelled / Deleted" },
]

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState(initialOrders)
  const [tab, setTab] = useState<OrderStatus>("pending")
  const { toast } = useToast()

  const setStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
    toast(
      status === "approved" ? `${id} approved` : `${id} cancelled`,
      status === "approved" ? "success" : "default",
    )
  }

  const visible = orders.filter((o) => o.status === tab)

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold">Orders</h2>
      <div className="mt-5 flex gap-2 border-b">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`border-b-2 px-3 py-2 text-sm font-bold ${
              tab === t.key
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground"
            }`}
          >
            {t.label} ({orders.filter((o) => o.status === t.key).length})
          </button>
        ))}
      </div>
      <div className="mt-5 flex flex-col gap-3">
        {visible.length === 0 && (
          <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            No {tab} orders.
          </p>
        )}
        {visible.map((o) => (
          <div key={o.id} className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold">{o.id}</h3>
              <b>{formatCurrency(o.total)}</b>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {o.customer} · {o.items}
            </p>
            <p className="text-xs text-muted-foreground">{o.date}</p>
            {tab === "pending" && (
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setStatus(o.id, "approved")}
                  className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground"
                >
                  Approve
                </button>
                <button
                  onClick={() => setStatus(o.id, "cancelled")}
                  className="rounded-lg border px-3 py-1.5 text-xs font-bold text-destructive"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
