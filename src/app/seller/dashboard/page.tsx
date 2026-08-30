export default function SellerOverviewPage() {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold">Good morning</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          ["Sales this month", "$8,420"],
          ["Orders", "34"],
          ["Views", "2,481"],
        ].map(([a, b]) => (
          <div key={a} className="rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">{a}</p>
            <p className="mt-2 font-heading text-2xl font-bold">{b}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
