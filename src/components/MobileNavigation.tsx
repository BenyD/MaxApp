'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Popover } from '@headlessui/react'
import clsx from 'clsx'
import { LanguageSwitcher } from './LanguageSwitcher'

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0',
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0',
        )}
      />
    </svg>
  )
}

function MobileNavLink({
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
    <Popover.Button as={Link} href={fullHref} className="block w-full p-2">
      {children}
    </Popover.Button>
  )
}

export function MobileNavigation() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Popover.Overlay className="fixed inset-0 bg-slate-300/50 backdrop-blur-sm" />
      <Popover.Panel className="absolute inset-x-4 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5">
        <div className="p-4">
          {isHomePage && (
            <>
              <MobileNavLink href="#about">About</MobileNavLink>
              <MobileNavLink href="#services">Services</MobileNavLink>
              <MobileNavLink href="#why-us">Why Us</MobileNavLink>
              <MobileNavLink href="#projects">Projects</MobileNavLink>
              <MobileNavLink href="#tech-stack">Tech Stack</MobileNavLink>
              <hr className="my-4 border-slate-200" />
            </>
          )}
          <MobileNavLink href={isHomePage ? '#contact' : '/#contact'}>
            Contact
          </MobileNavLink>
        </div>
        <div className="border-t border-slate-200">
          <LanguageSwitcher variant="mobile" />
        </div>
      </Popover.Panel>
    </Popover>
  )
}
