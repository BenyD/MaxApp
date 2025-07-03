export type Project = {
  name: string
  description: string
  tech: string[]
  image: string
  video?: string
  link: string
  category: string
  color: 'blue' | 'emerald' | 'purple'
}

export const projects: Project[] = [
  {
    name: 'DineEasy',
    description:
      'A smart restaurant order and billing platform that revolutionizes dining operations. Features include QR code menus, real-time order tracking, and integrated payment processing.',
    tech: ['React', 'Node.js', 'MySQL', 'Stripe'],
    image: '/images/projects/dineeasy.jpg',
    video: '/videos/projects/dineeasy.mp4',
    link: '#',
    category: 'Restaurant Tech',
    color: 'emerald',
  },
]

export const colors = {
  blue: {
    light: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
    gradient: 'bg-gradient-to-tr from-blue-100 to-blue-50',
    shadow: 'shadow-blue-100/50',
    tag: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      ring: 'ring-blue-700/10',
    },
  },
  emerald: {
    light: 'bg-emerald-50',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
    gradient: 'bg-gradient-to-tr from-emerald-100 to-emerald-50',
    shadow: 'shadow-emerald-100/50',
    tag: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      ring: 'ring-emerald-700/10',
    },
  },
  purple: {
    light: 'bg-purple-50',
    text: 'text-purple-600',
    border: 'border-purple-200',
    gradient: 'bg-gradient-to-tr from-purple-100 to-purple-50',
    shadow: 'shadow-purple-100/50',
    tag: {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      ring: 'ring-purple-700/10',
    },
  },
}
