'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export function ContentLayout({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <>
      <Header />
      <main className={`flex-auto ${className}`}>{children}</main>
      <Footer />
    </>
  )
}
