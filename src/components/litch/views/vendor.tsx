"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import type { View } from "@/lib/types"
import { products as initialProducts } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/currency"
import { LitchButton } from "../button"

export function Vendor({ go }: { go: (v: View) => void }) {
  const [items, setItems] = useState(initialProducts.slice(0, 3))
  const [tab, setTab] = useState("Products")
  const [name, setName] = useState("")
  const [codes, setCodes] = useState(["WELCOME10"])
  return (
    <main className="min-h-[calc(100vh-52px)] bg-secondary/40">
      <div className="bg-primary px-4 py-4 text-primary-foreground md:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="text-xs text-primary-foreground/60">
              Vendor portal
            </p>
            <h1 className="font-heading text-xl font-bold">Mina Studio</h1>
          </div>
          <LitchButton
            secondary
            onClick={() => go("home")}
            className="border-primary-foreground/30 bg-transparent text-primary-foreground"
          >
            View storefront
          </LitchButton>
        </div>
      </div>
      <div className="border-b bg-primary px-4 md:px-10">
        <div className="mx-auto flex max-w-6xl gap-6 overflow-x-auto">
          {[
            "Overview",
            "Products",
            "Discount Codes",
            "Shop settings",
            "Orders",
          ].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`whitespace-nowrap border-b-2 px-1 py-3 text-sm font-bold ${
                tab === t
                  ? "border-gold text-primary-foreground"
                  : "border-transparent text-primary-foreground/60"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-10">
        {tab === "Products" && (
          <>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-gold-600">
                  Manage catalog
                </p>
                <h2 className="font-heading text-2xl font-bold">
                  Your products
                </h2>
              </div>
              <LitchButton
                onClick={() =>
                  setItems([
                    ...items,
                    {
                      ...initialProducts[3],
                      id: `new-${Date.now()}`,
                      name: name || "New product",
                      shop: "Mina Studio",
                    },
                  ])
                }
              >
                <Plus size={16} /> Add product
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
                    alt=""
                    className="size-16 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading font-bold">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(p.price)} · {p.stock} in stock
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setItems(items.filter((i) => i.id !== p.id))
                    }
                    aria-label={`Delete ${p.name}`}
                    className="rounded-lg p-2 text-destructive"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
        {tab === "Discount Codes" && (
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl font-bold">
              Discount codes
            </h2>
            <div className="mt-5 flex gap-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="New code"
                className="h-11 flex-1 rounded-lg border bg-card px-3 text-sm"
              />
              <LitchButton
                onClick={() => {
                  if (name) {
                    setCodes([...codes, name.toUpperCase()])
                    setName("")
                  }
                }}
              >
                Create
              </LitchButton>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              {codes.map((c) => (
                <div
                  key={c}
                  className="flex justify-between rounded-lg border bg-card p-4 text-sm font-bold"
                >
                  {c}
                  <span className="text-muted-foreground">10% off</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === "Shop settings" && (
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl font-bold">Shop settings</h2>
            <div className="mt-5 flex flex-col gap-4">
              <input
                defaultValue="Mina Studio"
                className="h-11 rounded-lg border bg-card px-3 text-sm"
              />
              <textarea
                defaultValue="Everyday clothing made slowly in small runs."
                className="min-h-28 rounded-lg border bg-card p-3 text-sm"
              />
              <LitchButton>Save changes</LitchButton>
            </div>
          </div>
        )}
        {tab === "Overview" && (
          <div>
            <h2 className="font-heading text-2xl font-bold">
              Good morning, Mina
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["Sales this month", "$8,420"],
                ["Orders", "34"],
                ["Views", "2,481"],
              ].map(([a, b]) => (
                <div key={a} className="rounded-xl border bg-card p-5">
                  <p className="text-sm text-muted-foreground">{a}</p>
                  <p className="mt-2 font-heading text-2xl font-bold">{b}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
