import { ReactNode } from 'react'
import { metadata as pageMetadata } from './metadata'

export const metadata = pageMetadata

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>
}
