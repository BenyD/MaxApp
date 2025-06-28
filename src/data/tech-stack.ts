import {
  CommandLineIcon,
  CloudArrowUpIcon,
  CpuChipIcon,
  WindowIcon,
  PaintBrushIcon,
} from '@heroicons/react/24/outline'

export type ColorKey = 'blue' | 'purple' | 'emerald' | 'orange' | 'rose'

export type ColorConfig = {
  light: string
  text: string
  border: string
  gradient: string
  shadow: string
  tech: {
    bg: string
    border: string
    hover: string
    shadow: string
  }
}

export type Technology = {
  name: string
  logo: string
  type: string
}

export type TechStack = {
  category: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  technologies: Technology[]
  color: ColorKey
}

export const colors: Record<ColorKey, ColorConfig> = {
  blue: {
    light: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
    gradient: 'bg-gradient-to-tr from-blue-100 to-blue-50',
    shadow: 'shadow-blue-100/50',
    tech: {
      bg: 'bg-blue-50/50',
      border: 'border-blue-200/50',
      hover: 'hover:border-blue-300',
      shadow: 'hover:shadow-blue-100/50',
    },
  },
  purple: {
    light: 'bg-purple-50',
    text: 'text-purple-600',
    border: 'border-purple-200',
    gradient: 'bg-gradient-to-tr from-purple-100 to-purple-50',
    shadow: 'shadow-purple-100/50',
    tech: {
      bg: 'bg-purple-50/50',
      border: 'border-purple-200/50',
      hover: 'hover:border-purple-300',
      shadow: 'hover:shadow-purple-100/50',
    },
  },
  emerald: {
    light: 'bg-emerald-50',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
    gradient: 'bg-gradient-to-tr from-emerald-100 to-emerald-50',
    shadow: 'shadow-emerald-100/50',
    tech: {
      bg: 'bg-emerald-50/50',
      border: 'border-emerald-200/50',
      hover: 'hover:border-emerald-300',
      shadow: 'hover:shadow-emerald-100/50',
    },
  },
  orange: {
    light: 'bg-orange-50',
    text: 'text-orange-600',
    border: 'border-orange-200',
    gradient: 'bg-gradient-to-tr from-orange-100 to-orange-50',
    shadow: 'shadow-orange-100/50',
    tech: {
      bg: 'bg-orange-50/50',
      border: 'border-orange-200/50',
      hover: 'hover:border-orange-300',
      shadow: 'hover:shadow-orange-100/50',
    },
  },
  rose: {
    light: 'bg-rose-50',
    text: 'text-rose-600',
    border: 'border-rose-200',
    gradient: 'bg-gradient-to-tr from-rose-100 to-rose-50',
    shadow: 'shadow-rose-100/50',
    tech: {
      bg: 'bg-rose-50/50',
      border: 'border-rose-200/50',
      hover: 'hover:border-rose-300',
      shadow: 'hover:shadow-rose-100/50',
    },
  },
}

export const techStacks: TechStack[] = [
  {
    category: 'Frontend Development',
    icon: WindowIcon,
    color: 'blue',
    description:
      'Modern, responsive, and interactive user interfaces built with cutting-edge web technologies.',
    technologies: [
      { name: 'React', logo: '/images/logos/react.svg', type: 'Framework' },
      { name: 'Vue.js', logo: '/images/logos/vue.svg', type: 'Framework' },
      { name: 'Next.js', logo: '/images/logos/nextjs.svg', type: 'Framework' },
      {
        name: 'TypeScript',
        logo: '/images/logos/typescript.svg',
        type: 'Language',
      },
      {
        name: 'Tailwind CSS',
        logo: '/images/logos/tailwind.svg',
        type: 'Styling',
      },
    ],
  },
  {
    category: 'Backend Development',
    icon: CommandLineIcon,
    color: 'purple',
    description:
      'Robust and scalable server-side solutions that power our applications.',
    technologies: [
      { name: 'Node.js', logo: '/images/logos/nodejs.svg', type: 'Runtime' },
      { name: 'Java', logo: '/images/logos/java.svg', type: 'Language' },
      { name: 'PHP', logo: '/images/logos/php.svg', type: 'Language' },
      { name: 'Laravel', logo: '/images/logos/laravel.svg', type: 'Framework' },
      {
        name: 'Express.js',
        logo: '/images/logos/express.svg',
        type: 'Framework',
      },
    ],
  },
  {
    category: 'Database Systems',
    icon: CpuChipIcon,
    color: 'emerald',
    description: 'Efficient and reliable data storage and management systems.',
    technologies: [
      { name: 'PostgreSQL', logo: '/images/logos/postgresql.svg', type: 'SQL' },
      { name: 'MySQL', logo: '/images/logos/mysql.svg', type: 'SQL' },
      { name: 'MongoDB', logo: '/images/logos/mongodb.svg', type: 'NoSQL' },
      { name: 'Redis', logo: '/images/logos/redis.svg', type: 'Cache' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    icon: CloudArrowUpIcon,
    color: 'orange',
    description:
      'Seamless deployment and scaling with modern cloud infrastructure.',
    technologies: [
      { name: 'AWS', logo: '/images/logos/aws.svg', type: 'Cloud' },
      { name: 'Docker', logo: '/images/logos/docker.svg', type: 'Container' },
      {
        name: 'Kubernetes',
        logo: '/images/logos/kubernetes.svg',
        type: 'Orchestration',
      },
      { name: 'Vercel', logo: '/images/logos/vercel.svg', type: 'Hosting' },
    ],
  },
  {
    category: 'Design & Collaboration',
    icon: PaintBrushIcon,
    color: 'rose',
    description:
      'Tools and platforms that enable beautiful design and efficient teamwork.',
    technologies: [
      { name: 'Figma', logo: '/images/logos/figma.svg', type: 'Design' },
      {
        name: 'GitHub',
        logo: '/images/logos/github.svg',
        type: 'Version Control',
      },
      {
        name: 'Jira',
        logo: '/images/logos/jira.svg',
        type: 'Project Management',
      },
      { name: 'Slack', logo: '/images/logos/slack.svg', type: 'Communication' },
    ],
  },
]
