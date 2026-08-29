import { academyCourses } from "@/lib/mock-data"
import { LitchButton } from "../button"

export function Academy() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-10">
      <div className="rounded-2xl bg-primary p-8 text-primary-foreground md:p-12">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-gold">
          Litch Academy
        </p>
        <h1 className="mt-4 max-w-xl font-heading text-4xl font-bold">
          Learn the things that help your shop grow.
        </h1>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {academyCourses.map((c, i) => (
          <div key={c} className="rounded-xl border bg-card p-5">
            <div className="flex aspect-video items-end rounded-lg bg-secondary p-4 font-heading text-xl font-bold text-primary">
              0{i + 1}
            </div>
            <h2 className="mt-4 font-heading font-bold">{c}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A practical, friendly course from people who have done it.
            </p>
            <LitchButton secondary className="mt-4">
              View course
            </LitchButton>
          </div>
        ))}
      </div>
    </main>
  )
}
