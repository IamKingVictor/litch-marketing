import Link from "next/link"
import {
  BarChart3,
  Boxes,
  CreditCard,
  Landmark,
  Package,
  Percent,
  Store,
  Users,
} from "lucide-react"

const modules = [
  {
    label: "Customers",
    description: "Manage user accounts",
    href: "/admin/customers",
    icon: Users,
  },
  {
    label: "Sellers",
    description: "Approve and suspend stores",
    href: "/admin/sellers",
    icon: Store,
  },
  {
    label: "Products",
    description: "Global catalog control",
    href: "/admin/products",
    icon: Boxes,
  },
  {
    label: "Orders",
    description: "View all orders",
    href: "/admin/orders",
    icon: Package,
  },
  {
    label: "Commissions",
    description: "Set platform fees",
    href: "/admin/commissions",
    icon: Percent,
  },
  {
    label: "Payments",
    description: "Global transactions",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    label: "Payouts",
    description: "Process seller funds",
    href: "/admin/payouts",
    icon: Landmark,
  },
  {
    label: "Reports",
    description: "Analytics and growth",
    href: "/admin/reports",
    icon: BarChart3,
  },
]

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-primary px-6 py-7 text-primary-foreground shadow-sm md:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/60">
          Control center
        </p>
        <h2 className="mt-2 font-heading text-2xl font-bold">
          Platform overview
        </h2>
        <p className="mt-2 text-sm text-primary-foreground/65">
          Select a module below to manage the marketplace.
        </p>
      </section>
      <section className="grid gap-3 sm:grid-cols-2">
        {modules.map((module) => {
          const Icon = module.icon
          return (
            <Link
              key={module.href}
              href={module.href}
              className="group rounded-2xl border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <Icon size={19} />
              </span>
              <h3 className="mt-5 font-heading text-base font-bold group-hover:text-primary">
                {module.label}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {module.description}
              </p>
            </Link>
          )
        })}
      </section>
    </div>
  )
}
