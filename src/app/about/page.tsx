import Link from "next/link"
import { ArrowLeft, Sparkles, Target, Users, Quote } from "lucide-react"

const pillars = [
  {
    icon: <Target size={18} />,
    title: "Our mission",
    text: "To help small makers and thoughtful brands reach people who value quality, authenticity, and design.",
  },
  {
    icon: <Sparkles size={18} />,
    title: "Our vision",
    text: "To build a better local marketplace where discovery feels personal, thoughtful, and easy to trust.",
  },
  {
    icon: <Users size={18} />,
    title: "Our community",
    text: "We believe great products grow when people support independent makers, artisans, and founders.",
  },
]

const testimonials = [
  "Litch helped me discover brands I’d never have found locally — the experience feels intentional and human.",
  "It’s the first marketplace that feels like a curated neighborhood, not a crowded warehouse.",
  "I love how easy it is to support small businesses while still finding premium products.",
]

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-6">
      <Link
        href="/profile"
        className="mb-5 flex items-center gap-2 text-sm font-bold"
      >
        <ArrowLeft size={16} /> About us
      </Link>

      <div className="rounded-2xl border bg-card p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-muted-foreground">
          Our story
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold">
          Good things, well made.
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Litch is a marketplace designed to spotlight independent brands,
          carefully crafted products, and meaningful everyday essentials. We
          help customers discover stores and makers they can trust, while giving
          small businesses a more engaging and modern space to grow.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {pillars.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border bg-background p-4"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary">
                {item.icon}
              </span>
              <h2 className="mt-4 font-heading text-lg font-bold">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="font-heading text-2xl font-bold">What people say</h2>
          <div className="mt-4 space-y-4">
            {testimonials.map((quote, index) => (
              <div
                key={index}
                className="rounded-xl border bg-background p-4 text-sm leading-6 text-muted-foreground"
              >
                <Quote size={16} className="mb-2 text-gold-600" />“{quote}”
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
