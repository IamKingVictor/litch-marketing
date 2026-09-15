"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag,
  CalendarCheck,
  Star,
} from "lucide-react"
import { Logo } from "@/components/litch/logo"
import { LitchButton } from "@/components/litch/button"
import { carouselProducts, getAverageRating, services } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/currency"

const SPOTLIGHTS = [
  {
    icon: <ShoppingBag size={22} />,
    tag: "Products",
    heading: "Thousands of products, one marketplace",
    body: "Fashion, electronics, beauty, home and more from verified vendors across the country.",
  },
  {
    icon: <CalendarCheck size={22} />,
    tag: "Services",
    heading: "Reserve services in a couple of taps",
    body: "Car care, dining, wellness and more — pick an open time slot and you're booked.",
  },
]

const TRUST_STRIP = [
  { icon: <ShieldCheck size={16} />, label: "Secure payments" },
  { icon: <Truck size={16} />, label: "Fast delivery" },
  { icon: <RotateCcw size={16} />, label: "Hassle-free returns" },
]

export default function WelcomePage() {
  const router = useRouter()
  const [active, setActive] = useState(0)
  const showcase = (active === 0 ? carouselProducts : services).slice(0, 4)

  useEffect(() => {
    if (window.localStorage.getItem("litch-welcome-seen") === "true") {
      router.replace("/")
    }
  }, [router])

  useEffect(() => {
    const t = setInterval(() => {
      setActive((i) => (i + 1) % SPOTLIGHTS.length)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  const markSeenAndGoHome = () => {
    window.localStorage.setItem("litch-welcome-seen", "true")
    router.push("/")
  }

  return (
    <main className="relative flex min-h-screen w-full items-center overflow-hidden bg-primary text-primary-foreground">
      {/* Decorative backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 size-96 rounded-full bg-secondary/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 size-[28rem] rounded-full bg-gold/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-6 py-14 md:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-12">
        {/* Left: brand + copy + CTAs */}
        <div>
          <Logo variant="inverted" />

          <p className="mt-10 text-xs font-bold uppercase tracking-[.3em] text-gold">
            Welcome to Litch Marketing
          </p>
          <h1 className="mt-4 max-w-xl font-heading text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            Shop, book, and sell — all in one place.
          </h1>
          <p className="mt-5 max-w-lg text-base text-primary-foreground/70 sm:text-lg">
            A single marketplace for real products and real services, backed by
            verified vendors and secure checkout.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <LitchButton
              className="px-6 py-3 text-base"
              onClick={markSeenAndGoHome}
            >
              Get started <ArrowRight size={17} />
            </LitchButton>
            <Link
              href="/login"
              className="text-sm font-bold text-primary-foreground/80 hover:text-primary-foreground"
            >
              Already have an account? Sign in
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6">
            {TRUST_STRIP.map((t) => (
              <span
                key={t.label}
                className="flex items-center gap-2 text-sm text-primary-foreground/70"
              >
                {t.icon} {t.label}
              </span>
            ))}
          </div>
        </div>

        {/* Right: interactive spotlight + live product showcase */}
        <div className="flex flex-col gap-5">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
            <div className="flex gap-2">
              {SPOTLIGHTS.map((s, i) => (
                <button
                  key={s.tag}
                  onClick={() => setActive(i)}
                  className={`flex-1 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                    i === active
                      ? "bg-gold text-primary"
                      : "bg-white/10 text-primary-foreground/60"
                  }`}
                >
                  {s.tag}
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold text-primary">
                {SPOTLIGHTS[active].icon}
              </span>
              <div>
                <h2 className="font-heading text-xl font-bold sm:text-2xl">
                  {SPOTLIGHTS[active].heading}
                </h2>
                <p className="mt-2 text-sm text-primary-foreground/70">
                  {SPOTLIGHTS[active].body}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-1.5">
              {SPOTLIGHTS.map((s, i) => (
                <span
                  key={s.tag}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-6 bg-gold" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {showcase.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {showcase.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur"
                >
                  <div className="aspect-square overflow-hidden rounded-xl bg-white/10">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="size-full object-cover"
                    />
                  </div>
                  <p className="mt-2 truncate text-xs font-bold">{p.name}</p>
                  <div className="flex items-center justify-between text-[11px] text-primary-foreground/60">
                    <span>{formatCurrency(p.price)}</span>
                    <span className="flex items-center gap-0.5">
                      <Star
                        size={10}
                        fill="currentColor"
                        className="text-gold"
                      />
                      {getAverageRating(p.id)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={markSeenAndGoHome}
        className="absolute right-6 top-6 z-10 text-xs font-bold text-primary-foreground/60 hover:text-primary-foreground md:right-10 md:top-8"
      >
        Skip
      </button>
    </main>
  )
}
