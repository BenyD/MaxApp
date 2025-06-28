import Image from 'next/image'
import { Container } from '@/components/Container'
import {
  CodeBracketIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

const services = [
  {
    title: 'Web Apps',
    description:
      'Interactive, browser-based platforms that work across devices—ideal for internal dashboards, CRMs, and client portals.',
    features: [
      'Real-time data synchronization',
      'Secure authentication',
      'Custom dashboards',
      'API integration',
    ],
    icon: CodeBracketIcon,
    image: '/images/illustrations/web-app.jpg',
    color: 'blue',
  },
  {
    title: 'Websites',
    description:
      'High-performance, responsive websites that elevate your brand—landing pages, company profiles, blogs, and more.',
    features: [
      'SEO optimization',
      'Fast page loads',
      'Mobile-first design',
      'Content management',
    ],
    icon: GlobeAltIcon,
    image: '/images/illustrations/website.jpg',
    color: 'emerald',
  },
  {
    title: 'Progressive Web Apps',
    description:
      'Native-like experiences in the browser—fast, installable, and offline-ready applications for modern businesses.',
    features: [
      'Offline functionality',
      'Push notifications',
      'App-like experience',
      'Cross-platform support',
    ],
    icon: DevicePhoneMobileIcon,
    image: '/images/illustrations/pwa.jpg',
    color: 'purple',
  },
]

const colors = {
  blue: {
    light: 'bg-blue-50',
    medium: 'bg-blue-100',
    text: 'text-blue-600',
    border: 'border-blue-200',
    gradient: 'bg-gradient-to-tr from-blue-100 to-blue-50',
    shadow: 'shadow-blue-100/50',
  },
  emerald: {
    light: 'bg-emerald-50',
    medium: 'bg-emerald-100',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
    gradient: 'bg-gradient-to-tr from-emerald-100 to-emerald-50',
    shadow: 'shadow-emerald-100/50',
  },
  purple: {
    light: 'bg-purple-50',
    medium: 'bg-purple-100',
    text: 'text-purple-600',
    border: 'border-purple-200',
    gradient: 'bg-gradient-to-tr from-purple-100 to-purple-50',
    shadow: 'shadow-purple-100/50',
  },
}

export function Services() {
  return (
    <div className="relative bg-white py-16 sm:py-24 lg:py-32" id="services">
      <div className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-slate-50"></div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-slate-50"></div>

      <Container>
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-base leading-7 font-semibold text-blue-600">
            Our Expertise
          </h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Swiss-Quality Digital Solutions
          </p>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg">
            We craft precise, future-proof digital solutions—from concept to
            launch. Whether it&apos;s a business portal, internal tool, or
            online presence, we build with purpose, performance, and scalability
            in mind.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-7xl px-4 sm:mt-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className={`group relative isolate flex flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200 transition-all duration-200 hover:shadow-xl sm:rounded-3xl sm:p-8 ${colors[service.color].shadow}`}
              >
                <div className="flex items-center gap-x-4">
                  <div
                    className={`rounded-lg sm:rounded-xl ${colors[service.color].light} p-2 sm:p-2.5 ${colors[service.color].text} ring-1 ring-inset ${colors[service.color].border}`}
                  >
                    <service.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
                    {service.title}
                  </h3>
                </div>

                <div className="relative mt-4 flex-1 sm:mt-6">
                  <div
                    className={`aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl ${colors[service.color].gradient}`}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      width={400}
                      height={300}
                      priority
                    />
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600 sm:mt-6 sm:text-base sm:leading-7">
                    {service.description}
                  </p>

                  <ul className="mt-4 space-y-2 sm:mt-6 sm:space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-x-3">
                        <CheckCircleIcon
                          className={`h-4 w-4 flex-none sm:h-5 sm:w-5 ${colors[service.color].text}`}
                        />
                        <span className="text-xs text-slate-600 sm:text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Decorative gradient background */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-slate-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </article>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
