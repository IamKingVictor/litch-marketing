"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import type { View } from "@/lib/types"
import { categories } from "@/lib/mock-data"
import { Logo } from "../logo"
import { LitchButton } from "../button"

export function Auth({
  seller,
  go,
}: {
  seller: boolean
  go: (v: View) => void
}) {
  const [step, setStep] = useState(1)
  const [otp, setOtp] = useState(["", "", "", ""])
  const [timer, setTimer] = useState(60)
  const [connected, setConnected] = useState(false)
  const next = () => setStep(step === 1 ? 2 : step === 2 ? 3 : 4)
  return (
    <main className="mx-auto max-w-xl px-4 py-10 md:px-10">
      <div className="rounded-2xl border bg-card p-6 md:p-8">
        <div className="flex items-center justify-between">
          <button onClick={() => go("home")}>
            <Logo />
          </button>
          <span className="text-sm text-muted-foreground">
            {seller ? "Seller" : "Customer"} account
          </span>
        </div>
        <div className="mt-8 flex items-center justify-between">
          {[1, 2, 3].slice(0, seller ? 3 : 2).map((n) => (
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
              {n < (seller ? 3 : 2) && <div className="h-px w-16 bg-border" />}
            </div>
          ))}
        </div>
        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              next()
            }}
            className="mt-8 flex flex-col gap-4"
          >
            <div>
              <h1 className="font-heading text-2xl font-bold">
                {seller ? "Become a seller" : "Create your account"}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Let's get you set up.
              </p>
            </div>
            {(seller
              ? ["Full name", "Email address", "Phone number", "Country"]
              : ["Full name", "Email address"]
            ).map((label) => (
              <input
                required
                key={label}
                placeholder={label}
                className="h-11 rounded-lg border bg-background px-3 text-sm"
              />
            ))}
            <input
              required
              type="password"
              placeholder="Password"
              className="h-11 rounded-lg border bg-background px-3 text-sm"
            />
            <LitchButton type="submit">
              Send OTP <ArrowRight size={16} />
            </LitchButton>
            <button
              type="button"
              onClick={() => go("login")}
              className="text-sm text-muted-foreground"
            >
              Already have an account? Sign in
            </button>
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
                    const nextOtp = [...otp]
                    nextOtp[i] = e.target.value.replace(/\D/g, "")
                    setOtp(nextOtp)
                    if (e.target.value && i < 3)
                      document.getElementById(`otp-${i + 1}`)?.focus()
                  }}
                  id={`otp-${i}`}
                  className="size-14 rounded-lg border bg-background text-center text-xl font-bold"
                />
              ))}
            </div>
            <LitchButton onClick={next} className="mt-6 w-full">
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
        {step === 3 && seller && (
          <div className="mt-8 flex flex-col gap-4">
            <h1 className="font-heading text-2xl font-bold">
              Set up your shop
            </h1>
            <input
              placeholder="Shop name"
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
            <LitchButton onClick={next}>Continue to payout</LitchButton>
          </div>
        )}
        {step === 4 && seller && (
          <div className="mt-8 text-center">
            <h1 className="font-heading text-2xl font-bold">
              Connect payouts
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Receive your earnings securely through Stripe.
            </p>
            {connected ? (
              <div className="mt-6 rounded-lg bg-secondary p-4 text-sm font-bold text-primary">
                <Check className="mx-auto mb-2" /> Stripe connected
              </div>
            ) : (
              <LitchButton
                onClick={() => setConnected(true)}
                className="mt-6 w-full"
              >
                Connect Stripe
              </LitchButton>
            )}
            <LitchButton
              onClick={() => go("vendor")}
              secondary
              className="mt-3 w-full"
            >
              Open seller dashboard
            </LitchButton>
          </div>
        )}
      </div>
    </main>
  )
}
