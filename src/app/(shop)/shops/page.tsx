import Link from "next/link"
import type { Metadata } from "next"
import { Star } from "lucide-react"
import { shops } from "@/lib/mock-data"
import { slugify } from "@/lib/slugify"
import { Breadcrumbs } from "@/components/litch/breadcrumbs"
import { SITE_URL } from "@/lib/site"

// Parallex has a direct vendor page for future banking work, but remains
// intentionally unlisted from the public shop directory for this release.
const directoryShops = shops.filter((shop) => shop.name !== "Parallex Bank")

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
      <div className="mt-8 grid gap-7 md:grid-cols-2">
        {directoryShops.map((s) => (
          <Link
            key={s.name}
            href={`/shops/${slugify(s.name)}`}
            className="group overflow-hidden rounded-2xl border bg-card text-left"
          >
            <div className="flex items-center gap-4 border-b bg-secondary/35 p-5">
              <img
                src={s.logo}
                alt={`${s.name} logo`}
                className="size-16 rounded-xl object-cover"
              />
              <div>
                <h2 className="font-heading text-xl font-bold">{s.name}</h2>
                <p className="mt-1 text-xs font-bold uppercase tracking-[.12em] text-muted-foreground">
                  {s.category}
                </p>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm leading-6 text-muted-foreground">
                  {s.bio}
                </p>
                <span className="flex shrink-0 items-center gap-1 text-sm">
                  <Star size={14} fill="currentColor" className="text-gold" />{" "}
                  {s.rating}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
