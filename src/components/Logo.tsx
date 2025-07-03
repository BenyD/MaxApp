'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
  invert?: boolean
}

export function Logo({ className, invert = false }: LogoProps) {
  return (
    <Image
      src="/images/logo.png"
      alt="MaxApp Logo"
      width={109}
      height={40}
      className={cn(
        'object-contain',
        invert && 'brightness-0 invert',
        className,
      )}
      priority
    />
  )
}
