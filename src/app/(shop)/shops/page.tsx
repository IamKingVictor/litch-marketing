import Link from "next/link"
import type { Metadata } from "next"
import { Star } from "lucide-react"
import { shops } from "@/lib/mock-data"
import { slugify } from "@/lib/slugify"
import { Breadcrumbs } from "@/components/litch/breadcrumbs"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "All shops",
  description:
    "Meet the independent vendors selling on Litch Marketing — browse every shop by category, rating, and specialty.",
  alternates: { canonical: `${SITE_URL}/shops` },
}

export default function ShopsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-10">
      <Breadcrumbs crumbs={[{ label: "Shops" }]} />
      <p className="text-xs font-bold uppercase tracking-[.16em] text-gold-600">
        Meet the makers
      </p>
      <h1 className="mt-1 font-heading text-3xl font-bold">All shops</h1>
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {shops.map((s) => (
          <Link
            key={s.name}
            href={`/shops/${slugify(s.name)}`}
            className="group overflow-hidden rounded-2xl border bg-card text-left"
          >
            <img
              src={s.banner}
              alt={`${s.name} storefront banner`}
              className="h-48 w-full object-cover transition group-hover:scale-105"
            />
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-bold">{s.name}</h2>
                <span className="flex items-center gap-1 text-sm">
                  <Star size={14} fill="currentColor" className="text-gold" />{" "}
                  {s.rating}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {s.category} · {s.bio}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}

