'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Logo } from '@/components/Logo'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import clsx from 'clsx'

// Icons
function HomeIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  )
}

function DashboardIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
      />
    </svg>
  )
}

function SubmissionsIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const t = useTranslations('admin.dashboard')
  const pathname = usePathname()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const supabase = createClient()

  // Check if the current path is a login page (handles all locale variations)
  const isLoginPage = pathname.endsWith('/admin/login')

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()
        if (error) throw error

        setIsAuthenticated(!!session)
        if (session?.user?.email) {
          setUser({ email: session.user.email })
        }

        if (!session && !isLoginPage) {
          router.push('/admin/login')
          return
        }
      } catch (error) {
        console.error('Error checking auth status:', error)
        if (!isLoginPage) {
          router.push('/admin/login')
        }
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router, supabase, pathname, isLoginPage])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // If we're on the login page, render it without the admin layout
  if (isLoginPage) {
    return <div className="min-h-screen">{children}</div>
  }

  const navigation = [
    { name: t('overview'), href: '/admin/dashboard', icon: DashboardIcon },
    {
      name: t('submissions'),
      href: '/admin/submissions',
      icon: SubmissionsIcon,
    },
  ]

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/admin/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center border-b border-zinc-200 px-6">
        <Logo className="h-8 w-auto" />
      </div>

      <nav className="flex flex-1 flex-col px-6 py-6">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          {/* Main Navigation */}
          <li>
            <div className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
              Navigation
            </div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={clsx(
                        'group flex gap-x-3 rounded-lg p-2 text-sm leading-6 font-medium',
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-zinc-700 hover:bg-zinc-50 hover:text-blue-600',
                      )}
                    >
                      <item.icon />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>

          {/* Bottom Links */}
          <li className="mt-auto space-y-4">
            {/* Back to Home */}
            <div className="h-px bg-zinc-200" />
            <Link
              href="/"
              className="group flex gap-x-3 rounded-lg p-2 text-sm leading-6 font-medium text-zinc-700 hover:bg-zinc-50 hover:text-blue-600"
            >
              <HomeIcon />
              Back to Home
            </Link>

            {/* User Profile */}
            <div className="relative mt-2">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex w-full items-center gap-x-4 rounded-lg px-2 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <UserIcon />
                </div>
                <div className="flex min-w-0 flex-1 flex-col items-start">
                  <p className="text-sm font-medium text-zinc-900">
                    {user?.email}
                  </p>
                  <p className="text-xs text-zinc-500">Administrator</p>
                </div>
              </button>

              {/* User Menu */}
              <Transition
                show={showUserMenu}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div className="absolute right-0 bottom-full left-0 z-10 mb-1 origin-bottom rounded-lg bg-white py-1 shadow-lg ring-1 ring-zinc-900/5">
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-x-3 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                  >
                    <LogoutIcon />
                    {t('signOut')}
                  </button>
                </div>
              </Transition>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  )

  return (
    <div className="relative isolate flex min-h-screen w-full bg-white lg:bg-zinc-100">
      {/* Desktop sidebar */}
      <div className="fixed inset-y-0 left-0 hidden w-72 overflow-y-auto border-r border-zinc-200 bg-white lg:block">
        <SidebarContent />
      </div>

      {/* Mobile sidebar */}
      <Transition.Root show={isSidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setIsSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-zinc-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="absolute top-0 left-full flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5 text-white"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Mobile sidebar content */}
                <div className="flex grow flex-col overflow-y-auto bg-white">
                  <SidebarContent />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col lg:pl-72">
        {/* Top header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-zinc-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-zinc-700 lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-2xl font-semibold text-zinc-900">
              {pathname.endsWith('/dashboard')
                ? t('overview')
                : pathname.endsWith('/submissions')
                  ? t('submissions')
                  : t('title')}
            </h1>
            <div className="flex items-center gap-x-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-zinc-900/5">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
