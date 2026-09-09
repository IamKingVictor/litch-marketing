"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { Logo } from "@/components/litch/logo"
import { LitchButton } from "@/components/litch/button"
import { categories } from "@/lib/mock-data"
import { useSession } from "@/lib/session-context"
import { useToast } from "@/lib/toast-context"
import { useAsyncAction } from "@/lib/use-async-action"
import { PasswordInput } from "@/components/litch/password-input"

export default function SellerLoginPage() {
  const router = useRouter()
  const { loginSeller, signupSeller } = useSession()
  const { toast } = useToast()
  const [mode, setMode] = useState<"login" | "signup">("login")

  // --- Login state ---
  const [loginError, setLoginError] = useState("")
  const { run: attemptLogin, pending: loggingIn } = useAsyncAction(
    (email: string, password: string) => {
      const ok = loginSeller(email, password)
      if (ok) {
        toast("Logged in as seller", "success")
        router.push("/seller/dashboard")
      } else {
        setLoginError("That email/password doesn't match a seller account.")
      }
    },
  )

  // --- Signup state ---
  const [step, setStep] = useState(1)
  const [otp, setOtp] = useState(["", "", "", ""])
  const [timer, setTimer] = useState(60)
  const [signupEmail, setSignupEmail] = useState("")
  const [signupName, setSignupName] = useState("")
  const [shopName, setShopName] = useState("")
  const [connected, setConnected] = useState(false)
  const { run: finishSignup, pending: finishingSignup } = useAsyncAction(() => {
    signupSeller(signupEmail, signupName, shopName || "My Shop")
    toast(`Welcome to Litch, ${shopName || "seller"}!`, "success")
    router.push("/seller/dashboard")
  })

  return (
    <main className="mx-auto max-w-xl px-4 py-10 md:px-10">
      <div className="rounded-2xl border bg-card p-6 md:p-8">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <span className="text-sm text-muted-foreground">Seller account</span>
        </div>

        <div className="mt-6 flex rounded-lg border bg-background p-1 text-sm font-bold">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 rounded-md py-2 ${
              mode === "login"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground"
            }`}
          >
            Log in
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 rounded-md py-2 ${
              mode === "signup"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground"
            }`}
          >
            Sign up
          </button>
        </div>

        {mode === "login" && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const form = e.currentTarget
              const email = (
                form.elements.namedItem("email") as HTMLInputElement
              ).value
              const password = (
                form.elements.namedItem("password") as HTMLInputElement
              ).value
              setLoginError("")
              attemptLogin(email, password)
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
            {loginError && (
              <p className="text-sm text-destructive">{loginError}</p>
            )}
            <LitchButton type="submit">
              {loggingIn ? "Signing in…" : "Sign in"}
            </LitchButton>
          </form>
        )}

        {mode === "signup" && (
          <>
            <div className="mt-6 flex items-center justify-between">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex items-center gap-2">
                  <span
                    className={`flex size-8 items-center justify-center rounded-full text-sm font-bold ${
                      step >= n
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > n ? <Check size={15} /> : n}
                  </span>
                  {n < 3 && <div className="h-px w-16 bg-border" />}
                </div>
              ))}
            </div>
            {step === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setStep(2)
                }}
                className="mt-8 flex flex-col gap-4"
              >
                <div>
                  <h1 className="font-heading text-2xl font-bold">
                    Become a seller
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Let&apos;s get you set up.
                  </p>
                </div>
                <input
                  required
                  placeholder="Full name"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="h-11 rounded-lg border bg-background px-3 text-sm"
                />
                <input
                  required
                  type="email"
                  placeholder="Email address"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="h-11 rounded-lg border bg-background px-3 text-sm"
                />
                <input
                  required
                  placeholder="Phone number"
                  className="h-11 rounded-lg border bg-background px-3 text-sm"
                />
                <input
                  required
                  placeholder="Country"
                  className="h-11 rounded-lg border bg-background px-3 text-sm"
                />
                <PasswordInput
                  required
                  placeholder="Password"
                  className="h-11 rounded-lg border bg-background px-3 text-sm"
                />
                <LitchButton type="submit">
                  Send OTP <ArrowRight size={16} />
                </LitchButton>
              </form>
            )}
            {step === 2 && (
              <div className="mt-8">
                <h1 className="font-heading text-2xl font-bold">
                  Verify your email
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Enter the 4-digit code we sent you.
                </p>
                <div className="mt-6 flex gap-3">
                  {otp.map((v, i) => (
                    <input
                      autoFocus={i === 0}
                      key={i}
                      value={v}
                      maxLength={1}
                      onChange={(e) => {
                        const next = [...otp]
                        next[i] = e.target.value.replace(/\D/g, "")
                        setOtp(next)
                        if (e.target.value && i < 3)
                          document
                            .getElementById(`seller-otp-${i + 1}`)
                            ?.focus()
                      }}
                      id={`seller-otp-${i}`}
                      className="size-14 rounded-lg border bg-background text-center text-xl font-bold"
                    />
                  ))}
                </div>
                <LitchButton onClick={() => setStep(3)} className="mt-6 w-full">
                  Verify account
                </LitchButton>
                <button
                  onClick={() => setTimer(60)}
                  disabled={timer > 0}
                  className="mt-4 w-full text-sm text-muted-foreground"
                >
                  {timer > 0 ? `Resend code in ${timer}s` : "Resend code"}
                </button>
              </div>
            )}
            {step === 3 && (
              <div className="mt-8 flex flex-col gap-4">
                <h1 className="font-heading text-2xl font-bold">
                  Set up your shop
                </h1>
                <input
                  required
                  placeholder="Shop name"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="h-11 rounded-lg border bg-background px-3 text-sm"
                />
                <textarea
                  placeholder="Tell shoppers about your shop"
                  className="min-h-28 rounded-lg border bg-background p-3 text-sm"
                />
                <select className="h-11 rounded-lg border bg-background px-3 text-sm">
                  {categories.slice(1).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <input
                  placeholder="Shop address"
                  className="h-11 rounded-lg border bg-background px-3 text-sm"
                />
                <label className="rounded-lg border border-dashed p-5 text-center text-sm text-muted-foreground">
                  Upload banner image
                  <input type="file" className="sr-only" />
                </label>
                {!connected ? (
                  <LitchButton
                    onClick={() => {
                      setConnected(true)
                      toast("Stripe connected", "success")
                    }}
                  >
                    Connect Stripe
                  </LitchButton>
                ) : (
                  <div className="rounded-lg bg-secondary p-4 text-center text-sm font-bold text-primary">
                    <Check className="mx-auto mb-2" /> Stripe connected
                  </div>
                )}
                <LitchButton onClick={() => finishSignup()}>
                  {finishingSignup ? "Setting up…" : "Open seller dashboard"}
                </LitchButton>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
