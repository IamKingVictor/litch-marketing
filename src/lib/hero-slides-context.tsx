"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

export type HeroSlide = {
  id: string
  eyebrow: string
  heading: string
  body: string
  buttonLabel: string
  href: string
  bg: string // a Tailwind bg-* class — kept simple instead of a color picker
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: "weekend-edit",
    eyebrow: "The weekend edit",
    heading: "Make space for better things.",
    body: "Thoughtful finds from independent makers.",
    buttonLabel: "Shop the edit",
    href: "/products",
    bg: "bg-[#dbe5e7]",
  },
  {
    id: "academy",
    eyebrow: "Litch academy",
    heading: "Learn. Build. Belong.",
    body: "Practical lessons for your next chapter.",
    buttonLabel: "Explore courses",
    href: "/academy",
    bg: "bg-gold",
  },
]

const STORAGE_KEY = "litch-hero-slides"

type HeroSlidesContextValue = {
  slides: HeroSlide[]
  setSlides: (slides: HeroSlide[]) => void
  hydrated: boolean
}

const HeroSlidesContext = createContext<HeroSlidesContextValue | null>(null)

export function HeroSlidesProvider({ children }: { children: ReactNode }) {
  const [slides, setSlidesState] = useState<HeroSlide[]>(DEFAULT_SLIDES)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        // Hydrate from localStorage on mount — not available during SSR,
        // so it can't be read in the initial useState.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSlidesState(JSON.parse(raw))
      } catch {
        // ignore malformed storage
      }
    }
    setHydrated(true)
  }, [])

  const setSlides = (next: HeroSlide[]) => {
    setSlidesState(next)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  return (
    <HeroSlidesContext.Provider value={{ slides, setSlides, hydrated }}>
      {children}
    </HeroSlidesContext.Provider>
  )
}

export function useHeroSlides() {
  const ctx = useContext(HeroSlidesContext)
  if (!ctx)
    throw new Error("useHeroSlides must be used inside HeroSlidesProvider")
  return ctx
}
