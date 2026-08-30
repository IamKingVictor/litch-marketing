"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/lib/session-context"
import { useToast } from "@/lib/toast-context"
import { useAsyncAction } from "@/lib/use-async-action"
import { LitchButton } from "@/components/litch/button"

export default function SellerSettingsPage() {
  const { session, scheduleShopDeletion, shopDeleteAt, logout } = useSession()
  const { toast } = useToast()
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)

  const { run: saveSettings, pending: saving } = useAsyncAction(() => {
    toast("Shop settings saved", "success")
  })

  const { run: confirmDelete, pending: deleting } = useAsyncAction(() => {
    scheduleShopDeletion()
    toast("Account scheduled for deletion", "success")
    setConfirming(false)
  })

  return (
    <div className="max-w-xl">
      <h2 className="font-heading text-2xl font-bold">Shop settings</h2>
      <div className="mt-5 flex flex-col gap-4">
        <input
          defaultValue={session.shopName}
          className="h-11 rounded-lg border bg-card px-3 text-sm"
        />
        <textarea
          defaultValue="Everyday clothing made slowly in small runs."
          className="min-h-28 rounded-lg border bg-card p-3 text-sm"
        />
        <LitchButton onClick={() => saveSettings()}>
          {saving ? "Saving…" : "Save changes"}
        </LitchButton>
      </div>

      <div className="mt-10 rounded-xl border border-destructive/30 bg-destructive/5 p-5">
        <h3 className="font-heading font-bold text-destructive">
          Danger zone
        </h3>
        {shopDeleteAt ? (
          <p className="mt-2 text-sm">
            Your shop/seller account would be deleted permanently after 30
            days — scheduled for <b>{shopDeleteAt.toLocaleDateString()}</b>.
            Contact support before then if you change your mind.
          </p>
        ) : !confirming ? (
          <>
            <p className="mt-2 text-sm text-muted-foreground">
              Deleting your account removes your shop and all its listings.
            </p>
            <button
              onClick={() => setConfirming(true)}
              className="mt-3 rounded-lg border border-destructive px-4 py-2 text-sm font-bold text-destructive"
            >
              Delete my account
            </button>
          </>
        ) : (
          <>
            <p className="mt-2 text-sm">
              Are you sure? Your shop/seller account would be deleted
              permanently after 30 days.
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => confirmDelete()}
                disabled={deleting}
                className="rounded-lg bg-destructive px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
              >
                {deleting ? "Scheduling…" : "Yes, delete my account"}
              </button>
              <button
                onClick={() => setConfirming(false)}
                className="rounded-lg border px-4 py-2 text-sm font-bold"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>

      <button
        onClick={() => {
          logout()
          toast("Logged out")
          router.push("/")
        }}
        className="mt-8 text-sm font-bold text-muted-foreground"
      >
        Log out
      </button>
    </div>
  )
}
