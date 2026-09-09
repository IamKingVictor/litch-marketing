import Link from "next/link"
import type { Metadata } from "next"
import { Logo } from "@/components/litch/logo"

const primaryLinkClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:-translate-y-0.5"
const secondaryLinkClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-bold text-primary transition hover:-translate-y-0.5"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <Logo />
      <p className="mt-10 font-heading text-7xl font-bold text-primary">
        404
      </p>
      <h1 className="mt-3 font-heading text-2xl font-bold">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        The link may be broken, or the page may have moved. Try one of these
        instead:
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={primaryLinkClass}>
          Back to home
        </Link>
        <Link href="/products" className={secondaryLinkClass}>
          Browse products
        </Link>
        <Link href="/shops" className={secondaryLinkClass}>
          Browse shops
        </Link>
      </div>
    </main>
  )
}
