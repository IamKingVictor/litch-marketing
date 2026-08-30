import type { ReactNode } from "react"
import { Header } from "@/components/litch/header"
import { BottomNav } from "@/components/litch/bottom-nav"

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen pb-20">
      <Header />
      {children}
      <BottomNav />
    </div>
  )
}
