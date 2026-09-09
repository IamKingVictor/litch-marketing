"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

// Matches the real `products` table from the Litch Shoppers schema:
// id, name, category, price, description, vendor, stock, b2b_min_qty,
// b2b_price, details (JSON), usage, image_url, created_at.
// `details` is modeled as a simple string->string map here (a friendlier
// shape for a form) rather than a raw JSON string — serialize with
// JSON.stringify(details) if/when this ever posts to a real API.
export type Product = {
  id: string
  name: string
  category: string
  price: number
  description: string
  vendor: string
  stock: number
  b2bMinQty: number
  b2bPrice: number
  details: Record<string, string>
  usage: string
  imageUrl: string
  visible: boolean
  createdAt: string
}

// Seed data — your original 6 mock products, mapped onto the real schema's
// field names. b2bPrice/b2bMinQty didn't exist in the old mock data, so
// these are placeholder defaults (85% of retail, min qty 10) — products
// added through the real form get whatever the seller actually enters.
const SEED_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Linen Everyday Shirt",
    vendor: "Mina Studio",
    category: "Fashion",
    price: 2890,
    b2bPrice: 2450,
    b2bMinQty: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900&q=80",
    description:
      "An airy, relaxed linen shirt made for slow mornings and long afternoons.",
    usage: "Hand wash cold, lay flat to dry.",
    details: { Material: "100% linen", Fit: "Relaxed" },
    stock: 24,
    visible: true,
    createdAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "p2",
    name: "Wild Fig Body Oil",
    vendor: "Kindred Botanics",
    category: "Beauty",
    price: 1850,
    b2bPrice: 1570,
    b2bMinQty: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=900&q=80",
    description:
      "A nourishing botanical blend with wild fig, jojoba and soft cedar.",
    usage: "Apply to damp skin after bathing.",
    details: { Volume: "100ml", "Skin type": "All types" },
    stock: 16,
    visible: true,
    createdAt: "2026-08-02T00:00:00.000Z",
  },
  {
    id: "p3",
    name: "Hand-thrown Mug",
    vendor: "Clay & Grain",
    category: "Home",
    price: 1450,
    b2bPrice: 1230,
    b2bMinQty: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900&q=80",
    description: "Wheel-thrown stoneware with a tactile, speckled glaze.",
    usage: "Dishwasher and microwave safe.",
    details: { Capacity: "350ml", Material: "Stoneware" },
    stock: 9,
    visible: true,
    createdAt: "2026-08-03T00:00:00.000Z",
  },
  {
    id: "p4",
    name: "The Sunday Tote",
    vendor: "Mina Studio",
    category: "Fashion",
    price: 3200,
    b2bPrice: 2720,
    b2bMinQty: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=900&q=80",
    description:
      "A sturdy cotton canvas carry-all for market days and little escapes.",
    usage: "Spot clean only.",
    details: { Material: "Cotton canvas" },
    stock: 12,
    visible: true,
    createdAt: "2026-08-04T00:00:00.000Z",
  },
  {
    id: "p5",
    name: "Desk Light No. 4",
    vendor: "Form Objects",
    category: "Electronics",
    price: 5900,
    b2bPrice: 5015,
    b2bMinQty: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&q=80",
    description:
      "A warm, considered light for focused work and quiet corners.",
    usage: "USB-C powered, 3 brightness settings.",
    details: { Power: "USB-C", Warranty: "1 year" },
    stock: 7,
    visible: true,
    createdAt: "2026-08-05T00:00:00.000Z",
  },
  {
    id: "p6",
    name: "Cocoa Almond Granola",
    vendor: "Good Pantry",
    category: "Food",
    price: 980,
    b2bPrice: 833,
    b2bMinQty: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1517093728432-a0440f8d45af?w=900&q=80",
    description:
      "Small-batch granola with roasted almonds, cacao and sea salt.",
    usage: "Best consumed within 3 months of opening.",
    details: { Weight: "400g" },
    stock: 30,
    visible: true,
    createdAt: "2026-08-06T00:00:00.000Z",
  },
]

const STORAGE_KEY = "litch-products"

type ProductsContextValue = {
  products: Product[]
  hydrated: boolean
  addProduct: (
    data: Omit<Product, "id" | "createdAt">,
  ) => Product
  updateProduct: (id: string, patch: Partial<Product>) => void
  deleteProduct: (id: string) => void
  getProduct: (id: string) => Product | undefined
  getProductsByVendor: (vendor: string) => Product[]
}

const ProductsContext = createContext<ProductsContextValue | null>(null)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        setProducts(JSON.parse(raw))
      } catch {
        // ignore malformed storage
      }
    }
    setHydrated(true)
  }, [])

  const persist = (next: Product[]) => {
    setProducts(next)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const addProduct: ProductsContextValue["addProduct"] = (data) => {
    const newProduct: Product = {
      ...data,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    persist([...products, newProduct])
    return newProduct
  }

  const updateProduct = (id: string, patch: Partial<Product>) => {
    persist(products.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  }

  const deleteProduct = (id: string) => {
    persist(products.filter((p) => p.id !== id))
  }

  const getProduct = (id: string) => products.find((p) => p.id === id)

  const getProductsByVendor = (vendor: string) =>
    products.filter((p) => p.vendor === vendor)

  return (
    <ProductsContext.Provider
      value={{
        products,
        hydrated,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
        getProductsByVendor,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error("useProducts must be used inside ProductsProvider")
  return ctx
}
