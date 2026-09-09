"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  categories,
  categoryImages,
  products as initialProducts,
} from "@/lib/mock-data"
import { ProductGrid } from "@/components/litch/product-grid"
import { Footer } from "@/components/litch/footer"
import { VendorProductCarousel } from "@/components/litch/vendor-product-carousel"
import { HomeStorePortalBanner } from "@/components/litch/home-store-portal-banner"

const TILE_COLORS = [
  "bg-[#e7d9d1]",
  "bg-[#d9e4d9]",
  "bg-[#e6ded0]",
  "bg-[#d6e1e9]",
  "bg-[#ead7df]",
]

function HomePageContent() {
  const router = useRouter()
  const seenWelcome =
    typeof window !== "undefined" &&
    window.localStorage.getItem("litch-welcome-seen") === "true"

  useEffect(() => {
    if (!seenWelcome) {
      router.replace("/welcome")
    }
  }, [router, seenWelcome])

  if (!seenWelcome) {
    return null
  }

  return (
    <>
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-6 md:px-10">
        <HomeStorePortalBanner />
        <VendorProductCarousel />
        <section>
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-heading text-2xl font-bold">
              Shop by category
            </h2>
            <Link
              href="/categories"
              className="-m-2 p-2 text-sm font-bold text-primary"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
            {categories.slice(1).map((cat, i) => (
              <Link
                key={cat}
                href={`/products?category=${encodeURIComponent(cat)}`}
                className="group grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] overflow-hidden rounded-xl border bg-card text-left"
              >
                <div
                  className={`relative aspect-square overflow-hidden ${TILE_COLORS[i % TILE_COLORS.length]}`}
                >
                  <img
                    src={categoryImages[cat]}
                    alt={`${cat} category on Litch Marketing`}
                    className="size-full object-cover opacity-90 transition group-hover:scale-105"
                  />
                </div>
                <span className="flex min-w-0 items-center p-2 font-heading text-[11px] font-bold leading-tight text-primary md:p-3 md:text-sm">
                  {cat}
                </span>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-heading text-2xl font-bold">Fresh finds</h2>
            <Link
              href="/products"
              className="-m-2 p-2 text-sm font-bold text-primary"
            >
              See all
            </Link>
          </div>
          <ProductGrid items={initialProducts.slice(0, 4)} showAddToCart />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default function Home() {
  return <HomePageContent />
}
