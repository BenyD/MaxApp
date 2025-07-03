'use client'

import { Container } from '@/components/Container'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'
import { services, colors } from '@/data/services'

export function Services() {
  const t = useTranslations('services')

  return (
    <div className="relative bg-white py-16 sm:py-24 lg:py-32" id="services">
      <div className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-slate-50"></div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-slate-50"></div>

      <Container>
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-base leading-7 font-semibold text-blue-600">
            {t('title')}
          </h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {t('subtitle')}
          </p>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg">
            {t('description')}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-7xl px-4 sm:mt-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon
              const color = service.color

              return (
                <article
                  key={service.key}
                  className={`group relative isolate flex flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200 transition-all duration-200 hover:shadow-xl sm:rounded-3xl sm:p-8 ${colors[color].shadow}`}
                >
                  <div className="flex items-center gap-x-4">
                    <div
                      className={`rounded-lg sm:rounded-xl ${colors[color].light} p-2 sm:p-2.5 ${colors[color].text} ring-1 ring-inset ${colors[color].border}`}
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
                      {t(`items.${service.key}.title`)}
                    </h3>
                  </div>

                  <div className="relative mt-4 flex-1 sm:mt-6">
                    <p className="text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                      {t(`items.${service.key}.description`)}
                    </p>

                    <ul className="mt-4 space-y-2 sm:mt-6 sm:space-y-3">
                      {t
                        .raw(`items.${service.key}.features`)
                        .map((feature: string) => (
                          <li
                            key={feature}
                            className="flex items-center gap-x-3"
                          >
                            <CheckCircleIcon
                              className={`h-4 w-4 flex-none sm:h-5 sm:w-5 ${colors[color].text}`}
                            />
                            <span className="text-xs text-slate-600 sm:text-sm">
                              {feature}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-slate-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </article>
              )
            })}
          </div>
        </div>
      </Container>
    </div>
  )
}
