"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, MailCheck } from "lucide-react"
import { Logo } from "@/components/litch/logo"
import { LitchButton } from "@/components/litch/button"
import { useToast } from "@/lib/toast-context"
import { useAsyncAction } from "@/lib/use-async-action"

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState("")

  const { run, pending } = useAsyncAction((value: string) => {
    // Demo only — no real backend yet, so this just flips the UI to the
    // "check your inbox" state without sending anything.
    setEmail(value)
    setSent(true)
    toast("Reset link sent", "success")
  })

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl border bg-card p-7">
        <Link href="/login">
          <Logo />
        </Link>

        {sent ? (
          <div className="mt-8 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-gold-50 text-gold-600">
              <MailCheck size={22} />
            </span>
            <h1 className="mt-4 font-heading text-xl font-bold">
              Check your inbox
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              If an account exists for <b>{email}</b>, we've sent a link to
              reset your password.
            </p>
            <Link
              href="/login"
              className="mt-6 flex items-center justify-center gap-2 text-sm font-bold text-primary"
            >
              <ArrowLeft size={16} /> Back to sign in
            </Link>
          </div>
        ) : (
          <>
            <h1 className="mt-8 font-heading text-2xl font-bold">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter the email on your account and we'll send you a link to
              reset your password.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const value = (
                  e.currentTarget.elements.namedItem(
                    "email",
                  ) as HTMLInputElement
                ).value
                run(value)
              }}
              className="mt-6 flex flex-col gap-4"
            >
              <input
                required
                name="email"
                type="email"
                placeholder="Email address"
                className="h-11 rounded-lg border bg-background px-3 text-sm"
              />
              <LitchButton type="submit">
                {pending ? "Sending…" : "Send reset link"}
              </LitchButton>
            </form>
            <Link
              href="/login"
              className="mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground"
            >
              <ArrowLeft size={14} /> Back to sign in
            </Link>
          </>
        )}
      </div>
    </main>
  )
}
