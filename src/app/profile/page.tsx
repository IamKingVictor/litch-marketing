"use client"

import Link from "next/link"
import {
  ArrowLeft,
  Box,
  ChevronRight,
  Crown,
  Info,
  KeyRound,
  LifeBuoy,
  LogOut,
  Package,
  Phone,
  Repeat,
  Settings,
  Store,
  User,
} from "lucide-react"
import { useSession } from "@/lib/session-context"
import { useCart } from "@/lib/cart-context"
import { LitchButton } from "@/components/litch/button"

const sections = [
  {
    label: "Shopping & loyalty",
    links: [
      [
        Package,
        "My Orders",
        "Track, cancel, or view order history",
        "/profile/myorders",
      ],
      [
        Repeat,
        "Product Exchanges",
        "Track and manage exchange requests",
        "/profile",
      ],
      [Crown, "Loyalty Rewards", "Earn points and redeem coupons", "/profile"],
    ],
  },
  {
    label: "Account settings",
    links: [
      [
        User,
        "Edit Profile",
        "Manage your name, email, and phone number",
        "/profile/edit",
      ],
      [
        KeyRound,
        "Change Password",
        "Update your account login password",
        "/forgot-password",
      ],
      [
        Settings,
        "App Settings",
        "Configure alerts and display preferences",
        "/profile/settings",
      ],
    ],
  },
  {
    label: "Support & info",
    links: [
      [
        LifeBuoy,
        "Help & Support",
        "Find answers and contact support",
        "/profile/help",
      ],
      [
        Phone,
        "Contact Us",
        "Official channels and direct support",
        "/profile/contact",
      ],
      [Info, "About Us", "Read our story and mission", "/about"],
    ],
  },
] as const

function AccountSummary({
  name,
  email,
  activeOrders,
}: {
  name: string
  email: string
  activeOrders: number
}) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <p className="text-xs font-bold uppercase tracking-[.16em] text-gold-600">
        Account overview
      </p>
      <h1 className="mt-2 font-heading text-2xl font-bold">{name}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{email}</p>
      <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-gold-50 px-2.5 py-1 text-xs font-bold text-gold-600">
        <Crown size={13} /> Gold Member
      </span>
      <div className="mt-5 grid grid-cols-2 gap-3 border-t pt-4">
        <Stat
          icon={<Crown size={16} />}
          value="250 PTS"
          label="Loyalty balance"
        />
        <Stat
          icon={<Box size={16} />}
          value={`${activeOrders} Orders`}
          label="Active orders"
        />
      </div>
    </div>
  )
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode
  value: string
  label: string
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-gold-600">{icon}</span>
      <span>
        <b className="block text-sm">{value}</b>
        <small className="block text-[11px] text-muted-foreground">
          {label}
        </small>
      </span>
    </div>
  )
}

function ProfileLink({
  link,
}: {
  link: readonly [typeof Package, string, string, string]
}) {
  const [Icon, title, subtitle, href] = link
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl border bg-card px-4 py-3.5 transition hover:border-primary/40"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
        <Icon size={17} />
      </span>
      <span className="min-w-0 flex-1">
        <b className="block text-sm">{title}</b>
        <span className="block truncate text-xs text-muted-foreground">
          {subtitle}
        </span>
      </span>
      <ChevronRight
        size={16}
        className="shrink-0 text-muted-foreground transition group-hover:translate-x-0.5"
      />
    </Link>
  )
}

function ProfileSections({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={mobile ? "space-y-6" : "space-y-8"}>
      {sections.map((section) => (
        <section key={section.label}>
          <p className="mb-3 text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">
            {section.label}
          </p>
          <div className="flex flex-col gap-3">
            {section.links.map((link) => (
              <ProfileLink key={link[1]} link={link} />
            ))}
          </div>
        </section>
      ))}
      <section>
        <p className="mb-3 text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">
          Seller portal
        </p>
        <ProfileLink
          link={[
            Store,
            "Become a Seller / Store Owner",
            "Register your store and access Vendor Portal",
            "/seller/login",
          ]}
        />
      </section>
    </div>
  )
}

export default function ProfilePage() {
  const { session, hydrated, logout } = useSession()
  const { bag, bookings } = useCart()
  const isGuest = !hydrated || session.role === "guest"
  const name = isGuest
    ? "Guest User"
    : (session.name ?? session.shopName ?? "Welcome back")
  const email = isGuest ? "guest@litchmarketing.com" : (session.email ?? "")
  const activeOrders = bag.length + bookings.length

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 lg:px-12">
      <Link href="/" className="mb-6 flex items-center gap-2 text-sm font-bold">
        <ArrowLeft size={16} /> Profile
      </Link>
      <div className="hidden gap-8 lg:grid lg:grid-cols-[15rem_1fr]">
        <aside className="self-start space-y-5">
          <AccountSummary
            name={name}
            email={email}
            activeOrders={activeOrders}
          />
          {isGuest && (
            <Link href="/login">
              <LitchButton className="w-full">
                Sign in for full access
              </LitchButton>
            </Link>
          )}
        </aside>
        <div>
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-gold-600">
              Your account
            </p>
            <h2 className="mt-1 font-heading text-3xl font-bold">
              Manage your Litch experience
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Keep your profile, orders, rewards, and support options in one
              place.
            </p>
          </div>
          <ProfileSections />
          {!isGuest && <SignOut onClick={logout} />}
        </div>
      </div>
      <div className="space-y-6 lg:hidden">
        <AccountSummary name={name} email={email} activeOrders={activeOrders} />
        {isGuest && (
          <Link href="/login">
            <LitchButton className="w-full">
              Sign in for full access
            </LitchButton>
          </Link>
        )}
        <ProfileSections mobile />
        {!isGuest && <SignOut onClick={logout} />}
      </div>
    </main>
  )
}

function SignOut({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-bold text-destructive"
    >
      <LogOut size={16} /> Sign out
    </button>
  )
}
