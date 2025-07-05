import createIntlMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { locales, defaultLocale } from './src/i18n/settings'

// Get all public pages that should be internationalized
const publicPages = [
  '/',
  '/cookie-policy',
  '/privacy-policy',
  '/terms-of-service',
]

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
})

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Create a Supabase client configured to use cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    },
  )

  // Check auth status for admin routes
  const isAdminRoute = pathname.includes('/admin')
  const isLoginPage = pathname.endsWith('/admin/login')

  if (isAdminRoute) {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // If not logged in and trying to access admin page (except login), redirect to login
    if (!session && !isLoginPage) {
      const locale = pathname.split('/')[1]
      return NextResponse.redirect(
        new URL(`/${locale}/admin/login`, request.url),
      )
    }

    // If logged in and trying to access login page, redirect to dashboard
    if (session && isLoginPage) {
      const locale = pathname.split('/')[1]
      return NextResponse.redirect(
        new URL(`/${locale}/admin/dashboard`, request.url),
      )
    }
  }

  // Handle i18n routing
  return intlMiddleware(request)
}

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
