import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { use } from 'react'

import '@/styles/tailwind.css'
import { CookieBanner } from '@/components/CookieBanner'
import { locales, isValidLocale } from '@/i18n/settings'

export const metadata: Metadata = {
  title: {
    template: '%s - Maxapp',
    default: 'Maxapp - Custom Software Solutions for Your Business',
  },
  description:
    'We design and develop custom web apps, websites, and digital tools—robust, scalable, and crafted to meet real business needs.',
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = use(params)

  if (!isValidLocale(locale)) {
    notFound()
  }

  const messages = use(getMessages({ locale }))

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
      <CookieBanner />
    </NextIntlClientProvider>
  )
}
