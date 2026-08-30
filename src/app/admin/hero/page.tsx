"use client"

import { Plus, Trash2 } from "lucide-react"
import { useHeroSlides, type HeroSlide } from "@/lib/hero-slides-context"
import { useToast } from "@/lib/toast-context"
import { LitchButton } from "@/components/litch/button"

const BG_OPTIONS = [
  "bg-[#dbe5e7]",
  "bg-gold",
  "bg-[#e7d9d1]",
  "bg-[#d9e4d9]",
  "bg-[#e6ded0]",
]

function emptySlide(): HeroSlide {
  return {
    id: `slide-${Date.now()}`,
    eyebrow: "New promo",
    heading: "Your headline here",
    body: "A short supporting line.",
    buttonLabel: "Shop now",
    href: "/products",
    bg: BG_OPTIONS[0],
  }
}

export default function AdminHeroPage() {
  const { slides, setSlides, hydrated } = useHeroSlides()
  const { toast } = useToast()

  const update = (id: string, patch: Partial<HeroSlide>) =>
    setSlides(slides.map((s) => (s.id === id ? { ...s, ...patch } : s)))

  const remove = (id: string) => {
    setSlides(slides.filter((s) => s.id !== id))
    toast("Slide deleted")
  }

  const add = () => {
    setSlides([...slides, emptySlide()])
    toast("Slide added", "success")
  }

  const move = (id: string, dir: -1 | 1) => {
    const i = slides.findIndex((s) => s.id === id)
    const j = i + dir
    if (j < 0 || j >= slides.length) return
    const next = [...slides]
    ;[next[i], next[j]] = [next[j], next[i]]
    setSlides(next)
  }

  if (!hydrated) {
    return <div className="h-40 animate-pulse rounded-xl bg-muted" />
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold">
          Home hero carousel
        </h2>
        <LitchButton onClick={add}>
          <Plus size={16} /> Add slide
        </LitchButton>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {slides.map((s, i) => (
          <div key={s.id} className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-muted-foreground">
                Slide {i + 1}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => move(s.id, -1)}
                  disabled={i === 0}
                  className="text-xs font-bold disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  onClick={() => move(s.id, 1)}
                  disabled={i === slides.length - 1}
                  className="text-xs font-bold disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  onClick={() => remove(s.id)}
                  aria-label="Delete slide"
                  className="text-destructive"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <input
                value={s.eyebrow}
                onChange={(e) => update(s.id, { eyebrow: e.target.value })}
                placeholder="Eyebrow label"
                className="h-10 rounded-lg border bg-background px-3 text-sm"
              />
              <input
                value={s.heading}
                onChange={(e) => update(s.id, { heading: e.target.value })}
                placeholder="Heading"
                className="h-10 rounded-lg border bg-background px-3 text-sm"
              />
              <input
                value={s.body}
                onChange={(e) => update(s.id, { body: e.target.value })}
                placeholder="Body text"
                className="h-10 rounded-lg border bg-background px-3 text-sm md:col-span-2"
              />
              <input
                value={s.buttonLabel}
                onChange={(e) =>
                  update(s.id, { buttonLabel: e.target.value })
                }
                placeholder="Button label"
                className="h-10 rounded-lg border bg-background px-3 text-sm"
              />
              <input
                value={s.href}
                onChange={(e) => update(s.id, { href: e.target.value })}
                placeholder="Button link (e.g. /products)"
                className="h-10 rounded-lg border bg-background px-3 text-sm"
              />
              <select
                value={s.bg}
                onChange={(e) => update(s.id, { bg: e.target.value })}
                className="h-10 rounded-lg border bg-background px-3 text-sm md:col-span-2"
              >
                {BG_OPTIONS.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
        {slides.length === 0 && (
          <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            No slides — add one to populate the homepage hero.
          </p>
        )}
      </div>
    </div>
  )
}
