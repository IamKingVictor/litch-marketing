import type { ReactNode } from "react"

export function LitchButton({
  children,
  onClick,
  secondary = false,
  className = "",
  type = "button",
}: {
  children: ReactNode
  onClick?: () => void
  secondary?: boolean
  className?: string
  type?: "button" | "submit"
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition hover:-translate-y-0.5 ${
        secondary
          ? "border border-border bg-card text-primary"
          : "bg-primary text-primary-foreground"
      } ${className}`}
    >
      {children}
    </button>
  )
}
