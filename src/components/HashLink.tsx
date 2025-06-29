export function HashLink({
  href,
  children,
  onClick,
  className,
}: {
  href: string
  children: React.ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <a
      href={href}
      className={`inline-block rounded-lg px-2 py-1 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </a>
  )
}
