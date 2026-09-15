"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const INTERVAL_MS = 5000
const BANNER_SLIDES = [
  {
    id: "omnia-fold",
    image: "/images/banners/banner1.jpg",
    name: "Omnia A-Fold S1 5G",
  },
  {
    id: "fashion-redemption",
    image: "/images/banners/banner2.jpg",
    name: "Fashion Redemption collection",
  },
  {
    id: "akara-fries",
    image: "/images/banners/banner3.jpg",
    name: "Crispy Akara & French Fries",
  },
  {
    id: "apex-pulse",
    image: "/images/banners/banner_hp.png",
    name: "Apex Pulse ANC headphones",
  },
  {
    id: "aero-slim",
    image: "/images/banners/banner_lt.png",
    name: "Aero Slim 14 laptop",
  },
  {
    id: "elite-smartwatch",
    image: "/images/banners/banner_sw.png",
    name: "Elite smartwatch",
  },
] as const

export function VendorProductCarousel() {
  const items = BANNER_SLIDES
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (items.length < 2 || paused) return
    const t = setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      INTERVAL_MS,
    )
    return () => clearInterval(t)
  }, [items.length, paused])

  const slide = items[index]
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length)
  const next = () => setIndex((i) => (i + 1) % items.length)

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative w-full overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900 sm:aspect-[21/9]">
        <img
          key={slide.id}
          src={slide.image}
          alt={slide.name}
          className="absolute inset-0 size-full object-cover"
        />
      </div>

      {items.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault()
              prev()
            }}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-primary shadow-md transition hover:bg-card sm:size-11"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              next()
            }}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-primary shadow-md transition hover:bg-card sm:size-11"
          >
            <ChevronRight size={20} />
          </button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
            {items.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-primary" : "w-1.5 bg-primary/25"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
