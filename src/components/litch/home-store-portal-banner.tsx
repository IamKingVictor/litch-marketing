"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useSession } from "@/lib/session-context"

export function HomeStorePortalBanner() {
  const { session, hydrated } = useSession()

  if (!hydrated) {
    return <div className="h-[68px] animate-pulse rounded-lg bg-muted" />
  }

  const isSeller = session.role === "seller"

  return (
    <Link
      href={isSeller ? "/seller/dashboard" : "/seller/login"}
      className="flex items-center justify-between rounded-lg bg-primary px-4 py-3 text-left text-primary-foreground"
    >
      <span>
        <b className="block">
          {isSeller ? "Open your Store Portal" : "Become a Seller"}
        </b>
        <small className="text-primary-foreground/70">
          {isSeller
            ? "Manage products, orders and sales"
            : "Start selling your own products on Litch"}
        </small>
      </span>
      <ArrowRight size={18} />
    </Link>
  )
}
