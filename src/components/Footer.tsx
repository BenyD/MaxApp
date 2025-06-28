'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
      className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <footer className="bg-slate-50">
      <Container>
        <div className="py-16">
          <Link href="/" className="mx-auto block w-fit">
            <Logo className="h-10 w-auto" />
          </Link>
          {isHomePage && (
            <nav className="mt-10 text-sm" aria-label="quick links">
              <div className="-my-1 flex flex-wrap justify-center gap-x-6 gap-y-3">
                <FooterLink href="#about">About</FooterLink>
                <FooterLink href="#services">Services</FooterLink>
                <FooterLink href="#why-us">Why Us</FooterLink>
                <FooterLink href="#projects">Projects</FooterLink>
                <FooterLink href="#tech-stack">Tech Stack</FooterLink>
                <FooterLink href="#contact">Contact</FooterLink>
              </div>
            </nav>
          )}
        </div>
        <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
          <div className="flex gap-x-6">
            <Link
              href="mailto:hello@maxapp.ch"
              className="group"
              aria-label="Email Maxapp"
            >
              <svg
                className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
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
              aria-label="Maxapp on LinkedIn"
            >
              <svg
                className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </Link>
          </div>
          <div className="mt-6 flex flex-col items-center gap-y-2 sm:mt-0 sm:flex-row sm:gap-x-4">
            <p className="text-sm text-slate-500">
              Copyright &copy; {new Date().getFullYear()} MaxApp. All rights
              reserved.
            </p>
            <span className="hidden text-slate-400 sm:inline">•</span>
            <Link
              href="/terms-of-service"
              className="text-sm text-slate-500 hover:text-slate-600"
            >
              Terms of Service
            </Link>
            <span className="hidden text-slate-400 sm:inline">•</span>
            <Link
              href="/privacy-policy"
              className="text-sm text-slate-500 hover:text-slate-600"
            >
              Privacy Policy
            </Link>
            <span className="hidden text-slate-400 sm:inline">•</span>
            <Link
              href="/cookie-policy"
              className="text-sm text-slate-500 hover:text-slate-600"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
