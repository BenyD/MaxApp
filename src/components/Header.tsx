'use client'

import { Fragment, useState, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { HashLink } from '@/components/HashLink'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Link } from '@/i18n/navigation'
import clsx from 'clsx'

export function Header() {
  const t = useTranslations('navigation')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const calculateScrollProgress = useCallback(() => {
    const scrollPosition = window.scrollY
    const docHeight = document.documentElement.scrollHeight
    const winHeight = window.innerHeight
    const scrollableHeight = docHeight - winHeight
    const scrollPercentage = (scrollPosition / scrollableHeight) * 100
    return Math.min(100, Math.max(0, scrollPercentage))
  }, [])

  useEffect(() => {
    let rafId: number
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }

      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        setScrolled(currentScrollY > 0)

        if (Math.abs(currentScrollY - lastScrollY) > 1) {
          setScrollProgress(calculateScrollProgress())
          lastScrollY = currentScrollY
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    setScrollProgress(calculateScrollProgress())

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [calculateScrollProgress])

  const navigationLinks = [
    { href: '#about', key: 'about' },
    { href: '#services', key: 'services' },
    { href: '#why-us', key: 'whyUs' },
    { href: '#projects', key: 'projects' },
    { href: '#tech-stack', key: 'techStack' },
  ] as const

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 backdrop-blur transition-all duration-300',
        scrolled
          ? 'bg-white/95 py-5 shadow-sm'
          : 'bg-transparent py-6 sm:py-10',
      )}
    >
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-blue-600 transition-transform duration-300 ease-out"
        style={{
          width: '100%',
          transform: `translateX(${scrollProgress - 100}%)`,
        }}
      />
      <Container>
        <nav className="relative z-50 flex items-center justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="/" aria-label="Home">
              <Logo
                className={clsx(
                  'w-auto transition-all duration-300',
                  scrolled ? 'h-9 sm:h-11' : 'h-8 sm:h-10',
                )}
              />
            </Link>
            <div className="hidden md:flex md:gap-x-8">
              {navigationLinks.map(({ href, key }) => (
                <HashLink
                  key={key}
                  href={href}
                  className={clsx(
                    'transition-all duration-300',
                    scrolled ? 'text-base' : 'text-sm',
                  )}
                >
                  {t(key)}
                </HashLink>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <div className="hidden md:block">
              <Button
                href="#contact"
                color="blue"
                className={clsx(
                  'transition-all duration-300',
                  scrolled ? 'text-base' : 'text-sm',
                )}
              >
                {t('contact')}
              </Button>
            </div>
            <div className="-mr-1 md:hidden">
              <button
                type="button"
                className="relative z-10 inline-flex items-center justify-center rounded-lg stroke-slate-900 p-2.5 hover:bg-slate-100 hover:stroke-slate-600 active:stroke-slate-900 [&:not(:focus-visible)]:focus:outline-none"
                aria-label="Toggle site navigation"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>
      </Container>

      <Transition show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="md:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-50 bg-slate-300/50 backdrop-blur" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
          >
            <Dialog.Panel className="fixed inset-x-0 top-0 z-50 min-h-screen overflow-y-auto bg-white pb-6 shadow-lg">
              <div className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
                <div className="flex items-center justify-between">
                  <Link href="/" aria-label="Home">
                    <Logo className="h-8 w-auto" />
                  </Link>
                  <button
                    type="button"
                    className="relative z-10 -m-2 rounded-lg stroke-slate-900 p-2 hover:bg-slate-100 hover:stroke-slate-600 active:stroke-slate-900 [&:not(:focus-visible)]:focus:outline-none"
                    aria-label="Close site navigation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <nav className="mt-6 px-4 sm:px-6">
                <div className="divide-y divide-slate-100">
                  <div className="space-y-1 pb-6">
                    {navigationLinks.map(({ href, key }) => (
                      <HashLink
                        key={key}
                        href={href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      >
                        {t(key)}
                      </HashLink>
                    ))}
                  </div>
                  <div className="py-6">
                    <div className="mb-4">
                      <LanguageSwitcher variant="mobile" />
                    </div>
                    <Button
                      href="#contact"
                      color="blue"
                      className="w-full justify-center py-2.5 text-base"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('contact')}
                    </Button>
                  </div>
                </div>
              </nav>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </header>
  )
}
