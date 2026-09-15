import type { Metadata } from "next"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Litch Marketing's terms and conditions for buyers, sellers and service providers.",
  alternates: { canonical: `${SITE_URL}/terms` },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children
}
