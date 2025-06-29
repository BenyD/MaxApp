import { redirect } from '@/i18n/navigation'
import { defaultLocale } from '@/i18n/settings'

export default function RootPage() {
  redirect({ href: '/', locale: defaultLocale as string })
}
