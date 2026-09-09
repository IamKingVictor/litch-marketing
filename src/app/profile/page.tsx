"use client"

import Link from "next/link"
import {
  ArrowLeft,
  ChevronRight,
  User,
  KeyRound,
  Settings,
  Store,
  LifeBuoy,
  Phone,
  Info,
  Package,
  Repeat,
  Crown,
  Box,
  LogOut,
} from "lucide-react"
import { useSession } from "@/lib/session-context"
import { useCart } from "@/lib/cart-context"
import { LitchButton } from "@/components/litch/button"

function Row({
  icon,
  title,
  subtitle,
  href = "#",
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  href?: string
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3.5"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold">{title}</span>
        <span className="block truncate text-xs text-muted-foreground">
          {subtitle}
        </span>
      </span>
      <ChevronRight size={16} className="shrink-0 text-muted-foreground" />
    </Link>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 mt-7 text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">
      {children}
    </p>
  )
}

export default function ProfilePage() {
  const { session, hydrated, logout } = useSession()
  const { bag, bookings } = useCart()
  const isGuest = !hydrated || session.role === "guest"
  const activeOrders = bag.length + bookings.length

  return (
    <main className="mx-auto max-w-md px-4 py-6">
      <Link href="/" className="mb-4 flex items-center gap-2 text-sm font-bold">
        <ArrowLeft size={16} /> Profile
      </Link>

      <div className="rounded-2xl border bg-card p-5">
        {isGuest ? (
          <>
            <h1 className="font-heading text-xl font-bold">Guest User</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              guest@litchmarketing.com
            </p>
          </>
        ) : (
          <>
            <h1 className="font-heading text-xl font-bold">
              {session.name ?? session.shopName ?? "Welcome back"}
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {session.email}
            </p>
          </>
        )}
        <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-gold-50 px-2.5 py-1 text-xs font-bold text-gold-600">
          <Crown size={13} /> Gold Member
        </span>

        <div className="mt-5 grid grid-cols-2 gap-3 border-t pt-4">
          <div className="flex items-center gap-2">
            <Crown size={16} className="text-gold-600" />
            <span>
              <span className="block text-sm font-bold">250 PTS</span>
              <span className="block text-[11px] text-muted-foreground">
                Loyalty Balance
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Box size={16} className="text-muted-foreground" />
            <span>
              <span className="block text-sm font-bold">
                {activeOrders} Orders
              </span>
              <span className="block text-[11px] text-muted-foreground">
                Active Orders
              </span>
            </span>
          </div>
        </div>
      </div>

      {isGuest && (
        <Link href="/login">
          <LitchButton className="mt-4 w-full">
            Sign in for full access
          </LitchButton>
        </Link>
      )}

      <SectionLabel>Shopping &amp; Loyalty</SectionLabel>
      <div className="flex flex-col gap-2">
        <Row
          icon={<Package size={17} />}
          title="My Orders"
          subtitle="Track, cancel, or view order history"
          href="/profile/myorders"
        />
        <Row
          icon={<Repeat size={17} />}
          title="Product Exchanges"
          subtitle="Track and manage your item exchange requests"
          href="/profile"
        />
        <Row
          icon={<Crown size={17} />}
          title="Loyalty Rewards"
          subtitle="Earn points and redeem discount coupons"
          href="/profile"
        />
      </div>

      <SectionLabel>Account Settings</SectionLabel>
      <div className="flex flex-col gap-2">
        <Row
          icon={<User size={17} />}
          title="Edit Profile"
          subtitle="Manage your name, email, and phone number"
          href="/profile/edit"
        />
        <Row
          icon={<KeyRound size={17} />}
          title="Change Password"
          subtitle="Update your account login password"
          href="/forgot-password"
        />
        <Row
          icon={<Settings size={17} />}
          title="App Settings"
          subtitle="Configure alert and layout preferences"
          href="/profile/settings"
        />
      </div>

      <SectionLabel>Seller &amp; Store Portal</SectionLabel>
      <div className="flex flex-col gap-2">
        <Row
          icon={<Store size={17} />}
          title="Become a Seller / Store Owner"
          subtitle="Register your store and access Vendor Portal"
          href="/seller/login"
        />
      </div>

      <SectionLabel>Support &amp; Info</SectionLabel>
      <div className="flex flex-col gap-2">
        <Row
          icon={<LifeBuoy size={17} />}
          title="Help & Support"
          subtitle="Open support cases and ask technical queries"
          href="/profile/help"
        />
        <Row
          icon={<Phone size={17} />}
          title="Contact Us"
          subtitle="Official channels and direct support messages"
          href="/profile/contact"
        />
        <Row
          icon={<Info size={17} />}
          title="About Us"
          subtitle="Read our story, mission, and release details"
          href="/about"
        />
      </div>

      {!isGuest && (
        <button
          onClick={logout}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-bold text-destructive"
        >
          <LogOut size={16} /> Sign out
        </button>
      )}
    </main>
  )
}
