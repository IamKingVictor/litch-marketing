"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/litch/logo"
import { LitchButton } from "@/components/litch/button"
import { useSession } from "@/lib/session-context"
import { useToast } from "@/lib/toast-context"
import { useAsyncAction } from "@/lib/use-async-action"
import { PasswordInput } from "@/components/litch/password-input"

export default function LoginPage() {
  const router = useRouter()
  const { loginCustomer } = useSession()
  const { toast } = useToast()

  const { run, pending } = useAsyncAction((email: string) => {
    // Demo only: any email/password "succeeds" — there's no real customer
    // backend yet, so this just creates a mock session.
    loginCustomer(email)
    toast("Welcome back!", "success")
    router.push("/")
  })

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl border bg-card p-7">
        <Link href="/">
          <Logo />
        </Link>
        <h1 className="mt-8 font-heading text-2xl font-bold">Welcome back</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to your Litch account.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const email = (
              e.currentTarget.elements.namedItem("email") as HTMLInputElement
            ).value
            run(email)
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
          <LitchButton type="submit">
            {pending ? "Signing in…" : "Sign in"}
          </LitchButton>
        </form>
        <Link
          href="/signup"
          className="mt-5 block w-full text-center text-sm text-muted-foreground"
        >
          New here? Create an account
        </Link>
      </div>
    </main>
  )
}
