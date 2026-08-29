import type { Product } from "@/lib/mock-data"

export type View =
  | "home"
  | "products"
  | "shops"
  | "shop"
  | "product"
  | "cart"
  | "checkout"
  | "login"
  | "signup"
  | "seller-signup"
  | "vendor"
  | "admin"
  | "academy"

export type CartItem = { product: Product; quantity: number }
