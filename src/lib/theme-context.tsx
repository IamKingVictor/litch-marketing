"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export type ThemeMode = "light" | "dark" | "system"

const THEME_KEY = "litch-theme"

type ThemeContextValue = {
  theme: ThemeMode
  resolvedTheme: "light" | "dark"
  setTheme: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function resolveTheme(mode: ThemeMode): "light" | "dark" {
  if (mode === "system") {
    return typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  }
  return mode
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("system")

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY) as ThemeMode | null
    const nextTheme =
      stored === "light" || stored === "dark" || stored === "system"
        ? stored
        : "system"
    setThemeState(nextTheme)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const current = resolveTheme(theme)
    root.classList.toggle("dark", current === "dark")
    root.classList.toggle("light", current === "light")
    root.style.colorScheme = current
    window.localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => {
      if (theme === "system") {
        const next = resolveTheme("system")
        document.documentElement.classList.toggle("dark", next === "dark")
        document.documentElement.classList.toggle("light", next === "light")
        document.documentElement.style.colorScheme = next
      }
    }
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [theme])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme: resolveTheme(theme),
      setTheme: (mode: ThemeMode) => setThemeState(mode),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider")
  return ctx
}
