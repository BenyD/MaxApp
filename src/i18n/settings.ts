export const locales = ['en', 'de'] as const
export const defaultLocale = 'en' as const

export function isValidLocale(
  locale: string,
): locale is (typeof locales)[number] {
  return locales.includes(locale as (typeof locales)[number])
}
