'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { LanguageSwitcher } from './LanguageSwitcher'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'

function MobileNavIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <motion.path
        d="M0 1H14M0 7H14M0 13H14"
        className="origin-center"
        animate={{
          scale: isOpen ? 0.9 : 1,
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.path
        d="M2 2L12 12M12 2L2 12"
        className="origin-center"
        animate={{
          scale: !isOpen ? 0.9 : 1,
          opacity: !isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      />
    </svg>
  )
}

const menuVariants: Variants = {
  closed: {
    opacity: 0,
    y: -8,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0, 0, 0.2, 1],
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
}

const menuItemVariants: Variants = {
  closed: {
    opacity: 0,
    x: -16,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0, 0, 0.2, 1],
    },
  },
}

const overlayVariants: Variants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0, 0, 0.2, 1],
    },
  },
}

export function MobileNavigation() {
  const pathname = usePathname()
  const locale = useLocale()
  const isHomePage = pathname === `/${locale}`
  const [isOpen, setIsOpen] = useState(false)

  // Close menu when pathname changes
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false)
    }
  }, [pathname, isOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuItems = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#why-us', label: 'Why Us' },
    { href: '#projects', label: 'Projects' },
    { href: '#tech-stack', label: 'Tech Stack' },
  ]

  return (
    <div className="relative z-50">
      <button
        className={clsx(
          'relative z-10 flex h-8 w-8 items-center justify-center rounded-md',
          'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none',
          'hover:bg-slate-100 active:bg-slate-200',
          'transition-colors duration-200',
        )}
        onClick={toggleMenu}
        aria-label="Toggle Navigation"
        aria-expanded={isOpen}
      >
        <MobileNavIcon isOpen={isOpen} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm"
              onClick={toggleMenu}
              aria-hidden="true"
            />

            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className={clsx(
                'absolute inset-x-4 top-full mt-4 origin-top overflow-hidden',
                'rounded-2xl bg-white text-lg tracking-tight text-slate-900',
                'shadow-xl ring-1 ring-slate-900/5',
              )}
            >
              <motion.div className="p-4">
                {isHomePage ? (
                  <>
                    {menuItems.map((item) => (
                      <motion.div key={item.href} variants={menuItemVariants}>
                        <Link
                          href={item.href}
                          className={clsx(
                            'block w-full rounded-lg p-2',
                            'hover:bg-slate-50 active:bg-slate-100',
                            'transition-colors duration-200',
                          )}
                          onClick={toggleMenu}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                    <motion.hr
                      variants={menuItemVariants}
                      className="my-4 border-slate-200"
                    />
                  </>
                ) : (
                  <motion.div variants={menuItemVariants}>
                    <Link
                      href={`/${locale}`}
                      className={clsx(
                        'block w-full rounded-lg p-2',
                        'hover:bg-slate-50 active:bg-slate-100',
                        'transition-colors duration-200',
                      )}
                      onClick={toggleMenu}
                    >
                      Home
                    </Link>
                  </motion.div>
                )}
                <motion.div variants={menuItemVariants}>
                  <Link
                    href={isHomePage ? '#contact' : `/${locale}#contact`}
                    className={clsx(
                      'block w-full rounded-lg p-2',
                      'hover:bg-slate-50 active:bg-slate-100',
                      'transition-colors duration-200',
                    )}
                    onClick={toggleMenu}
                  >
                    Contact
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                variants={menuItemVariants}
                className="border-t border-slate-200"
              >
                <LanguageSwitcher variant="mobile" />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
