"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { Logo } from "@/components/litch/logo"
import { LitchButton } from "@/components/litch/button"
import { useSession } from "@/lib/session-context"
import { useToast } from "@/lib/toast-context"
import { useAsyncAction } from "@/lib/use-async-action"

export default function SignupPage() {
  const router = useRouter()
  const { loginCustomer } = useSession()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [otp, setOtp] = useState(["", "", "", ""])
  const [timer, setTimer] = useState(60)
  const [email, setEmail] = useState("")

  const { run: verify, pending: verifying } = useAsyncAction(() => {
    loginCustomer(email)
    toast("Account created — welcome to Litch!", "success")
    router.push("/")
  })

  return (
    <main className="mx-auto max-w-xl px-4 py-10 md:px-10">
      <div className="rounded-2xl border bg-card p-6 md:p-8">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <span className="text-sm text-muted-foreground">
            Customer account
          </span>
        </div>
        <div className="mt-8 flex items-center justify-between">
          {[1, 2].map((n) => (
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
              {n < 2 && <div className="h-px w-16 bg-border" />}
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
                Create your account
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Let's get you set up.
              </p>
            </div>
            <input
              required
              placeholder="Full name"
              className="h-11 rounded-lg border bg-background px-3 text-sm"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="h-11 rounded-lg border bg-background px-3 text-sm"
            />
            <input
              required
              type="password"
              placeholder="Password"
              className="h-11 rounded-lg border bg-background px-3 text-sm"
            />
            <LitchButton type="submit">
              Send OTP <ArrowRight size={16} />
            </LitchButton>
            <Link href="/login" className="text-sm text-muted-foreground">
              Already have an account? Sign in
            </Link>
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
                      document.getElementById(`otp-${i + 1}`)?.focus()
                  }}
                  id={`otp-${i}`}
                  className="size-14 rounded-lg border bg-background text-center text-xl font-bold"
                />
              ))}
            </div>
            <LitchButton onClick={() => verify()} className="mt-6 w-full">
              {verifying ? "Verifying…" : "Verify account"}
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
      </div>
    </main>
  )
}
