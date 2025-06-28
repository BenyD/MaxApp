'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLink } from '@/components/NavLink'

function MobileNavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <PopoverButton as={Link} href={href} className="block w-full p-2">
      {children}
    </PopoverButton>
  )
}

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

function MobileNavigation() {
  return (
    <Popover>
      <PopoverButton
        className="relative z-10 flex h-8 w-8 items-center justify-center focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 bg-slate-300/50 backdrop-blur-sm duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
      />
      <PopoverPanel
        transition
        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 data-closed:scale-95 data-closed:opacity-0 data-enter:duration-150 data-enter:ease-out data-leave:duration-100 data-leave:ease-in"
      >
        <MobileNavLink href="#about">About</MobileNavLink>
        <MobileNavLink href="#services">Services</MobileNavLink>
        <MobileNavLink href="#why-us">Why Us</MobileNavLink>
        <MobileNavLink href="#projects">Projects</MobileNavLink>
        <MobileNavLink href="#tech-stack">Tech Stack</MobileNavLink>
        <hr className="m-2 border-slate-300/40" />
        <MobileNavLink href="#contact">Contact</MobileNavLink>
      </PopoverPanel>
    </Popover>
  )
}

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  const updateProgress = useCallback(() => {
    // Get the full scroll height (including overflow)
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight,
    )

    // Calculate visible height
    const windowHeight = window.innerHeight

    // Calculate max scrollable distance
    const scrollable = docHeight - windowHeight

    // Get current scroll position with bounds check
    const scrolled = Math.min(Math.max(window.scrollY, 0), scrollable)

    // Calculate progress percentage
    const progress = (scrolled / scrollable) * 100

    // Update state with requestAnimationFrame for smooth updates
    requestAnimationFrame(() => {
      setProgress(progress)
    })
  }, [])

  useEffect(() => {
    // Initial progress check
    updateProgress()

    // Add scroll event listener with passive option for better performance
    window.addEventListener('scroll', updateProgress, { passive: true })

    // Add resize listener to handle dynamic content changes
    window.addEventListener('resize', updateProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [updateProgress])

  return (
    <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden bg-gray-100">
      <div
        className="h-full w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 transition-transform duration-150 ease-out will-change-transform"
        style={{
          transform: `translateX(${progress - 100}%)`,
          transition: 'transform 150ms ease-out',
        }}
      />
    </div>
  )
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 0)
  }, [])

  useEffect(() => {
    handleScroll() // Check initial scroll position
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-sm transition-all duration-300',
        isScrolled && 'shadow-sm',
      )}
    >
      <Container className="py-4 sm:py-6">
        <nav className="relative z-50 flex items-center justify-between">
          <div className="flex items-center gap-x-8 md:gap-x-12">
            <Link href="#" aria-label="Home" className="flex-shrink-0">
              <Logo className="h-6 w-auto sm:h-8" />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink href="#about">About</NavLink>
              <NavLink href="#services">Services</NavLink>
              <NavLink href="#why-us">Why Us</NavLink>
              <NavLink href="#projects">Projects</NavLink>
              <NavLink href="#tech-stack">Tech Stack</NavLink>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <Button href="#contact" color="blue" className="hidden sm:block">
              Contact Us
            </Button>
            <div className="sm:-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
      <ScrollProgressBar />
    </header>
  )
}
