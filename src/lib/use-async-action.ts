"use client"

import { useState } from "react"

// Wraps a mock action with an artificial delay so it *feels* like a network
// request (a real loading state on the button) even though everything here
// is local/mock data. Swap the setTimeout for a real API call later — the
// pending-state shape callers use stays identical.
export function useAsyncAction<Args extends unknown[]>(
  action: (...args: Args) => void | Promise<void>,
  delayMs = 500,
) {
  const [pending, setPending] = useState(false)

  const run = async (...args: Args) => {
    setPending(true)
    await new Promise((r) => setTimeout(r, delayMs))
    await action(...args)
    setPending(false)
  }

  return { run, pending }
}
