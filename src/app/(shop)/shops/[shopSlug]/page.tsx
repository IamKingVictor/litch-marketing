import { notFound } from "next/navigation"
import { Star } from "lucide-react"
import { getShopProducts, shops } from "@/lib/mock-data"
import { slugify } from "@/lib/slugify"
import { ProductGrid } from "@/components/litch/product-grid"

export default async function ShopDetailPage({
  params,
}: {
  params: Promise<{ shopSlug: string }>
}) {
  const { shopSlug } = await params
  const shop = shops.find((s) => slugify(s.name) === shopSlug)
  if (!shop) notFound()

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
          <ProductGrid items={getShopProducts(shop.name)} showAddToCart />
        </div>
      </div>
    </main>
  )
}
