import {
  CodeBracketIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline'

export type Service = {
  key: 'webApps' | 'websites' | 'pwa'
  icon: typeof CodeBracketIcon
  image: string
  imageAlt: string
  color: 'blue' | 'emerald' | 'purple'
}

export const services: Service[] = [
  {
    key: 'webApps',
    icon: CodeBracketIcon,
    image: '/images/services/webapp.png',
    imageAlt:
      'Web application development illustration showing a modern dashboard interface with interactive components and data visualization',
    color: 'blue',
  },
  {
    key: 'websites',
    icon: GlobeAltIcon,
    image: '/images/services/website.png',
    imageAlt:
      'Website development illustration depicting a responsive website design across multiple devices with modern UI elements',
    color: 'emerald',
  },
  {
    key: 'pwa',
    icon: DevicePhoneMobileIcon,
    image: '/images/services/pwa.png',
    imageAlt:
      'Progressive Web App illustration showing a mobile app interface with offline capabilities and native-like features',
    color: 'purple',
  },
]

export const colors = {
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
