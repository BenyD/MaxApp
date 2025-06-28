import Link from 'next/link'
import { HomeIcon } from '@heroicons/react/24/outline'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/Button'

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-white">
      {/* Top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

      <Container className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-lg text-center">
          {/* Error Badge */}
          <div className="mb-10 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-x-3 -inset-y-2 bg-blue-50/75 blur-lg" />
              <div className="relative rounded-full bg-blue-100/80 px-4 py-1.5 text-sm font-medium text-blue-900 ring-1 ring-blue-700/10 ring-inset">
                404 Error
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="relative mb-10">
            <div className="absolute -inset-x-2 -inset-y-4 bg-blue-50/50 blur-xl" />
            <Logo className="relative mx-auto h-16 w-auto sm:h-20" />
          </div>

          {/* Content */}
          <div className="relative">
            <h1 className="bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text font-display text-4xl font-medium tracking-tight text-transparent sm:text-5xl">
              Page not found
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
              Please check the URL or navigate back to our homepage.
            </p>

            {/* Actions */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/" className="group relative w-full sm:w-auto">
                <span className="absolute -inset-x-3 -inset-y-2.5 hidden bg-white/50 blur-lg group-hover:block" />
                <span className="relative flex items-center justify-center">
                  <HomeIcon className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                  Return Home
                </span>
              </Button>
              <Button
                href="/#contact"
                variant="outline"
                className="relative w-full sm:w-auto"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom gradient line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
    </main>
  )
}
