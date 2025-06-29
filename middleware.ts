import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './src/i18n/settings'

// Get all public pages that should be internationalized
const publicPages = [
  '/',
  '/cookie-policy',
  '/privacy-policy',
  '/terms-of-service',
]

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  defaultLocale,
  localePrefix: 'always',

  // Domains can be used to configure locale-specific domains
  // domains: [
  //   {
  //     domain: 'maxapp.ch',
  //     defaultLocale: 'de',
  //   },
  //   {
  //     domain: 'maxapp.com',
  //     defaultLocale: 'en',
  //   },
  // ],
})

// The middleware is used to redirect users to their preferred locale
// and to ensure that all pages are properly localized.
export const config = {
  matcher: [
    // Match all paths except for:
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /_vercel (Vercel internals)
    // - /images, /videos (static files)
    // - /favicon.ico, /robots.txt (static files)
    '/((?!api|_next|_vercel|images|videos|favicon.ico|robots.txt).*)',
  ],
}
 