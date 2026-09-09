import { Analytics } from "@vercel/analytics/next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/toast"
import { SessionProvider } from "@/lib/session-context"
import { CartProvider } from "@/lib/cart-context"
import { WishlistProvider } from "@/lib/wishlist-context"
import { HeroSlidesProvider } from "@/lib/hero-slides-context"
import { DemoModeBanner } from "@/components/litch/demo-mode-banner"
import { ThemeProvider } from "@/lib/theme-context"
import { SITE_DESCRIPTION, SITE_NAME, SITE_TWITTER, SITE_URL } from "@/lib/site"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Good things, well made`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: [
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Good things, well made`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE_TWITTER,
    title: `${SITE_NAME} — Good things, well made`,
    description: SITE_DESCRIPTION,
    images: ["/og-default.jpg"],
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
        <script
          type="application/ld+json"
          // Organization-level schema for the marketplace itself. Each shop
          // page additionally emits its own LocalBusiness schema — see
          // src/app/(shop)/shops/[shopSlug]/page.tsx.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}/brand/logo.jpg`,
              description: SITE_DESCRIPTION,
            }),
          }}
        />
        <DemoModeBanner />
        <ThemeProvider>
          <SessionProvider>
            <CartProvider>
              <WishlistProvider>
                <HeroSlidesProvider>
                  <Toaster>{children}</Toaster>
                </HeroSlidesProvider>
              </WishlistProvider>
            </CartProvider>
          </SessionProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
