"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { useWishlist } from "@/lib/wishlist-context"
import { ProductGrid } from "@/components/litch/product-grid"
import { LitchButton } from "@/components/litch/button"

export default function WishlistPage() {
  const { items } = useWishlist()

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-10">
      <h1 className="font-heading text-3xl font-bold">Wishlist</h1>
      {items.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed p-10 text-center">
          <Heart className="mx-auto text-muted-foreground" />
          <p className="mt-3 font-heading font-bold">Nothing saved yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Tap the heart on any product to save it here.
          </p>
          <Link href="/products">
            <LitchButton className="mt-5">Explore products</LitchButton>
          </Link>
        </div>
      ) : (
        <div className="mt-8">
          <ProductGrid items={items} showAddToCart />
        </div>
      )}
    </main>
  )
}
