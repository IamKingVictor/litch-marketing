"use client"

import Link from "next/link"
import { ArrowRight, Store } from "lucide-react"
import { useSession } from "@/lib/session-context"
import { LitchButton } from "./button"

export function HomeStorePortalBanner() {
  const { session, hydrated } = useSession()

  if (!hydrated) {
    return <div className="h-24 animate-pulse rounded-2xl bg-muted" />
  }

  const isSeller = session.role === "seller"

  return (
    <section className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-secondary px-6 py-6 text-secondary-foreground sm:flex-row sm:items-center sm:px-10 sm:py-7">
      <div className="flex items-center gap-4">
        <span className="hidden size-12 shrink-0 items-center justify-center rounded-xl bg-white/15 sm:flex">
          <Store size={22} />
        </span>
        <span>
          <b className="block font-heading text-lg sm:text-xl">
            {isSeller ? "Open your Store Portal" : "Sell on Litch Marketing"}
          </b>
          <span className="block text-sm text-white/80">
            {isSeller
              ? "Manage products, bookings, orders and sales in one place."
              : "Reach thousands of shoppers — list products or services and start earning."}
          </span>
        </span>
      </div>
      <Link href={isSeller ? "/seller/dashboard" : "/seller/login"}>
        <LitchButton className="whitespace-nowrap !bg-white !text-secondary">
          {isSeller ? "Go to dashboard" : "Become a Seller"} <ArrowRight size={16} />
        </LitchButton>
      </Link>
    </section>
  )
}
