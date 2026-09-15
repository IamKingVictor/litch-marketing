import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { products, shops } from "@/lib/mock-data"
import { slugify } from "@/lib/slugify"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/categories`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/products`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/shops`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/academy`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/login`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/signup`, changeFrequency: "yearly", priority: 0.2 },
  ]

  // Parallex is intentionally direct-only and must not be advertised in the sitemap.
  const shopRoutes: MetadataRoute.Sitemap = shops
    .filter((s) => s.name !== "Parallex Bank")
    .map((s) => ({
    url: `${SITE_URL}/shops/${slugify(s.name)}`,
    changeFrequency: "weekly",
    priority: 0.7,
    }))

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/products/${p.id}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...shopRoutes, ...productRoutes]
}
