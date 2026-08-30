import { initialTransactions } from "@/lib/mock-seller-data"
import { formatCurrency } from "@/lib/currency"

export default function SellerTransactionsPage() {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold">Transaction history</h2>
      <div className="mt-5 flex flex-col gap-2">
        {initialTransactions.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between rounded-lg border bg-card p-4 text-sm"
          >
            <div>
              <p className="font-bold">{t.id}</p>
              <p className="text-muted-foreground">
                Order {t.orderId} · {t.method}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold">{formatCurrency(t.amount)}</p>
              <p className="text-muted-foreground">{t.date}</p>
            </div>
          </div>
        ))}
        {initialTransactions.length === 0 && (
          <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            No transactions yet.
          </p>
        )}
      </div>
    </div>
  )
}
