"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Logo } from "@/components/litch/logo"
import { LitchButton } from "@/components/litch/button"
import { useSession } from "@/lib/session-context"
import { useToast } from "@/lib/toast-context"
import { useAsyncAction } from "@/lib/use-async-action"
import { PasswordInput } from "@/components/litch/password-input"

export default function AdminLoginPage() {
  const router = useRouter()
  const { loginAdmin } = useSession()
  const { toast } = useToast()
  const [error, setError] = useState("")

  const { run, pending } = useAsyncAction((email: string, password: string) => {
    if (loginAdmin(email, password)) {
      toast("Logged in as admin", "success")
      router.push("/admin")
    } else {
      setError("Incorrect admin credentials.")
    }
  })

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl border bg-card p-7">
        <Link href="/">
          <Logo />
        </Link>
        <h1 className="mt-8 font-heading text-2xl font-bold">Admin sign in</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const form = e.currentTarget
            const email = (form.elements.namedItem("email") as HTMLInputElement)
              .value
            const password = (
              form.elements.namedItem("password") as HTMLInputElement
            ).value
            setError("")
            run(email, password)
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
          <PasswordInput
            required
            name="password"
            placeholder="Password"
            className="h-11 rounded-lg border bg-background px-3 text-sm"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <LitchButton type="submit">
            {pending ? "Signing in…" : "Sign in"}
          </LitchButton>
        </form>
      </div>
    </main>
  )
}
