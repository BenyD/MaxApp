import { metadata as pageMetadata } from './metadata'

export const metadata = pageMetadata

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>
}
