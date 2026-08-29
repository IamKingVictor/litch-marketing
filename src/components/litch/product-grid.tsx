import { Star } from "lucide-react"
import type { View } from "@/lib/types"
import type { Product } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/currency"
import { LitchButton } from "./button"

export function ProductGrid({
  items,
  go,
  add,
}: {
  items: Product[]
  go: (v: View) => void
  add?: (p: Product) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      {items.map((p) => (
        <article key={p.id} className="group">
          <button
            className="block w-full text-left"
            onClick={() => go("product")}
          >
            <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
              <img
                src={p.image}
                alt={p.name}
                className="size-full object-cover transition duration-300 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-card/90 px-2 py-1 text-[10px] font-bold">
                {p.category}
              </span>
            </div>
            <div className="flex flex-col gap-1 pt-3">
              <p className="truncate text-xs text-muted-foreground">
                {p.shop}
              </p>
              <h3 className="font-heading text-sm font-bold">{p.name}</h3>
              <div className="flex items-center gap-2 font-heading font-bold">
                {formatCurrency(p.price)}{" "}
                {p.originalPrice && (
                  <del className="text-xs font-normal text-muted-foreground">
                    {formatCurrency(p.originalPrice)}
                  </del>
                )}
              </div>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star size={12} fill="currentColor" className="text-gold" />{" "}
                4.9
              </span>
            </div>
          </button>
          {add && (
            <LitchButton
              onClick={() => add(p)}
              secondary
              className="mt-3 w-full py-2 text-xs"
            >
              Add to cart
            </LitchButton>
          )}
        </article>
      ))}
    </div>
  )
}
