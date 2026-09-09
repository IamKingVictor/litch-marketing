"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Sparkles,
  Tag,
  TrendingUp,
  Heart,
  ShieldCheck,
  Truck,
  MapPin,
  RotateCcw,
  CreditCard,
} from "lucide-react"
import { LitchButton } from "@/components/litch/button"

type Slide = {
  eyebrow: string
  heading: string
  body: string
  pills: { icon: React.ReactNode; label: string; className: string }[]
}

const SLIDES: Slide[] = [
  {
    eyebrow: "Discover",
    heading: "Find Your Next Favorite",
    body: "Explore thousands of products across fashion, electronics, beauty, home & more.",
    pills: [
      {
        icon: <Sparkles size={13} />,
        label: "Endless choices",
        className: "left-2 top-4",
      },
      {
        icon: <Tag size={13} />,
        label: "New drops",
        className: "right-2 top-2",
      },
      {
        icon: <TrendingUp size={13} />,
        label: "Trending now",
        className: "left-4 bottom-8",
      },
      {
        icon: <Heart size={13} />,
        label: "You'll love this",
        className: "right-4 bottom-4",
      },
    ],
  },
  {
    eyebrow: "Checkout",
    heading: "From Cart to Your Doorstep",
    body: "Quick checkout, secure payments, and fast delivery — straight to you.",
    pills: [
      {
        icon: <ShieldCheck size={13} />,
        label: "Secure payments",
        className: "left-2 top-6",
      },
      {
        icon: <CreditCard size={13} />,
        label: "Easy checkout",
        className: "right-2 top-3",
      },
      {
        icon: <Truck size={13} />,
        label: "Fast delivery",
        className: "right-4 bottom-16",
      },
      {
        icon: <MapPin size={13} />,
        label: "Track anytime",
        className: "left-4 bottom-10",
      },
      {
        icon: <RotateCcw size={13} />,
        label: "Hassle-free returns",
        className: "left-1/2 -translate-x-1/2 bottom-2",
      },
    ],
  },
]

export default function WelcomePage() {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const slide = SLIDES[index]
  const isLast = index === SLIDES.length - 1

  useEffect(() => {
    if (window.localStorage.getItem("litch-welcome-seen") === "true") {
      router.replace("/")
    }
  }, [router])

  const markSeenAndGoHome = () => {
    window.localStorage.setItem("litch-welcome-seen", "true")
    router.push("/")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[oklch(0.19_0.09_255)] px-4 py-10">
      <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-[#f7f2e7] shadow-2xl sm:max-w-md">
        <div className="flex items-center justify-end px-5 pt-5">
          <button
            onClick={markSeenAndGoHome}
            className="text-xs font-bold text-[#14213d]/60"
          >
            Skip
          </button>
        </div>

        <div className="relative mx-auto mt-2 flex h-64 w-full items-center justify-center">
          <img
            src="/brand/logo.jpg"
            alt=""
            aria-hidden="true"
            className="size-40 object-contain opacity-90"
          />
          {slide.pills.map((pill) => (
            <span
              key={pill.label}
              className={`absolute flex items-center gap-1 rounded-full bg-card px-2.5 py-1.5 text-[11px] font-bold text-primary shadow-md ${pill.className}`}
            >
              {pill.icon} {pill.label}
            </span>
          ))}
        </div>

        <div className="px-7 pb-8 pt-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-gold-600">
            {slide.eyebrow}
          </p>
          <div className="mt-3 flex justify-center gap-1.5">
            {SLIDES.map((s, i) => (
              <button
                key={s.heading}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-primary" : "w-1.5 bg-primary/20"
                }`}
              />
            ))}
          </div>
          <h1 className="mt-4 font-heading text-2xl font-bold leading-tight text-[#14213d]">
            {slide.heading}
          </h1>
          <p className="mt-2 text-sm text-[#14213d]/70">{slide.body}</p>

          {isLast ? (
            <LitchButton className="mt-6 w-full" onClick={markSeenAndGoHome}>
              Continue →
            </LitchButton>
          ) : (
            <LitchButton
              className="mt-6 w-full"
              onClick={() => setIndex((i) => i + 1)}
            >
              Next →
            </LitchButton>
          )}

          <Link href="/login" className="mt-4 block text-sm text-[#14213d]/60">
            Already have an account? <b className="text-[#14213d]">Sign In</b>
          </Link>
          <button
            type="button"
            onClick={markSeenAndGoHome}
            className="mt-3 block w-full text-sm font-bold text-[#14213d]/70"
          >
            Continue as guest
          </button>
        </div>
      </div>
    </main>
  )
}
