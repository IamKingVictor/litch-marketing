"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Logo } from "@/components/litch/logo"
import { LitchButton } from "@/components/litch/button"

const SECTIONS = [
  {
    heading: "1. Acceptance of these terms",
    body: "By creating an account, listing a product or service, or placing an order on Litch Marketing, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please do not use the platform.",
  },
  {
    heading: "2. Accounts",
    body: "You must provide accurate information when creating a customer or seller account and are responsible for keeping your login details secure. Litch Marketing may suspend accounts used for fraudulent, abusive, or unlawful activity.",
  },
  {
    heading: "3. Buying products and booking services",
    body: "Products purchased through Litch Marketing are added to your Shopping Bag and fulfilled by the listing vendor. Services are reserved into a specific date and time slot and added to My Bookings; availability is set by the vendor and is not guaranteed until confirmed.",
  },
  {
    heading: "4. Sellers and vendors",
    body: "Sellers are responsible for the accuracy of their listings, pricing, stock levels, and service availability windows, and for fulfilling orders and bookings in a timely manner. Litch Marketing may remove listings that violate these terms or applicable law.",
  },
  {
    heading: "5. Payments and fees",
    body: "Prices are shown inclusive of applicable taxes unless stated otherwise. Litch Marketing may charge sellers a platform or transaction fee, disclosed within the Seller Portal, for processing orders and bookings.",
  },
  {
    heading: "6. Cancellations, returns & refunds",
    body: "Product returns and exchanges follow the return window stated on each listing. Service bookings may be rescheduled or cancelled subject to the vendor's stated policy for that service.",
  },
  {
    heading: "7. Reviews and conduct",
    body: "Reviews must reflect a genuine experience with the product, service, or vendor. Litch Marketing may remove reviews or content that is abusive, fraudulent, or unrelated to the listing.",
  },
  {
    heading: "8. Limitation of liability",
    body: "Litch Marketing operates as a marketplace connecting buyers with independent sellers and service vendors and is not itself the manufacturer or service provider unless explicitly stated.",
  },
  {
    heading: "9. Changes to these terms",
    body: "We may update these Terms and Conditions from time to time. Continued use of Litch Marketing after changes are posted constitutes acceptance of the revised terms.",
  },
]

export default function TermsPage() {
  const router = useRouter()

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 md:px-8">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-bold text-primary"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <h1 className="mt-8 font-heading text-3xl font-bold">
        Terms and Conditions
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated September 2026. Please read these terms carefully before
        using Litch Marketing as a buyer, seller, or service vendor.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {SECTIONS.map((s) => (
          <section key={s.heading}>
            <h2 className="font-heading text-lg font-bold">{s.heading}</h2>
            <p className="mt-2 leading-7 text-muted-foreground">{s.body}</p>
          </section>
        ))}
      </div>

      <LitchButton className="mt-10 w-full" onClick={() => router.back()}>
        <ArrowLeft size={16} /> Back to where you were
      </LitchButton>
    </main>
  )
}
