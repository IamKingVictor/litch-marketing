import { Star } from "lucide-react"
import type { View } from "@/lib/types"
import { getShopProducts, shops, type Product } from "@/lib/mock-data"
import { ProductGrid } from "../product-grid"

export function ShopView({
  go,
  add,
}: {
  go: (v: View) => void
  add: (p: Product) => void
}) {
  const shop = shops[0]
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-10">
      <div className="overflow-hidden rounded-2xl border bg-card">
        <img
          src={shop.banner}
          alt=""
          className="h-56 w-full object-cover md:h-72"
        />
        <div className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="font-heading text-3xl font-bold">{shop.name}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{shop.bio}</p>
            </div>
            <span className="flex items-center gap-1 text-sm">
              <Star size={15} fill="currentColor" className="text-gold" />{" "}
              {shop.rating} rating
            </span>
          </div>
          <h2 className="mt-8 mb-4 font-heading text-xl font-bold">
            Products from {shop.name}
          </h2>
          <ProductGrid items={getShopProducts(shop.name)} go={go} add={add} />
        </div>
      </div>
    </main>
  )
}
