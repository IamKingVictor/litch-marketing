"use client"

import Link from "next/link"
import { Star } from "lucide-react"
import { formatCurrency } from "@/lib/currency"
import { useCart, type CartProduct } from "@/lib/cart-context"
import { useToast } from "@/lib/toast-context"
import { useAsyncAction } from "@/lib/use-async-action"
import { LitchButton } from "./button"

function AddToCartButton({ product }: { product: CartProduct }) {
  const { add } = useCart()
  const { toast } = useToast()
  const { run, pending } = useAsyncAction(() => {
    add(product)
    toast(`Added "${product.name}" to cart`, "success")
  }, 350)

  return (
    <LitchButton
      onClick={() => run()}
      secondary
      className="mt-3 w-full py-2 text-xs"
    >
      {pending ? "Adding…" : "Add to cart"}
    </LitchButton>
  )
}

export function ProductGrid({
  items,
  showAddToCart = false,
}: {
  items: CartProduct[]
  showAddToCart?: boolean
}) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      {items.map((p) => (
        <article key={p.id} className="group">
          <Link href={`/products/${p.id}`} className="block w-full text-left">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
              <img
                src={"image" in p ? p.image : p.imageUrl}
                alt={p.name}
                className="size-full object-cover transition duration-300 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-card/90 px-2 py-1 text-[10px] font-bold">
                {p.category}
              </span>
            </div>
            <div className="flex flex-col gap-1 pt-3">
              <p className="truncate text-xs text-muted-foreground">
                {"shop" in p ? p.shop : p.vendor}
              </p>
              <h3 className="font-heading text-sm font-bold">{p.name}</h3>
              <div className="flex items-center gap-2 font-heading font-bold">
                {formatCurrency(p.price)}{" "}
                {"originalPrice" in p && p.originalPrice && (
                  <del className="text-xs font-normal text-muted-foreground">
                    {formatCurrency(p.originalPrice)}
                  </del>
                )}
              </div>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star size={12} fill="currentColor" className="text-gold" /> 4.9
              </span>
            </div>
          </Link>
          {showAddToCart && <AddToCartButton product={p} />}
        </article>
      ))}
    </div>
  )
}
