"use client"

import { useState } from "react"
import { ArrowLeft, Heart, ShoppingBag, Star } from "lucide-react"
import type { View } from "@/lib/types"
import { products as initialProducts, type Product } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/currency"
import { LitchButton } from "../button"

export function ProductView({
  go,
  add,
}: {
  go: (v: View) => void
  add: (p: Product) => void
}) {
  const p = initialProducts[0]
  const [reviews, setReviews] = useState([
    "Beautiful quality and fit.",
    "Arrived thoughtfully packaged.",
  ])
  const [review, setReview] = useState("")
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-10">
      <button
        onClick={() => go("products")}
        className="mb-5 flex items-center gap-2 text-sm font-bold"
      >
        <ArrowLeft size={16} /> Back to products
      </button>
      <div className="grid gap-8 md:grid-cols-2">
        <img
          src={p.image}
          alt={p.name}
          className="aspect-square w-full rounded-2xl object-cover"
        />
        <div className="flex flex-col justify-center">
          <p className="text-sm text-muted-foreground">
            {p.shop} · {p.category}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold">{p.name}</h1>
          <div className="mt-4 flex items-center gap-3 font-heading text-2xl font-bold">
            {formatCurrency(p.price)}{" "}
            {p.originalPrice && (
              <del className="text-base font-normal text-muted-foreground">
                {formatCurrency(p.originalPrice)}
              </del>
            )}
          </div>
          <p className="mt-5 leading-7 text-muted-foreground">
            {p.description}
          </p>
          <div className="mt-6 flex gap-3">
            <LitchButton onClick={() => add(p)}>
              <ShoppingBag size={17} /> Add to cart
            </LitchButton>
            <LitchButton secondary>
              <Heart size={17} /> Save
            </LitchButton>
          </div>
        </div>
      </div>
      <section className="mt-12 max-w-2xl">
        <h2 className="font-heading text-xl font-bold">
          Reviews{" "}
          <span className="text-muted-foreground">({reviews.length})</span>
        </h2>
        <div className="mt-5 flex flex-col gap-3">
          {reviews.map((r, i) => (
            <div key={i} className="rounded-xl border bg-card p-4 text-sm">
              {r}
              <div className="mt-2 flex gap-1 text-gold">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} size={13} fill="currentColor" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (review.trim()) {
              setReviews([...reviews, review])
              setReview("")
            }
          }}
          className="mt-5 flex gap-2"
        >
          <input
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience"
            className="h-11 flex-1 rounded-lg border bg-card px-3 text-sm"
          />
          <LitchButton type="submit">Post</LitchButton>
        </form>
      </section>
    </main>
  )
}
