import { Star } from "lucide-react"
import type { View } from "@/lib/types"
import { shops } from "@/lib/mock-data"

export function Shops({ go }: { go: (v: View) => void }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-10">
      <p className="text-xs font-bold uppercase tracking-[.16em] text-gold-600">
        Meet the makers
      </p>
      <h1 className="mt-1 font-heading text-3xl font-bold">All shops</h1>
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {shops.map((s) => (
          <button
            key={s.name}
            onClick={() => go("shop")}
            className="group overflow-hidden rounded-2xl border bg-card text-left"
          >
            <img
              src={s.banner}
              alt={s.name}
              className="h-48 w-full object-cover transition group-hover:scale-105"
            />
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-bold">{s.name}</h2>
                <span className="flex items-center gap-1 text-sm">
                  <Star size={14} fill="currentColor" className="text-gold" />{" "}
                  {s.rating}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {s.category} · {s.bio}
              </p>
            </div>
          </button>
        ))}
      </div>
    </main>
  )
}
