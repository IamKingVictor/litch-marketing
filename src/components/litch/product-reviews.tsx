"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { getAverageRating, getReviews } from "@/lib/mock-data"
import { LitchButton } from "./button"

export function ProductReviews({ productId }: { productId: string }) {
  const seeded = getReviews(productId)
  const [reviews, setReviews] = useState(seeded)
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(5)
  const average = reviews.length
    ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
    : 0

  return (
    <section className="mt-12 max-w-2xl">
      <div className="flex items-center gap-3">
        <h2 className="font-heading text-xl font-bold">Ratings & reviews</h2>
        {reviews.length > 0 && (
          <span className="flex items-center gap-1 text-sm font-bold text-gold-600">
            <Star size={14} fill="currentColor" /> {average}
            <span className="font-normal text-muted-foreground">
              ({reviews.length})
            </span>
          </span>
        )}
      </div>

      {reviews.length === 0 && (
        <p className="mt-3 text-sm text-muted-foreground">
          No reviews yet — be the first to share your experience.
        </p>
      )}

      <div className="mt-5 flex flex-col gap-3">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-xl border bg-card p-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold">{r.author}</span>
              <span className="text-xs text-muted-foreground">{r.date}</span>
            </div>
            <div className="mt-1 flex gap-0.5 text-gold">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  size={13}
                  fill={n <= r.rating ? "currentColor" : "none"}
                  className={n <= r.rating ? "" : "text-muted-foreground"}
                />
              ))}
            </div>
            <p className="mt-2 text-muted-foreground">{r.comment}</p>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!review.trim()) return
          setReviews((prev) => [
            {
              id: `r-${Date.now()}`,
              author: "You",
              rating: rating as 1 | 2 | 3 | 4 | 5,
              comment: review,
              date: new Date().toISOString().slice(0, 10),
            },
            ...prev,
          ])
          setReview("")
          setRating(5)
        }}
        className="mt-6 flex flex-col gap-3 rounded-xl border bg-card p-4"
      >
        <p className="text-sm font-bold">Leave a review</p>
        <div className="flex gap-1 text-gold">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              onClick={() => setRating(n)}
              aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
            >
              <Star size={20} fill={n <= rating ? "currentColor" : "none"} />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience"
            className="h-11 flex-1 rounded-lg border bg-background px-3 text-sm"
          />
          <LitchButton type="submit">Post</LitchButton>
        </div>
      </form>
    </section>
  )
}
