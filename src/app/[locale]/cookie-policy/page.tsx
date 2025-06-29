'use client'

import { useTranslations } from 'next-intl'
import { Container } from '@/components/Container'
import { ContentLayout } from '@/components/ContentLayout'
import { Button } from '@/components/Button'

function CookieSection({
  title,
  children,
  className = '',
  id,
}: {
  title: string
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <section className={`space-y-4 ${className}`} id={id}>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      {children}
    </section>
  )
}

function UpdatePreferencesButton({ t }: { t: any }) {
  const cookieBanner = useTranslations('cookieBanner')
  return (
    <Button
      onClick={(e) => {
        e.preventDefault()
        const event = new CustomEvent('openCookiePreferences')
        window.dispatchEvent(event)
      }}
    >
      {cookieBanner('preferences.save')}
    </Button>
  )
}

export default function CookiePolicy() {
  const t = useTranslations('policies.cookies')
  const common = useTranslations('policies')

  return (
    <ContentLayout>
      <div className="relative overflow-hidden bg-white pt-24 pb-16 sm:pt-32 sm:pb-24">
        {/* Background decorative elements */}
        <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-slate-50">
          <svg
            className="absolute inset-0 h-full w-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-slate-200"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="grid-pattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
                x="50%"
                y="-1"
              >
                <path d="M.5 40V.5H40" fill="none" />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              strokeWidth="0"
              fill="url(#grid-pattern)"
            />
          </svg>
        </div>

        <Container className="relative">
          {/* Header section */}
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                {t('title')}
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                {common.rich('lastUpdated', {
                  date: new Date('2024-01-01').toLocaleDateString('en-US', {
                    month: 'numeric',
                    day: 'numeric',
                    year: 'numeric',
                  }),
                })}
              </p>
            </div>

            {/* Table of contents */}
            <div className="mt-12 rounded-2xl bg-slate-50 px-8 py-6">
              <h2 className="text-lg font-semibold text-slate-900">
                {common('contents')}
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#what-are-cookies" className="hover:text-blue-600">
                    {t('sections.whatAreCookies.title')}
                  </a>
                </li>
                <li>
                  <a href="#types-of-cookies" className="hover:text-blue-600">
                    {t('sections.typesOfCookies.title')}
                  </a>
                </li>
                <li>
                  <a href="#your-rights" className="hover:text-blue-600">
                    {t('sections.yourRights.title')}
                  </a>
                </li>
                <li>
                  <a href="#how-to-control" className="hover:text-blue-600">
                    {t('sections.howToControl.title')}
                  </a>
                </li>
                <li>
                  <a href="#contact-us" className="hover:text-blue-600">
                    {t('sections.contactUs.title')}
                  </a>
                </li>
                <li>
                  <a href="#updates" className="hover:text-blue-600">
                    {t('sections.updates.title')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Main content */}
            <div className="prose prose-slate mt-16 space-y-12">
              <CookieSection
                title={t('sections.whatAreCookies.title')}
                id="what-are-cookies"
              >
                <p className="text-slate-600">
                  {t('sections.whatAreCookies.content')}
                </p>
              </CookieSection>

              <CookieSection
                title={t('sections.typesOfCookies.title')}
                id="types-of-cookies"
              >
                <div className="mt-8 space-y-8">
                  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                    <h3 className="font-semibold text-slate-900">
                      {t('sections.typesOfCookies.essential.title')}
                    </h3>
                    <p className="mt-2 text-slate-600">
                      {t('sections.typesOfCookies.essential.content')}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                    <h3 className="font-semibold text-slate-900">
                      {t('sections.typesOfCookies.analytics.title')}
                    </h3>
                    <p className="mt-2 text-slate-600">
                      {t('sections.typesOfCookies.analytics.content')}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                    <h3 className="font-semibold text-slate-900">
                      {t('sections.typesOfCookies.marketing.title')}
                    </h3>
                    <p className="mt-2 text-slate-600">
                      {t('sections.typesOfCookies.marketing.content')}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                    <h3 className="font-semibold text-slate-900">
                      {t('sections.typesOfCookies.preferences.title')}
                    </h3>
                    <p className="mt-2 text-slate-600">
                      {t('sections.typesOfCookies.preferences.content')}
                    </p>
                  </div>
                </div>
              </CookieSection>

              <CookieSection
                title={t('sections.yourRights.title')}
                id="your-rights"
              >
                <p className="text-slate-600">
                  {t('sections.yourRights.content')}
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
                  {(t.raw('sections.yourRights.items') as string[]).map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    ),
                  )}
                </ul>
                <div className="mt-8 flex justify-center">
                  <UpdatePreferencesButton t={t} />
                </div>
              </CookieSection>

              <CookieSection
                title={t('sections.howToControl.title')}
                id="how-to-control"
              >
                <p className="text-slate-600">
                  {t('sections.howToControl.content')}
                </p>
              </CookieSection>

              <CookieSection
                title={t('sections.contactUs.title')}
                id="contact-us"
              >
                <p className="text-slate-600">
                  {t('sections.contactUs.content')}
                </p>
              </CookieSection>

              <CookieSection title={t('sections.updates.title')} id="updates">
                <p className="text-slate-600">
                  {t('sections.updates.content')}
                </p>
              </CookieSection>
            </div>
          </div>
        </Container>
      </div>
    </ContentLayout>
  )
}
