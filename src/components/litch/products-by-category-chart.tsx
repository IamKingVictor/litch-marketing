"use client"

import { Product } from "@/lib/products-context"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export function ProductsByCategoryChart({
  products,
  title = "Products by category",
}: {
  products: Product[]
  title?: string
}) {
  const counts = new Map<string, number>()
  for (const p of products) {
    counts.set(p.category, (counts.get(p.category) ?? 0) + 1)
  }
  const data = Array.from(counts.entries()).map(([category, count]) => ({
    category,
    count,
  }))

  return (
    <div className="rounded-xl border bg-card p-5">
      <p className="text-sm font-bold">{title}</p>
      {data.length === 0 ? (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          No products yet.
        </p>
      ) : (
        <div className="mt-4 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="category"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={28}
              />
              <Tooltip
                cursor={{ fill: "var(--muted)" }}
                contentStyle={{
                  borderRadius: 8,
                  fontSize: 13,
                  border: "1px solid var(--border)",
                }}
              />
              <Bar
                dataKey="count"
                fill="var(--primary)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
