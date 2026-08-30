"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { useSession } from "@/lib/session-context"
import { LitchButton } from "@/components/litch/button"

const TABS = [
  { href: "/seller/dashboard", label: "Overview" },
  { href: "/seller/dashboard/products", label: "Products" },
  { href: "/seller/dashboard/orders", label: "Orders" },
  { href: "/seller/dashboard/transactions", label: "Transactions" },
  { href: "/seller/dashboard/settings", label: "Shop settings" },
]

export default function SellerDashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const { session, hydrated } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Wait for the hydration read from localStorage before deciding to
    // redirect — otherwise a real logged-in seller gets bounced back to
    // /seller/login on every refresh, because the very first render always
    // starts as "guest" before localStorage has been read.
    if (hydrated && session.role !== "seller") {
      router.replace("/seller/login")
    }
  }, [hydrated, session.role, router])

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-10">
        <div className="h-10 w-48 animate-pulse rounded bg-muted" />
        <div className="mt-6 h-40 animate-pulse rounded-xl bg-muted" />
      </div>
    )
  }

  if (session.role !== "seller") {
    return null // redirecting
  }

  return (
    <main className="min-h-screen bg-secondary/40">
      <div className="bg-primary px-4 py-4 text-primary-foreground md:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="text-xs text-primary-foreground/60">
              Vendor portal
            </p>
            <h1 className="font-heading text-xl font-bold">
              {session.shopName ?? "Your shop"}
            </h1>
          </div>
          <Link href="/">
            <LitchButton
              secondary
              className="border-primary-foreground/30 bg-transparent text-primary-foreground"
            >
              View storefront
            </LitchButton>
          </Link>
        </div>
      </div>
      <div className="border-b bg-primary px-4 md:px-10">
        <div className="mx-auto flex max-w-6xl gap-6 overflow-x-auto">
          {TABS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`whitespace-nowrap border-b-2 px-1 py-3 text-sm font-bold ${
                pathname === t.href
                  ? "border-gold text-primary-foreground"
                  : "border-transparent text-primary-foreground/60"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-10">{children}</div>
    </main>
  )
}
