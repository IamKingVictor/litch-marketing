import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import { getProduct, products } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/currency"
import { ProductAddToCartButton } from "@/components/litch/product-add-to-cart-button"
import { ProductReviews } from "@/components/litch/product-reviews"
import { Breadcrumbs } from "@/components/litch/breadcrumbs"
import { SITE_URL } from "@/lib/site"

export function generateStaticParams() {
  return products.map((p) => ({ productId: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>
}): Promise<Metadata> {
  const { productId } = await params
  const p = getProduct(productId)
  if (!p) return { title: "Product not found" }

  const title = `${p.name} — ${p.shop}`
  const description = p.description.length > 155 ? `${p.description.slice(0, 152)}...` : p.description

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/products/${p.id}` },
    openGraph: {
      title,
      description,
      images: [{ url: p.image, alt: p.name }],
    },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const { productId } = await params
  const p = getProduct(productId)
  if (!p) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: `${SITE_URL}${p.image}`,
    category: p.category,
    brand: { "@type": "Brand", name: p.shop },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${p.id}`,
      priceCurrency: "USD",
      price: p.price,
      availability:
        p.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        crumbs={[
          { label: "Products", href: "/products" },
          { label: p.category, href: `/products?category=${encodeURIComponent(p.category)}` },
          { label: p.name },
        ]}
      />
      <Link
        href="/products"
        className="mb-5 flex items-center gap-2 text-sm font-bold"
      >
        <ArrowLeft size={16} /> Back to products
      </Link>
      <div className="grid gap-8 md:grid-cols-2">
        <img
          src={p.image}
          alt={`${p.name} — sold by ${p.shop}`}
          className="aspect-square w-full rounded-2xl object-cover"
        />
        <div className="flex flex-col justify-center">
          <p className="text-sm text-muted-foreground">
            {p.shop} · {p.category}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold">{p.name}</h1>
          <div className="mt-4 flex items-center gap-3 font-heading text-2xl font-bold">
            {formatCurrency(p.price)}{" "}
            {p.originalPrice && (
              <del className="text-base font-normal text-muted-foreground">
                {formatCurrency(p.originalPrice)}
              </del>
            )}
          </div>
          <p className="mt-5 leading-7 text-muted-foreground">
            {p.description}
          </p>
          <div className="mt-6 flex gap-3">
            <ProductAddToCartButton product={p} />
          </div>
        </div>
      </div>
      <ProductReviews />
    </main>
  )
}

