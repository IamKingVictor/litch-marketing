"use client"

import { useState } from "react"
import type { View } from "@/lib/types"
import { useCart } from "@/hooks/use-cart"
import { Shell } from "./shell"
import { Home } from "./views/home"
import { Products } from "./views/products"
import { Shops } from "./views/shops"
import { ShopView } from "./views/shop-view"
import { ProductView } from "./views/product-view"
import { Cart } from "./views/cart"
import { Checkout } from "./views/checkout"
import { Auth } from "./views/auth"
import { Login } from "./views/login"
import { Vendor } from "./views/vendor"
import { Admin } from "./views/admin"
import { Academy } from "./views/academy"

export default function LitchApp() {
  const [view, setView] = useState<View>("home")
  // NOTE: carried over from the original single-file version — `seller` is
  // read by Login but nothing ever calls setSeller, so it's always false.
  // Flagging rather than silently fixing since it wasn't part of this ask.
  const [seller] = useState(false)
  const { cart, setCart, add, cartCount } = useCart()

  const go = (v: View) => setView(v)

  const content =
    view === "home" ? (
      <Home go={go} />
    ) : view === "products" ? (
      <Products go={go} add={add} />
    ) : view === "shops" ? (
      <Shops go={go} />
    ) : view === "shop" ? (
      <ShopView go={go} add={add} />
    ) : view === "product" ? (
      <ProductView go={go} add={add} />
    ) : view === "cart" ? (
      <Cart go={go} cart={cart} setCart={setCart} />
    ) : view === "checkout" ? (
      <Checkout go={go} cart={cart} />
    ) : view === "signup" ? (
      <Auth seller={false} go={go} />
    ) : view === "seller-signup" ? (
      <Auth seller={true} go={go} />
    ) : view === "login" ? (
      <Login seller={seller} go={go} />
    ) : view === "vendor" ? (
      <Vendor go={go} />
    ) : view === "admin" ? (
      <Admin go={go} />
    ) : (
      <Academy />
    )

  return view === "login" || view === "signup" || view === "seller-signup" ? (
    content
  ) : (
    <Shell go={go} cartCount={cartCount}>
      {content}
    </Shell>
  )
}
