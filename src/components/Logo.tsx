'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import maxappLogo from '@/images/maxapp_logo.png'

type LogoProps = {
  className?: string
  invert?: boolean
}

export function Logo({ className, invert = false }: LogoProps) {
  return (
    <Image
      src={maxappLogo}
      alt="MaxApp Logo"
      className={cn(
        'h-10 w-auto object-contain',
        invert && 'brightness-0 invert',
        className,
      )}
      priority
    />
  )
}
