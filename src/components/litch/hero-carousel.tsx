"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useHeroSlides } from "@/lib/hero-slides-context"

export function HeroCarousel() {
  const { slides, hydrated } = useHeroSlides()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 6000)
    return () => clearInterval(t)
  }, [slides.length])

  if (!hydrated) {
    return (
      <div className="h-56 animate-pulse rounded-2xl bg-muted md:h-72" />
    )
  }
  if (slides.length === 0) return null

  const slide = slides[Math.min(index, slides.length - 1)]

  return (
    <section className="relative overflow-hidden rounded-2xl">
      <div className={`p-7 md:p-10 ${slide.bg}`}>
        <span className="text-xs font-bold uppercase tracking-[.2em] text-primary">
          {slide.eyebrow}
        </span>
        <h1 className="mt-3 max-w-md font-heading text-4xl font-bold leading-tight text-primary">
          {slide.heading}
        </h1>
        <p className="mt-3 text-sm text-primary/70">{slide.body}</p>
        <Link
          href={slide.href}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"
        >
          {slide.buttonLabel} <ArrowRight size={15} />
        </Link>
      </div>
      {slides.length > 1 && (
        <>
          <button
            onClick={() =>
              setIndex((i) => (i - 1 + slides.length) % slides.length)
            }
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-card/80"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setIndex((i) => (i + 1) % slides.length)}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-card/80"
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`size-1.5 rounded-full ${i === index ? "bg-primary" : "bg-primary/30"}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
