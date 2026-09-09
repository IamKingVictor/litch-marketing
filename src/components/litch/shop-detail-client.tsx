"use client"

import { Star } from "lucide-react"
import { shops } from "@/lib/mock-data"
import { slugify } from "@/lib/slugify"
import { ProductGrid } from "./product-grid"
import { useProducts } from "@/lib/products-context"

export function ShopDetailClient({ shopSlug }: { shopSlug: string }) {
  const { products, hydrated } = useProducts()
  const shop = shops.find((s) => slugify(s.name) === shopSlug)

  if (!shop) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="font-heading text-2xl font-bold">Shop not found</h1>
      </main>
    )
  }

  // Only visible products show on the public shop page — hidden ones still
  // exist for the seller in their own dashboard.
  const shopProducts = hydrated
    ? products.filter((p) => p.vendor === shop.name && p.visible)
    : []

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
          {!hydrated ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square animate-pulse rounded-xl bg-muted"
                />
              ))}
            </div>
          ) : shopProducts.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No products from this shop yet.
            </p>
          ) : (
            <ProductGrid items={shopProducts} showAddToCart />
          )}
        </div>
      </div>
    </main>
  )
}
