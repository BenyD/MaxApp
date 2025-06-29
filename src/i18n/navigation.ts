import { createNavigation } from 'next-intl/navigation'
import { locales } from './settings'

export const pathnames = {
  '/': '/',
  '/cookie-policy': '/cookie-policy',
  '/privacy-policy': '/privacy-policy',
  '/terms-of-service': '/terms-of-service',
}

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  pathnames,
})

export const { getPathname } = createNavigation({
  locales,
  pathnames,
})
