import { ArrowRight } from "lucide-react"
import type { View } from "@/lib/types"
import { categories, products as initialProducts } from "@/lib/mock-data"
import { LitchButton } from "../button"
import { ProductGrid } from "../product-grid"
import { Footer } from "../footer"

export function Home({ go }: { go: (v: View) => void }) {
  return (
    <>
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-6 md:px-10">
        <button
          onClick={() => go("seller-signup")}
          className="flex items-center justify-between rounded-lg bg-primary px-4 py-3 text-left text-primary-foreground"
        >
          <span>
            <b className="block">Open your Store Portal</b>
            <small className="text-primary-foreground/70">
              Manage products, orders and sales
            </small>
          </span>
          <ArrowRight size={18} />
        </button>
        <section className="grid gap-5 md:grid-cols-[1.45fr_1fr]">
          <div className="rounded-2xl bg-[#dbe5e7] p-7">
            <span className="text-xs font-bold uppercase tracking-[.2em] text-primary">
              The weekend edit
            </span>
            <h1 className="mt-3 max-w-md font-heading text-4xl font-bold leading-tight text-primary">
              Make space for better things.
            </h1>
            <p className="mt-3 text-sm text-primary/70">
              Thoughtful finds from independent makers.
            </p>
            <LitchButton onClick={() => go("products")} className="mt-6">
              Shop the edit <ArrowRight size={15} />
            </LitchButton>
          </div>
          <div className="rounded-2xl bg-gold p-7 text-primary">
            <span className="text-xs font-bold uppercase tracking-[.2em]">
              Litch academy
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold">
              Learn. Build. Belong.
            </h2>
            <p className="mt-3 text-sm text-primary/70">
              Practical lessons for your next chapter.
            </p>
            <button
              onClick={() => go("academy")}
              className="mt-6 flex items-center gap-2 text-sm font-bold"
            >
              Explore courses <ArrowRight size={15} />
            </button>
          </div>
        </section>
        <section>
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-heading text-2xl font-bold">
              Shop by category
            </h2>
            <button
              onClick={() => go("products")}
              className="text-sm font-bold text-primary"
            >
              View all
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
            {categories.slice(1).map((cat, i) => (
              <button
                key={cat}
                onClick={() => go("products")}
                className="group overflow-hidden rounded-xl border bg-card text-left"
              >
                <div
                  className={`flex aspect-square items-end bg-secondary p-3 font-heading text-sm font-bold text-primary transition group-hover:bg-gold ${
                    [
                      "bg-[#e7d9d1]",
                      "bg-[#d9e4d9]",
                      "bg-[#e6ded0]",
                      "bg-[#d6e1e9]",
                      "bg-[#ead7df]",
                    ][i]
                  }`}
                >
                  {cat}
                </div>
              </button>
            ))}
          </div>
        </section>
        <section>
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-heading text-2xl font-bold">Fresh finds</h2>
            <button
              onClick={() => go("products")}
              className="text-sm font-bold text-primary"
            >
              See all
            </button>
          </div>
          <ProductGrid items={initialProducts.slice(0, 4)} go={go} />
        </section>
      </main>
      <Footer />
    </>
  )
}
