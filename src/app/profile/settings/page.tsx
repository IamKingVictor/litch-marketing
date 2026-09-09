"use client"

import Link from "next/link"
import {
  ArrowLeft,
  Bell,
  Moon,
  SunMedium,
  MonitorSmartphone,
} from "lucide-react"
import { useTheme, type ThemeMode } from "@/lib/theme-context"

const themeOptions: {
  value: ThemeMode
  label: string
  icon: React.ReactNode
}[] = [
  { value: "light", label: "Light mode", icon: <SunMedium size={16} /> },
  { value: "dark", label: "Dark mode", icon: <Moon size={16} /> },
  {
    value: "system",
    label: "System default",
    icon: <MonitorSmartphone size={16} />,
  },
]

export default function AppSettingsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  return (
    <main className="mx-auto max-w-xl px-4 py-6">
      <Link
        href="/profile"
        className="mb-5 flex items-center gap-2 text-sm font-bold"
      >
        <ArrowLeft size={16} /> App settings
      </Link>

      <div className="rounded-2xl border bg-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-muted-foreground">
              Preferences
            </p>
            <h1 className="mt-1 font-heading text-2xl font-bold">
              Display & notifications
            </h1>
          </div>
          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-bold text-primary">
            {resolvedTheme}
          </span>
        </div>

        <div className="mt-6 space-y-4">
          <div className="rounded-xl border bg-background p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Bell size={17} />
                </span>
                <div>
                  <p className="font-bold">Push notifications</p>
                  <p className="text-xs text-muted-foreground">
                    Order updates and promos
                  </p>
                </div>
              </div>
              <button className="relative h-6 w-11 rounded-full bg-primary/20 transition">
                <span className="absolute left-1 top-1 size-4 rounded-full bg-primary shadow-sm" />
              </button>
            </div>
          </div>

          <div className="rounded-xl border bg-background p-4">
            <p className="mb-3 text-sm font-bold">Theme</p>
            <div className="space-y-2">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTheme(option.value)}
                  className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm ${
                    theme === option.value
                      ? "border-primary bg-secondary"
                      : "border-border bg-transparent"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {option.icon}
                    {option.label}
                  </span>
                  {theme === option.value && (
                    <span className="text-primary">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
