// Central place for the values that go into <title>, <meta>, canonical
// URLs, and JSON-LD across the app, so page-level metadata stays consistent
// without hardcoding the domain/name in every route file.
//
// Set NEXT_PUBLIC_SITE_URL in your deployment env (e.g. Vercel project
// settings) once you have a production domain. It falls back to a
// placeholder locally so builds don't fail, but canonical/OG URLs will be
// wrong until it's set for real.
export const SITE_NAME = "Litch Marketing"
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.litchmarketing.com"
export const SITE_DESCRIPTION =
  "Litch Marketing is a multivendor marketplace connecting shoppers with trusted independent stores — browse curated categories, shop by vendor, and check out securely in one place."
export const SITE_TWITTER = "@litchmarketing"
