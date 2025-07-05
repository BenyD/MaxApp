import { Container } from '@/components/Container'
import {
  CurrencyDollarIcon,
  LightBulbIcon,
  ClockIcon,
  ChartBarIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'

type ColorKey = 'blue' | 'emerald' | 'purple' | 'amber' | 'rose'

type ColorConfig = {
  light: string
  text: string
  border: string
  gradient: string
  shadow: string
}

type Feature = {
  key: string
  icon: React.ComponentType<{ className?: string }>
  color: ColorKey
  size?: 'large' | 'medium' | 'small'
}

const features: Feature[] = [
  {
    key: 'swissStandards',
    icon: ShieldCheckIcon,
    color: 'blue',
    size: 'large',
  },
  {
    key: 'costEffective',
    icon: CurrencyDollarIcon,
    color: 'emerald',
    size: 'medium',
  },
  {
    key: 'customSolutions',
    icon: LightBulbIcon,
    color: 'purple',
    size: 'medium',
  },
  {
    key: 'fastDelivery',
    icon: ClockIcon,
    color: 'amber',
    size: 'small',
  },
  {
    key: 'provenSuccess',
    icon: ChartBarIcon,
    color: 'rose',
    size: 'small',
  },
]

const colors: Record<ColorKey, ColorConfig> = {
  blue: {
    light: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
    gradient: 'bg-gradient-to-tr from-blue-100 to-blue-50',
    shadow: 'shadow-blue-100/50',
  },
  emerald: {
    light: 'bg-emerald-50',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
    gradient: 'bg-gradient-to-tr from-emerald-100 to-emerald-50',
    shadow: 'shadow-emerald-100/50',
  },
  purple: {
    light: 'bg-purple-50',
    text: 'text-purple-600',
    border: 'border-purple-200',
    gradient: 'bg-gradient-to-tr from-purple-100 to-purple-50',
    shadow: 'shadow-purple-100/50',
  },
  amber: {
    light: 'bg-amber-50',
    text: 'text-amber-600',
    border: 'border-amber-200',
    gradient: 'bg-gradient-to-tr from-amber-100 to-amber-50',
    shadow: 'shadow-amber-100/50',
  },
  rose: {
    light: 'bg-rose-50',
    text: 'text-rose-600',
    border: 'border-rose-200',
    gradient: 'bg-gradient-to-tr from-rose-100 to-rose-50',
    shadow: 'shadow-rose-100/50',
  },
}

function FeatureCard({ feature }: { feature: Feature }) {
  const t = useTranslations('whyUs.features')
  const sizeClasses = {
    large: 'lg:col-span-2',
    medium: '',
    small: '',
  }

  return (
    <div
      className={`group relative isolate flex h-full flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200 transition-all duration-200 hover:shadow-xl sm:p-8 ${colors[feature.color].shadow} ${sizeClasses[feature.size || 'medium']}`}
    >
      <div className="flex items-center gap-x-4">
        <div
          className={`rounded-xl ${colors[feature.color].light} p-2.5 ${colors[feature.color].text} ring-1 ring-inset ${colors[feature.color].border}`}
        >
          <feature.icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900">
          {t(`${feature.key}.name`)}
        </h3>
      </div>

      <div className="relative mt-6 flex-1">
        <p className="text-base leading-7 text-slate-600">
          {t(`${feature.key}.description`)}
        </p>

        {/* Metrics Grid - Only for large card */}
        {feature.size === 'large' && (
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {['codeCoverage', 'testSuccess', 'satisfaction'].map(
              (metricKey) => (
                <div
                  key={metricKey}
                  className={`rounded-2xl ${colors[feature.color].light} border p-3 text-center sm:p-4 ${colors[feature.color].border}`}
                >
                  <div
                    className={`text-xl font-bold sm:text-2xl ${colors[feature.color].text}`}
                  >
                    {t(`${feature.key}.metrics.${metricKey}.value`)}
                  </div>
                  <div className="mt-1 text-xs text-slate-600 sm:text-sm">
                    {t(`${feature.key}.metrics.${metricKey}.label`)}
                  </div>
                </div>
              ),
            )}
          </div>
        )}

        {/* Stats - For medium and small cards */}
        {feature.size !== 'large' && (
          <div className="mt-8">
            <div
              className={`inline-flex flex-wrap items-baseline rounded-xl ${colors[feature.color].light} border px-3 py-2 sm:px-4 ${colors[feature.color].border}`}
            >
              <span
                className={`text-xl font-bold sm:text-2xl ${colors[feature.color].text}`}
              >
                {t(`${feature.key}.stats`)}
              </span>
              <span className="ml-2 text-xs text-slate-600 sm:text-sm">
                {t(`${feature.key}.statsText`)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Decorative gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-slate-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
    </div>
  )
}

export function WhyUs() {
  const t = useTranslations('whyUs')

  return (
    <div className="relative bg-white py-24 sm:py-32" id="why-us">
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
            {features.map((feature) => (
              <FeatureCard key={feature.key} feature={feature} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
