// Static demo content for LITCH / Litch Marketing.
//
// Sourced from the team's actual seed_data.sql (categories, stores, products
// tables as defined by the Spring Boot backend) so the storefront shows real
// catalog shape and copy instead of generic placeholder content, while the
// live app still fetches through src/lib/api.ts once the backend is wired in.

export type Product = {
  id: string
  name: string
  shop: string
  category: string
  price: number
  originalPrice?: number
  image: string
  description: string
  stock: number
  visible: boolean
  /** "product" ships/is added to the Shopping Bag. "service" is booked
   * into a time slot and added to My Bookings instead. */
  type: "product" | "service"
  /** Variant options — products only. Not shown for services. */
  sizes?: string[]
  colors?: string[]
  /** Booking window — services only. 24h "HH:MM" strings. */
  openingTime?: string
  closingTime?: string
  durationMinutes?: number
  /** Available booking days — services only. Omitted means every day. */
  availabilityDays?: Weekday[]
}

export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"

export type Review = {
  id: string
  author: string
  rating: 1 | 2 | 3 | 4 | 5
  comment: string
  date: string
}

// Seeded, clearly-fictional demo reviews keyed by product/service id — not
// real customer submissions. Every product/service gets at least one.
export const reviews: Record<string, Review[]> = {
  p1: [
    { id: "r1", author: "Amaka O.", rating: 5, comment: "Suya was smoky and perfectly spiced — generous portion too.", date: "2026-08-14" },
    { id: "r2", author: "Femi A.", rating: 4, comment: "Great flavor, arrived a little cooler than I'd like.", date: "2026-08-02" },
  ],
  p7: [
    { id: "r4", author: "David K.", rating: 5, comment: "Breathable and light — my go-to gym jacket now.", date: "2026-08-18" },
    { id: "r5", author: "Ola B.", rating: 4, comment: "Good quality, runs slightly large.", date: "2026-07-30" },
  ],
  p8: [{ id: "r6", author: "Nkechi I.", rating: 5, comment: "Compliments every time I wear this set.", date: "2026-08-10" }],
  p9: [{ id: "r7", author: "Tomi S.", rating: 4, comment: "Soft fabric, held up well after a few washes.", date: "2026-07-22" }],
  p10: [{ id: "r8", author: "Chuka N.", rating: 5, comment: "Sharp fit, the velvet feels genuinely premium.", date: "2026-08-05" }],
  p21: [{ id: "r9", author: "Zainab M.", rating: 5, comment: "Lasts all day and smells incredible.", date: "2026-08-12" }],
  p26: [{ id: "r10", author: "Emeka U.", rating: 5, comment: "Car looked showroom-new after this, water beads right off.", date: "2026-08-16" }],
  p27: [
    { id: "r11", author: "Bisi F.", rating: 5, comment: "Quick and thorough, in and out in 30 minutes.", date: "2026-08-19" },
    { id: "r12", author: "Kunle A.", rating: 4, comment: "Good wash, tire dressing could be a bit more even.", date: "2026-08-01" },
  ],
  p28: [{ id: "r13", author: "Sarah P.", rating: 5, comment: "Kids and adults both had a blast on the arcade sims.", date: "2026-08-09" }],
  p29: [{ id: "r14", author: "Michael E.", rating: 4, comment: "Suit came back crisp and on time.", date: "2026-07-28" }],
  p30: [{ id: "r15", author: "Ijeoma C.", rating: 5, comment: "Recliner seats made the whole screening feel VIP.", date: "2026-08-11" }],
  p35: [{ id: "r16", author: "Tunde O.", rating: 4, comment: "Charges my laptop and phone at the same time, no issues.", date: "2026-08-06" }],
  p48: [{ id: "r17", author: "Patricia L.", rating: 5, comment: "Advisor was patient and actually explained the numbers.", date: "2026-08-03" }],
}

export function getReviews(productId: string): Review[] {
  return reviews[productId] ?? []
}

export function getAverageRating(productId: string): number {
  const list = getReviews(productId)
  if (!list.length) return 5
  return Math.round((list.reduce((s, r) => s + r.rating, 0) / list.length) * 10) / 10
}

export type Shop = {
  name: string
  category: string
  rating: number
  bio: string
  description: string
  logo: string
  banner: string
  address: string
  phone: string
}

export const categories = [
  "All",
  "Restaurant & Food",
  "Fashion & Clothing",
  "Household & Lifestyle",
  "Groceries",
  "Salon & Beauty",
  "Entertainment",
  "Services",
  "Electronics",
  "Health & Pharmaceutics",
  "Banking",
]

export const categoryImages: Record<string, string> = {
  "Restaurant & Food": "/images/categories/food.jpg",
  "Fashion & Clothing": "/images/categories/fashion.jpg",
  "Household & Lifestyle": "/images/categories/cat_1.jpg",
  Groceries: "/images/categories/groceries.jpg",
  "Salon & Beauty": "/images/categories/beauty.jpg",
  Entertainment: "/images/categories/cat_4.jpg",
  Services: "/images/categories/services.jpg",
  Electronics: "/images/categories/cat_2.jpg",
  "Health & Pharmaceutics": "/images/categories/cat_3.jpg",
  Banking: "/images/categories/cat_5.jpg",
}

const vendorFallbackImages = [
  "/shop-logo/jazari_logo.png",
  "/shop-logo/finger_licking_akara_logo.png",
  "/shop-logo/fashion_redemption_logo.png",
  "/shop-logo/sharers_logo.png",
  "/shop-logo/the_play_arena_logo.png",
  "/shop-logo/mini_sou_logo.png",
  "/shop-logo/smart_home_solutions_logo.png",
  "/shop-logo/pointek_logo.png",
]

const csvVendors = [
  ["Jazari", "Restaurant", "Jazari is a restaurant offering a variety of dining and culinary services.", "/shop-logo/jazari_logo.png"],
  ["Finger licking Akara", "Fries and restaurant", "Finger licking Akara specializes in delicious fries and traditional akara dishes.", "/shop-logo/finger_licking_akara_logo.png"],
  ["Fashion Redemption", "Fashion and clothing boutique", "Fashion Redemption offers trendy fashion apparel and clothing items.", "/shop-logo/fashion_redemption_logo.png"],
  ["Home world", "Household accessories, beauty products and utensils", "Home world provides a wide range of household accessories, beauty products, and daily kitchen utensils."],
  ["Sharers", "Groceries, boutiques, gym, salon, and entertainment", "Sharers is a comprehensive lifestyle hub featuring Sharers Bridals, Sharers Gym, Sharers Salon, groceries, male & female boutiques, kiddies corner, pastries, makeup studio, and more.", "/shop-logo/sharers_logo.png"],
  ["The Play Arena", "Games and arcade center", "The Play Arena is a vibrant games and arcade center offering fun activities and entertainment for all ages.", "/shop-logo/the_play_arena_logo.png"],
  ["The Wash Spot", "Dry-cleaning and laundry services", "The Wash Spot provides professional dry-cleaning and laundry services to keep your garments pristine."],
  ["Azers cinema", "Cinema and entertainment", "Azers cinema offers movie screenings and entertainment experiences.", "/shop-logo/azers_cinema_logo.jpg"],
  ["Mini Sou", "Lifestyle, beauty and home products", "Mini Sou offers a curated selection of lifestyle, beauty, and home utility products.", "/shop-logo/mini_sou_logo.png"],
  ["Smart home solutions", "Household appliances and smart gadgets", "Smart home solutions provides modern household appliances and smart electronic gadgets including washing machines, smart TVs, and fridges.", "/shop-logo/smart_home_solutions_logo.png"],
  ["Omnia Tech World", "Mobile devices and smartphones", "Omnia Tech World specializes in the latest mobile devices, smartphones, and tech accessories.", "/shop-logo/omnia_tech_world_logo.png"],
  ["Loveworld Partnership Store", "Souvenirs and gift items", "Loveworld Partnership Store offers custom souvenirs and thoughtful gift items."],
  ["Omnia Eye Clinic", "Eye care services", "Omnia Eye Clinic provides professional eye care services, examinations, and optical solutions."],
  ["All Natural", "Healthy snacks and beverages", "All Natural provides wholesome and healthy snacks as well as refreshing beverages."],
  ["Capelli Salon and beauty parlor", "Hair styling salon and hair products", "Capelli Salon and beauty parlor offers professional hair styling, treatments, and quality hair care products.", "/shop-logo/capelli_logo.png"],
  ["Omnia health and lifestyle store", "Pharmaceutical services", "Omnia health and lifestyle store provides pharmaceutical products and health care services."],
  ["Beverly Meals and Bakeries", "Baked foods and restaurant", "Beverly Meals and Bakeries offers freshly baked pastries, cakes, and restaurant dining.", "/shop-logo/beverly_meals_logo.png"],
  ["Auxano", "Restaurant", "Auxano is a dining establishment offering delicious meals and restaurant services."],
  ["CWE Bistro", "Culinary restaurant and bistro", "CWE Bistro delivers a unique culinary world of experiences through its restaurant menu.", "/shop-logo/cwe_bistro_logo.png"],
  ["Pointek", "Smartphones and phone accessories", "Pointek is a trusted retailer for smart phones and mobile phone accessories.", "/shop-logo/pointek_logo.png"],
  ["Parallex Bank", "Banking and financial services", "Parallex Bank provides comprehensive banking services and financial solutions.", "/shop-logo/parallex_bank_logo.png"],
  ["Lady Lili sanitary pad", "Sanitary pads and personal care", "Lady Lili provides soft, gentle, and reliable sanitary pad products for all-day comfort.", "/shop-logo/lady_lili_logo.jpg"],
  ["Dixons Foods and Services Nigeria", "Noodles, stock cubes, and food items", "Dixons Foods and Services Nigeria supplies essential food items including noodles and seasoning stock cubes."],
  ["Kings carwash", "Car cleaning accessories and washing services", "Kings carwash provides professional car washing services and quality car cleaning accessories.", "/shop-logo/kings_carwash_logo.png"],
  ["Carlos Pharmaceutics", "Pharmaceutical services and family care", "Carlos Pharmaceutics offers trusted pharmacy services centered around family health and care.", "/shop-logo/carlos_pharmaceutics_logo.jpg"],
  ["Puredent toothpaste", "Oral care and toothpaste", "Puredent toothpaste provides high-quality oral hygiene and toothpaste products.", "/shop-logo/puredent_logo.jpg"],
] as const

export const shops: Shop[] = csvVendors.map((vendor, index) => {
  const [name, category, description, suppliedLogo] = vendor
  const fallback = suppliedLogo ?? vendorFallbackImages[index % vendorFallbackImages.length]
  return {
    name,
    category,
    rating: 4.5,
    bio: category,
    description,
    logo: fallback,
    banner: fallback,
    address: "Litch Marketplace",
    phone: "+234 800 000 0000",
  }
})

export const products: Product[] = [
  // Judgment calls: legacy inventory was reassigned to the closest CSV vendor
  // by category (for example, beauty to Sharers, electronics to Omnia Tech
  // World, and banking to Parallex Bank) so shop names remain exact.
  // Restaurant & Food (Jazari Restaurant)
  { id: "p1", name: "Jazari Gourmet Suya Platter", shop: "Jazari", category: "Restaurant & Food", price: 150, originalPrice: 220, image: "/images/ai/jazari_suya_front.png", description: "Chef signature grilled Suya beef platter served with fresh sliced onions, tomatoes, and spicy yaji pepper.", stock: 100, visible: true, type: "product" },
  { id: "p2", name: "Crispy Akara & French Fries", shop: "Finger licking Akara", category: "Restaurant & Food", price: 65, originalPrice: 100, image: "/images/banners/banner3.jpg", description: "Hot bean fritters (Akara) fried to perfect golden crisp, paired with home-cut potato fries.", stock: 80, visible: true, type: "product" },
  { id: "p3", name: "Red Velvet Celebration Cake", shop: "Beverly Meals and Bakeries", category: "Restaurant & Food", price: 300, originalPrice: 450, image: "/images/vendors/vendor_3.jpg", description: "Rich, moist double-layer red velvet cake topped with smooth cream cheese frosting.", stock: 15, visible: true, type: "product" },
  { id: "p4", name: "Fresh Butter Croissant (4 Pack)", shop: "Beverly Meals and Bakeries", category: "Restaurant & Food", price: 50, originalPrice: 80, image: "/images/categories/food.jpg", description: "Flaky, buttery French pastries baked fresh daily, perfect for breakfast.", stock: 40, visible: true, type: "product" },
  { id: "p5", name: "Bistro Grilled Beef Burger", shop: "Jazari", category: "Restaurant & Food", price: 110, originalPrice: 160, image: "/images/banners/banner3.jpg", description: "Flame-grilled prime beef patty on brioche bun with fresh lettuce, tomatoes, cheese, and side fries.", stock: 50, visible: true, type: "product" },

  // Fashion & Clothing (Nike Store)
  { id: "p7", name: "Nike Performance Track Jacket", shop: "Fashion Redemption", category: "Fashion & Clothing", price: 240, originalPrice: 450, image: "/images/ai/nike_jacket_front.png", description: "Comfortable zip-up athletic training track jacket with Dri-FIT moisture-wicking technology.", stock: 50, visible: true, type: "product", sizes: ["S", "M", "L", "XL", "XXL"], colors: ["Black", "Navy", "Grey"] },
  { id: "p8", name: "Pleated Sunset Blazer & Trouser", shop: "Fashion Redemption", category: "Fashion & Clothing", price: 200, originalPrice: 480, image: "/images/vendors/vendor_7.jpg", description: "Chic double-breasted sunset orange blazer set with high-waisted pleated trousers.", stock: 30, visible: true, type: "product", sizes: ["S", "M", "L", "XL"], colors: ["Sunset Orange", "Black"] },
  { id: "p9", name: "Kiddies Cotton Dungarees Set", shop: "Sharers", category: "Fashion & Clothing", price: 80, originalPrice: 150, image: "/images/products/product_5.jpg", description: "Comfy cotton dungarees paired with a soft striped inner tee for kids.", stock: 20, visible: true, type: "product", sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"], colors: ["Denim Blue", "Sage"] },
  { id: "p10", name: "Premium Velvet Dinner Suit", shop: "Fashion Redemption", category: "Fashion & Clothing", price: 150, originalPrice: 240, image: "/images/details/hero_1.jpg", description: "Tailored slim-fit dark blue velvet dinner suit jacket with silk lapels.", stock: 10, visible: true, type: "product", sizes: ["S", "M", "L", "XL", "XXL"], colors: ["Midnight Blue", "Black"] },

  // Household & Lifestyle (Home World)
  { id: "p11", name: "Home World Ceramic Tea Set", shop: "Home world", category: "Household & Lifestyle", price: 75, originalPrice: 130, image: "/images/ai/homeworld_teaset_front.png", description: "Elegant porcelain teapot with 4 matching cups, featuring a smooth wooden handle and matching tray.", stock: 25, visible: true, type: "product" },
  { id: "p12", name: "Minimalist Aromatherapy Humidifier", shop: "Smart home solutions", category: "Household & Lifestyle", price: 15, originalPrice: 30, image: "/images/categories/cat_5.jpg", description: "Ultrasonic cool mist humidifier with soft LED ambient strip lights for home relaxation.", stock: 100, visible: true, type: "product" },
  { id: "p13", name: "Pink Tulip Ceramic Candle Jar", shop: "Home world", category: "Household & Lifestyle", price: 250, originalPrice: 580, image: "/images/banners/banner3.jpg", description: "Handcrafted soy wax candle housed in a beautiful pink tulip ceramic jar with essential oil scents.", stock: 40, visible: true, type: "product" },
  { id: "p14", name: "Luxury Cotton Bedding Sheet Set", shop: "Home world", category: "Household & Lifestyle", price: 60, originalPrice: 120, image: "/images/details/hero_1.jpg", description: "Ultra-soft 800 thread count cotton sheet set including flat sheet and pillow cases.", stock: 15, visible: true, type: "product" },
  { id: "p15", name: "Chef Kitchen Knife Block Set", shop: "Home world", category: "Household & Lifestyle", price: 70, originalPrice: 150, image: "/images/details/card_1.jpg", description: "High-carbon German steel kitchen knives set housed in a robust dark oak block.", stock: 20, visible: true, type: "product" },

  // Groceries (Dixons Foods)
  { id: "p16", name: "Dixons Chicken Noodles Box", shop: "Dixons Foods and Services Nigeria", category: "Groceries", price: 12, originalPrice: 18, image: "/images/vendors/vendor_3.jpg", description: "Instant chicken flavor noodles, family sized box containing 40 individual packs.", stock: 200, visible: true, type: "product" },
  { id: "p17", name: "Dixons Seasoning Cubes (100 Pack)", shop: "Dixons Foods and Services Nigeria", category: "Groceries", price: 2.5, originalPrice: 4, image: "/images/categories/groceries.jpg", description: "Chicken flavored seasoning cubes perfect for enhancing local soups, stews, and jollof rice.", stock: 500, visible: true, type: "product" },
  { id: "p18", name: "Fresh Sunshine Citrus Basket Crate", shop: "All Natural", category: "Groceries", price: 90, originalPrice: 150, image: "/images/ai/sharers_citrus_front.png", description: "Fresh rustic basket filled with handpicked organic sweet oranges, grapefruits, and lemons.", stock: 45, visible: true, type: "product" },
  { id: "p19", name: "Premium Sunflower Cooking Oil", shop: "Dixons Foods and Services Nigeria", category: "Groceries", price: 20, originalPrice: 32, image: "/images/categories/cat_3.jpg", description: "100% pure, cholesterol-free double-refined sunflower cooking oil for healthy meals.", stock: 60, visible: true, type: "product" },
  { id: "p20", name: "Organic Farm Fresh Harvest Pantry Bag", shop: "All Natural", category: "Groceries", price: 150, originalPrice: 300, image: "/images/categories/groceries.jpg", description: "Pantry bag loaded with local farm-fresh green vegetables, root crops, and organic produce.", stock: 30, visible: true, type: "product" },

  // Salon & Beauty (Kalaya Beauty)
  { id: "p21", name: "Beautiful Woman Luxury Parfum", shop: "Sharers", category: "Salon & Beauty", price: 340, originalPrice: 1900, image: "/images/products/product_1.jpg", description: "Intense and delicate floral designer fragrance designed for modern elegant women.", stock: 10, visible: true, type: "product" },
  { id: "p22", name: "Signature Red Liquid Lipstick", shop: "Sharers", category: "Salon & Beauty", price: 340, originalPrice: 1900, image: "/images/products/product_3.jpg", description: "Matte velvet finish highly-pigmented long-lasting red lip color.", stock: 40, visible: true, type: "product" },
  { id: "p23", name: "Complexion 05 9-Shade Palette", shop: "Sharers", category: "Salon & Beauty", price: 340, originalPrice: 1900, image: "/images/products/product_6.jpg", description: "Highly-blendable eye shadow palette featuring 9 neutral and warm earth pigments.", stock: 15, visible: true, type: "product" },
  { id: "p24", name: "Kalaya Pocket Blush Stick Glow", shop: "Sharers", category: "Salon & Beauty", price: 200, originalPrice: 480, image: "/images/vendors/vendor_2.jpg", description: "Creamy easy-blend pocket size blush stick for an instant radiant dewy glow.", stock: 50, visible: true, type: "product" },
  { id: "p25", name: "Kalaya Premium Lipstick Set (3-Piece)", shop: "Sharers", category: "Salon & Beauty", price: 399, originalPrice: 1200, image: "/images/ai/kalaya_lipstick_front.png", description: "Limited edition gift box containing three classic matte long-wear lipstick shades.", stock: 15, visible: true, type: "product" },

  // Entertainment (Kings Carwash & Entertainment)
  { id: "p26", name: "Ceramic Detail & Hydrophobic Coat", shop: "Kings carwash", category: "Entertainment", price: 299, originalPrice: 700, image: "/images/ai/kings_detailing_front.png", description: "Quartz-grade hydrophobic ceramic coating application protecting car paint with hyper gloss.", stock: 10, visible: true, type: "service", openingTime: "08:00", closingTime: "18:00", durationMinutes: 180 },
  { id: "p27", name: "Kings Premium Exterior Car Wash", shop: "Kings carwash", category: "Entertainment", price: 12, originalPrice: 20, image: "/images/categories/services.jpg", description: "High-pressure foam wash, active wax coat paint protection, tires dressing, and clean.", stock: 200, visible: true, type: "service", openingTime: "07:00", closingTime: "20:00", durationMinutes: 30 },
  { id: "p28", name: "VR Arcade Unlimited Pass (2h)", shop: "The Play Arena", category: "Entertainment", price: 18, originalPrice: 30, image: "/images/categories/cat_4.jpg", description: "Unlimited access pass to all premium VR gaming capsules and arcade simulators.", stock: 150, visible: true, type: "service", openingTime: "10:00", closingTime: "22:00", durationMinutes: 120 },
  { id: "p29", name: "Express Suit Dry Cleaning", shop: "The Wash Spot", category: "Services", price: 8, originalPrice: 15, image: "/images/categories/services.jpg", description: "Fast dry wash, stain pre-treatment and steam pressing for business suits.", stock: 60, visible: true, type: "service", openingTime: "08:00", closingTime: "19:00", durationMinutes: 60 },
  { id: "p30", name: "Azers VIP Cinema Movie Ticket", shop: "Azers cinema", category: "Entertainment", price: 8.5, originalPrice: 15, image: "/images/categories/services.jpg", description: "Standard VIP recliner movie ticket voucher valid for any blockbuster screening.", stock: 300, visible: true, type: "service", openingTime: "10:00", closingTime: "23:30", durationMinutes: 150 },

  // Services (Kings Carwash & Entertainment — tech/service line)
  { id: "p31", name: "Omnia Horizon Smart Tablet 11-inch", shop: "Omnia Tech World", category: "Electronics", price: 580, originalPrice: 800, image: "/images/ai/omnia_tablet_front.png", description: "Sleek 11-inch screen tablet with titanium cover, active pencil support and 120Hz display.", stock: 20, visible: true, type: "product" },
  { id: "p32", name: "Omnia A-Fold S1 5G 512GB", shop: "Omnia Tech World", category: "Electronics", price: 899, originalPrice: 1250, image: "/images/banners/banner1.jpg", description: "Next-gen folding screen smartphone featuring triple camera array and seamless multitasking.", stock: 10, visible: true, type: "product" },
  { id: "p33", name: "SuperBass ANC Wireless Earbuds", shop: "Omnia Tech World", category: "Electronics", price: 35, originalPrice: 65, image: "/images/banners/banner2.jpg", description: "Active Noise Canceling earbuds with high-fidelity sound driver and 40-hour combined playback.", stock: 120, visible: true, type: "product" },
  { id: "p34", name: "Smart-Vision 65-inch Ultra HD TV", shop: "Smart home solutions", category: "Household & Lifestyle", price: 520, originalPrice: 750, image: "/images/details/card_1.jpg", description: "4K QLED smart screen television featuring built-in smart dashboard and hands-free controls.", stock: 8, visible: true, type: "product" },
  { id: "p35", name: "Omnia 100W GaN Super Charger", shop: "Omnia Tech World", category: "Electronics", price: 25, originalPrice: 45, image: "/images/details/card_2.jpg", description: "Compact high-power GaN multi-port wall charger for fast charging laptops and phones.", stock: 80, visible: true, type: "product" },

  // Electronics (Apple Official Store)
  { id: "p36", name: "Anti-Blue Light Reading Glasses", shop: "Omnia Eye Clinic", category: "Health & Pharmaceutics", price: 20, originalPrice: 40, image: "/images/ai/omnia_glasses_front.png", description: "Comfortable reading glasses designed with blue light filter lenses protecting eyes from screen glare.", stock: 150, visible: true, type: "product" },
  { id: "p37", name: "Lady Lili Sanitary Pads (24 Pack)", shop: "Lady Lili sanitary pad", category: "Health & Pharmaceutics", price: 3.5, originalPrice: 5.5, image: "/images/vendors/vendor_6.jpg", description: "Organic cotton breathable sanitary pads with active leakage protection wings.", stock: 300, visible: true, type: "product" },
  { id: "p38", name: "Carlos Vitamin C Immune Boost", shop: "Carlos Pharmaceutics", category: "Health & Pharmaceutics", price: 10, originalPrice: 18, image: "/images/categories/services.jpg", description: "High-potency daily Vitamin C supplements for comprehensive immune support.", stock: 200, visible: true, type: "product" },
  { id: "p39", name: "Puredent Herbal Toothpaste", shop: "Puredent toothpaste", category: "Health & Pharmaceutics", price: 2.8, originalPrice: 5, image: "/images/vendors/vendor_6.jpg", description: "Natural herbal extract peppermint toothpaste providing long-lasting breath and cavity protection.", stock: 250, visible: true, type: "product" },
  { id: "p40", name: "Lightweight Prescription Eyewear Frame", shop: "Omnia Eye Clinic", category: "Health & Pharmaceutics", price: 120, originalPrice: 220, image: "/images/ai/omnia_glasses_side.png", description: "Sleek, lightweight square frame designed for custom lenses.", stock: 45, visible: true, type: "product" },

  // Health & Pharmaceutics (Carlos Pharmaceutics & Eye Clinic)
  { id: "p41", name: "Anti-Blue Light Reading Glasses", shop: "Omnia Eye Clinic", category: "Health & Pharmaceutics", price: 20, originalPrice: 40, image: "/images/ai/omnia_glasses_case.png", description: "Comfortable reading glasses designed with blue light filter lenses protecting eyes from screen glare.", stock: 150, visible: true, type: "product" },
  { id: "p42", name: "Lady Lili Sanitary Pads (24 Pack)", shop: "Lady Lili sanitary pad", category: "Health & Pharmaceutics", price: 3.5, originalPrice: 5.5, image: "/images/vendors/vendor_6.jpg", description: "Organic cotton breathable sanitary pads with active leakage protection wings.", stock: 300, visible: true, type: "product" },
  { id: "p43", name: "Carlos Vitamin C Immune Boost", shop: "Carlos Pharmaceutics", category: "Health & Pharmaceutics", price: 10, originalPrice: 18, image: "/images/categories/services.jpg", description: "High-potency daily Vitamin C supplements for comprehensive immune support.", stock: 200, visible: true, type: "product" },
  { id: "p44", name: "Puredent Herbal Toothpaste", shop: "Puredent toothpaste", category: "Health & Pharmaceutics", price: 2.8, originalPrice: 5, image: "/images/vendors/vendor_6.jpg", description: "Natural herbal extract peppermint toothpaste providing long-lasting breath and cavity protection.", stock: 250, visible: true, type: "product" },
  { id: "p45", name: "Lightweight Prescription Eyewear Frame", shop: "Omnia Eye Clinic", category: "Health & Pharmaceutics", price: 120, originalPrice: 220, image: "/images/products/product_6.jpg", description: "Sleek, lightweight square frame designed for custom lenses.", stock: 45, visible: true, type: "product" },

  // Banking (Apple Official Store account services line)
  { id: "p46", name: "Premium Metal Debit Card Setup", shop: "Parallex Bank", category: "Banking", price: 4, originalPrice: 10, image: "/images/categories/services.jpg", description: "Instant customized contactless heavy-metal premium debit card.", stock: 500, visible: true, type: "product" },
  { id: "p47", name: "Business Checkbook Setup", shop: "Parallex Bank", category: "Banking", price: 12, originalPrice: 25, image: "/images/categories/services.jpg", description: "Express customized business account checkbook printing service.", stock: 100, visible: true, type: "product" },
  { id: "p48", name: "Financial Wealth Advisory Session", shop: "Parallex Bank", category: "Banking", price: 100, originalPrice: 150, image: "/images/categories/services.jpg", description: "One-on-one session with senior private banking certified advisor.", stock: 20, visible: true, type: "service", openingTime: "09:00", closingTime: "17:00", durationMinutes: 45 },
  { id: "p49", name: "Premium Safe Deposit Locker", shop: "Parallex Bank", category: "Banking", price: 75, originalPrice: 120, image: "/images/categories/services.jpg", description: "Annual lock box rental in ultra-secure biometric vault room.", stock: 30, visible: true, type: "product" },
  { id: "p50", name: "Priority Banking Lounge Pass", shop: "Parallex Bank", category: "Banking", price: 45, originalPrice: 80, image: "/images/categories/services.jpg", description: "Annual express priority teller counter access and VIP lounge pass.", stock: 100, visible: true, type: "product" },

  // Representative listings added so every CSV vendor has plausible inventory.
  { id: "p51", name: "Mini Sou Home Utility Organizer", shop: "Mini Sou", category: "Household & Lifestyle", price: 35, originalPrice: 50, image: "/images/categories/cat_1.jpg", description: "A practical home organizer for keeping everyday essentials tidy.", stock: 40, visible: true, type: "product" },
  { id: "p52", name: "Loveworld Custom Gift Box", shop: "Loveworld Partnership Store", category: "Household & Lifestyle", price: 45, originalPrice: 60, image: "/images/details/card_1.jpg", description: "A thoughtful, customizable gift box for celebrations and keepsakes.", stock: 25, visible: true, type: "product" },
  { id: "p53", name: "Capelli Nourishing Hair Treatment", shop: "Capelli Salon and beauty parlor", category: "Salon & Beauty", price: 30, originalPrice: 45, image: "/images/categories/beauty.jpg", description: "A salon-grade nourishing treatment for softer, healthier-looking hair.", stock: 35, visible: true, type: "product" },
  { id: "p54", name: "Omnia Health Daily Multivitamins", shop: "Omnia health and lifestyle store", category: "Health & Pharmaceutics", price: 25, originalPrice: 35, image: "/images/categories/services.jpg", description: "Daily wellness supplements for a balanced health routine.", stock: 80, visible: true, type: "product" },
  { id: "p55", name: "Auxano Signature Jollof Meal", shop: "Auxano", category: "Restaurant & Food", price: 95, originalPrice: 120, image: "/images/categories/food.jpg", description: "A hearty signature jollof meal prepared for an easy, satisfying lunch.", stock: 60, visible: true, type: "product" },
  { id: "p56", name: "CWE Bistro Tasting Menu", shop: "CWE Bistro", category: "Restaurant & Food", price: 140, originalPrice: 175, image: "/images/banners/banner3.jpg", description: "A curated bistro tasting menu featuring the kitchen's seasonal favorites.", stock: 30, visible: true, type: "product" },
  { id: "p57", name: "Pointek USB-C Fast Charger", shop: "Pointek", category: "Electronics", price: 28, originalPrice: 40, image: "/images/details/card_2.jpg", description: "A compact fast charger for compatible smartphones and everyday devices.", stock: 75, visible: true, type: "product" },
]

export const academyCourses = [
  "Starting your small shop",
  "Product photography on a phone",
  "Pricing for sustainable growth",
]

export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}
export const services = products.filter((p) => p.type === "service")

// 5 handpicked, visible vendor products for the home page carousel.
export const carouselProducts = products
  .filter((p) => p.type === "product" && p.visible)
  // Keep only Jazari until the other vendors have real, approved carousel photography.
  // Re-enable the other slides once their real landscape images exist.
  .filter((p) => ["p1"].includes(p.id))

/** 30-minute booking slots between a service's opening and closing time. */
export function getTimeSlots(product: Product): string[] {
  if (!product.openingTime || !product.closingTime) return []
  const [openH, openM] = product.openingTime.split(":").map(Number)
  const [closeH, closeM] = product.closingTime.split(":").map(Number)
  const slots: string[] = []
  let mins = openH * 60 + openM
  const end = closeH * 60 + closeM
  const step = 90
  while (mins + step <= end) {
    const format = (m: number) => {
      const h24 = Math.floor(m / 60)
      const mm = m % 60
      const period = h24 >= 12 ? "PM" : "AM"
      const h12 = h24 % 12 === 0 ? 12 : h24 % 12
      return `${h12}:${mm.toString().padStart(2, "0")} ${period}`
    }
    slots.push(`${format(mins)} - ${format(mins + step)}`)
    mins += step
  }
  return slots
}
export function getShop(name: string) {
  return shops.find((s) => s.name === name)
}

export function getShopProducts(name: string) {
  return products.filter((p) => p.shop === name)
}
export function formatNaira(value: number) {
  return `₦${value.toLocaleString()}`
}
export function useMockProducts() {
  return products
}
export function useMockShops() {
  return shops
}
