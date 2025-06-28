import { Container } from '@/components/Container'
import Image from 'next/image'
import {
  GlobeAltIcon,
  UserGroupIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Global Presence',
    description:
      'With offices in Switzerland, India, and Sri Lanka, we bring together diverse perspectives and round-the-clock capabilities.',
    icon: GlobeAltIcon,
    color: 'blue',
  },
  {
    name: 'Expert Teams',
    description:
      'Our multinational team combines Swiss precision with Asian innovation, delivering excellence across time zones.',
    icon: UserGroupIcon,
    color: 'emerald',
  },
  {
    name: 'Quality Focus',
    description:
      'We maintain rigorous quality standards across all locations, ensuring consistent, high-quality deliverables.',
    icon: SparklesIcon,
    color: 'purple',
  },
]

const colors = {
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
}

export function About() {
  return (
    <div className="relative isolate bg-white py-24 sm:py-32" id="about">
      <div className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-slate-50"></div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-slate-50"></div>

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base leading-7 font-semibold text-blue-600">
            About Us
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Global Excellence, Local Expertise
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            We combine Swiss precision with global innovation to deliver
            exceptional software solutions.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
            <div className="relative lg:order-2">
              <div className="relative">
                <Image
                  src="/images/about/team.jpg"
                  alt="MaxApp Team"
                  width={600}
                  height={400}
                  className="aspect-[4/3] w-full rounded-2xl bg-slate-50 object-cover shadow-xl"
                />
                <div className="absolute -bottom-8 -left-8 hidden rounded-2xl bg-white/90 p-8 shadow-lg backdrop-blur-sm lg:block">
                  <p className="text-lg font-semibold text-slate-900">
                    24/7 Global Operations
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Our distributed team structure enables continuous
                    development and support across time zones
                  </p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 -z-10 h-[calc(100%+2rem)] w-[calc(100%+2rem)] rounded-[2rem] bg-gradient-to-b from-blue-50 to-white"></div>
            </div>

            <div className="lg:order-1">
              <div className="text-lg leading-8 text-slate-600">
                <p className="mb-6">
                  Maxapp is a Swiss-based software company headquartered in
                  Rotkreuz. We specialize in practical, scalable software that
                  aligns with real business goals, combining technical
                  excellence with business acumen.
                </p>
                <p className="mb-6">
                  Our consulting and planning team in Switzerland ensures
                  strategic alignment, while our skilled development teams in
                  India and Sri Lanka deliver quality, cost-effective execution.
                </p>
                <p>
                  This unique setup allows us to offer the best of both worlds:
                  Swiss quality standards and project management combined with
                  highly skilled development teams across multiple time zones.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className={`group relative isolate flex flex-col overflow-hidden rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 transition-all duration-200 hover:shadow-xl ${colors[feature.color].shadow}`}
                >
                  <div className="flex items-center gap-x-4">
                    <div
                      className={`rounded-xl ${colors[feature.color].light} p-2.5 ${colors[feature.color].text} ring-1 ring-inset ${colors[feature.color].border}`}
                    >
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {feature.name}
                    </h3>
                  </div>
                  <div className="relative mt-6 flex-1">
                    <p className="text-base leading-7 text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                  {/* Decorative gradient background */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-slate-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </div>
  )
}
