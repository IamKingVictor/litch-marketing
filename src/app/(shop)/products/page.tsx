"use client"

import { Suspense, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { categories, products as initialProducts } from "@/lib/mock-data"
import { ProductGrid } from "@/components/litch/product-grid"
import { Breadcrumbs } from "@/components/litch/breadcrumbs"

function ProductsPageInner() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") ?? "All"

  const [query, setQuery] = useState("")
  const [cat, setCat] = useState(initialCategory)
  const [sort, setSort] = useState("Featured")

  const visible = useMemo(
    () =>
      initialProducts
        .filter(
          (p) =>
            (cat === "All" || p.category === cat) &&
            p.name.toLowerCase().includes(query.toLowerCase()),
        )
        .sort((a, b) =>
          sort === "Price: low to high"
            ? a.price - b.price
            : sort === "Price: high to low"
              ? b.price - a.price
              : 0,
        ),
    [query, cat, sort],
  )

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-10">
      <Breadcrumbs crumbs={[{ label: "Products" }]} />
      <p className="text-xs font-bold uppercase tracking-[.16em] text-gold-600">
        Explore Litch
      </p>
      <h1 className="mt-1 font-heading text-3xl font-bold">All products</h1>
      <div className="mt-6 flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-3 text-muted-foreground"
            size={17}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products"
            className="h-11 w-full rounded-lg border bg-card pl-10 text-sm"
          />
        </div>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="h-11 rounded-lg border bg-card px-3 text-sm"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-11 rounded-lg border bg-card px-3 text-sm"
        >
          <option>Featured</option>
          <option>Price: low to high</option>
          <option>Price: high to low</option>
        </select>
      </div>
      <p className="my-6 text-sm text-muted-foreground">
        {visible.length} products
      </p>
      <ProductGrid items={visible} showAddToCart />
    </main>
  )
}

// useSearchParams() requires a Suspense boundary in the App Router.
export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsPageInner />
    </Suspense>
  )
}
