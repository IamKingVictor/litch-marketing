import { Analytics } from "@vercel/analytics/next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/toast"
import { SessionProvider } from "@/lib/session-context"
import { CartProvider } from "@/lib/cart-context"
import { HeroSlidesProvider } from "@/lib/hero-slides-context"
import { DemoModeBanner } from "@/components/litch/demo-mode-banner"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
})

export const metadata: Metadata = {
  title: "Litch — Good things, well made",
  description:
    "A thoughtful marketplace for independent makers and modern shoppers.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <DemoModeBanner />
        <SessionProvider>
          <CartProvider>
            <HeroSlidesProvider>
              <Toaster>{children}</Toaster>
            </HeroSlidesProvider>
          </CartProvider>
        </SessionProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
