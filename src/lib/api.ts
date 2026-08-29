export type Role = 'customer' | 'vendor' | 'admin'
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface User { id: string; name: string; email: string; role: Role; phone?: string; address?: string; city?: string; state?: string; zip?: string; created_at: string }
export interface Product { id: string; name: string; category: string; price: number; description?: string; vendor: string; stock: number; b2b_min_qty: number; b2b_price: number; details?: Record<string, unknown>; usage?: string; image_url?: string; created_at: string }
export interface Category { id?: string; name: string; image_url?: string; product_count?: number }
export interface Review { id: string; product_id: string; user_id: string; rating: number; comment: string; created_at: string; user?: Pick<User, 'name'> }
export interface OrderItem { id?: number; order_id?: string; product_id: string; quantity: number; price: number; product?: Product }
export interface Order { id: string; user_id?: string; status: OrderStatus; subtotal: number; shipping: number; tax: number; total: number; full_name: string; address: string; city: string; state: string; zip: string; country: string; payment_method: string; created_at: string; items?: OrderItem[] }
export interface Course { id: string; title: string; description: string; image_url?: string; duration?: string; level?: string; }
export interface AcademyApplication { id: string; course_id: string; user_id: string; email: string; phone: string; experience: string; reason: string; status: 'pending' | 'approved' | 'rejected'; created_at: string }
export interface DashboardStats { [key: string]: number | string }

export interface ApiError { message: string; status: number }

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, { ...init, headers: { 'Content-Type': 'application/json', ...init?.headers } })
  const body = await response.json().catch(() => null)
  if (!response.ok) throw { message: body?.message || 'Something went wrong. Please try again.', status: response.status } satisfies ApiError
  return body as T
}
const post = <T>(path: string, body: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(body) })
const put = <T>(path: string, body: unknown) => request<T>(path, { method: 'PUT', body: JSON.stringify(body) })
const del = <T>(path: string) => request<T>(path, { method: 'DELETE' })

export const api = {
  login: (body: { email: string; password: string }) => post<{ user: User; token?: string }>('/api/auth/login', body),
  register: (body: { name: string; email: string; password: string; role: Role }) => post<{ user: User }>('/api/auth/register', body),
  sendOtp: (body: { email: string }) => post<{ message: string }>('/api/auth/send-otp', body),
  verifyOtp: (body: { email: string; otp: string }) => post<{ verified: boolean }>('/api/auth/verify-otp', body),
  resendOtp: (body: { email: string }) => post<{ message: string }>('/api/auth/resend-otp', body),
  forgotPassword: (body: { email: string }) => post<{ message: string }>('/api/auth/forgot-password', body),
  resetPassword: (body: { token: string; password: string }) => post<{ message: string }>('/api/auth/reset-password', body),
  me: () => request<User>('/api/users/me'),
  updateMe: (body: Partial<User>) => put<User>('/api/users/me', body),
  categories: () => request<Category[]>('/api/categories'),
  products: (params?: { category?: string; search?: string; sort?: string; vendor?: string }) => request<Product[]>(`/api/products?${new URLSearchParams(Object.entries(params || {}).filter(([, value]) => value) as string[][])}`),
  product: (id: string) => request<Product>(`/api/products/${encodeURIComponent(id)}`),
  reviews: (id: string) => request<Review[]>(`/api/products/${encodeURIComponent(id)}/reviews`),
  addReview: (id: string, body: { rating: number; comment: string }) => post<Review>(`/api/products/${encodeURIComponent(id)}/reviews`, body),
  wishlist: () => request<Product[]>('/api/users/me/wishlist'),
  addWishlist: (productId: string) => post<{ product_id: string }>(`/api/users/me/wishlist/${encodeURIComponent(productId)}`, {}),
  removeWishlist: (productId: string) => del<{ message: string }>(`/api/users/me/wishlist/${encodeURIComponent(productId)}`),
  createOrder: (body: Omit<Order, 'id' | 'created_at' | 'status' | 'total'> & { items: OrderItem[] }) => post<Order>('/api/orders', body),
  orders: () => request<Order[]>('/api/orders'),
  order: (id: string) => request<Order>(`/api/orders/${encodeURIComponent(id)}`),
  cancelOrder: (id: string) => del<Order>(`/api/orders/${encodeURIComponent(id)}`),
  payStripe: (body: unknown) => post<unknown>('/api/payment/stripe', body),
  payPaypal: (body: unknown) => post<unknown>('/api/payment/paypal', body),
  payEspees: (body: unknown) => post<unknown>('/api/payment/espees', body),
  verifyPayment: (body: unknown) => post<unknown>('/api/payment/verify', body),
  courses: () => request<Course[]>('/api/academy/courses'),
  course: (id: string) => request<Course>(`/api/academy/courses/${encodeURIComponent(id)}`),
  applyAcademy: (body: Omit<AcademyApplication, 'id' | 'created_at' | 'status'>) => post<AcademyApplication>('/api/academy/applications', body),
  vendorProducts: () => request<Product[]>('/api/vendor/products'),
  createVendorProduct: (body: Omit<Product, 'id' | 'created_at'>) => post<Product>('/api/vendor/products', body),
  updateVendorProduct: (id: string, body: Partial<Product>) => put<Product>(`/api/vendor/products/${encodeURIComponent(id)}`, body),
  deleteVendorProduct: (id: string) => del<Product>(`/api/vendor/products/${encodeURIComponent(id)}`),
  vendorAnalytics: () => request<DashboardStats>('/api/vendor/analytics'),
  adminApplications: () => request<AcademyApplication[]>('/api/admin/academy/applications'),
  approveApplication: (id: string) => put<AcademyApplication>(`/api/admin/academy/applications/${encodeURIComponent(id)}/approve`, {}),
  rejectApplication: (id: string) => put<AcademyApplication>(`/api/admin/academy/applications/${encodeURIComponent(id)}/reject`, {}),
  adminDashboard: () => request<DashboardStats>('/api/admin/dashboard'),
}

// TODO: confirm with backend team: wishlist, categories, reviews, courses, and vendor listing backing tables/endpoints.
export default api
