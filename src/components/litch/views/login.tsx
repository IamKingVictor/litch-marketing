import type { View } from "@/lib/types"
import { Logo } from "../logo"
import { LitchButton } from "../button"

export function Login({
  seller,
  go,
}: {
  seller: boolean
  go: (v: View) => void
}) {
  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl border bg-card p-7">
        <Logo />
        <h1 className="mt-8 font-heading text-2xl font-bold">Welcome back</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to your {seller ? "seller" : "Litch"} account.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            go(seller ? "vendor" : "home")
          }}
          className="mt-6 flex flex-col gap-4"
        >
          <input
            required
            type="email"
            placeholder="Email address"
            className="h-11 rounded-lg border bg-background px-3 text-sm"
          />
          <input
            required
            type="password"
            placeholder="Password"
            className="h-11 rounded-lg border bg-background px-3 text-sm"
          />
          <LitchButton type="submit">Sign in</LitchButton>
        </form>
        <button
          onClick={() => go("signup")}
          className="mt-5 w-full text-sm text-muted-foreground"
        >
          New here? Create an account
        </button>
      </div>
    </main>
  )
}
