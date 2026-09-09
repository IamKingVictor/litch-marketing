import Link from "next/link"
import type { Metadata } from "next"
import { categories, categoryImages } from "@/lib/mock-data"
import { Breadcrumbs } from "@/components/litch/breadcrumbs"
import { SITE_URL } from "@/lib/site"

const TILE_COLORS = [
  "bg-[#e7d9d1]",
  "bg-[#d9e4d9]",
  "bg-[#e6ded0]",
  "bg-[#d6e1e9]",
  "bg-[#ead7df]",
]

export const metadata: Metadata = {
  title: "Shop by category",
  description:
    "Browse Litch Marketing by category — restaurants & food, fashion, household & lifestyle, groceries, beauty, entertainment, electronics, health, and more.",
  alternates: { canonical: `${SITE_URL}/categories` },
}

export default function CategoriesPage() {
  const list = categories.slice(1)
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-10">
      <Breadcrumbs crumbs={[{ label: "Categories" }]} />
      <p className="text-xs font-bold uppercase tracking-[.16em] text-gold-600">
        Browse by category
      </p>
      <h1 className="mt-1 font-heading text-3xl font-bold">Categories</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {list.length} categories
      </p>
      <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4">
        {list.map((cat, i) => (
          <Link
            key={cat}
            href={`/products?category=${encodeURIComponent(cat)}`}
            className="group overflow-hidden rounded-xl border bg-card text-left"
          >
            <div
              className={`relative flex aspect-square items-end overflow-hidden ${TILE_COLORS[i % TILE_COLORS.length]}`}
            >
              <img
                src={categoryImages[cat]}
                alt={`${cat} category on Litch Marketing`}
                className="absolute inset-0 size-full object-cover opacity-40 transition group-hover:scale-105 group-hover:opacity-55"
              />
              <span className="relative z-10 p-4 font-heading text-base font-bold text-primary">
                {cat}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}

