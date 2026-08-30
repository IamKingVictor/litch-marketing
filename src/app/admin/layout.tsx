"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { useSession } from "@/lib/session-context"
import { LitchButton } from "@/components/litch/button"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { session, hydrated } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    if (hydrated && !isLoginPage && session.role !== "admin") {
      router.replace("/admin/login")
    }
  }, [hydrated, isLoginPage, session.role, router])

  if (isLoginPage) return <>{children}</>

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-10">
        <div className="h-10 w-64 animate-pulse rounded bg-muted" />
        <div className="mt-6 h-40 animate-pulse rounded-xl bg-muted" />
      </div>
    )
  }

  if (session.role !== "admin") {
    return null // redirecting
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gold-600">
            Operations
          </p>
          <h1 className="font-heading text-3xl font-bold">Admin dashboard</h1>
        </div>
        <Link href="/">
          <LitchButton secondary>Back to storefront</LitchButton>
        </Link>
      </div>
      <div className="mt-6 flex gap-2 border-b text-sm font-bold">
        <Link
          href="/admin"
          className={`border-b-2 px-3 py-2 ${
            pathname === "/admin"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground"
          }`}
        >
          Shops
        </Link>
        <Link
          href="/admin/hero"
          className={`border-b-2 px-3 py-2 ${
            pathname === "/admin/hero"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground"
          }`}
        >
          Hero carousel
        </Link>
      </div>
      <div className="mt-6">{children}</div>
    </main>
  )
}
