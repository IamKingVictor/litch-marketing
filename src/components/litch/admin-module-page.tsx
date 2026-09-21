"use client"

import { useMemo, useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { products, shops, formatNaira } from "@/lib/mock-data"
import { initialOrders, initialTransactions } from "@/lib/mock-seller-data"
import { useToast } from "@/lib/toast-context"

type ModuleKey =
  | "customers"
  | "sellers"
  | "products"
  | "orders"
  | "commissions"
  | "payments"
  | "payouts"
  | "reports"
type Row = { id: string; cells: string[]; status: string }

const customers = [
  ["CUS-1001", "Ada Nwosu", "ada@example.com", "42 orders", "Active"],
  ["CUS-1002", "Tomiwa Adeyemi", "tomiwa@example.com", "18 orders", "Active"],
  ["CUS-1003", "Chidera Eze", "chidera@example.com", "9 orders", "Active"],
  ["CUS-1004", "Segun Oluwole", "segun@example.com", "3 orders", "Suspended"],
]

const moduleInfo: Record<
  ModuleKey,
  {
    title: string
    description: string
    metrics: [string, string][]
    headers: string[]
  }
> = {
  customers: {
    title: "Customers",
    description: "Manage marketplace accounts and customer activity.",
    metrics: [
      ["Total customers", "1,284"],
      ["New this month", "96"],
      ["Active accounts", "1,231"],
      ["Support cases", "12"],
    ],
    headers: ["Customer", "Email", "Orders", "Status"],
  },
  sellers: {
    title: "Sellers",
    description:
      "Review stores, monitor performance, and control marketplace access.",
    metrics: [
      ["Total sellers", String(shops.length)],
      ["Active stores", "24"],
      ["Pending review", "3"],
      ["Suspended", "1"],
    ],
    headers: ["Seller", "Category", "Products", "Status"],
  },
  products: {
    title: "Products",
    description: "Keep the global catalog accurate, visible, and in stock.",
    metrics: [
      ["Catalog items", String(products.length)],
      ["Visible", String(products.filter((p) => p.visible).length)],
      ["Low stock", "8"],
      ["Pending review", "5"],
    ],
    headers: ["Product", "Seller", "Price", "Status"],
  },
  orders: {
    title: "Orders",
    description: "Track order flow across every seller on the platform.",
    metrics: [
      ["Total orders", "248"],
      ["Processing", "21"],
      ["Delivered", "214"],
      ["Gross value", "₦128,000"],
    ],
    headers: ["Order", "Customer", "Amount", "Status"],
  },
  commissions: {
    title: "Commissions",
    description: "Set platform fees and review commission earnings.",
    metrics: [
      ["Current rate", "8%"],
      ["This month", "₦10,240"],
      ["Last month", "₦9,680"],
      ["Pending", "₦1,240"],
    ],
    headers: ["Seller", "Rate", "This month", "Status"],
  },
  payments: {
    title: "Payments",
    description: "Review payment transactions and settlement status.",
    metrics: [
      ["Processed", "₦128,000"],
      ["Successful", "238"],
      ["Refunds", "₦1,840"],
      ["Failed", "7"],
    ],
    headers: ["Transaction", "Order", "Method", "Amount"],
  },
  payouts: {
    title: "Payouts",
    description: "Process seller earnings and monitor settlement batches.",
    metrics: [
      ["Ready to pay", "₦14,280"],
      ["Paid this month", "₦82,400"],
      ["Scheduled", "6"],
      ["On hold", "2"],
    ],
    headers: ["Payout", "Seller", "Amount", "Status"],
  },
  reports: {
    title: "Reports",
    description:
      "Use platform-wide metrics to understand growth and performance.",
    metrics: [
      ["Monthly GMV", "₦128,000"],
      ["Orders", "248"],
      ["Conversion", "4.8%"],
      ["Avg. order", "₦516"],
    ],
    headers: ["Report", "Period", "Value", "Change"],
  },
}

function rowsFor(key: ModuleKey): Row[] {
  if (key === "customers")
    return customers.map(([id, ...cells]) => ({
      id,
      cells: cells.slice(0, 4),
      status: cells[3],
    }))
  if (key === "sellers")
    return shops
      .slice(0, 8)
      .map((shop, index) => ({
        id: shop.name,
        cells: [
          shop.name,
          shop.category,
          `${products.filter((p) => p.shop === shop.name).length}`,
          index === 2 ? "Pending" : "Active",
        ],
        status: index === 2 ? "Pending" : "Active",
      }))
  if (key === "products")
    return products
      .slice(0, 10)
      .map((product) => ({
        id: product.id,
        cells: [
          product.name,
          product.shop,
          formatNaira(product.price),
          product.stock < 20 ? "Low stock" : "Visible",
        ],
        status: product.stock < 20 ? "Low stock" : "Visible",
      }))
  if (key === "orders")
    return initialOrders.map((order) => ({
      id: order.id,
      cells: [order.id, order.customer, formatNaira(order.total), order.status],
      status: order.status,
    }))
  if (key === "payments")
    return initialTransactions.map((transaction) => ({
      id: transaction.id,
      cells: [
        transaction.id,
        transaction.orderId,
        transaction.method,
        formatNaira(transaction.amount),
      ],
      status: "Successful",
    }))
  if (key === "commissions")
    return shops
      .slice(0, 8)
      .map((shop, index) => ({
        id: shop.name,
        cells: [
          shop.name,
          index === 1 ? "10%" : "8%",
          formatNaira(320 + index * 85),
          "Active",
        ],
        status: "Active",
      }))
  if (key === "payouts")
    return shops
      .slice(0, 8)
      .map((shop, index) => ({
        id: `PAY-${210 + index}`,
        cells: [
          `PAY-${210 + index}`,
          shop.name,
          formatNaira(840 + index * 180),
          index < 2 ? "Ready" : "Scheduled",
        ],
        status: index < 2 ? "Ready" : "Scheduled",
      }))
  return [
    ["Sales summary", "Aug 2026", "₦128,000", "+12.4%"],
    ["Seller growth", "Aug 2026", "27 active", "+3 sellers"],
    ["Customer retention", "Aug 2026", "68%", "+4.1%"],
  ].map(([id, ...cells]) => ({ id, cells, status: cells[2] }))
}

export function AdminModulePage({ module }: { module: ModuleKey }) {
  const info = moduleInfo[module]
  const { toast } = useToast()
  const [query, setQuery] = useState("")
  const rows = useMemo(
    () =>
      rowsFor(module).filter((row) =>
        row.cells.join(" ").toLowerCase().includes(query.toLowerCase()),
      ),
    [module, query],
  )

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-600">
          Platform management
        </p>
        <h2 className="mt-2 font-heading text-2xl font-bold">{info.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{info.description}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {info.metrics.map(([label, value]) => (
          <div key={label} className="rounded-2xl border bg-card p-5">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-2 font-heading text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>
      <section className="overflow-hidden rounded-2xl border bg-card">
        <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-heading font-bold">Recent activity</h3>
          <div className="flex gap-2">
            <label className="flex min-w-0 items-center gap-2 rounded-lg border px-3 text-sm">
              <Search size={15} className="text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search records"
                className="h-9 min-w-0 bg-transparent outline-none"
              />
            </label>
            <button
              onClick={() =>
                toast("Filters are ready for the live admin API", "success")
              }
              className="inline-flex size-9 items-center justify-center rounded-lg border"
              aria-label="Filter records"
            >
              <SlidersHorizontal size={15} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-muted/50 text-xs text-muted-foreground">
              <tr>
                {info.headers.map((header) => (
                  <th key={header} className="px-5 py-3 font-semibold">
                    {header}
                  </th>
                ))}
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="px-5 py-4 font-semibold">{row.cells[0]}</td>
                  {row.cells.slice(1).map((cell, index) => (
                    <td
                      key={`${row.id}-${index}`}
                      className="px-5 py-4 text-muted-foreground"
                    >
                      {index === row.cells.length - 2 ? (
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-bold ${row.status === "Active" || row.status === "Visible" || row.status === "Successful" || row.status === "approved" ? "bg-secondary/10 text-secondary" : "bg-gold-50 text-gold-800"}`}
                        >
                          {cell}
                        </span>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                  <td className="px-5 py-4">
                    <button
                      onClick={() => toast(`${row.id} selected`, "success")}
                      className="font-bold text-primary hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && (
          <p className="p-8 text-center text-sm text-muted-foreground">
            No records match your search.
          </p>
        )}
      </section>
    </div>
  )
}
