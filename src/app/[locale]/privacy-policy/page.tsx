'use client'

import { useTranslations } from 'next-intl'
import { Container } from '@/components/Container'
import { ContentLayout } from '@/components/ContentLayout'

function PolicySection({
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

export default function PrivacyPolicy() {
  const t = useTranslations('policies.privacy')
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
                  <a href="#introduction" className="hover:text-blue-600">
                    {t('sections.introduction.title')}
                  </a>
                </li>
                <li>
                  <a href="#data-collection" className="hover:text-blue-600">
                    {t('sections.dataCollection.title')}
                  </a>
                </li>
                <li>
                  <a href="#legal-basis" className="hover:text-blue-600">
                    {t('sections.legalBasis.title')}
                  </a>
                </li>
                <li>
                  <a href="#data-sharing" className="hover:text-blue-600">
                    {t('sections.dataSharing.title')}
                  </a>
                </li>
                <li>
                  <a href="#your-rights" className="hover:text-blue-600">
                    {t('sections.yourRights.title')}
                  </a>
                </li>
                <li>
                  <a href="#data-security" className="hover:text-blue-600">
                    {t('sections.dataSecurity.title')}
                  </a>
                </li>
                <li>
                  <a href="#retention" className="hover:text-blue-600">
                    {t('sections.retention.title')}
                  </a>
                </li>
                <li>
                  <a href="#international" className="hover:text-blue-600">
                    {t('sections.international.title')}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-blue-600">
                    {t('sections.contact.title')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Main content */}
            <div className="prose prose-slate mt-16 space-y-12">
              <PolicySection
                title={t('sections.introduction.title')}
                id="introduction"
              >
                <p className="text-slate-600">
                  {t('sections.introduction.paragraph1')}
                </p>
                <p className="text-slate-600">
                  {t('sections.introduction.paragraph2')}
                </p>
              </PolicySection>

              <PolicySection
                title={t('sections.dataCollection.title')}
                id="data-collection"
              >
                <div className="space-y-6">
                  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                    <h3 className="font-semibold text-slate-900">
                      {t('sections.dataCollection.infoWeCollect.title')}
                    </h3>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
                      {(
                        t.raw(
                          'sections.dataCollection.infoWeCollect.items',
                        ) as string[]
                      ).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                    <h3 className="font-semibold text-slate-900">
                      {t('sections.dataCollection.howWeUse.title')}
                    </h3>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
                      {(
                        t.raw(
                          'sections.dataCollection.howWeUse.items',
                        ) as string[]
                      ).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </PolicySection>

              <PolicySection
                title={t('sections.legalBasis.title')}
                id="legal-basis"
              >
                <p className="text-slate-600">
                  {t('sections.legalBasis.content')}
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
                  {(t.raw('sections.legalBasis.items') as string[]).map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    ),
                  )}
                </ul>
              </PolicySection>

              <PolicySection
                title={t('sections.dataSharing.title')}
                id="data-sharing"
              >
                <p className="text-slate-600">
                  {t('sections.dataSharing.content')}
                </p>
              </PolicySection>

              <PolicySection
                title={t('sections.yourRights.title')}
                id="your-rights"
              >
                <p className="text-slate-600">
                  {t('sections.yourRights.content')}
                </p>
              </PolicySection>

              <PolicySection
                title={t('sections.dataSecurity.title')}
                id="data-security"
              >
                <p className="text-slate-600">
                  {t('sections.dataSecurity.content')}
                </p>
              </PolicySection>

              <PolicySection
                title={t('sections.retention.title')}
                id="retention"
              >
                <p className="text-slate-600">
                  {t('sections.retention.content')}
                </p>
              </PolicySection>

              <PolicySection
                title={t('sections.international.title')}
                id="international"
              >
                <p className="text-slate-600">
                  {t('sections.international.content')}
                </p>
              </PolicySection>

              <PolicySection title={t('sections.contact.title')} id="contact">
                <p className="text-slate-600">
                  {t('sections.contact.content')}
                </p>
              </PolicySection>
            </div>
          </div>
        </Container>
      </div>
    </ContentLayout>
  )
}
