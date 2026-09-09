"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { carouselProducts } from "@/lib/mock-data"

const INTERVAL_MS = 5000

export function VendorProductCarousel() {
  const items = carouselProducts
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (items.length < 2) return
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
    }, INTERVAL_MS)
    return () => clearInterval(t)
  }, [items.length])

  if (items.length === 0) return null

  const p = items[index]

  return (
    <section className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
      <Link href={`/products/${p.id}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden md:aspect-[18/7]">
          <img
            key={p.id}
            src={p.image}
            alt={p.name}
            className="size-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-4 text-left text-white md:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-white/80 md:text-[11px]">
              {p.shop}
            </p>
            <h2 className="mt-2 max-w-md font-heading text-xl font-bold leading-tight md:text-2xl">
              {p.name}
            </h2>
          </div>
        </div>
      </Link>

      {items.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {items.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`size-1.5 rounded-full ${i === index ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
