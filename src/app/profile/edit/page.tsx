"use client"

import Link from "next/link"
import { ArrowLeft, Camera, Save, ShieldCheck } from "lucide-react"
import { useState } from "react"
import { useSession } from "@/lib/session-context"
import { LitchButton } from "@/components/litch/button"

export default function EditProfilePage() {
  const { session, hydrated, updateSession } = useSession()
  const [name, setName] = useState(session.name ?? session.shopName ?? "")
  const [email, setEmail] = useState(session.email ?? "")
  const [phone, setPhone] = useState("+234 800 000 0000")
  const [avatar, setAvatar] = useState("/brand/crown_logo.jpg")

  if (!hydrated || session.role === "guest") {
    return (
      <main className="mx-auto max-w-lg px-4 py-10 text-center">
        <h1 className="font-heading text-2xl font-bold">Access restricted</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Please sign in to manage your profile.
        </p>
        <Link
          href="/login"
          className="mt-5 inline-block text-sm font-bold text-primary"
        >
          Go to sign in
        </Link>
      </main>
    )
  }

  const saveProfile = () => {
    updateSession({ name, email })
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <Link
        href="/profile"
        className="mb-5 flex items-center gap-2 text-sm font-bold"
      >
        <ArrowLeft size={16} /> Edit profile
      </Link>

      <div className="rounded-2xl border bg-card p-5 md:p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={avatar}
              alt="Profile avatar"
              className="size-20 rounded-full border object-cover"
            />
            <label className="absolute -bottom-1 -right-1 flex size-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
              <Camera size={15} />
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const nextUrl = URL.createObjectURL(file)
                    setAvatar(nextUrl)
                  }
                }}
              />
            </label>
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold">
              {name || "Your profile"}
            </h1>
            <p className="text-sm text-muted-foreground">{session.role}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block text-sm font-medium md:col-span-2">
            Full name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 h-11 w-full rounded-lg border bg-background px-3 text-sm"
            />
          </label>

          <label className="block text-sm font-medium md:col-span-2">
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 h-11 w-full rounded-lg border bg-background px-3 text-sm"
            />
          </label>

          <label className="block text-sm font-medium md:col-span-2">
            Phone number
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 h-11 w-full rounded-lg border bg-background px-3 text-sm"
            />
          </label>
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-xl bg-secondary p-3 text-sm text-primary">
          <ShieldCheck size={16} />
          Your profile is protected and only visible to your account.
        </div>

        <LitchButton onClick={saveProfile} className="mt-6 w-full">
          <Save size={16} /> Save changes
        </LitchButton>
      </div>
    </main>
  )
}
