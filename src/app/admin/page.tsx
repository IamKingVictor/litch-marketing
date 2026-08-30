"use client"

import { useState } from "react"
import { shops } from "@/lib/mock-data"
import { useToast } from "@/lib/toast-context"

type ShopStatus = "active" | "pending" | "banned"

export default function AdminShopsPage() {
  const { toast } = useToast()
  const [statuses, setStatuses] = useState<Record<string, ShopStatus>>(
    Object.fromEntries(shops.map((s) => [s.name, "active" as ShopStatus])),
  )
  const [removed, setRemoved] = useState<Set<string>>(new Set())

  const setStatus = (name: string, status: ShopStatus) => {
    setStatuses((prev) => ({ ...prev, [name]: status }))
    toast(
      status === "active"
        ? `${name} approved`
        : `${name} banned/restricted`,
      status === "active" ? "success" : "default",
    )
  }

  const remove = (name: string) => {
    setRemoved((prev) => new Set(prev).add(name))
    toast(`${name} deleted`, "error")
  }

  const visibleShops = shops.filter((s) => !removed.has(s.name))

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["GMV", "$128,000"],
          ["Orders", "248"],
          [
            "Active shops",
            String(
              visibleShops.filter((s) => statuses[s.name] === "active")
                .length,
            ),
          ],
          [
            "Pending review",
            String(
              visibleShops.filter((s) => statuses[s.name] === "pending")
                .length,
            ),
          ],
        ].map(([a, b]) => (
          <div key={a} className="rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">{a}</p>
            <p className="mt-2 font-heading text-2xl font-bold">{b}</p>
          </div>
        ))}
      </div>
      <div className="mt-7 rounded-xl border bg-card p-5">
        <h2 className="font-heading text-xl font-bold">Shops</h2>
        <div className="mt-4 flex flex-col gap-3">
          {visibleShops.map((s) => {
            const status = statuses[s.name]
            return (
              <div
                key={s.name}
                className="flex flex-wrap items-center justify-between gap-3 border-b py-4 last:border-0"
              >
                <div>
                  <p className="font-bold">{s.name}</p>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      status === "active"
                        ? "bg-secondary text-primary"
                        : status === "banned"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-gold-50 text-gold-800"
                    }`}
                  >
                    {status === "active"
                      ? "Active"
                      : status === "banned"
                        ? "Banned"
                        : "Pending review"}
                  </span>
                </div>
                <div className="flex gap-2 text-xs font-bold">
                  {status !== "active" && (
                    <button
                      onClick={() => setStatus(s.name, "active")}
                      className="rounded-lg bg-primary px-3 py-1.5 text-primary-foreground"
                    >
                      Approve
                    </button>
                  )}
                  {status !== "banned" && (
                    <button
                      onClick={() => setStatus(s.name, "banned")}
                      className="rounded-lg border border-destructive px-3 py-1.5 text-destructive"
                    >
                      Ban / restrict
                    </button>
                  )}
                  <button
                    onClick={() => remove(s.name)}
                    className="rounded-lg border px-3 py-1.5"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
          {visibleShops.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No shops left.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
