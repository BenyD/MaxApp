import { Container } from '@/components/Container'
import {
  CurrencyDollarIcon,
  LightBulbIcon,
  ClockIcon,
  ChartBarIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'

type ColorKey = 'blue' | 'emerald' | 'purple' | 'amber' | 'rose'

type ColorConfig = {
  light: string
  text: string
  border: string
  gradient: string
  shadow: string
}

type Feature = {
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: ColorKey
  stats?: string
  statsText?: string
  size?: 'large' | 'medium' | 'small'
  metrics?: { label: string; value: string }[]
}

const features: Feature[] = [
  {
    name: 'Swiss Engineering Standards',
    description:
      'Every project follows strict Swiss quality guidelines, ensuring robust and reliable solutions. Our development process combines precision engineering with innovative approaches.',
    icon: ShieldCheckIcon,
    color: 'blue',
    size: 'large',
    metrics: [
      { label: 'Code Coverage', value: '95%' },
      { label: 'Test Success Rate', value: '99.9%' },
      { label: 'Client Satisfaction', value: '100%' },
    ],
  },
  {
    name: 'Cost-Effective',
    description:
      'Swiss quality at competitive rates through our distributed team model.',
    icon: CurrencyDollarIcon,
    color: 'emerald',
    stats: '40%',
    statsText: 'cost reduction',
    size: 'medium',
  },
  {
    name: 'Custom Solutions',
    description: 'Tailored software that grows with your business needs.',
    icon: LightBulbIcon,
    color: 'purple',
    stats: '100%',
    statsText: 'customization',
    size: 'medium',
  },
  {
    name: 'Fast Delivery',
    description: 'Agile development with transparent progress tracking.',
    icon: ClockIcon,
    color: 'amber',
    stats: '2x',
    statsText: 'faster delivery',
    size: 'small',
  },
  {
    name: 'Proven Success',
    description:
      'Track record of successful projects across various industries.',
    icon: ChartBarIcon,
    color: 'rose',
    stats: '50+',
    statsText: 'projects delivered',
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
  const sizeClasses = {
    large: 'lg:col-span-2',
    medium: '',
    small: '',
  }

  return (
    <div
      className={`group relative isolate flex h-full flex-col overflow-hidden rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 transition-all duration-200 hover:shadow-xl ${colors[feature.color].shadow} ${sizeClasses[feature.size || 'medium']}`}
    >
      <div className="flex items-center gap-x-4">
        <div
          className={`rounded-xl ${colors[feature.color].light} p-2.5 ${colors[feature.color].text} ring-1 ring-inset ${colors[feature.color].border}`}
        >
          <feature.icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900">{feature.name}</h3>
      </div>

      <div className="relative mt-6 flex-1">
        <p className="text-base leading-7 text-slate-600">
          {feature.description}
        </p>

        {/* Metrics Grid - Only for large card */}
        {feature.metrics && (
          <div className="mt-8 grid grid-cols-3 gap-4">
            {feature.metrics.map((metric) => (
              <div
                key={metric.label}
                className={`rounded-2xl ${colors[feature.color].light} border p-4 text-center ${colors[feature.color].border}`}
              >
                <div
                  className={`text-2xl font-bold ${colors[feature.color].text}`}
                >
                  {metric.value}
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats - For medium and small cards */}
        {feature.stats && (
          <div className="mt-8">
            <div
              className={`inline-flex items-baseline rounded-xl ${colors[feature.color].light} border px-4 py-2 ${colors[feature.color].border}`}
            >
              <span
                className={`text-2xl font-bold ${colors[feature.color].text}`}
              >
                {feature.stats}
              </span>
              <span className="ml-2 text-sm text-slate-600">
                {feature.statsText}
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
  return (
    <div className="relative bg-white py-24 sm:py-32" id="why-us">
      <div className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-slate-50"></div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-slate-50"></div>

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base leading-7 font-semibold text-blue-600">
            Why Choose Us
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Swiss Precision, Global Innovation
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Experience the perfect blend of Swiss engineering standards and
            innovative development approaches.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.name} feature={feature} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
