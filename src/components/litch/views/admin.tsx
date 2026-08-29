import type { View } from "@/lib/types"
import { LitchButton } from "../button"

export function Admin({ go }: { go: (v: View) => void }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gold-600">
            Operations
          </p>
          <h1 className="font-heading text-3xl font-bold">Admin dashboard</h1>
        </div>
        <LitchButton secondary onClick={() => go("home")}>
          Back to storefront
        </LitchButton>
      </div>
      <div className="mt-7 grid gap-4 md:grid-cols-4">
        {[
          ["GMV", "$128,000"],
          ["Orders", "248"],
          ["Active shops", "64"],
          ["Pending review", "12"],
        ].map(([a, b]) => (
          <div key={a} className="rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">{a}</p>
            <p className="mt-2 font-heading text-2xl font-bold">{b}</p>
          </div>
        ))}
      </div>
      <div className="mt-7 rounded-xl border bg-card p-5">
        <h2 className="font-heading text-xl font-bold">
          Recent shop applications
        </h2>
        {["Kora Home", "Moss & Thread", "Palm Pantry"].map((n) => (
          <div
            key={n}
            className="flex items-center justify-between border-b py-4 text-sm last:border-0"
          >
            <span className="font-bold">{n}</span>
            <span className="rounded-full bg-gold-50 px-3 py-1 text-xs font-bold text-gold-800">
              Pending review
            </span>
          </div>
        ))}
      </div>
    </main>
  )
}
