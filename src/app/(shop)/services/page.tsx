import Link from "next/link"
import type { Metadata } from "next"
import { Clock, Star } from "lucide-react"
import { services, getAverageRating } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/currency"
import { Breadcrumbs } from "@/components/litch/breadcrumbs"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Book a service",
  description:
    "Book car detailing, dry cleaning, VR arcade sessions, cinema tickets, advisory sessions and more from Litch Marketing vendors — pick a date and an open time slot.",
  alternates: { canonical: `${SITE_URL}/services` },
}

export default function ServicesPage() {
  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8 lg:px-12">
      <Breadcrumbs crumbs={[{ label: "Services" }]} />
      <p className="text-xs font-bold uppercase tracking-[.16em] text-gold-600">
        Book with vendors
      </p>
      <h1 className="mt-1 font-heading text-3xl font-bold">
        Explore services
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Reserve a time slot with a vendor — restaurants, car care, salons and
        more — instead of buying a physical item.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((s) => (
          <Link
            key={s.id}
            href={`/products/${s.id}`}
            className="group flex flex-col overflow-hidden rounded-2xl border bg-card"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={s.image}
                alt={s.name}
                className="size-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-4">
              <p className="truncate text-xs text-muted-foreground">
                {s.shop}
              </p>
              <h2 className="font-heading text-sm font-bold">{s.name}</h2>
              <div className="mt-1 flex items-center justify-between">
                <span className="font-heading font-bold">
                  {formatCurrency(s.price)}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star size={12} fill="currentColor" className="text-gold" />{" "}
                  {getAverageRating(s.id)}
                </span>
              </div>
              <span className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock size={13} />
                Open {s.openingTime} – {s.closingTime}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
