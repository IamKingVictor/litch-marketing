export function Logo({
  variant = "default",
  className = "",
}: {
  variant?: "default" | "inverted"
  className?: string
}) {
  const inverted = variant === "inverted"
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span
        className={`flex size-8 items-center justify-center rounded-lg font-heading text-lg font-bold ${
          inverted
            ? "bg-gold text-primary"
            : "bg-primary text-primary-foreground"
        }`}
      >
        L
      </span>
      <span
        className={`font-heading text-xl font-bold tracking-tight ${
          inverted ? "text-white" : ""
        }`}
      >
        litch
      </span>
    </div>
  )
}
