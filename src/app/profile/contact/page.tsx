"use client"

import Link from "next/link"
import { ArrowLeft, Mail, Send } from "lucide-react"
import { useState } from "react"
import { LitchButton } from "@/components/litch/button"

export default function ContactUsPage() {
  const [sent, setSent] = useState(false)

  return (
    <main className="mx-auto max-w-xl px-4 py-6">
      <Link
        href="/profile"
        className="mb-5 flex items-center gap-2 text-sm font-bold"
      >
        <ArrowLeft size={16} /> Contact us
      </Link>

      <div className="rounded-2xl border bg-card p-5 md:p-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
            <Mail size={18} />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-muted-foreground">
              Support
            </p>
            <h1 className="font-heading text-2xl font-bold">
              Send us a message
            </h1>
          </div>
        </div>

        {!sent ? (
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            <label className="block text-sm font-medium">
              Name
              <input
                required
                className="mt-1 h-11 w-full rounded-lg border bg-background px-3 text-sm"
                placeholder="Your name"
              />
            </label>

            <label className="block text-sm font-medium">
              Email
              <input
                required
                type="email"
                className="mt-1 h-11 w-full rounded-lg border bg-background px-3 text-sm"
                placeholder="you@example.com"
              />
            </label>

            <label className="block text-sm font-medium">
              Message
              <textarea
                required
                className="mt-1 min-h-28 w-full rounded-lg border bg-background p-3 text-sm"
                placeholder="Tell us how we can help"
              />
            </label>

            <LitchButton type="submit" className="w-full">
              <Send size={16} /> Send message
            </LitchButton>
          </form>
        ) : (
          <div className="mt-6 rounded-xl bg-secondary p-4 text-sm text-primary">
            Thanks! Your message has been queued successfully. We’ll reach out
            to you via email soon.
          </div>
        )}
      </div>
    </main>
  )
}
