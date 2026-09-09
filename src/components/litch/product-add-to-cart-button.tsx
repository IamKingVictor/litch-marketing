"use client"

import { Heart, ShoppingBag } from "lucide-react"
import { useCart, type CartProduct } from "@/lib/cart-context"
import { useToast } from "@/lib/toast-context"
import { useAsyncAction } from "@/lib/use-async-action"
import { LitchButton } from "./button"

export function ProductAddToCartButton({ product }: { product: CartProduct }) {
  const { add } = useCart()
  const { toast } = useToast()
  const { run, pending } = useAsyncAction(() => {
    add(product)
    toast(`Added "${product.name}" to cart`, "success")
  }, 350)

  return (
    <>
      <LitchButton onClick={() => run()}>
        <ShoppingBag size={17} /> {pending ? "Adding…" : "Add to cart"}
      </LitchButton>
      {/* No wishlist feature/page exists yet — left non-functional rather
          than toasting a "saved" message that doesn't actually persist
          anywhere. Flag if you want a real wishlist built next. */}
      <LitchButton secondary>
        <Heart size={17} /> Save
      </LitchButton>
    </>
  )
}
