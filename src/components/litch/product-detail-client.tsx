"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
//import { useProducts } from "@/lib/products-context"
import { formatCurrency } from "@/lib/currency"
import { ProductAddToCartButton } from "./product-add-to-cart-button"
import { ProductReviews } from "./product-reviews"
import { useProducts } from "@/lib/products-context"

export function ProductDetailClient({ productId }: { productId: string }) {
  const { getProduct, hydrated } = useProducts()

  if (!hydrated) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-10">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-2xl bg-muted" />
          <div className="flex flex-col gap-3">
            <div className="h-4 w-32 animate-pulse rounded bg-muted" />
            <div className="h-8 w-64 animate-pulse rounded bg-muted" />
            <div className="h-6 w-24 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </main>
    )
  }

  const p = getProduct(productId)

  if (!p) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="font-heading text-2xl font-bold">Product not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          It may have been removed or is no longer available.
        </p>
        <Link
          href="/products"
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary"
        >
          <ArrowLeft size={16} /> Back to products
        </Link>
      </main>
    )
  }

  const detailEntries = Object.entries(p.details)

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-10">
      <Link
        href="/products"
        className="mb-5 flex items-center gap-2 text-sm font-bold"
      >
        <ArrowLeft size={16} /> Back to products
      </Link>
      <div className="grid gap-8 md:grid-cols-2">
        <img
          src={p.imageUrl}
          alt={p.name}
          className="aspect-square w-full rounded-2xl object-cover"
        />
        <div className="flex flex-col justify-center">
          <p className="text-sm text-muted-foreground">
            {p.vendor} · {p.category}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold">{p.name}</h1>
          <div className="mt-4 font-heading text-2xl font-bold">
            {formatCurrency(p.price)}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Wholesale: {formatCurrency(p.b2bPrice)} each at {p.b2bMinQty}+ units
          </p>
          <p className="mt-5 leading-7 text-muted-foreground">
            {p.description}
          </p>
          {p.usage && (
            <p className="mt-3 text-sm text-muted-foreground">
              <b className="text-foreground">Usage: </b>
              {p.usage}
            </p>
          )}
          {detailEntries.length > 0 && (
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              {detailEntries.map(([key, value]) => (
                <div key={key} className="contents">
                  <dt className="text-muted-foreground">{key}</dt>
                  <dd className="font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          )}
          <p className="mt-3 text-xs text-muted-foreground">
            {p.stock} in stock
          </p>
          <div className="mt-6 flex gap-3">
            <ProductAddToCartButton product={p} />
          </div>
        </div>
      </div>
      {/* <ProductReviews productId={p.id} /> */}
    </main>
  )
}
