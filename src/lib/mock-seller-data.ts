export type OrderStatus = "pending" | "approved" | "cancelled"

export type Order = {
  id: string
  customer: string
  items: string
  total: number
  status: OrderStatus
  date: string
}

export const initialOrders: Order[] = [
  {
    id: "ORD-1042",
    customer: "Ada N.",
    items: "Linen wrap dress ×1",
    total: 128,
    status: "pending",
    date: "2026-08-27",
  },
  {
    id: "ORD-1041",
    customer: "Tomiwa A.",
    items: "Ceramic mug set ×2",
    total: 64,
    status: "approved",
    date: "2026-08-26",
  },
  {
    id: "ORD-1040",
    customer: "Chidera E.",
    items: "Canvas tote ×1",
    total: 42,
    status: "approved",
    date: "2026-08-25",
  },
  {
    id: "ORD-1039",
    customer: "Segun O.",
    items: "Woven basket ×1",
    total: 56,
    status: "cancelled",
    date: "2026-08-24",
  },
]

export type Transaction = {
  id: string
  orderId: string
  amount: number
  date: string
  method: string
}

export const initialTransactions: Transaction[] = [
  { id: "TXN-8831", orderId: "ORD-1041", amount: 64, date: "2026-08-26", method: "Card" },
  { id: "TXN-8830", orderId: "ORD-1040", amount: 42, date: "2026-08-25", method: "Card" },
]
