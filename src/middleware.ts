import { NextResponse, NextRequest } from 'next/server'

// Fallback only — used until the `default_lang_code` cookie is set (e.g. a
// visitor's very first ever request). Real value is admin-configured
// (system languages `is_default`) and synced into that cookie client-side
// once Layout.tsx resolves it (see utils/langCookie.ts). Edge middleware
// runs in a separate runtime/isolate from the Node app, so it can't share
// the module-level value the rest of the app uses — the cookie is the one
// thing both sides can read.
const FALLBACK_LOCALE = 'en'
const LOCALE_RE = /^\/([a-z]{2}(?:-[A-Z]{2})?)(?:\/|$)/

// Paths (without locale prefix) that require auth
const PRIVATE_PATHS = [
  '/my-profile',
  '/account-security',
  '/notifications',
  '/wishlist',
  '/my-bookings',
  '/my-vouchers',
  '/referral-earn',
  '/transactions',
  '/delete-account',
  '/confirm-booking'
]

function isPrivatePath(pathWithoutLocale: string) {
  return PRIVATE_PATHS.some(
    (p) => pathWithoutLocale === p || pathWithoutLocale.startsWith(`${p}/`)
  )
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const DEFAULT_LOCALE = request.cookies.get('default_lang_code')?.value || FALLBACK_LOCALE
  const localeMatch = pathname.match(LOCALE_RE)

  let locale: string
  let pathWithoutLocale: string
  let rewriteUrl: URL | null = null

  if (localeMatch) {
    locale = localeMatch[1]

    // Default locale must never appear in the URL — redirect it away
    if (locale === DEFAULT_LOCALE) {
      const url = request.nextUrl.clone()
      url.pathname = pathname.slice(locale.length + 1) || '/'
      return NextResponse.redirect(url, 308)
    }

    pathWithoutLocale = pathname.slice(locale.length + 1) || '/'
  } else {
    // No locale prefix: cookie preference decides if we need a visible prefix
    const preferredLocale = request.cookies.get('lang_code')?.value || DEFAULT_LOCALE
    pathWithoutLocale = pathname

    if (preferredLocale !== DEFAULT_LOCALE) {
      const url = request.nextUrl.clone()
      url.pathname = `/${preferredLocale}${pathname === '/' ? '' : pathname}`
      url.search = search
      return NextResponse.redirect(url, 307)
    }

    // Default locale: rewrite internally to /en/... without changing the visible URL
    locale = DEFAULT_LOCALE
    rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`
  }

  if (isPrivatePath(pathWithoutLocale)) {
    const authToken = request.cookies.get('token')?.value
    if (!authToken) {
      const homeUrl = request.nextUrl.clone()
      homeUrl.pathname = locale === DEFAULT_LOCALE ? '/' : `/${locale}`
      homeUrl.search = ''
      return NextResponse.redirect(homeUrl)
    }
  }

  return rewriteUrl ? NextResponse.rewrite(rewriteUrl) : NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|offline|confirm-booking|.*\\..*).*)'],
}
