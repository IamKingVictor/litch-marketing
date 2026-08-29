import type { ReactNode } from "react"
import type { View } from "@/lib/types"
import { Header } from "./header"
import { BottomNav } from "./bottom-nav"

export function Shell({
  children,
  go,
  cartCount,
}: {
  children: ReactNode
  go: (v: View) => void
  cartCount: number
}) {
  return (
    <div className="min-h-screen pb-20">
      <Header go={go} cartCount={cartCount} />
      {children}
      <BottomNav go={go} cartCount={cartCount} />
    </div>
  )
}
