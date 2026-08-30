import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getProduct } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/currency"
import { ProductAddToCartButton } from "@/components/litch/product-add-to-cart-button"
import { ProductReviews } from "@/components/litch/product-reviews"

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const { productId } = await params
  const p = getProduct(productId)
  if (!p) notFound()

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-10">
      <Link
        href="/products"
        className="mb-5 flex items-center gap-2 text-sm font-bold"
      >
        <ArrowLeft size={16} /> Back to products
      </Link>
      <div className="grid gap-8 md:grid-cols-2">
        <img
          src={p.image}
          alt={p.name}
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
