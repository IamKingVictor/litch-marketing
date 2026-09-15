"use client"

import Link from "next/link"
import { useEffect, useSyncExternalStore } from "react"
import { useRouter } from "next/navigation"
import {
  categories,
  categoryImages,
  products as initialProducts,
} from "@/lib/mock-data"
import { ProductGrid } from "@/components/litch/product-grid"
import { Footer } from "@/components/litch/footer"
import { VendorProductCarousel } from "@/components/litch/vendor-product-carousel"

const TILE_COLORS = [
  "bg-[#e7d9d1]",
  "bg-[#d9e4d9]",
  "bg-[#e6ded0]",
  "bg-[#d6e1e9]",
  "bg-[#ead7df]",
]

function HomePageContent() {
  const router = useRouter()
  const welcomeSeen = useSyncExternalStore(
    () => () => undefined,
    () => window.localStorage.getItem("litch-welcome-seen") === "true",
    () => false,
  )

  useEffect(() => {
    if (!welcomeSeen) {
      router.replace("/welcome")
    }
  }, [router, welcomeSeen])

  if (!welcomeSeen) {
    return null
  }

  return (
    <>
      <main className="mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-4 py-6 md:px-8 lg:px-12">
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
          {/* Horizontal scroller — Amazon/Jumia-style category rail instead of
              wrapping into a grid, so it stays a single scannable row. */}
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.slice(1).map((cat, i) => (
              <Link
                key={cat}
                href={`/products?category=${encodeURIComponent(cat)}`}
                className="group flex w-36 shrink-0 flex-col overflow-hidden rounded-xl border bg-card text-left sm:w-44"
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
                <span className="flex min-w-0 items-center p-2.5 font-heading text-xs font-bold leading-tight text-primary sm:text-sm">
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
          <ProductGrid
            items={initialProducts
              .filter((p) => p.type === "product")
              .slice(0, 8)}
            showAddToCart
          />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default function Home() {
  return <HomePageContent />
}
