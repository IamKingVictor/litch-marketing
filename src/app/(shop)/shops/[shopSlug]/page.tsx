import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Star } from "lucide-react"
import { getShopProducts, shops } from "@/lib/mock-data"
import { slugify } from "@/lib/slugify"
import { ProductGrid } from "@/components/litch/product-grid"
import { Breadcrumbs } from "@/components/litch/breadcrumbs"
import { SITE_URL } from "@/lib/site"

export function generateStaticParams() {
  return shops.map((s) => ({ shopSlug: slugify(s.name) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shopSlug: string }>
}): Promise<Metadata> {
  const { shopSlug } = await params
  const shop = shops.find((s) => slugify(s.name) === shopSlug)
  if (!shop) return { title: "Shop not found" }

  const title = shop.name
  const description = `${shop.bio} ${shop.category} vendor on Litch Marketing, rated ${shop.rating}/5.`

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/shops/${shopSlug}` },
    openGraph: {
      title,
      description,
      images: [{ url: shop.banner, alt: `${shop.name} storefront` }],
    },
  }
}

export default async function ShopDetailPage({
  params,
}: {
  params: Promise<{ shopSlug: string }>
}) {
  const { shopSlug } = await params
  const shop = shops.find((s) => slugify(s.name) === shopSlug)
  if (!shop) notFound()

  const shopProducts = getShopProducts(shop.name)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: shop.name,
    description: shop.bio,
    image: `${SITE_URL}${shop.banner}`,
    address: { "@type": "PostalAddress", streetAddress: shop.address },
    telephone: shop.phone,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: shop.rating,
      bestRating: 5,
      reviewCount: shopProducts.length || 1,
    },
    url: `${SITE_URL}/shops/${shopSlug}`,
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs crumbs={[{ label: "Shops", href: "/shops" }, { label: shop.name }]} />
      <div className="overflow-hidden rounded-2xl border bg-card">
        <img
          src={shop.banner}
          alt={`${shop.name} storefront banner`}
          className="h-56 w-full object-cover md:h-72"
        />
        <div className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="font-heading text-3xl font-bold">{shop.name}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{shop.bio}</p>
            </div>
            <span className="flex items-center gap-1 text-sm">
              <Star size={15} fill="currentColor" className="text-gold" />{" "}
              {shop.rating} rating
            </span>
          </div>
          <h2 className="mt-8 mb-4 font-heading text-xl font-bold">
            Products from {shop.name}
          </h2>
          <ProductGrid items={shopProducts} showAddToCart />
        </div>
      </div>
    </main>
  )
}

