"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

export type Role = "guest" | "customer" | "seller" | "admin"

export type Session = {
  role: Role
  email?: string
  name?: string
  shopName?: string
}

const GUEST_SESSION: Session = { role: "guest" }
const STORAGE_KEY = "litch-session"
const DELETE_AT_KEY = "litch-shop-delete-at"

// Demo-only seeded accounts. There's no real backend yet, so these are the
// only credentials that can log in to an EXISTING seller/admin account.
// Signup flows are mock and always succeed (they just create a session).
// NOTE: this check runs in the browser, so it is NOT secure — fine for a
// demo, not fine once real backend auth exists.
const SELLER_DEMO_CREDENTIALS = {
  email: "vendor@gmail.com",
  password: "vendor",
}
const ADMIN_DEMO_CREDENTIALS = { email: "admin@gmail.com", password: "admin" }

type SessionContextValue = {
  session: Session
  hydrated: boolean
  loginCustomer: (email: string, name?: string) => void
  loginSeller: (email: string, password: string) => boolean
  signupSeller: (email: string, name: string, shopName: string) => void
  loginAdmin: (email: string, password: string) => boolean
  updateSession: (patch: Partial<Session>) => void
  logout: () => void
  scheduleShopDeletion: () => Date
  shopDeleteAt: Date | null
}

const SessionContext = createContext<SessionContextValue | null>(null)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>(GUEST_SESSION)
  const [hydrated, setHydrated] = useState(false)
  const [shopDeleteAt, setShopDeleteAt] = useState<Date | null>(null)

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        // Hydrate from localStorage on mount — not available during SSR,
        // so it can't be read in the initial useState.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSession(JSON.parse(raw))
      } catch {
        // ignore malformed storage
      }
    }
    const deleteAtRaw = window.localStorage.getItem(DELETE_AT_KEY)
    if (deleteAtRaw) setShopDeleteAt(new Date(deleteAtRaw))
    setHydrated(true)
  }, [])

  const persist = (next: Session) => {
    setSession(next)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const loginCustomer = (email: string, name?: string) => {
    persist({ role: "customer", email, name })
  }

  const loginSeller = (email: string, password: string) => {
    if (
      email === SELLER_DEMO_CREDENTIALS.email &&
      password === SELLER_DEMO_CREDENTIALS.password
    ) {
      persist({ role: "seller", email, shopName: "Mina Studio" })
      return true
    }
    return false
  }

  const signupSeller = (email: string, name: string, shopName: string) => {
    // Mock signup — no real backend yet, so this always succeeds.
    persist({ role: "seller", email, name, shopName })
  }

  const loginAdmin = (email: string, password: string) => {
    if (
      email === ADMIN_DEMO_CREDENTIALS.email &&
      password === ADMIN_DEMO_CREDENTIALS.password
    ) {
      persist({ role: "admin", email })
      return true
    }
    return false
  }

  const updateSession = (patch: Partial<Session>) => {
    const next = { ...session, ...patch }
    persist(next)
  }

  const logout = () => {
    persist(GUEST_SESSION)
    window.localStorage.removeItem(DELETE_AT_KEY)
    setShopDeleteAt(null)
  }

  const scheduleShopDeletion = () => {
    const deleteAt = new Date()
    deleteAt.setDate(deleteAt.getDate() + 30)
    window.localStorage.setItem(DELETE_AT_KEY, deleteAt.toISOString())
    setShopDeleteAt(deleteAt)
    return deleteAt
  }

  return (
    <SessionContext.Provider
      value={{
        session,
        hydrated,
        loginCustomer,
        loginSeller,
        signupSeller,
        loginAdmin,
        updateSession,
        logout,
        scheduleShopDeletion,
        shopDeleteAt,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error("useSession must be used inside SessionProvider")
  return ctx
}
