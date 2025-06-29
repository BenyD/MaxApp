'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'

function FooterLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const fullHref = isHomePage ? href : `/${href.slice(1)}`

  return (
    <Link
      href={fullHref}
      className="inline-block rounded-lg px-2 py-1.5 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  const pathname = usePathname()
  const locale = useLocale()
  const isHomePage = pathname === '/'
  const t = useTranslations('footer')

  const navigationLinks = [
    { href: '#about', key: 'about' },
    { href: '#services', key: 'services' },
    { href: '#why-us', key: 'whyUs' },
    { href: '#projects', key: 'projects' },
    { href: '#tech-stack', key: 'techStack' },
    { href: '#contact', key: 'contact' },
  ] as const

  const legalLinks = [
    { href: 'terms-of-service', key: 'terms' },
    { href: 'privacy-policy', key: 'privacy' },
    { href: 'cookie-policy', key: 'cookies' },
  ] as const

  return (
    <footer className="bg-slate-50">
      <Container>
        <div className="py-12 sm:py-16">
          <Link href={`/${locale}`} className="mx-auto block w-fit">
            <Logo className="h-8 w-auto sm:h-10" />
          </Link>
          <nav className="mt-8 text-sm sm:mt-10" aria-label="quick links">
            <div className="-my-1 flex flex-wrap justify-center gap-x-4 gap-y-3 px-4 sm:gap-x-6">
              {navigationLinks.map(({ href, key }) => (
                <FooterLink key={key} href={href}>
                  {t(`navigation.${key}`)}
                </FooterLink>
              ))}
            </div>
          </nav>
        </div>
        <div className="flex flex-col items-center border-t border-slate-200 py-8 sm:py-10">
          <div className="flex gap-x-6">
            <Link
              href="mailto:hello@maxapp.ch"
              className="group"
              aria-label={t('social.email')}
            >
              <svg
                className="h-6 w-6 fill-slate-500 transition group-hover:fill-slate-700"
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
            </Link>
            <Link
              href="https://www.linkedin.com/company/maxapp"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label={t('social.linkedin')}
            >
              <svg
                className="h-6 w-6 fill-slate-500 transition group-hover:fill-slate-700"
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </Link>
          </div>
          <div className="mt-8 flex flex-col items-center gap-y-4 px-4 text-center sm:mt-6 sm:flex-row sm:justify-between sm:text-left">
            <p className="text-sm text-slate-500">
              {t.rich('legal.copyright', {
                year: new Date().getFullYear(),
              })}
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-x-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.key}
                  href={`/${locale}/${link.href}`}
                  className="text-sm text-slate-500 transition hover:text-slate-600"
                >
                  {t(`legal.${link.key}`)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
