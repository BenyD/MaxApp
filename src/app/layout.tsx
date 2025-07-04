import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { locales } from '@/i18n/config'
import '@/styles/tailwind.css'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: {
      template: `%s | ${t('title')}`,
      default: t('title'),
    },
    description: t('description'),
  }
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  return (
    <html lang={locale} className="h-full scroll-smooth antialiased">
      <body className={`${inter.className} flex h-full flex-col`}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
