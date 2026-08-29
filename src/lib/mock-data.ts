export type Product = { id: string; name: string; shop: string; category: string; price: number; originalPrice?: number; image: string; description: string; stock: number; visible: boolean }
export type Shop = { name: string; category: string; rating: number; bio: string; banner: string }
export const categories = ['All', 'Fashion', 'Beauty', 'Home', 'Electronics', 'Food']
export const products: Product[] = [
  { id: 'p1', name: 'Linen Everyday Shirt', shop: 'Mina Studio', category: 'Fashion', price: 2890, originalPrice: 3400, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900&q=80', description: 'An airy, relaxed linen shirt made for slow mornings and long afternoons.', stock: 24, visible: true },
  { id: 'p2', name: 'Wild Fig Body Oil', shop: 'Kindred Botanics', category: 'Beauty', price: 1850, image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=900&q=80', description: 'A nourishing botanical blend with wild fig, jojoba and soft cedar.', stock: 16, visible: true },
  { id: 'p3', name: 'Hand-thrown Mug', shop: 'Clay & Grain', category: 'Home', price: 1450, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900&q=80', description: 'Wheel-thrown stoneware with a tactile, speckled glaze.', stock: 9, visible: true },
  { id: 'p4', name: 'The Sunday Tote', shop: 'Mina Studio', category: 'Fashion', price: 3200, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=900&q=80', description: 'A sturdy cotton canvas carry-all for market days and little escapes.', stock: 12, visible: true },
  { id: 'p5', name: 'Desk Light No. 4', shop: 'Form Objects', category: 'Electronics', price: 5900, originalPrice: 6500, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&q=80', description: 'A warm, considered light for focused work and quiet corners.', stock: 7, visible: true },
  { id: 'p6', name: 'Cocoa Almond Granola', shop: 'Good Pantry', category: 'Food', price: 980, image: 'https://images.unsplash.com/photo-1517093728432-a0440f8d45af?w=900&q=80', description: 'Small-batch granola with roasted almonds, cacao and sea salt.', stock: 30, visible: true },
]
export const shops: Shop[] = [
  { name: 'Mina Studio', category: 'Fashion', rating: 4.9, bio: 'Everyday clothing made slowly in small runs.', banner: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80' },
  { name: 'Kindred Botanics', category: 'Beauty', rating: 4.8, bio: 'Plant-based rituals for skin, body and home.', banner: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=1400&q=80' },
  { name: 'Clay & Grain', category: 'Home', rating: 5, bio: 'Useful objects with a human mark.', banner: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1400&q=80' },
  { name: 'Form Objects', category: 'Electronics', rating: 4.7, bio: 'Quiet technology for better daily rituals.', banner: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1400&q=80' },
]
export const academyCourses = ['Starting your small shop', 'Product photography on a phone', 'Pricing for sustainable growth']
export function getProduct(id: string) { return products.find(p => p.id === id) }
export function getShop(name: string) { return shops.find(s => s.name === name) }
export function getShopProducts(name: string) { return products.filter(p => p.shop === name) }
export function formatNaira(value: number) { return `₦${value.toLocaleString()}` }
export function useMockProducts() { return products }
export function useMockShops() { return shops } 
