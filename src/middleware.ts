import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales } from './i18n/config'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next()
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
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
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
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    },
  )

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession()

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
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = request.cookies.get('NEXT_LOCALE')?.value || 'en'

    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
