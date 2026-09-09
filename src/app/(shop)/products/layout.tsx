import type { Metadata } from "next"
import type { ReactNode } from "react"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "All products",
  description:
    "Shop every product on Litch Marketing — filter by category, search by name, and sort by price across all vendor stores.",
  alternates: { canonical: `${SITE_URL}/products` },
}

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return children
}
