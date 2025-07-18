import { Link } from '@/i18n/navigation'
import { pathnames } from '@/i18n/navigation'

type Pathname = keyof typeof pathnames

export function NavLink({
  href,
  children,
  onClick,
}: {
  href: Pathname
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
