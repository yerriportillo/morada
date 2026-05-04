import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n'

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches (Spanish-first)
  defaultLocale,

  // Don't redirect if locale is in the URL
  localePrefix: 'always',
})

export const config = {
  // Match only internationalized pathnames
  // Skip API routes, static files, and Payload admin
  matcher: ['/', '/(es|en)/:path*', '/((?!api|_next|_vercel|admin|.*\\..*).*)'],
}
