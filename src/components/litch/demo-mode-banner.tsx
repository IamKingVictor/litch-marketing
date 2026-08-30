"use client"

import { useState } from "react"
import { resetDemoData } from "@/lib/reset-demo-data"

export function DemoModeBanner() {
  const [resetting, setResetting] = useState(false)

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 bg-gold-50 px-4 py-2 text-center text-xs font-semibold text-gold-800">
      <span>
        Demo build — all data is mock and stored only in this browser. Not yet
        connected to a live backend.
      </span>
      <button
        onClick={() => {
          setResetting(true)
          resetDemoData()
          window.location.href = "/"
        }}
        className="underline underline-offset-2 disabled:opacity-60"
        disabled={resetting}
      >
        {resetting ? "Resetting…" : "Reset demo data"}
      </button>
    </div>
  )
}
