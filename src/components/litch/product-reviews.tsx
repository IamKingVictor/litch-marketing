"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { LitchButton } from "./button"

export function ProductReviews() {
  const [reviews, setReviews] = useState([
    "Beautiful quality and fit.",
    "Arrived thoughtfully packaged.",
  ])
  const [review, setReview] = useState("")

  return (
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
  )
}
