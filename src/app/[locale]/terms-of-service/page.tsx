'use client'

import { Container } from '@/components/Container'
import { ContentLayout } from '@/components/ContentLayout'
import { useTranslations } from 'next-intl'

function TermsSection({
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

export default function TermsOfService() {
  const t = useTranslations('policies')
  const tTerms = useTranslations('policies.terms')
  const tSections = useTranslations('policies.terms.sections')

  const formattedDate = new Date('2024-01-01').toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  })

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
                {tTerms('title')}
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                {t('lastUpdated', { date: formattedDate })}
              </p>
            </div>

            {/* Table of contents */}
            <div className="mt-12 rounded-2xl bg-slate-50 px-8 py-6">
              <h2 className="text-lg font-semibold text-slate-900">
                {t('contents')}
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#agreement" className="hover:text-blue-600">
                    {tSections('agreement.title')}
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-600">
                    {tSections('services.title')}
                  </a>
                </li>
                <li>
                  <a
                    href="#intellectual-property"
                    className="hover:text-blue-600"
                  >
                    {tSections('intellectualProperty.title')}
                  </a>
                </li>
                <li>
                  <a href="#user-accounts" className="hover:text-blue-600">
                    {tSections('userAccounts.title')}
                  </a>
                </li>
                <li>
                  <a href="#prohibited-uses" className="hover:text-blue-600">
                    {tSections('prohibitedUses.title')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Main content */}
            <div className="prose prose-slate mt-16 space-y-12">
              <TermsSection title={tSections('agreement.title')} id="agreement">
                <p className="text-slate-600">
                  {tSections('agreement.content')}
                </p>
              </TermsSection>

              <TermsSection title={tSections('services.title')} id="services">
                <div className="space-y-4 text-slate-600">
                  <p>{tSections('services.content')}</p>
                  <ul className="list-disc space-y-2 pl-5">
                    {tSections.raw('services.items').map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p>{tSections('services.note')}</p>
                </div>
              </TermsSection>

              <TermsSection
                title={tSections('intellectualProperty.title')}
                id="intellectual-property"
              >
                <div className="space-y-4 text-slate-600">
                  <p>{tSections('intellectualProperty.content')}</p>
                  <ul className="list-disc space-y-2 pl-5">
                    {tSections
                      .raw('intellectualProperty.items')
                      .map((item: string) => (
                        <li key={item}>{item}</li>
                      ))}
                  </ul>
                  <p>{tSections('intellectualProperty.note')}</p>
                </div>
              </TermsSection>

              <TermsSection
                title={tSections('userAccounts.title')}
                id="user-accounts"
              >
                <div className="space-y-4 text-slate-600">
                  <p>{tSections('userAccounts.content')}</p>
                  <ul className="list-disc space-y-2 pl-5">
                    {tSections.raw('userAccounts.items').map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </TermsSection>

              <TermsSection
                title={tSections('prohibitedUses.title')}
                id="prohibited-uses"
              >
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                  <p className="text-slate-600">
                    {tSections('prohibitedUses.content')}
                  </p>
                </div>
              </TermsSection>
            </div>
          </div>
        </Container>
      </div>
    </ContentLayout>
  )
}
