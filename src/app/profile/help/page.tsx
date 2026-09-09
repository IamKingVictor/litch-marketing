"use client"

import Link from "next/link"
import { ArrowLeft, ChevronRight, MessageSquareQuoteIcon } from "lucide-react"

const faqs = [
  {
    question: "How long do deliveries take?",
    answer:
      "Most local orders arrive within 3–5 business days, while selected items are delivered faster depending on the vendor.",
  },
  {
    question: "Can I return a product?",
    answer:
      "Yes. Items can be returned within 7 days if they are unused and in the original condition, unless marked final sale.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Go to My Orders from your profile and open the relevant order to check its current status and shipment timeline.",
  },
]

export default function HelpSupportPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <Link
        href="/profile"
        className="mb-5 flex items-center gap-2 text-sm font-bold"
      >
        <ArrowLeft size={16} /> Help & support
      </Link>

      <div className="rounded-2xl border bg-card p-5">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
            <MessageSquareQuoteIcon size={18} />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-muted-foreground">
              FAQ
            </p>
            <h1 className="font-heading text-2xl font-bold">Help center</h1>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="rounded-xl border bg-background p-4"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold">
                {item.question}
                <ChevronRight size={15} className="text-muted-foreground" />
              </summary>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </main>
  )
}
