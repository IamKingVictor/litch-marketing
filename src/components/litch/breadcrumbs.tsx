import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { SITE_URL } from "@/lib/site"

export type Crumb = { label: string; href?: string }

/**
 * Renders a visible breadcrumb trail plus a matching JSON-LD BreadcrumbList
 * for search engines. `crumbs` should NOT include "Home" — it's added
 * automatically as the first entry.
 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const all: Crumb[] = [{ label: "Home", href: "/" }, ...crumbs]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE_URL}${c.href}` } : {}),
    })),
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-xs text-muted-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5">
        {all.map((c, i) => {
          const isLast = i === all.length - 1
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={12} aria-hidden="true" />}
              {c.href && !isLast ? (
                <Link href={c.href} className="hover:text-primary">
                  {c.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined}>
                  {c.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
