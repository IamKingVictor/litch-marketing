"use client"

import Link from "next/link"
import { ArrowLeft, PackageCheck, Truck, ReceiptText } from "lucide-react"

const orders = [
  {
    id: "#LIT-2048",
    status: "Delivered",
    item: "Linen Everyday Shirt",
    date: "Aug 18, 2026",
    total: "$28.90",
  },
  {
    id: "#LIT-1989",
    status: "In transit",
    item: "The Sunday Tote",
    date: "Aug 12, 2026",
    total: "$32.00",
  },
  {
    id: "#LIT-1865",
    status: "Processing",
    item: "Desk Light No. 4",
    date: "Aug 04, 2026",
    total: "$59.00",
  },
]

export default function MyOrdersPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <Link
        href="/profile"
        className="mb-5 flex items-center gap-2 text-sm font-bold"
      >
        <ArrowLeft size={16} /> My orders
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-muted-foreground">
            Account
          </p>
          <h1 className="mt-1 font-heading text-3xl font-bold">Orders</h1>
        </div>
        <div className="rounded-full bg-secondary px-3 py-1.5 text-xs font-bold text-primary">
          {orders.length} items
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-2xl border bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">
                  {order.id}
                </p>
                <h2 className="mt-2 font-heading text-xl font-bold">
                  {order.item}
                </h2>
              </div>
              <span className="rounded-full bg-gold-50 px-2.5 py-1 text-[11px] font-bold text-gold-600">
                {order.status}
              </span>
            </div>

            <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <PackageCheck size={15} className="text-primary" />
                <span>{order.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={15} className="text-primary" />
                <span>Standard shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ReceiptText size={15} className="text-primary" />
                <span>{order.total}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
